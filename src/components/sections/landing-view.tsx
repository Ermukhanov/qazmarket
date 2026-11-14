"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  PenTool,
  Share2,
  Search,
  Gamepad2,
  FolderKanban,
  Trophy,
  CheckCircle2,
  GraduationCap,
  FileText,
  Users,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useApp } from "@/store/app-context";
import { translations } from "@/lib/i18n";

export function LandingView() {
  const { lang } = useApp();
  const t = translations[lang] || translations.kk;

  const modules = [
    { num: "01", title: "Білім алаңы", desc: "Теория және терминдер", icon: BookOpen, color: "from-blue-500 to-indigo-600", link: "/bilim" },
    { num: "02", title: "Жарнама студиясы", desc: "Мәтін және ұран", icon: PenTool, color: "from-purple-500 to-pink-600", link: "/studio" },
    { num: "03", title: "Бренд зертханасы", desc: "Атау және бренд", icon: Sparkles, color: "from-pink-500 to-rose-600", link: "/brand" },
    { num: "04", title: "SMM орталығы", desc: "Әлеуметтік желі", icon: Share2, color: "from-violet-500 to-purple-600", link: "/smm" },
    { num: "05", title: "SEO шеберханасы", desc: "Іздеу және кілтсөз", icon: Search, color: "from-sky-500 to-cyan-600", link: "/seo" },
    { num: "06", title: "Маркетинг ойыны", desc: "Тапсырмалар мен тест", icon: Gamepad2, color: "from-amber-500 to-orange-600", link: "/game" },
    { num: "07", title: "Жоба портфолиосы", desc: "Оқушы жұмыстары", icon: FolderKanban, color: "from-emerald-500 to-teal-600", link: "/portfolio" },
    { num: "08", title: "Жетістік алаңы", desc: "Ұпай және марапат", icon: Trophy, color: "from-yellow-500 to-amber-600", link: "/achievements" },
  ];

  return (
    <div className="space-y-16 md:space-y-24 max-w-7xl mx-auto">
      {/* ===== HERO SECTION (Reference: Lower Right Soft Gradient Style) ===== */}
      <section className="relative rounded-3xl p-6 md:p-14 overflow-hidden border border-[var(--border-color)] bg-gradient-to-br from-purple-50 via-sky-50 to-amber-50 dark:from-[#181534] dark:via-[#131f42] dark:to-[#1b1738] shadow-xl">
        {/* Soft background glow circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/80 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>{t.landing.heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {t.landing.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium max-w-2xl">
              {t.landing.heroSubtitle}
            </p>

            {/* Slogan Pill */}
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-purple-900/30 border border-purple-200/80 dark:border-purple-700/50 backdrop-blur-md">
              <p className="text-xs uppercase font-extrabold tracking-wider text-purple-600 dark:text-purple-400">
                Платформа ұраны:
              </p>
              <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white mt-0.5">
                «{t.slogan}»
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/login"
                className="btn btn-primary text-sm md:text-base px-6 py-3 rounded-2xl font-bold shadow-lg shadow-purple-600/30 flex items-center gap-2.5"
              >
                <span>{t.landing.enterBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#modules"
                className="btn btn-secondary text-sm md:text-base px-6 py-3 rounded-2xl font-bold border border-slate-300 dark:border-slate-700 hover:bg-white/50 dark:hover:bg-slate-800/50"
              >
                {t.landing.exploreBtn}
              </a>
            </div>
          </div>

          {/* Right Floating Showcase Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm space-y-4">
              {/* Card 1: Brand preview */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1a1735] border border-purple-100 dark:border-purple-900/50 shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      QR
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Qazaq Republic</div>
                      <div className="text-[10px] text-slate-500">Бренд төлқұжаты</div>
                    </div>
                  </div>
                  <span className="badge bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px]">
                    100% мақұлданды
                  </span>
                </div>
                <p className="text-xs italic text-slate-600 dark:text-slate-300 mt-2.5">
                  «Дала рухының заманауи көрінісі — қазақша ойла, биікке ұмтыл!»
                </p>
              </div>

              {/* Card 2: Slogan validator criteria */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wide">Ұран сапасы</span>
                  <span className="text-sm font-black">5 / 5 критерий</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>3–6 сөз</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Төл әріптер</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Бренд бар</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>CTA / Ритм</span>
                  </div>
                </div>
              </div>

              {/* Card 3: SMM Post mockup pill */}
              <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-[#15122c] border border-blue-100 dark:border-blue-900/50 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-500 flex items-center justify-center font-bold">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Instagram / TikTok SMM</div>
                    <div className="text-[10px] text-slate-500">Автоматты мокап жасау</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">+50 XP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8 MODULES GRID (Official Structure) ===== */}
      <section id="modules" className="space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
            Оқу бағдарламасы
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--fg)]">
            {t.landing.modulesTitle}
          </h2>
          <p className="text-sm md:text-base text-[var(--muted-fg)]">
            {t.landing.modulesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.num}
                href={m.link}
                className="card card-interactive group flex flex-col justify-between p-6 rounded-2xl border transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black text-[var(--muted-fg)] group-hover:text-purple-400 transition-colors">
                      {m.num}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[var(--fg)] group-hover:text-purple-400 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs text-[var(--muted-fg)] mt-1 font-medium">
                      {m.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
                  <span>Модульге өту</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== HOW IT WORKS (3 Steps) ===== */}
      <section className="card p-8 md:p-12 rounded-3xl space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
            Жұмыс алгоритмі
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]">
            {t.landing.howItWorksTitle}
          </h2>
          <p className="text-xs md:text-sm text-[var(--muted-fg)]">
            {t.landing.howItWorksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black text-base">
              1
            </div>
            <h4 className="text-base font-bold text-[var(--fg)]">{t.landing.step1Title}</h4>
            <p className="text-xs text-[var(--muted-fg)] leading-relaxed">{t.landing.step1Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-base">
              2
            </div>
            <h4 className="text-base font-bold text-[var(--fg)]">{t.landing.step2Title}</h4>
            <p className="text-xs text-[var(--muted-fg)] leading-relaxed">{t.landing.step2Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-base">
              3
            </div>
            <h4 className="text-base font-bold text-[var(--fg)]">{t.landing.step3Title}</h4>
            <p className="text-xs text-[var(--muted-fg)] leading-relaxed">{t.landing.step3Desc}</p>
          </div>
        </div>
      </section>

      {/* ===== TEACHER & METHODOLOGY BLOCK ===== */}
      <section className="rounded-3xl p-8 md:p-12 border border-blue-500/20 bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-purple-900/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400">
              <GraduationCap className="w-4 h-4" />
              <span>Оқытушыларға арналған кешенді құралдар</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]">
              {t.landing.teachersSectionTitle}
            </h2>

            <p className="text-sm text-[var(--muted-fg)] leading-relaxed max-w-2xl">
              {t.landing.teachersSectionDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--fg)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.landing.teachersFeature1}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--fg)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.landing.teachersFeature2}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--fg)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.landing.teachersFeature3}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <Link
              href="/teacher"
              className="btn btn-primary px-6 py-3.5 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-2"
            >
              <span>{t.landing.teachersBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-6 rounded-2xl text-center space-y-1">
          <div className="text-3xl md:text-4xl font-extrabold text-purple-400">17</div>
          <div className="text-xs text-[var(--muted-fg)] font-semibold">{t.landing.stat1Label}</div>
        </div>
        <div className="card p-6 rounded-2xl text-center space-y-1">
          <div className="text-3xl md:text-4xl font-extrabold text-blue-400">65+</div>
          <div className="text-xs text-[var(--muted-fg)] font-semibold">{t.landing.stat2Label}</div>
        </div>
        <div className="card p-6 rounded-2xl text-center space-y-1">
          <div className="text-3xl md:text-4xl font-extrabold text-pink-400">35+</div>
          <div className="text-xs text-[var(--muted-fg)] font-semibold">{t.landing.stat3Label}</div>
        </div>
        <div className="card p-6 rounded-2xl text-center space-y-1">
          <div className="text-3xl md:text-4xl font-extrabold text-emerald-400">10</div>
          <div className="text-xs text-[var(--muted-fg)] font-semibold">{t.landing.stat4Label}</div>
        </div>
      </section>

      {/* ===== AUTHOR & FOOTER ===== */}
      <footer className="pt-8 pb-12 border-t border-[var(--border-color)] text-left space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-[var(--fg)]">{t.appName}</span>
              <span className="text-xs text-[var(--muted-fg)]">— {t.appSubtitle}</span>
            </div>
            <p className="text-xs text-[var(--muted-fg)] mt-1">
              {t.landing.authorTitle}: <strong className="text-[var(--fg)]">{t.landing.authorName}</strong>, {t.landing.authorSchool}.
            </p>
          </div>

          <div className="text-xs text-[var(--muted-fg)]">
            © 2026 QAZMARKET. Барлық құқықтар қорғалған.
          </div>
        </div>
      </footer>
    </div>
  );
}
