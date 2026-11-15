import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { mockStudents, StudentRecord } from "@/data/mock-students";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getServiceSupabase();
    const { data: usersData, error } = await supabase.auth.admin.listUsers({
      perPage: 100,
    });

    if (error) {
      console.warn("Could not list users from Supabase:", error.message);
      return NextResponse.json({ students: mockStudents });
    }

    const realUsers = usersData?.users || [];

    // Map Supabase auth users to StudentRecord format
    const registeredStudents: StudentRecord[] = realUsers
      .filter((u) => u.user_metadata?.role !== "teacher" && u.user_metadata?.role !== "admin")
      .map((u, idx) => {
        const meta = u.user_metadata || {};
        const name = meta.name || u.email?.split("@")[0] || `Оқушы #${idx + 1}`;
        const createdAt = u.created_at ? new Date(u.created_at).toLocaleDateString("kk-KZ") : "Кеше";

        return {
          id: u.id,
          name,
          email: u.email || "",
          classCode: meta.classCode || "10A-MARKET",
          xp: 150 + idx * 50,
          points: 150 + idx * 50,
          level: 1,
          streak: 1,
          completedTopicsCount: 2,
          completedTasks: 3,
          testScoreAvg: 88,
          slogansCount: 1,
          brandsCount: 1,
          adsCount: 1,
          badgesCount: 1,
          lastActive: `Тіркелді: ${createdAt}`,
          status: "жақсы",
        };
      });

    // Merge: Real registered students first, followed by standard class list
    const seenEmails = new Set(registeredStudents.map((s) => s.email.toLowerCase()));
    const remainingMock = mockStudents.filter((m) => !seenEmails.has(m.email.toLowerCase()));
    const combined = [...registeredStudents, ...remainingMock];

    return NextResponse.json({
      students: combined,
      registeredCount: registeredStudents.length,
    });
  } catch (err: any) {
    console.error("Teacher students API error:", err);
    return NextResponse.json({ students: mockStudents });
  }
}
