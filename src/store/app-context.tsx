"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
  classCode: string;
  avatar?: string;
  createdAt: string;
}

export interface StudentProgress {
  xp: number;
  streak: number;
  lastActiveDate: string;
  completedTopics: string[];
  testScores: { testId: string; score: number; total: number; date: string }[];
  savedSlogans: { id: string; text: string; brandName: string; score: number; date: string }[];
  savedBrands: BrandCard[];
  savedAds: AdPost[];
  badges: string[];
  activityLog: { date: string; action: string; points: number }[];
  termGameHighScore: number;
}

export interface BrandCard {
  id: string;
  name: string;
  product: string;
  targetAudience: string;
  slogan: string;
  primaryColor: string;
  secondaryColor: string;
  date: string;
}

export interface AdPost {
  id: string;
  platform: "instagram" | "telegram";
  headline: string;
  body: string;
  callToAction: string;
  imageUrl: string;
  brandName: string;
  date: string;
}

export type Lang = "kk" | "ru";
export type Theme = "light" | "dark";

interface AppState {
  user: User | null;
  lang: Lang;
  theme: Theme;
  progress: StudentProgress;
  setUser: (user: User | null) => void;
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  updateProgress: (update: Partial<StudentProgress>) => void;
  addXp: (amount: number) => void;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, role: "student" | "teacher", classCode: string) => boolean;
  logout: () => void;
}

const defaultProgress: StudentProgress = {
  xp: 0,
  streak: 0,
  lastActiveDate: "",
  completedTopics: [],
  testScores: [],
  savedSlogans: [],
  savedBrands: [],
  savedAds: [],
  badges: [],
  activityLog: [],
  termGameHighScore: 0,
};

const AppContext = createContext<AppState | null>(null);

function getStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [lang, setLangState] = useState<Lang>("kk");
  const [theme, setThemeState] = useState<Theme>("light");
  const [progress, setProgress] = useState<StudentProgress>(defaultProgress);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setUserState(getStoredValue("qm_user", null));
    setLangState(getStoredValue("qm_lang", "kk"));
    setThemeState(getStoredValue("qm_theme", "light"));
    setProgress(getStoredValue("qm_progress", defaultProgress));
    setMounted(true);
  }, []);

  // Apply theme
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("qm_theme", JSON.stringify(theme));
  }, [theme, mounted]);

  const setUser = (u: User | null) => {
    setUserState(u);
    if (typeof window !== "undefined") {
      localStorage.setItem("qm_user", JSON.stringify(u));
    }
  };

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("qm_lang", JSON.stringify(l));
    }
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const updateProgress = (update: Partial<StudentProgress>) => {
    setProgress((prev) => {
      const next = { ...prev, ...update };
      if (typeof window !== "undefined") {
        localStorage.setItem("qm_progress", JSON.stringify(next));
      }
      return next;
    });
  };

  const addXp = (amount: number) => {
    setProgress((prev) => {
      const today = new Date().toISOString().split("T")[0];
      let newStreak = prev.streak;
      if (prev.lastActiveDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (prev.lastActiveDate === yesterday.toISOString().split("T")[0]) {
          newStreak = prev.streak + 1;
        } else {
          newStreak = 1;
        }
      }

      const newLog = [
        { date: new Date().toISOString(), action: `+${amount} ұпай`, points: amount },
        ...prev.activityLog.slice(0, 49),
      ];

      // Check for new badges
      const newXp = prev.xp + amount;
      const newBadges = [...prev.badges];
      if (newXp >= 100 && !newBadges.includes("first_100")) newBadges.push("first_100");
      if (newXp >= 500 && !newBadges.includes("xp_500")) newBadges.push("xp_500");
      if (newXp >= 1000 && !newBadges.includes("xp_1000")) newBadges.push("xp_1000");
      if (newStreak >= 3 && !newBadges.includes("streak_3")) newBadges.push("streak_3");
      if (newStreak >= 7 && !newBadges.includes("streak_7")) newBadges.push("streak_7");

      const next: StudentProgress = {
        ...prev,
        xp: newXp,
        streak: newStreak,
        lastActiveDate: today,
        activityLog: newLog,
        badges: newBadges,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("qm_progress", JSON.stringify(next));
      }
      return next;
    });
  };

  const login = (email: string, password: string): boolean => {
    if (typeof window === "undefined") return false;
    const usersJson = localStorage.getItem("qm_users");
    const users: (User & { password: string })[] = usersJson ? JSON.parse(usersJson) : [];
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      // Load user-specific progress
      const userProgress = getStoredValue(`qm_progress_${found.id}`, defaultProgress);
      setProgress(userProgress);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string, role: "student" | "teacher", classCode: string): boolean => {
    if (typeof window === "undefined") return false;
    const usersJson = localStorage.getItem("qm_users");
    const users: (User & { password: string })[] = usersJson ? JSON.parse(usersJson) : [];
    
    if (users.find((u) => u.email === email)) return false;

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      role,
      classCode,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("qm_users", JSON.stringify(users));
    
    const { password: _, ...userData } = newUser;
    setUser(userData);
    return true;
  };

  const logout = () => {
    // Save progress for current user
    if (user) {
      localStorage.setItem(`qm_progress_${user.id}`, JSON.stringify(progress));
    }
    setUser(null);
    setProgress(defaultProgress);
  };

  if (!mounted) {
    return <div className="min-h-screen" style={{ background: "var(--bg, #f8fafc)" }} />;
  }

  return (
    <AppContext.Provider
      value={{
        user,
        lang,
        theme,
        progress,
        setUser,
        setLang,
        setTheme,
        updateProgress,
        addXp,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
