"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  BookOpen,
  PenTool,
  Share2,
  Search,
  Gamepad2,
  FolderKanban,
  ArrowRight,
  ChevronRight,
  Calendar as CalendarIcon,
  Activity,
  Award,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useApp } from "@/store/app-context";
import { translations } from "@/lib/i18n";
import { mockStudents } from "@/data/mock-students";
import { calculateLevel } from "@/lib/utils";

export function StudentDashboard() {
  const { lang, user, progress } = useApp();
  const t = translations[lang] || translations.kk;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLevelInfo = calculateLevel(progress.xp);

  // 8 Main Modules with real progress
  const modules = [
    {
      id: "01",
      title: "01. Білім алаңы",
      desc: "Теория және терминдер қоры",
      href: "/bilim",
      icon: BookOpen,
      color: "from-blue-600 to-indigo-600",
      progress: Math.min(100, Math.round(((progress.completedTopics?.length || 0) / 17) * 100)),
      total: "17 тақырып",
      tag: "Оқу",
    },
    {
      id: "02",
      title: "02. Жарнама студиясы",
      desc: "5 критерийлі ұрандар мен мәтіндер",
      href: "/studio",
      icon: PenTool,
      color: "from-purple-600 to-pink-600",
      progress: Math.min(100, (progress.savedSlogans?.length || 0) * 20),
      total: `${progress.savedSlogans?.length || 0} ұран`,
      tag: "Жазу",
    },
    {
      id: "03",
      title: "03. Бренд зертханасы",
      desc: "Бренд төлқұжаты мен логотип",
      href: "/brand",
      icon: Sparkles,
      color: "from-pink-600 to-rose-600",
      progress: Math.min(100, (progress.savedBrands?.length || 0) * 33),
      total: `${progress.savedBrands?.length || 0} бренд`,
      tag: "Дизайн",
    },
    {
      id: "04",
      title: "04. SMM орталығы",
      desc: "Instagram/TikTok посттары",
      href: "/smm",
      icon: Share2,
      color: "from-violet-600 to-purple-600",
      progress: Math.min(100, (progress.savedPosts?.length || 0) * 25),
      total: `${progress.savedPosts?.length || 0} пост`,
      tag: "SMM",
    },
    {
      id: "05",
      title: "05. SEO шеберханасы",
      desc: "Іздеу нәтижесін оңтайландыру",
      href: "/seo",
      icon: Search,
      color: "from-sky-600 to-cyan-600",
      progress: Math.min(100, (progress.savedSeoProjects?.length || 0) * 33),
      total: `${progress.savedSeoProjects?.length || 0} жоба`,
      tag: "SEO",
    },
    {
      id: "06",
      title: "06. Маркетинг ойыны",
      desc: "65+ тест сұрағы, терминдер, кейстер",
      href: "/game",
      icon: Gamepad2,
      color: "from-amber-600 to-orange-600",
      progress: Math.min(100, (progress.testScores?.length || 0) * 20),
      total: `${progress.testScores?.length || 0} тест тапсырылды`,
      tag: "Ойын",
    },
    {
      id: "07",
      title: "07. Жоба портфолиосы",
      desc: "Оқушының цифрлық портфолиосы",
      href: "/portfolio",
      icon: FolderKanban,
      color: "from-emerald-600 to-teal-600",
      progress: Math.min(100, ((progress.savedBrands?.length || 0) + (progress.savedSlogans?.length || 0)) * 15),
      total: "PDF экспорт",
      tag: "Қоржын",
    },
    {
      id: "08",
      title: "08. Жетістік алаңы",
      desc: "Бейдждер, ұпайлар, сертификат",
      href: "/achievements",
      icon: Trophy,
      color: "from-yellow-600 to-amber-600",
      progress: Math.min(100, (progress.badges?.length || 0) * 12),
      total: `${progress.badges?.length || 0} бейдж`,
      tag: "Марапат",
    },
  ];

  // Recharts Monthly Progress Data (real progression based on user.xp)
  const monthlyChartData = useMemo(() => {
    const currentXp = progress.xp || 0;
    if (currentXp === 0) {
      return [
        { name: "Қыр", xp: 0, target: 150 },
        { name: "Қаз", xp: 0, target: 300 },
        { name: "Қар", xp: 0, target: 450 },
        { name: "Жел", xp: 0, target: 600 },
        { name: "Қаң", xp: 0, target: 750 },
        { name: "Ақп", xp: 0, target: 900 },
      ];
    }

    // Proportional breakdown leading up to current accumulated XP
    const prevNov = currentXp;
    const prevOct = Math.round(currentXp * 0.6);
    const prevSep = Math.round(currentXp * 0.25);
    return [
      { name: "Қыр", xp: prevSep, target: 150 },
      { name: "Қаз", xp: prevOct, target: 300 },
      { name: "Қар", xp: prevNov, target: 450 },
      { name: "Жел", xp: Math.round(prevNov * 1.3), target: 600 },
      { name: "Қаң", xp: Math.round(prevNov * 1.6), target: 750 },
      { name: "Ақп", xp: Math.round(prevNov * 2.0), target: 900 },
    ];
  }, [progress.xp]);

  // Activity Gauge Data (strictly real count)
  const completedCount =
    (progress.completedLessons?.length || 0) +
    (progress.completedTopics?.length || 0) +
    (progress.savedBrands?.length || 0) +
    (progress.savedSlogans?.length || 0) +
    (progress.savedPosts?.length || 0) +
    (progress.savedSeoProjects?.length || 0) +
    (progress.testScores?.length || 0);

  const activityPercent = Math.min(100, Math.round((completedCount / 17) * 100));

  const pieData = activityPercent === 0
    ? [
        { name: "Орындалған", value: 0 },
        { name: "Қалғаны", value: 100 },
      ]
    : [
        { name: "Орындалған", value: activityPercent },
        { name: "Қалғаны", value: 100 - activityPercent },
      ];
  const pieColors = activityPercent === 0 ? ["#334155", "#1e293b"] : ["#8b5cf6", "#242048"];

  const topStudents = mockStudents.slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ===== HERO GREETING (Modern Royal Blue Card) ===== */}
      <div className="relative rounded-3xl p-6 md:p-8 overflow-hidden border border-blue-200 dark:border-slate-800 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-white dark:to-[#161B38] shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-[#1E5BF0] border border-blue-200 dark:border-blue-900">
              <Sparkles className="w-3.5 h-3.5" />
              <span>«Маркетингтегі қазақ тілі» зертханасы</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.dashboard.greeting}, {user?.name || "Оқушы"}! 👋
            </h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 max-w-xl font-medium">
              {t.dashboard.welcomeBack}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/bilim"
              className="btn btn-primary px-6 py-3 rounded-2xl text-xs md:text-sm font-extrabold shadow-md shadow-blue-500/25 flex items-center gap-2"
            >
              <span>01 модульді бастау</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ===== 4 STATS CARDS (Real dynamic data) ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Stat 1: Total Points */}
        <div className="card p-5 rounded-2xl flex items-center justify-between border">
          <div className="space-y-1">
            <div className="text-xs text-[var(--muted-fg)] font-semibold">{t.dashboard.stats.points}</div>
            <div className="text-2xl md:text-3xl font-extrabold text-purple-400">
              {progress.xp} <span className="text-xs text-[var(--muted-fg)] font-normal">{t.dashboard.stats.pointsUnit}</span>
            </div>
            <div className="text-[11px] text-[var(--muted-fg)]">
              {progress.xp > 0 ? `+${progress.xp} жиналды` : t.dashboard.stats.emptyPoints}
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 2: Mastery Level */}
        <div className="card p-5 rounded-2xl flex items-center justify-between border">
          <div className="space-y-1">
            <div className="text-xs text-[var(--muted-fg)] font-semibold">{t.dashboard.stats.level}</div>
            <div className="text-2xl md:text-3xl font-extrabold text-blue-400">
              {currentLevelInfo.level}
              <span className="text-xs text-[var(--muted-fg)] font-normal ml-1">{t.dashboard.stats.levelSuffix}</span>
            </div>
            <div className="text-[11px] text-[var(--muted-fg)] font-medium truncate max-w-[140px]">
              {currentLevelInfo.title}
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 3: Streak */}
        <div className="card p-5 rounded-2xl flex items-center justify-between border">
          <div className="space-y-1">
            <div className="text-xs text-[var(--muted-fg)] font-semibold">{t.dashboard.stats.streak}</div>
            <div className="text-2xl md:text-3xl font-extrabold text-amber-400">
              {progress.streak} <span className="text-xs text-[var(--muted-fg)] font-normal">{t.dashboard.stats.days}</span>
            </div>
            <div className="text-[11px] text-[var(--muted-fg)]">
              {progress.streak > 0 ? "Үздіксіз белсенділік" : t.dashboard.stats.emptyStreak}
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 4: Completed Tasks */}
        <div className="card p-5 rounded-2xl flex items-center justify-between border">
          <div className="space-y-1">
            <div className="text-xs text-[var(--muted-fg)] font-semibold">{t.dashboard.stats.completedTasks}</div>
            <div className="text-2xl md:text-3xl font-extrabold text-emerald-400">
              {completedCount} <span className="text-xs text-[var(--muted-fg)] font-normal">{t.dashboard.tasksUnit}</span>
            </div>
            <div className="text-[11px] text-[var(--muted-fg)]">
              {completedCount > 0 ? "Практикалық нәтижелер" : "Тапсырмалар әлі басталмаған"}
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ===== 8 MAIN MODULES (Grid) ===== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[var(--fg)]">
              {t.dashboard.modulesTitle}
            </h2>
            <p className="text-xs md:text-sm text-[var(--muted-fg)]">
              {t.dashboard.modulesSubtitle}
            </p>
          </div>
          <Link
            href="/portfolio"
            className="text-xs md:text-sm font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            <span>Портфолио</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.id}
                href={m.href}
                className="card card-interactive p-5 rounded-2xl border flex flex-col justify-between group transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-fg)]">
                      {m.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[var(--fg)] group-hover:text-purple-400 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-[11px] text-[var(--muted-fg)] mt-0.5 line-clamp-1">
                      {m.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-color)] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[var(--muted-fg)]">{m.total}</span>
                    <span className="text-purple-400">{m.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ===== CHARTS & CALENDAR ROW ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Progress Curve Chart (8 cols) */}
        <div className="lg:col-span-8 card p-6 rounded-2xl border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span>{t.dashboard.monthlyProgressTitle}</span>
              </h3>
              <p className="text-xs text-[var(--muted-fg)]">Айлар бойынша XP өсімі</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/20">
              10-сынып курсы
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyChartData}>
                  <defs>
                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      borderColor: "var(--border-color)",
                      borderRadius: "12px",
                      color: "var(--fg)",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="xp" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" name="Сіздің ұпайыңыз" />
                  <Area type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={1} strokeDasharray="3 3" fill="none" name="Жоспар" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xs text-[var(--muted-fg)]">
                Жүктелуде...
              </div>
            )}
          </div>
        </div>

        {/* Activity & Calendar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Activity Gauge */}
          <div className="card p-5 rounded-2xl border text-center space-y-3">
            <div className="text-xs font-bold text-[var(--fg)] uppercase tracking-wider">
              {t.dashboard.activityTitle}
            </div>

            <div className="h-36 relative flex items-center justify-center">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={46}
                      outerRadius={62}
                      startAngle={180}
                      endAngle={0}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : null}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center">
                <span className="text-2xl font-black text-[var(--fg)]">{activityPercent}%</span>
                <p className="text-[10px] text-[var(--muted-fg)]">Орындалуы</p>
              </div>
            </div>

            <div className="text-[11px] text-[var(--muted-fg)]">
              {completedCount > 0
                ? `${completedCount} тапсырма сәтті аяқталды`
                : t.dashboard.emptyActivity}
            </div>
          </div>

          {/* Top Performers */}
          <div className="card p-5 rounded-2xl border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--fg)]">
                {t.dashboard.topPerformersTitle}
              </span>
              <span className="text-[10px] text-purple-400 font-bold">10A сынып</span>
            </div>

            <div className="space-y-2">
              {topStudents.map((st, i) => (
                <div key={st.id} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-[10px]">
                      {i + 1}
                    </span>
                    <span className="text-[var(--fg)] font-medium truncate max-w-[120px]">{st.name}</span>
                  </div>
                  <span className="font-bold text-purple-400">{st.points} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
