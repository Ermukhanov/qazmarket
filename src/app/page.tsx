"use client";

import Link from "next/link";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { calculateLevel } from "@/lib/utils";
import { mockStudents } from "@/data/mock-students";
import { educationalTopics } from "@/data/topics";
import {
  Sparkles,
  BookOpen,
  Gamepad2,
  HelpCircle,
  PenTool,
  Megaphone,
  Briefcase,
  FolderHeart,
  TrendingUp,
  Flame,
  Award,
  CheckCircle2,
  Calendar as CalendarIcon,
  ArrowRight,
  ChevronRight,
  Star,
  Users,
  Compass,
} from "lucide-react";
import { useState, useEffect } from "react";
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

const progressChartData = [
  { month: "Қаң", current: 400, previous: 240 },
  { month: "Ақп", current: 650, previous: 450 },
  { month: "Нау", current: 980, previous: 700 },
  { month: "Сәу", current: 1450, previous: 1100 },
  { month: "Мам", current: 1900, previous: 1350 },
  { month: "Мау", current: 2350, previous: 1600 },
  { month: "Шіл", current: 2840, previous: 1800 },
];

export default function DashboardPage() {
  const { lang, progress, user } = useApp();
  const t = getT(lang);
  const { level, currentXp, nextLevelXp } = calculateLevel(progress.xp);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = [
    {
      id: "bilim",
      href: "/bilim",
      number: "01",
      title: t.nav.bilim,
      desc: "Теория және терминдер қоры",
      icon: BookOpen,
      color: "from-blue-500 to-indigo-600",
      accent: "#3b82f6",
      progress: Math.min(100, Math.round((progress.completedTopics.length / 5) * 100)),
      statusText: `${progress.completedTopics.length}/5 тақырып`,
    },
    {
      id: "terminder",
      href: "/terminder",
      number: "02",
      title: t.nav.terminder,
      desc: "Терминдерді сәйкестендіру ойыны",
      icon: Gamepad2,
      color: "from-purple-500 to-pink-600",
      accent: "#a855f7",
      progress: progress.termGameHighScore > 0 ? 100 : 0,
      statusText: progress.termGameHighScore > 0 ? `Рекорд: ${progress.termGameHighScore} ұпай` : "Басталмаған",
    },
    {
      id: "test",
      href: "/test",
      number: "03",
      title: t.nav.test,
      desc: "40+ сұрақтық банк және қателер",
      icon: HelpCircle,
      color: "from-amber-500 to-orange-600",
      accent: "#f59e0b",
      progress: progress.testScores.length > 0 ? 100 : 0,
      statusText: progress.testScores.length > 0 ? `${progress.testScores.length} рет тапсырылды` : "Сынақтан өт",
    },
    {
      id: "copywriter",
      href: "/copywriter",
      number: "04",
      title: t.nav.copywriter,
      desc: "5 критерийлі жарнама мәтіні",
      icon: PenTool,
      color: "from-emerald-500 to-teal-600",
      accent: "#10b981",
      progress: Math.min(100, progress.savedSlogans.length * 25),
      statusText: `${progress.savedSlogans.length} мәтін жазылды`,
    },
    {
      id: "brand",
      href: "/brand",
      number: "05",
      title: t.nav.brand,
      desc: "Бренд карточкасы мен айдентика",
      icon: Sparkles,
      color: "from-violet-500 to-purple-700",
      accent: "#8b5cf6",
      progress: progress.savedBrands.length > 0 ? 100 : 0,
      statusText: `${progress.savedBrands.length} бренд жасалды`,
    },
    {
      id: "jarname",
      href: "/jarname",
      number: "06",
      title: t.nav.jarname,
      desc: "Instagram және Telegram посты",
      icon: Megaphone,
      color: "from-cyan-500 to-blue-600",
      accent: "#06b6d4",
      progress: progress.savedAds.length > 0 ? 100 : 0,
      statusText: `${progress.savedAds.length} жарнама дайын`,
    },
    {
      id: "cases",
      href: "/cases",
      number: "07",
      title: t.nav.cases,
      desc: "10 нақты нарықтық кейс-стади",
      icon: Briefcase,
      color: "from-rose-500 to-pink-600",
      accent: "#f43f5e",
      progress: 60,
      statusText: "10 кейс қолжетімді",
    },
    {
      id: "portfolio",
      href: "/portfolio",
      number: "08",
      title: t.nav.portfolio,
      desc: "Жинақталған цифрлық портфолио",
      icon: FolderHeart,
      color: "from-indigo-500 to-sky-600",
      accent: "#6366f1",
      progress: 85,
      statusText: "PDF жүктеу дайын",
    },
  ];

  // Pie chart data for activity ring
  const activityData = [
    { name: "Білім", value: 35, color: "#8b5cf6" },
    { name: "Копирайтинг", value: 25, color: "#3b82f6" },
    { name: "Бренд", value: 20, color: "#10b981" },
    { name: "Тест", value: 20, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. HERO SECTION (As depicted in prototype) */}
      <section
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 border shadow-lg transition-all"
        style={{
          background: "var(--gradient-hero)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 bg-white/20 backdrop-blur-md border border-white/20 text-white">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.appSubtitle}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white">
            {t.dashboard.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-white/90 mb-6 font-medium leading-relaxed">
            {t.dashboard.heroDesc}
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10 mb-6 text-white">
            <h3 className="font-bold text-base sm:text-lg mb-1">{t.dashboard.heroCta}</h3>
            <p className="text-xs sm:text-sm text-white/80">{t.dashboard.heroSubtitle}</p>
            <div className="flex flex-wrap gap-2.5 mt-4">
              <Link
                href="/bilim"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-sm"
                style={{ background: "#2563eb" }}
              >
                Оқу
              </Link>
              <Link
                href="/brand"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-sm"
                style={{ background: "#059669" }}
              >
                Жасау
              </Link>
              <Link
                href="/portfolio"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-sm"
                style={{ background: "#7c3aed" }}
              >
                Даму
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div
          className="absolute right-0 bottom-0 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: "var(--gradient-primary)" }}
        />
      </section>

      {/* 2. STATS OVERVIEW CARDS (Screenshot reference style) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Points */}
        <div
          className="card p-5 rounded-2xl border transition-all hover:scale-[1.02]"
          style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium" style={{ color: "var(--muted-fg)" }}>
              {t.dashboard.stats.points}
            </span>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "color-mix(in srgb, var(--primary) 15%, transparent)",
                color: "var(--primary)",
              }}
            >
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {progress.xp}
          </div>
          <p className="text-[11px] mt-1 text-[var(--success)] font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +150 осы аптада
          </p>
        </div>

        {/* Level */}
        <div
          className="card p-5 rounded-2xl border transition-all hover:scale-[1.02]"
          style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium" style={{ color: "var(--muted-fg)" }}>
              {t.dashboard.stats.level}
            </span>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "color-mix(in srgb, var(--secondary) 15%, transparent)",
                color: "var(--secondary)",
              }}
            >
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {level}-деңгей
          </div>
          <div className="mt-2 w-full bg-[var(--muted)] h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(100, Math.round((currentXp / Math.max(1, nextLevelXp)) * 100))}%`,
                background: "var(--gradient-primary)",
              }}
            />
          </div>
        </div>

        {/* Days Streak */}
        <div
          className="card p-5 rounded-2xl border transition-all hover:scale-[1.02]"
          style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium" style={{ color: "var(--muted-fg)" }}>
              {t.dashboard.stats.streak}
            </span>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "color-mix(in srgb, var(--warning) 15%, transparent)",
                color: "var(--warning)",
              }}
            >
              <Flame className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {progress.streak} күн
          </div>
          <p className="text-[11px] mt-1" style={{ color: "var(--muted-fg)" }}>
            Үзіліссіз белсенділік
          </p>
        </div>

        {/* Completed Tasks */}
        <div
          className="card p-5 rounded-2xl border transition-all hover:scale-[1.02]"
          style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium" style={{ color: "var(--muted-fg)" }}>
              {t.dashboard.stats.completed}
            </span>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "color-mix(in srgb, var(--success) 15%, transparent)",
                color: "var(--success)",
              }}
            >
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {progress.completedTopics.length + progress.savedBrands.length + progress.savedSlogans.length}
          </div>
          <p className="text-[11px] mt-1" style={{ color: "var(--muted-fg)" }}>
            Практикалық жұмыс
          </p>
        </div>
      </section>

      {/* 3. MAIN DASHBOARD CONTENT: MODULES & CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): 8 Course Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
                {t.dashboard.myModules}
              </h2>
              <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
                Практикалық зертхананың 8 интерактивті бағыты
              </p>
            </div>
            <Link
              href="/portfolio"
              className="text-xs font-semibold flex items-center gap-1 hover:underline"
              style={{ color: "var(--primary)" }}
            >
              <span>{t.nav.portfolio}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  className="card p-5 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between group"
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110"
                        style={{ background: mod.accent }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold font-mono" style={{ color: "var(--muted-fg)" }}>
                        {mod.number}
                      </span>
                    </div>

                    <h3 className="text-base font-bold mb-1" style={{ color: "var(--fg)" }}>
                      {mod.title}
                    </h3>
                    <p className="text-xs line-clamp-2 mb-4" style={{ color: "var(--muted-fg)" }}>
                      {mod.desc}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
                      <span style={{ color: "var(--muted-fg)" }}>{mod.statusText}</span>
                      <span className="font-bold" style={{ color: "var(--fg)" }}>
                        {mod.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--muted)] h-1.5 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${mod.progress}%`, background: mod.accent }}
                      />
                    </div>

                    <Link
                      href={mod.href}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-white min-h-[44px]"
                      style={{ background: mod.accent }}
                    >
                      <span>{t.dashboard.continueLearning}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Monthly Progress Chart (Reference Recharts) */}
          <div
            className="card p-6 rounded-2xl border transition-all"
            style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold" style={{ color: "var(--fg)" }}>
                  {t.dashboard.progressTitle}
                </h3>
                <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
                  Айлар бойынша ұпайлар өсімі мен белсенділік динамикасы
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--muted)]" style={{ color: "var(--primary)" }}>
                2026 ж.
              </span>
            </div>

            <div className="h-64 w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={progressChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="var(--muted-fg)" fontSize={11} tickLine={false} />
                    <YAxis stroke="var(--muted-fg)" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        borderColor: "var(--border-color)",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="current"
                      name="Осы кезең"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorCurrent)"
                    />
                    <Area
                      type="monotone"
                      dataKey="previous"
                      name="Өткен ай"
                      stroke="#ec4899"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      fillOpacity={1}
                      fill="url(#colorPrev)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Calendar, Today's Activity Ring, Top Performers */}
        <div className="space-y-6">
          {/* Calendar Widget (As in dark reference) */}
          <div
            className="card p-6 rounded-2xl border"
            style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[var(--primary)]" />
                <h3 className="text-sm font-bold" style={{ color: "var(--fg)" }}>
                  {t.dashboard.calendarTitle}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[var(--muted)]" style={{ color: "var(--muted-fg)" }}>
                Қараша 2026
              </span>
            </div>

            {/* Simple Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
              {["Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "Жс"].map((d) => (
                <div key={d} className="py-1 text-[10px]" style={{ color: "var(--muted-fg)" }}>
                  {d}
                </div>
              ))}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                const isToday = day === 14;
                const hasActive = [2, 5, 8, 11, 12, 13, 14].includes(day);
                return (
                  <div
                    key={day}
                    className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isToday
                        ? "text-white shadow-md scale-105"
                        : hasActive
                        ? "text-[var(--primary)] bg-[var(--muted)]"
                        : "hover:bg-[var(--muted)]"
                    }`}
                    style={{
                      background: isToday ? "var(--gradient-primary)" : undefined,
                      color: isToday ? "white" : undefined,
                    }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Today's Activity Ring (Semi-circle gauge as in screenshot) */}
          <div
            className="card p-6 rounded-2xl border"
            style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
          >
            <h3 className="text-sm font-bold mb-1" style={{ color: "var(--fg)" }}>
              {t.dashboard.weeklyActivity}
            </h3>
            <p className="text-xs mb-4" style={{ color: "var(--muted-fg)" }}>
              Тапсырмалар үлесі
            </p>

            <div className="h-44 w-full flex items-center justify-center relative">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={activityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {activityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold" style={{ color: "var(--fg)" }}>
                  100%
                </span>
                <span className="text-[10px]" style={{ color: "var(--muted-fg)" }}>
                  Белсенділік
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-medium pt-2 border-t" style={{ borderColor: "var(--border-color)" }}>
              {activityData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                  <span className="truncate" style={{ color: "var(--muted-fg)" }}>
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers Leaderboard (As in screenshot) */}
          <div
            className="card p-6 rounded-2xl border"
            style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[var(--warning)]" />
                <h3 className="text-sm font-bold" style={{ color: "var(--fg)" }}>
                  {t.dashboard.topStudents}
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--muted)]" style={{ color: "var(--muted-fg)" }}>
                10-сынып
              </span>
            </div>

            <div className="space-y-3">
              {mockStudents.slice(0, 5).map((student, idx) => (
                <div key={student.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-[var(--muted)] transition-colors">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        idx === 0
                          ? "bg-amber-400 text-black"
                          : idx === 1
                          ? "bg-slate-300 text-black"
                          : idx === 2
                          ? "bg-amber-700 text-white"
                          : "text-[var(--muted-fg)]"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: "var(--fg)" }}>
                        {student.name}
                      </p>
                      <p className="text-[10px]" style={{ color: "var(--muted-fg)" }}>
                        {student.completedTopicsCount} тақырып • {student.streak} күн серия
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold" style={{ color: "var(--primary)" }}>
                    {student.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
