"use client";

import { useRef, useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { mockStudents } from "@/data/mock-students";
import { calculateLevel } from "@/lib/utils";
import {
  Trophy,
  Award,
  Flame,
  Sparkles,
  Download,
  Printer,
  CheckCircle2,
  Lock,
  Medal,
  Star,
  GraduationCap,
} from "lucide-react";

export default function AchievementsPage() {
  const { lang, user, progress } = useApp();
  const t = getT(lang);
  const certRef = useRef<HTMLDivElement>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const levelInfo = calculateLevel(progress.xp);

  const allBadges = [
    {
      id: "badge_slogan_maker",
      name: "Сөз шебері",
      desc: "5 қатаң критерий бойынша қазақша ұран жазды",
      icon: "🎯",
      unlocked: progress.savedSlogans?.length > 0 || progress.badges?.includes("badge_slogan_maker"),
    },
    {
      id: "badge_brand_creator",
      name: "Бренд архитекторы",
      desc: "Төлқұжаты мен логотипі бар бренд карточкасын жасады",
      icon: "✨",
      unlocked: progress.savedBrands?.length > 0 || progress.badges?.includes("badge_brand_creator"),
    },
    {
      id: "badge_smm_pro",
      name: "SMM жұлдызы",
      desc: "Instagram/TikTok желісіне визуалды жарнамалық пост жариялады",
      icon: "📱",
      unlocked: progress.savedPosts?.length > 0 || progress.badges?.includes("badge_smm_pro"),
    },
    {
      id: "badge_seo_master",
      name: "SEO сарапшысы",
      desc: "Іздеу жүйесі үшін мета-тегтер мен кілтсөздерді оңтайландырды",
      icon: "🔍",
      unlocked: progress.savedSeoProjects?.length > 0 || progress.badges?.includes("badge_seo_master"),
    },
    {
      id: "badge_test_ace",
      name: "Тест үздігі",
      desc: "Маркетингтік сұрақтар банкінен кемінде 1 тест сәтті тапсырды",
      icon: "🏆",
      unlocked: progress.testScores?.length > 0 || progress.badges?.includes("badge_test_ace"),
    },
    {
      id: "badge_case_solver",
      name: "Кейс сарапшысы",
      desc: "Отандық нарықтағы нақты маркетингтік кейсті талдады",
      icon: "💼",
      unlocked: progress.xp >= 150 || progress.badges?.includes("badge_case_solver"),
    },
    {
      id: "badge_streak_3",
      name: "Үздіксіз серпін",
      desc: "Платформада қатарынан 3 күн үздіксіз белсенділік танытты",
      icon: "🔥",
      unlocked: progress.streak >= 3 || progress.badges?.includes("badge_streak_3"),
    },
    {
      id: "badge_marketing_leader",
      name: "Маркетинг көшбасшысы",
      desc: "Барлық практикалық тапсырмаларды орындап, 300+ XP жинады",
      icon: "👑",
      unlocked: progress.xp >= 300 || progress.badges?.includes("badge_marketing_leader"),
    },
  ];

  const handlePrintCertificate = () => {
    window.print();
  };

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

      {/* Progress & Level Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* XP Card */}
        <div className="card p-6 rounded-3xl border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
              {t.dashboard.stats.points}
            </span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-purple-400">
            {progress.xp} <span className="text-sm font-normal text-[var(--muted-fg)]">XP</span>
          </div>
          <p className="text-xs text-[var(--muted-fg)]">
            {progress.xp > 0 ? "Тапсырмалар арқылы жиналған тәжірибе" : "Әзірге ұпай жиналмаған"}
          </p>
        </div>

        {/* Level Card */}
        <div className="card p-6 rounded-3xl border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
              {t.dashboard.stats.level}
            </span>
            <Award className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-blue-400">
            {levelInfo.level} <span className="text-sm font-normal text-[var(--muted-fg)]">-деңгей</span>
          </div>
          <p className="text-xs text-blue-300 font-bold truncate">
            {levelInfo.title}
          </p>
        </div>

        {/* Streak Card */}
        <div className="card p-6 rounded-3xl border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
              {t.dashboard.stats.streak}
            </span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-amber-400">
            {progress.streak} <span className="text-sm font-normal text-[var(--muted-fg)]">күн</span>
          </div>
          <p className="text-xs text-[var(--muted-fg)]">
            {progress.streak > 0 ? "Үздіксіз білім алу сериясы" : "Бүгін белсенділік танытыңыз"}
          </p>
        </div>
      </div>

      {/* Badges Collection (8 badges) */}
      <div className="card p-6 md:p-8 rounded-3xl border space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[var(--fg)] flex items-center gap-2">
              <Medal className="w-5 h-5 text-amber-400" />
              <span>{t.achievements.badgesTitle} (8 бейдж)</span>
            </h3>
            <p className="text-xs text-[var(--muted-fg)] mt-0.5">
              Әрбір маркетингтік бөлімде тапсырмаларды орындап, барлық бейдждерді жинаңыз
            </p>
          </div>
          <span className="text-xs font-extrabold px-3 py-1 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/20">
            {allBadges.filter((b) => b.unlocked).length} / 8 ашылды
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all ${
                badge.unlocked
                  ? "bg-[var(--card-subtle)] border-purple-500/30 shadow-md"
                  : "bg-[var(--card)] border-[var(--border-color)] opacity-50 grayscale"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{badge.icon}</span>
                {badge.unlocked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-4 h-4 text-[var(--muted-fg)]" />
                )}
              </div>
              <h4 className="text-sm font-bold text-[var(--fg)]">{badge.name}</h4>
              <p className="text-[11px] text-[var(--muted-fg)] mt-1 leading-snug">
                {badge.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard & Certificate Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Class Leaderboard (7 cols) */}
        <div className="lg:col-span-7 card p-6 rounded-3xl border space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
            <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>{t.achievements.leaderboardTitle}</span>
            </h3>
            <span className="text-xs font-bold text-purple-400">10A-MARKET</span>
          </div>

          <div className="space-y-2">
            {mockStudents.slice(0, 8).map((st, i) => (
              <div
                key={st.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)] text-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full font-black text-xs flex items-center justify-center ${
                      i === 0
                        ? "bg-amber-400 text-slate-900"
                        : i === 1
                        ? "bg-slate-300 text-slate-900"
                        : i === 2
                        ? "bg-amber-700 text-white"
                        : "bg-[var(--muted)] text-[var(--muted-fg)]"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-bold text-[var(--fg)]">{st.name}</div>
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

        {/* Certificate Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="card p-6 rounded-3xl border space-y-5 bg-gradient-to-br from-purple-900/10 via-[var(--card)] to-blue-900/10">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 mx-auto flex items-center justify-center font-black shadow-lg">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[var(--fg)]">
                {t.achievements.certificateTitle}
              </h3>
              <p className="text-xs text-[var(--muted-fg)]">
                «Маркетингтегі қазақ тілі» курсын табысты аяқтағанын растайтын ресми цифрлық сертификат
              </p>
            </div>

            <div className="pt-2 border-t border-[var(--border-color)]">
              <button
                onClick={() => setShowCertificate(!showCertificate)}
                className="btn btn-primary w-full py-3 rounded-2xl text-xs font-bold shadow-md flex items-center justify-center gap-2"
              >
                <span>{showCertificate ? "Сертификатты жабу" : "Сертификатты қарау"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Official Certificate Modal / Preview */}
      {showCertificate && (
        <div className="card p-8 md:p-12 rounded-3xl border-4 border-amber-400/50 bg-gradient-to-br from-white via-amber-50/20 to-white dark:from-[#15122c] dark:via-[#1c183b] dark:to-[#120f26] shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-amber-400/30">
            <div className="text-xs text-left font-bold text-amber-500">
              «№ 6 Хромтау гимназиясы» КММ
            </div>
            <div className="text-xs font-bold text-amber-500">
              QAZMARKET 2026
            </div>
          </div>

          <div className="space-y-3 py-4">
            <div className="text-xs uppercase font-extrabold tracking-widest text-amber-500">
              СЕРТИФИКАТ
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]">
              {user?.name || "Әлихан Нұрланұлы"}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-fg)] max-w-xl mx-auto leading-relaxed">
              «Маркетингтегі қазақ тілі» 10-сыныпқа арналған авторлық элективті білім беру бағдарламасын табысты меңгеріп, жеке маркетингтік цифрлық портфолиосын қорғағаны үшін берілді.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-amber-400/30 text-xs">
            <div className="text-left space-y-1">
              <div className="font-bold text-[var(--fg)]">Сарсенова Ақкүміс Піржанқызы</div>
              <div className="text-[10px] text-[var(--muted-fg)]">Бағдарлама авторы, педагог-сарапшы</div>
            </div>
            <div className="text-right space-y-1">
              <div className="font-bold text-[var(--fg)]">{progress.xp} XP жиналды</div>
              <div className="text-[10px] text-emerald-400 font-bold">Табысты аяқталды ✓</div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-3 no-print">
            <button
              onClick={handlePrintCertificate}
              className="btn btn-primary text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-2"
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
