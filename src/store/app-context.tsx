"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  classCode: string;
  avatar?: string;
  school?: string;
  createdAt: string;
}

export interface BrandCard {
  id: string;
  name: string;
  product: string;
  targetAudience: string;
  slogan: string;
  primaryColor: string;
  secondaryColor: string;
  logoIcon?: string;
  mission?: string;
  date: string;
}

export interface AdPost {
  id: string;
  platform: "instagram" | "story" | "tiktok" | "facebook";
  brandName: string;
  headline: string;
  body: string;
  hashtags: string;
  callToAction: string;
  imageUrl?: string;
  date: string;
}

export interface AdText6 {
  id: string;
  headline: string;
  targetAudience: string;
  benefits: string;
  callToAction: string;
  deadline: string;
  contacts: string;
  brandName: string;
  date: string;
}

export interface SeoProject {
  id: string;
  brandName: string;
  pageTitle: string;
  metaDescription: string;
  urlSlug: string;
  keywords: string[];
  score: number;
  date: string;
}

export interface LessonSubmission {
  lessonId: string;
  lessonNumber: number;
  lessonTitle: string;
  submittedAt: string;
  taskAnswers: {
    taskId: string;
    taskTitle: string;
    answerText: string;
    achievedDescriptors: string[];
    score: number;
  }[];
  reflection: {
    method: string;
    text: string;
    rating?: string;
  };
  xpEarned: number;
}

export interface StudentProgress {
  xp: number;
  streak: number;
  lastActiveDate: string;
  completedTopics: string[];
  completedLessons: string[];
  lessonSubmissions: LessonSubmission[];
  testScores: { testId: string; score: number; total: number; date: string }[];
  savedSlogans: { id: string; text: string; brandName: string; score: number; date: string }[];
  savedBrands: BrandCard[];
  savedPosts: AdPost[];
  savedAdTexts: AdText6[];
  savedSeoProjects: SeoProject[];
  badges: string[];
  activityLog: { date: string; action: string; points: number }[];
  termGameHighScore: number;
}

export type Lang = "kk" | "ru";
export type Theme = "light" | "dark";

export interface AdminSettings {
  aiChatEnabled: boolean;
  aiDailyLimit: number;
}

interface AppState {
  user: User | null;
  lang: Lang;
  theme: Theme;
  progress: StudentProgress;
  adminSettings: AdminSettings;
  setUser: (user: User | null) => void;
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  updateProgress: (update: Partial<StudentProgress>) => void;
  addXp: (amount: number, reason?: string) => void;
  saveBrand: (brand: Omit<BrandCard, "id" | "date">) => void;
  savePost: (post: Omit<AdPost, "id" | "date">) => void;
  saveAdText: (adText: Omit<AdText6, "id" | "date">) => void;
  saveSeoProject: (project: Omit<SeoProject, "id" | "date">) => void;
  saveSlogan: (text: string, brandName: string, score: number) => void;
  saveLessonSubmission: (submission: LessonSubmission) => void;
  unlockBadge: (badgeId: string) => void;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;
  login: (email: string, password: string, role?: "student" | "teacher" | "admin") => boolean;
  register: (name: string, email: string, password: string, role: "student" | "teacher" | "admin", classCode: string) => boolean;
  logout: () => void;
}

const defaultProgress: StudentProgress = {
  xp: 0,
  streak: 0,
  lastActiveDate: "",
  completedTopics: [],
  completedLessons: [],
  lessonSubmissions: [],
  testScores: [],
  savedSlogans: [],
  savedBrands: [],
  savedPosts: [],
  savedAdTexts: [],
  savedSeoProjects: [],
  badges: [],
  activityLog: [],
  termGameHighScore: 0,
};

const defaultAdminSettings: AdminSettings = {
  aiChatEnabled: true,
  aiDailyLimit: 25,
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLangState] = useState<Lang>("kk");
  const [theme, setThemeState] = useState<Theme>("light");
  const [progress, setProgress] = useState<StudentProgress>(defaultProgress);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(defaultAdminSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedUserStr = localStorage.getItem("qazmarket_user");
      const savedLang = localStorage.getItem("qazmarket_lang") as Lang | null;
      const savedTheme = localStorage.getItem("qazmarket_theme") as Theme | null;
      const savedAdmin = localStorage.getItem("qazmarket_admin_settings");

      let loadedUser: User | null = null;
      if (savedUserStr) {
        loadedUser = JSON.parse(savedUserStr);
        setUser(loadedUser);
      } else {
        setUser(null);
      }

      if (savedLang && (savedLang === "kk" || savedLang === "ru")) setLangState(savedLang);
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        setThemeState(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }

      // Load user-specific progress or default 0 XP
      if (loadedUser?.email) {
        const savedProgress = localStorage.getItem(`qazmarket_progress_${loadedUser.email.toLowerCase()}`) || localStorage.getItem("qazmarket_progress");
        if (savedProgress) setProgress(JSON.parse(savedProgress));
      } else {
        setProgress(defaultProgress);
      }

      if (savedAdmin) setAdminSettings(JSON.parse(savedAdmin));
    } catch (e) {
      console.error("Failed to load state from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (user) {
        localStorage.setItem("qazmarket_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("qazmarket_user");
      }
    } catch (e) {
      console.error(e);
    }
  }, [user, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (user?.email) {
        localStorage.setItem(`qazmarket_progress_${user.email.toLowerCase()}`, JSON.stringify(progress));
      }
    } catch (e) {
      console.error(e);
    }
  }, [progress, user, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("qazmarket_admin_settings", JSON.stringify(adminSettings));
    } catch (e) {
      console.error(e);
    }
  }, [adminSettings, isLoaded]);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("qazmarket_lang", newLang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("qazmarket_theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const updateProgress = (update: Partial<StudentProgress>) => {
    setProgress((prev) => ({ ...prev, ...update }));
  };

  const addXp = (amount: number, reason: string = "Тапсырма орындалды") => {
    // Only authenticated users can earn and accumulate real XP!
    if (!user) return;

    setProgress((prev) => {
      const newXp = prev.xp + amount;
      const today = new Date().toISOString().split("T")[0];
      const newActivity = [
        { date: today, action: reason, points: amount },
        ...(prev.activityLog || []),
      ].slice(0, 20);

      // Streak check
      let newStreak = prev.streak;
      if (prev.lastActiveDate !== today) {
        newStreak = prev.streak + 1;
      }

      // Check for level badges
      const newBadges = [...prev.badges];
      if (newXp >= 100 && !newBadges.includes("badge_first_100")) newBadges.push("badge_first_100");
      if (newXp >= 500 && !newBadges.includes("badge_pro_500")) newBadges.push("badge_pro_500");
      if (newStreak >= 3 && !newBadges.includes("badge_streak_3")) newBadges.push("badge_streak_3");

      return {
        ...prev,
        xp: newXp,
        streak: newStreak,
        lastActiveDate: today,
        badges: newBadges,
        activityLog: newActivity,
      };
    });
  };

  const saveBrand = (brandData: Omit<BrandCard, "id" | "date">) => {
    if (!user) return;
    const newBrand: BrandCard = {
      ...brandData,
      id: "brand_" + Date.now(),
      date: new Date().toISOString().split("T")[0],
    };
    setProgress((prev) => {
      const newBadges = [...prev.badges];
      if (!newBadges.includes("badge_brand_creator")) newBadges.push("badge_brand_creator");
      return {
        ...prev,
        savedBrands: [newBrand, ...prev.savedBrands],
        badges: newBadges,
      };
    });
    addXp(60, `«${brandData.name}» бренді жасалды`);
  };

  const savePost = (postData: Omit<AdPost, "id" | "date">) => {
    if (!user) return;
    const newPost: AdPost = {
      ...postData,
      id: "post_" + Date.now(),
      date: new Date().toISOString().split("T")[0],
    };
    setProgress((prev) => {
      const newBadges = [...prev.badges];
      if (!newBadges.includes("badge_smm_pro")) newBadges.push("badge_smm_pro");
      return {
        ...prev,
        savedPosts: [newPost, ...prev.savedPosts],
        badges: newBadges,
      };
    });
    addXp(50, `SMM посты (${postData.platform}) жарияланды`);
  };

  const saveAdText = (adTextData: Omit<AdText6, "id" | "date">) => {
    if (!user) return;
    const newAdText: AdText6 = {
      ...adTextData,
      id: "adtext_" + Date.now(),
      date: new Date().toISOString().split("T")[0],
    };
    setProgress((prev) => {
      const newBadges = [...prev.badges];
      if (!newBadges.includes("badge_copywriter")) newBadges.push("badge_copywriter");
      return {
        ...prev,
        savedAdTexts: [newAdText, ...(prev.savedAdTexts || [])],
        badges: newBadges,
      };
    });
    addXp(45, `Жарнамалық мәтін (${adTextData.headline}) сақталды`);
  };

  const saveSeoProject = (seoData: Omit<SeoProject, "id" | "date">) => {
    if (!user) return;
    const newProject: SeoProject = {
      ...seoData,
      id: "seo_" + Date.now(),
      date: new Date().toISOString().split("T")[0],
    };
    setProgress((prev) => {
      const newBadges = [...prev.badges];
      if (!newBadges.includes("badge_seo_master")) newBadges.push("badge_seo_master");
      return {
        ...prev,
        savedSeoProjects: [newProject, ...(prev.savedSeoProjects || [])],
        badges: newBadges,
      };
    });
    addXp(55, `SEO жобасы (${seoData.brandName}) оңтайландырылды`);
  };

  const saveSlogan = (text: string, brandName: string, score: number) => {
    if (!user) return;
    const newSlogan = {
      id: "slogan_" + Date.now(),
      text,
      brandName,
      score,
      date: new Date().toISOString().split("T")[0],
    };
    setProgress((prev) => {
      const newBadges = [...prev.badges];
      if (!newBadges.includes("badge_slogan_maker")) newBadges.push("badge_slogan_maker");
      return {
        ...prev,
        savedSlogans: [newSlogan, ...prev.savedSlogans],
        badges: newBadges,
      };
    });
    addXp(35, `«${text}» ұраны сақталды`);
  };

  const saveLessonSubmission = (submission: LessonSubmission) => {
    if (!user) return;
    setProgress((prev) => {
      const existingSubs = prev.lessonSubmissions || [];
      const updatedSubs = [submission, ...existingSubs.filter((s) => s.lessonId !== submission.lessonId)];
      const completed = prev.completedLessons || [];
      const updatedCompleted = completed.includes(submission.lessonId)
        ? completed
        : [...completed, submission.lessonId];

      const newBadges = [...prev.badges];
      if (updatedCompleted.length >= 1 && !newBadges.includes("badge_first_lesson")) {
        newBadges.push("badge_first_lesson");
      }
      if (updatedCompleted.length >= 17 && !newBadges.includes("badge_course_complete")) {
        newBadges.push("badge_course_complete");
      }

      return {
        ...prev,
        lessonSubmissions: updatedSubs,
        completedLessons: updatedCompleted,
        badges: newBadges,
      };
    });
    addXp(submission.xpEarned, `«${submission.lessonTitle}» сабағы аяқталды`);
  };

  const unlockBadge = (badgeId: string) => {
    if (!user) return;
    setProgress((prev) => {
      if (prev.badges.includes(badgeId)) return prev;
      return { ...prev, badges: [...prev.badges, badgeId] };
    });
  };

  const updateAdminSettings = (settings: Partial<AdminSettings>) => {
    setAdminSettings((prev) => ({ ...prev, ...settings }));
  };

  const login = (email: string, _password: string, overrideRole?: "student" | "teacher" | "admin"): boolean => {
    if (!email) return false;
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user was registered previously in localStorage
    let savedUsers: Record<string, { name: string; role: "student" | "teacher" | "admin"; classCode: string }> = {};
    try {
      savedUsers = JSON.parse(localStorage.getItem("qazmarket_users_db") || "{}");
    } catch (e) {
      console.error(e);
    }

    const existing = savedUsers[normalizedEmail];
    let role: "student" | "teacher" | "admin" = existing?.role || overrideRole || (normalizedEmail.includes("teacher") ? "teacher" : "student");
    let name = existing?.name;

    if (!name) {
      if (normalizedEmail.includes("teacher")) {
        name = "Сарсенова Ақкүміс Піржанқызы";
      } else {
        // Derive clean name from email handle (e.g. "aidar.serik" -> "Айдар Серік")
        const handle = normalizedEmail.split("@")[0].replace(/[._-]/g, " ");
        name = handle.charAt(0).toUpperCase() + handle.slice(1);
      }
    }

    const loggedUser: User = {
      id: "usr_" + Date.now(),
      name,
      email: normalizedEmail,
      role,
      classCode: existing?.classCode || "10A-MARKET",
      school: "№6 Хромтау гимназиясы",
      createdAt: new Date().toISOString(),
    };

    // Load their specific progress or clean start
    try {
      const userProgressStr = localStorage.getItem(`qazmarket_progress_${normalizedEmail}`);
      if (userProgressStr) {
        setProgress(JSON.parse(userProgressStr));
      } else {
        setProgress(defaultProgress);
      }
    } catch (e) {
      setProgress(defaultProgress);
    }

    setUser(loggedUser);
    return true;
  };

  const register = (
    name: string,
    email: string,
    _password: string,
    role: "student" | "teacher" | "admin",
    classCode: string
  ): boolean => {
    const normalizedEmail = email.trim().toLowerCase();
    const newUser: User = {
      id: "usr_" + Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      role,
      classCode: (classCode || "10A-MARKET").toUpperCase(),
      school: "№6 Хромтау гимназиясы",
      createdAt: new Date().toISOString(),
    };

    // Save into registered users database in localStorage
    try {
      const savedUsers = JSON.parse(localStorage.getItem("qazmarket_users_db") || "{}");
      savedUsers[normalizedEmail] = {
        name: newUser.name,
        role: newUser.role,
        classCode: newUser.classCode,
      };
      localStorage.setItem("qazmarket_users_db", JSON.stringify(savedUsers));
    } catch (e) {
      console.error(e);
    }

    // Fresh progress for newly registered user (0 XP)
    setProgress(defaultProgress);
    try {
      localStorage.setItem(`qazmarket_progress_${normalizedEmail}`, JSON.stringify(defaultProgress));
    } catch (e) {
      console.error(e);
    }

    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setProgress(defaultProgress);
    try {
      localStorage.removeItem("qazmarket_user");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        lang,
        theme,
        progress,
        adminSettings,
        setUser,
        setLang,
        setTheme,
        updateProgress,
        addXp,
        saveBrand,
        savePost,
        saveAdText,
        saveSeoProject,
        saveSlogan,
        saveLessonSubmission,
        unlockBadge,
        updateAdminSettings,
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
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
