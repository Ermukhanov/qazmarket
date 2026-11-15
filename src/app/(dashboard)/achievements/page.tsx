"use client";

import { useRef, useState, useMemo } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { getDynamicClassLeaderboard } from "@/lib/students-service";
import { calculateLevel } from "@/lib/utils";
import {
  Trophy,
  Award,
  Flame,
  Sparkles,
  Printer,
  CheckCircle2,
  Lock,
  Medal,
  Star,
  GraduationCap,
  ChevronRight,
  ShieldCheck,
  Crown,
} from "lucide-react";

export default function AchievementsPage() {
  const { lang, user, progress } = useApp();
  const t = getT(lang);
  const certRef = useRef<HTMLDivElement>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [badgeFilter, setBadgeFilter] = useState<"all" | "unlocked" | "locked">("all");

  const levelInfo = calculateLevel(progress.xp);
  const progressPercent = Math.min(100, Math.round((levelInfo.currentXp / levelInfo.nextLevelXp) * 100));

  const allBadges = [
    {
      id: "badge_slogan_maker",
      name: "Сөз шебері",
      desc: "5 қатаң критерий бойынша қазақша ұран жазды",
      icon: "🎯",
      rarity: "Күміс",
      rarityColor: "from-sky-500 to-blue-600",
      unlocked: (progress.savedSlogans?.length || 0) > 0 || progress.badges?.includes("badge_slogan_maker"),
    },
    {
      id: "badge_brand_creator",
      name: "Бренд архитекторы",
      desc: "Төлқұжаты мен логотипі бар бренд карточкасын жасады",
      icon: "✨",
      rarity: "Алтын",
      rarityColor: "from-amber-400 to-orange-500",
      unlocked: (progress.savedBrands?.length || 0) > 0 || progress.badges?.includes("badge_brand_creator"),
    },
    {
      id: "badge_smm_pro",
      name: "SMM жұлдызы",
      desc: "Instagram/TikTok желісіне визуалды жарнамалық пост жариялады",
      icon: "📱",
      rarity: "Күміс",
      rarityColor: "from-purple-500 to-pink-500",
      unlocked: (progress.savedPosts?.length || 0) > 0 || progress.badges?.includes("badge_smm_pro"),
    },
    {
      id: "badge_seo_master",
      name: "SEO сарапшысы",
      desc: "Іздеу жүйесі үшін мета-тегтер мен кілтсөздерді оңтайландырды",
      icon: "🔍",
      rarity: "Қола",
      rarityColor: "from-cyan-500 to-teal-500",
      unlocked: (progress.savedSeoProjects?.length || 0) > 0 || progress.badges?.includes("badge_seo_master"),
    },
    {
      id: "badge_test_ace",
      name: "Тест үздігі",
      desc: "Маркетингтік сұрақтар банкінен кемінде 1 тест сәтті тапсырды",
      icon: "🏆",
      rarity: "Алтын",
      rarityColor: "from-amber-400 to-yellow-500",
      unlocked: (progress.testScores?.length || 0) > 0 || progress.badges?.includes("badge_test_ace"),
    },
    {
      id: "badge_case_solver",
      name: "Кейс сарапшысы",
      desc: "Отандық нарықтағы нақты маркетингтік кейсті талдады",
      icon: "💼",
      rarity: "Аңыз",
      rarityColor: "from-emerald-400 to-teal-600",
      unlocked: progress.xp >= 150 || progress.badges?.includes("badge_case_solver"),
    },
    {
      id: "badge_streak_3",
      name: "Үздіксіз серпін",
      desc: "Платформада қатарынан 3 күн үздіксіз белсенділік танытты",
      icon: "🔥",
      rarity: "Күміс",
      rarityColor: "from-orange-500 to-red-500",
      unlocked: progress.streak >= 3 || progress.badges?.includes("badge_streak_3"),
    },
    {
      id: "badge_marketing_leader",
      name: "Маркетинг көшбасшысы",
      desc: "Барлық практикалық тапсырмаларды орындап, 300+ XP жинады",
      icon: "👑",
      rarity: "Аңыз",
      rarityColor: "from-purple-600 to-indigo-600",
      unlocked: progress.xp >= 300 || progress.badges?.includes("badge_marketing_leader"),
    },
  ];

  const filteredBadges = allBadges.filter((b) => {
    if (badgeFilter === "unlocked") return b.unlocked;
    if (badgeFilter === "locked") return !b.unlocked;
    return true;
  });

  const handlePrintCertificate = () => {
    window.print();
  };

  const allClassStudents = useMemo(() => {
    return getDynamicClassLeaderboard(user, progress);
  }, [user, progress]);

  const topThree = allClassStudents.slice(0, 3);
  const remainingStudents = allClassStudents.slice(3, 10);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20 mb-2">
          <Trophy className="w-3.5 h-3.5" />
          <span>08. Жетістік алаңы</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]">
          {t.achievements.title}
        </h1>
        <p className="text-xs md:text-sm text-[var(--muted-fg)] mt-1">
          {t.achievements.subtitle}
        </p>
      </div>

      {/* Level Progress Banner */}
      <div className="card p-6 md:p-8 rounded-3xl border bg-gradient-to-br from-purple-950/20 via-[var(--card)] to-blue-950/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xl font-black shadow-lg">
              {levelInfo.level}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-[var(--fg)]">
                  {levelInfo.level}-деңгей: {levelInfo.title}
                </h3>
                <span className="badge bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px]">
                  Белсенді
                </span>
              </div>
              <p className="text-xs text-[var(--muted-fg)] mt-0.5">
                Келесі деңгейге дейін: <strong className="text-purple-400">{levelInfo.nextLevelXp - levelInfo.currentXp} XP</strong> қалды
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-2xl sm:text-3xl font-black text-purple-400">{progress.xp} XP</div>
            <div className="text-[11px] text-[var(--muted-fg)]">Жалпы жиналған ұпай</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-[var(--muted-fg)]">{levelInfo.currentXp} XP</span>
            <span className="text-purple-400">{progressPercent}%</span>
            <span className="text-[var(--muted-fg)]">{levelInfo.nextLevelXp} XP</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[var(--muted)] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 transition-all duration-700 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3 Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {/* Stat 1: Total XP */}
        <div className="card p-5 rounded-2xl border flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-wider">
              {t.dashboard.stats.points}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">
              {progress.xp} <span className="text-xs font-normal text-[var(--muted-fg)]">XP</span>
            </div>
            <p className="text-[11px] text-[var(--muted-fg)]">
              {progress.xp > 0 ? "Тапсырмалар нәтижесі" : "Әзірге ұпай жоқ"}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 2: Level Rank */}
        <div className="card p-5 rounded-2xl border flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-wider">
              {t.dashboard.stats.level}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-blue-400">
              {levelInfo.level} <span className="text-xs font-normal text-[var(--muted-fg)]">-саты</span>
            </div>
            <p className="text-[11px] text-blue-300 font-bold truncate max-w-[140px]">
              {levelInfo.title}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 3: Streak */}
        <div className="card p-5 rounded-2xl border flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-wider">
              {t.dashboard.stats.streak}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              {progress.streak} <span className="text-xs font-normal text-[var(--muted-fg)]">күн</span>
            </div>
            <p className="text-[11px] text-[var(--muted-fg)]">
              {progress.streak > 0 ? "Үздіксіз серия" : "Бүгін белсенділік бастаңыз"}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Badges Collection Section */}
      <div className="card p-6 md:p-8 rounded-3xl border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-[var(--fg)] flex items-center gap-2">
              <Medal className="w-5 h-5 text-amber-400" />
              <span>{t.achievements.badgesTitle} (8 бейдж)</span>
            </h3>
            <p className="text-xs text-[var(--muted-fg)] mt-0.5">
              Әр маркетингтік бағытта жоба жасап, барлық марапаттарды жинаңыз
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <button
              onClick={() => setBadgeFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                badgeFilter === "all"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-[var(--card-subtle)] text-[var(--muted-fg)] hover:text-[var(--fg)]"
              }`}
            >
              Барлығы ({allBadges.length})
            </button>
            <button
              onClick={() => setBadgeFilter("unlocked")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                badgeFilter === "unlocked"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-[var(--card-subtle)] text-[var(--muted-fg)] hover:text-[var(--fg)]"
              }`}
            >
              Ашылған ({allBadges.filter((b) => b.unlocked).length})
            </button>
            <button
              onClick={() => setBadgeFilter("locked")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                badgeFilter === "locked"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-[var(--card-subtle)] text-[var(--muted-fg)] hover:text-[var(--fg)]"
              }`}
            >
              Құлыпталған ({allBadges.filter((b) => !b.unlocked).length})
            </button>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                badge.unlocked
                  ? "bg-gradient-to-br from-[var(--card)] to-[var(--card-subtle)] border-purple-500/40 shadow-lg shadow-purple-900/10 hover:scale-[1.02]"
                  : "bg-[var(--card)] border-[var(--border-color)] opacity-50 grayscale"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{badge.icon}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[var(--muted)] text-[var(--muted-fg)]">
                      {badge.rarity}
                    </span>
                    {badge.unlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-[var(--muted-fg)]" />
                    )}
                  </div>
                </div>

                <h4 className="text-sm font-bold text-[var(--fg)]">{badge.name}</h4>
                <p className="text-[11px] text-[var(--muted-fg)] mt-1 leading-snug">
                  {badge.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-[10px] font-bold">
                {badge.unlocked ? (
                  <span className="text-emerald-400 font-extrabold">✓ Қол жеткізілді</span>
                ) : (
                  <span className="text-[var(--muted-fg)]">Тапсырманы орындап ашыңыз</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard & Certificate Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Class Leaderboard with Podium (7 cols) */}
        <div className="lg:col-span-7 card p-6 rounded-3xl border space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
            <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>{t.achievements.leaderboardTitle}</span>
            </h3>
            <span className="text-xs font-bold text-purple-400">10A-MARKET</span>
          </div>

          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
            {/* 2nd Place */}
            {topThree[1] && (
              <div className={`p-3 rounded-2xl flex flex-col items-center justify-between space-y-1 ${
                topThree[1].isCurrentUser
                  ? "bg-blue-500/20 border-2 border-blue-400 shadow-md shadow-blue-500/20"
                  : "bg-slate-800/40 border border-slate-600/40"
              }`}>
                <span className="text-xl">🥈</span>
                <div className="text-[11px] font-bold text-[var(--fg)] truncate max-w-[80px]">
                  {topThree[1].name.split(" ")[0]} {topThree[1].isCurrentUser ? "★" : ""}
                </div>
                <div className="text-[10px] text-purple-400 font-extrabold">{topThree[1].points} XP</div>
                <span className="text-[9px] text-[var(--muted-fg)]">
                  {topThree[1].isCurrentUser ? "Сіз (2-орын)" : "2-орын"}
                </span>
              </div>
            )}

            {/* 1st Place (Gold) */}
            {topThree[0] && (
              <div className={`p-3.5 rounded-2xl flex flex-col items-center justify-between space-y-1 -translate-y-2 ${
                topThree[0].isCurrentUser
                  ? "bg-amber-500/25 border-2 border-amber-300 ring-2 ring-blue-500 shadow-lg shadow-amber-500/30"
                  : "bg-amber-500/15 border-2 border-amber-400/60 shadow-md shadow-amber-500/20"
              }`}>
                <Crown className="w-6 h-6 text-amber-400" />
                <div className="text-xs font-black text-[var(--fg)] truncate max-w-[90px]">
                  {topThree[0].name.split(" ")[0]} {topThree[0].isCurrentUser ? "★" : ""}
                </div>
                <div className="text-xs text-amber-400 font-black">{topThree[0].points} XP</div>
                <span className="text-[10px] font-bold text-amber-400">
                  {topThree[0].isCurrentUser ? "🥇 Сіз (Үздік!)" : "🥇 Үздік"}
                </span>
              </div>
            )}

            {/* 3rd Place */}
            {topThree[2] && (
              <div className={`p-3 rounded-2xl flex flex-col items-center justify-between space-y-1 ${
                topThree[2].isCurrentUser
                  ? "bg-blue-500/20 border-2 border-blue-400 shadow-md shadow-blue-500/20"
                  : "bg-amber-900/20 border border-amber-700/40"
              }`}>
                <span className="text-xl">🥉</span>
                <div className="text-[11px] font-bold text-[var(--fg)] truncate max-w-[80px]">
                  {topThree[2].name.split(" ")[0]} {topThree[2].isCurrentUser ? "★" : ""}
                </div>
                <div className="text-[10px] text-purple-400 font-extrabold">{topThree[2].points} XP</div>
                <span className="text-[9px] text-[var(--muted-fg)]">
                  {topThree[2].isCurrentUser ? "Сіз (3-орын)" : "3-орын"}
                </span>
              </div>
            )}
          </div>

          {/* Remaining Student Rows */}
          <div className="space-y-2 pt-2">
            {remainingStudents.map((st, i) => (
              <div
                key={st.id}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-colors ${
                  st.isCurrentUser
                    ? "bg-blue-500/15 border-blue-500/50 shadow-sm"
                    : "bg-[var(--card-subtle)] border-[var(--border-color)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center ${
                    st.isCurrentUser
                      ? "bg-blue-500 text-white"
                      : "bg-[var(--muted)] text-[var(--muted-fg)]"
                  }`}>
                    {st.rank || i + 4}
                  </span>
                  <div>
                    <div className="font-bold text-[var(--fg)] flex items-center gap-1.5">
                      <span>{st.name}</span>
                      {st.isCurrentUser && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-[#1E5BF0] text-white">
                          Сіз
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-[var(--muted-fg)]">{st.completedTasks} тапсырма орындалды</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-purple-400">{st.points} XP</div>
                  <div className="text-[10px] text-[var(--muted-fg)]">{st.level}-деңгей</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Certificate Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="card p-6 md:p-8 rounded-3xl border space-y-5 bg-gradient-to-br from-amber-950/15 via-[var(--card)] to-purple-950/15">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 mx-auto flex items-center justify-center font-black shadow-lg">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[var(--fg)]">
                {t.achievements.certificateTitle}
              </h3>
              <p className="text-xs text-[var(--muted-fg)] leading-relaxed">
                «Маркетингтегі қазақ тілі» курсын меңгергенін растайтын ресми цифрлық сертификат
              </p>
            </div>

            <div className="pt-2 border-t border-[var(--border-color)]">
              <button
                onClick={() => setShowCertificate(!showCertificate)}
                className="btn btn-primary w-full py-3 rounded-2xl text-xs font-bold shadow-md flex items-center justify-center gap-2"
              >
                <span>{showCertificate ? "Сертификатты жасыру" : "Сертификатты ашу және басып шығару"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deluxe Official Certificate Preview */}
      {showCertificate && (
        <div
          ref={certRef}
          className="card p-8 md:p-14 rounded-3xl border-4 border-amber-400/60 bg-gradient-to-br from-white via-amber-50/20 to-white dark:from-[#171b38] dark:via-[#1f2650] dark:to-[#151934] shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200 relative overflow-hidden"
        >
          {/* Ornamental corner accents */}
          <div className="absolute top-3 left-3 text-amber-500/40 text-2xl font-serif select-none">⚜</div>
          <div className="absolute top-3 right-3 text-amber-500/40 text-2xl font-serif select-none">⚜</div>
          <div className="absolute bottom-3 left-3 text-amber-500/40 text-2xl font-serif select-none">⚜</div>
          <div className="absolute bottom-3 right-3 text-amber-500/40 text-2xl font-serif select-none">⚜</div>

          <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b-2 border-amber-400/40 gap-2">
            <div className="text-xs font-extrabold text-amber-500 uppercase tracking-wider">
              «№ 6 Хромтау гимназиясы» КММ
            </div>
            <div className="text-xs font-extrabold text-amber-500 tracking-wider">
              QAZMARKET 2026
            </div>
          </div>

          <div className="space-y-4 py-4">
            <div className="inline-block px-4 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs uppercase font-black tracking-widest border border-amber-500/40">
              СЕРТИФИКАТ
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[var(--fg)] tracking-tight">
              {user?.name || (lang === "ru" ? "Юный маркетолог" : "Жас маркетолог")}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-fg)] max-w-xl mx-auto leading-relaxed font-medium">
              «Маркетингтегі қазақ тілі» 10-сыныпқа арналған авторлық элективті білім беру бағдарламасын табысты меңгеріп, жеке маркетингтік цифрлық портфолиосын толық қорғағаны үшін берілді.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t-2 border-amber-400/40 text-xs">
            <div className="text-left space-y-1">
              <div className="font-extrabold text-[var(--fg)]">Сарсенова Ақкүміс Піржанқызы</div>
              <div className="text-[10px] text-[var(--muted-fg)]">Бағдарлама авторы, педагог-сарапшы</div>
            </div>
            <div className="text-left sm:text-right space-y-1">
              <div className="font-extrabold text-amber-400">{progress.xp} XP жиналды</div>
              <div className="text-[10px] text-emerald-400 font-bold">Табысты меңгерілді ✓</div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 no-print">
            <button
              onClick={handlePrintCertificate}
              className="btn btn-primary text-xs px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30"
            >
              <Printer className="w-4 h-4" />
              <span>Сертификатты басып шығару (Печать)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
