import { mockStudents, StudentRecord } from "@/data/mock-students";
import { User, StudentProgress } from "@/store/app-context";
import { calculateLevel } from "@/lib/utils";

export interface DynamicStudent extends StudentRecord {
  isCurrentUser?: boolean;
  rank?: number;
}

/**
 * Builds a dynamic leaderboard including the currently logged-in student with their live XP.
 */
export function getDynamicClassLeaderboard(
  currentUser: User | null,
  progress: StudentProgress,
  extraStudents: StudentRecord[] = []
): DynamicStudent[] {
  // Start with baseline classmates
  const baseMap = new Map<string, DynamicStudent>();

  // Add extra students (from API / Supabase)
  for (const s of extraStudents) {
    baseMap.set(s.id || s.email, { ...s, points: s.points ?? s.xp });
  }

  // Add mock classmates if not overridden
  for (const s of mockStudents) {
    if (!baseMap.has(s.id) && !baseMap.has(s.email)) {
      baseMap.set(s.id, { ...s, points: s.points ?? s.xp });
    }
  }

  // If a student user is logged in, inject or update them with real live progress
  if (currentUser && currentUser.role === "student") {
    const userXp = progress.xp || 0;
    const completedTasksCount =
      (progress.completedLessons?.length || 0) +
      (progress.completedTopics?.length || 0) +
      (progress.savedBrands?.length || 0) +
      (progress.savedSlogans?.length || 0) +
      (progress.savedPosts?.length || 0) +
      (progress.savedSeoProjects?.length || 0) +
      (progress.testScores?.length || 0);

    const levelObj = calculateLevel(userXp);

    const currentRecord: DynamicStudent = {
      id: currentUser.id,
      name: currentUser.name || "Жас маркетолог",
      email: currentUser.email,
      classCode: currentUser.classCode || "10A-MARKET",
      xp: userXp,
      points: userXp,
      level: levelObj.level,
      streak: progress.streak || 1,
      completedTopicsCount: progress.completedTopics?.length || 0,
      completedTasks: completedTasksCount,
      testScoreAvg:
        progress.testScores && progress.testScores.length > 0
          ? Math.round(
              (progress.testScores.reduce((acc, t) => acc + (t.score / (t.total || 10)) * 100, 0) /
                progress.testScores.length)
            )
          : 90,
      slogansCount: progress.savedSlogans?.length || 0,
      brandsCount: progress.savedBrands?.length || 0,
      adsCount: progress.savedPosts?.length || 0,
      badgesCount: progress.badges?.length || (userXp >= 100 ? 1 : 0),
      lastActive: "Бүгін, дәл қазір",
      status: userXp >= 2000 ? "үздік" : userXp >= 1000 ? "жақсы" : "орташа",
      isCurrentUser: true,
    };

    // Remove any dummy record that shares the email or name
    for (const [key, val] of Array.from(baseMap.entries())) {
      if (
        val.email?.toLowerCase() === currentUser.email?.toLowerCase() ||
        val.name?.toLowerCase() === currentUser.name?.toLowerCase()
      ) {
        baseMap.delete(key);
      }
    }

    baseMap.set(currentUser.id, currentRecord);
  }

  // Convert to array and sort by XP descending
  const list = Array.from(baseMap.values()).sort((a, b) => (b.points || 0) - (a.points || 0));

  // Assign ranks
  return list.map((st, index) => ({
    ...st,
    rank: index + 1,
  }));
}
