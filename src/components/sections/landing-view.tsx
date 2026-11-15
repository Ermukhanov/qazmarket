"use client";

import Link from "next/link";
import {
  GraduationCap,
  Play,
  ArrowDown,
  ArrowRight,
  ChevronRight,
  BookOpen,
  PenTool,
  Sparkles,
  Share2,
  Search,
  Gamepad2,
  FolderKanban,
  Trophy,
  Users,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  Building2,
  Star,
  Send,
  Youtube,
  Github,
  Globe,
  Compass,
} from "lucide-react";
import { useApp } from "@/store/app-context";
import { translations } from "@/lib/i18n";

export function LandingView() {
  const { lang, setLang } = useApp();
  const isKz = lang === "kk";

  const modules = [
    {
      num: "01",
      title: isKz ? "Білім алаңы" : "Теория маркетинга",
      desc: isKz ? "17 сабақ теориясы мен терминдер қоры" : "Теория 17 уроков и словарь терминов",
      icon: BookOpen,
      iconBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
      link: "/bilim",
    },
    {
      num: "02",
      title: isKz ? "Жарнама студиясы" : "Студия рекламы",
      desc: isKz ? "5 қатаң критерийлі ұрандар мен мәтіндер" : "Слоганы по 5 критериям и текст рекламы",
      icon: PenTool,
      iconBg: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
      link: "/studio",
    },
    {
      num: "03",
      title: isKz ? "Бренд зертханасы" : "Лаборатория бренда",
      desc: isKz ? "Бренд төлқұжаты, нейминг және түстер" : "Паспорт бренда, нейминг и цвета",
      icon: Sparkles,
      iconBg: "bg-pink-50 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
      link: "/brand",
    },
    {
      num: "04",
      title: isKz ? "SMM орталығы" : "SMM Центр",
      desc: isKz ? "Instagram / TikTok телефон мокаптары" : "Мокапы для Instagram и TikTok",
      icon: Share2,
      iconBg: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
      link: "/smm",
    },
    {
      num: "05",
      title: isKz ? "SEO шеберханасы" : "SEO Мастерская",
      desc: isKz ? "SERP симуляторы және қазақша кілтсөздер" : "SERP симулятор и казахские ключи",
      icon: Search,
      iconBg: "bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400",
      link: "/seo",
    },
    {
      num: "06",
      title: isKz ? "Маркетинг ойыны" : "Маркетинг игра",
      desc: isKz ? "65+ тест сұрақтары, терминдер, кейстер" : "Банк из 65+ тестов, термины, кейсы",
      icon: Gamepad2,
      iconBg: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
      link: "/game",
    },
    {
      num: "07",
      title: isKz ? "Жоба портфолиосы" : "Портфолио проектов",
      desc: isKz ? "Оқушының цифрлық портфолиосы, PDF" : "Цифровое портфолио ученика, экспорт в PDF",
      icon: FolderKanban,
      iconBg: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
      link: "/portfolio",
    },
    {
      num: "08",
      title: isKz ? "Жетістік алаңы" : "Арена достижений",
      desc: isKz ? "Ұпайлар, 8 бейдж, ресми сертификат" : "Баллы, 8 бейджей, сертификат",
      icon: Trophy,
      iconBg: "bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
      link: "/achievements",
    },
  ];

  return (
    <div className="space-y-10 md:space-y-16 max-w-7xl mx-auto pb-12 font-sans">
      {/* ===== 1. TOP NAVBAR (Matching Reference Screenshot) ===== */}
      <nav className="bg-white dark:bg-[#161B38] rounded-2xl border border-slate-200 dark:border-slate-800 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-sm">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#1E5BF0] flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
            QAZMARKET
          </span>
        </Link>

        {/* Center: Navigation Pills */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#1E5BF0] font-extrabold"
          >
            {isKz ? "Басты бет" : "Главная"}
          </Link>
          <Link
            href="/bilim"
            className="px-4 py-2 rounded-xl hover:text-[#1E5BF0] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {isKz ? "Курстар" : "Курсы"}
          </Link>
          <Link
            href="/game"
            className="px-4 py-2 rounded-xl hover:text-[#1E5BF0] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {isKz ? "Тесттер" : "Тесты"}
          </Link>
          <Link
            href="/studio"
            className="px-4 py-2 rounded-xl hover:text-[#1E5BF0] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {isKz ? "Тапсырмалар" : "Задания"}
          </Link>
          <Link
            href="/portfolio"
            className="px-4 py-2 rounded-xl hover:text-[#1E5BF0] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {isKz ? "Портфолио" : "Портфолио"}
          </Link>
          <a
            href="#modules"
            className="px-4 py-2 rounded-xl hover:text-[#1E5BF0] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {isKz ? "Платформа туралы" : "О платформе"}
          </a>
        </div>

        {/* Right: Search, Auth buttons & Lang Switch */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Lang Toggle */}
          <button
            onClick={() => setLang(isKz ? "ru" : "kk")}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-[#1E5BF0] transition-colors uppercase"
            title="Тілді ауыстыру"
          >
            {lang}
          </button>

          {/* Search button */}
          <Link
            href="/bilim"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-[#1E5BF0] transition-colors hidden sm:flex items-center justify-center"
            aria-label="Іздеу"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* Login Outline Button */}
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl border border-blue-200 dark:border-blue-900 text-[#1E5BF0] hover:bg-blue-50 dark:hover:bg-blue-950 font-bold text-xs sm:text-sm transition-all"
          >
            {isKz ? "Кіру" : "Войти"}
          </Link>

          {/* Register Solid Blue Button */}
          <Link
            href="/login?tab=register"
            className="px-4 sm:px-5 py-2 rounded-xl bg-[#1E5BF0] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            <span>{isKz ? "Тіркелу" : "Регистрация"}</span>
          </Link>
        </div>
      </nav>

      {/* ===== 2. HERO SECTION (1:1 Layout with Screenshot) ===== */}
      <section className="relative rounded-3xl p-6 sm:p-10 md:p-14 overflow-hidden bg-gradient-to-br from-[#EBF2FE] via-[#F5F8FF] to-[#E8F0FE] dark:from-[#171B38] dark:via-[#1B2144] dark:to-[#151934] border border-blue-100 dark:border-slate-800 shadow-sm">
        {/* Soft background glow circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-300/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-300/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top School Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/90 dark:bg-blue-950/80 text-[#1E5BF0] border border-blue-200 dark:border-blue-800 shadow-xs">
              <Building2 className="w-3.5 h-3.5" />
              <span>
                {isKz
                  ? "«№ 6 Хромтау гимназиясы» • Білім беру платформасы"
                  : "Aqbobek Lyceum • Образовательная платформа"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.18]">
              {isKz ? (
                <>
                  QAZMARKET — <br />
                  <span className="text-slate-900 dark:text-white">Білім мен үлкен</span> <br />
                  <span className="text-[#1E5BF0]">мүмкіндіктерге</span> бастар жолың
                </>
              ) : (
                <>
                  QAZMARKET — <br />
                  Твой путь к знаниям <br />
                  и большим возможностям
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl">
              {isKz
                ? "«Қазақша ойла. Креативті жаса. Нарықта таныт!» Үйрен. Дамы. Бізбен бірге табысқа жет!"
                : "Учись. Развивайся. Достигай успеха вместе с нами! Практический маркетинг на казахском языке."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/login?tab=register"
                className="px-6 py-3.5 rounded-2xl bg-[#1E5BF0] hover:bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/30 flex items-center gap-2.5 transition-all active:scale-95"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>{isKz ? "Оқуды бастау" : "Начать обучение"}</span>
              </Link>

              <a
                href="#modules"
                className="px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-sm flex items-center gap-2 transition-all shadow-xs"
              >
                <span>{isKz ? "Толығырақ білу" : "Узнать больше"}</span>
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Illustration Card (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md p-6 rounded-3xl bg-white/80 dark:bg-[#161B38]/80 border border-blue-100 dark:border-blue-900/40 backdrop-blur-md shadow-xl text-center space-y-4">
              {/* Graphic Elements */}
              <div className="flex items-center justify-between text-xs px-2">
                {/* Checklist badge */}
                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center gap-2 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#1E5BF0]" />
                  <div className="text-left">
                    <div className="font-extrabold text-slate-900 dark:text-white">17 сабақ</div>
                    <div className="text-[10px] text-slate-500">Толық ҚМЖ</div>
                  </div>
                </div>

                {/* Growth Chart Badge */}
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center gap-2 shadow-xs">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                  <div className="text-left">
                    <div className="font-extrabold text-slate-900 dark:text-white">XP Рейтинг</div>
                    <div className="text-[10px] text-slate-500">5 деңгей</div>
                  </div>
                </div>
              </div>

              {/* Student Avatar Illustration */}
              <div className="relative py-4">
                <div className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-br from-[#1E5BF0] via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/30">
                  <GraduationCap className="w-16 h-16" />
                </div>
                <div className="mt-3">
                  <span className="font-black text-slate-900 dark:text-white text-base">
                    10-сынып оқушысы
                  </span>
                  <p className="text-xs text-slate-500 font-semibold">
                    «Маркетингтегі қазақ тілі» курсы
                  </p>
                </div>
              </div>

              {/* Bottom Feature Pill */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    Жеке цифрлық портфолио
                  </span>
                </div>
                <span className="text-[#1E5BF0] font-black">100% практика</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. STATS BAR (Floating White Card with Dividers) ===== */}
      <section className="bg-white dark:bg-[#161B38] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
          {/* Stat 1 */}
          <div className="flex items-center gap-4 lg:px-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-[#1E5BF0] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">500+</div>
              <div className="text-xs text-slate-500 font-semibold">
                {isKz ? "Белсенді оқушылар" : "Активных учеников"}
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-4 lg:px-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-[#1E5BF0] flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">8</div>
              <div className="text-xs text-slate-500 font-semibold">
                {isKz ? "Білім беру бөлімдері" : "Образовательных разделов"}
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-4 lg:px-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-[#1E5BF0] flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">100%</div>
              <div className="text-xs text-slate-500 font-semibold">
                {isKz ? "Үлгерімді бақылау мүмкіндігі" : "Возможность отслеживать прогресс"}
              </div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-4 lg:px-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-500 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                {isKz ? "Сенің табысың" : "Твой успех"}
              </div>
              <div className="text-xs text-slate-500 font-semibold">
                {isKz ? "сенімді қолда!" : "в наших руках!"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. SECTIONS GRID (Наши разделы + Начни путь к успеху) ===== */}
      <section id="modules" className="space-y-6 scroll-mt-24">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isKz ? "Біздің бағыттар" : "Наши разделы"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isKz
                ? "Жан-жақты дамуға арналған 8 негізгі практикалық бағыт"
                : "8 ключевых направлений для всестороннего развития"}
            </p>
          </div>

          <Link
            href="/bilim"
            className="text-xs sm:text-sm font-bold text-[#1E5BF0] hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>{isKz ? "Барлық бөлімдер" : "Все разделы"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Directions + Promo Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 8 Modules (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.num}
                  href={m.link}
                  className="p-4 rounded-2xl bg-white dark:bg-[#161B38] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 flex items-center justify-between group transition-all shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-11 h-11 rounded-xl ${m.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-[#1E5BF0] transition-colors truncate">
                        {m.title}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                        {m.desc}
                      </div>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-[#1E5BF0] group-hover:bg-blue-50 transition-colors shrink-0 ml-2">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right Promo Card (4 cols, 1:1 like screenshot trophy card!) */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-amber-50/40 dark:from-[#171B38] dark:via-[#1B2144] dark:to-[#171B38] border-2 border-blue-200 dark:border-blue-900/60 shadow-lg text-center space-y-5">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-3xl shadow-xl shadow-amber-500/25">
              🏆
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {isKz ? "Табысқа бастар жолыңды баста!" : "Начни свой путь к успеху!"}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {isKz
                  ? "Бүгіннен бастап QAZMARKET-ке қосылып, өз брендің мен слоганыңды жаса!"
                  : "Присоединяйся к QAZMARKET уже сегодня и создавай свои проекты!"}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/login?tab=register"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#1E5BF0] hover:bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all active:scale-95"
              >
                <span>{isKz ? "Тіркелу" : "Зарегистрироваться"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. TEACHER CALLOUT SECTION ===== */}
      <section className="rounded-3xl p-6 sm:p-10 border border-blue-200 dark:border-blue-900/40 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-transparent">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E5BF0]">
              Оқытушыларға арналған
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              № 130 бұйрыққа сай 17 дайын ҚМЖ (DOCX) және 21 жұмыс парағы
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Бағдарлама авторы: Сарсенова Ақкүміс Піржанқызы («№6 Хромтау гимназиясы» КММ, педагог-сарапшы). Мұғалім кабинетінде оқушылар нәтижесін тексеруге болады.
            </p>
          </div>

          <Link
            href="/login?role=teacher"
            className="btn btn-secondary px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm shrink-0 flex items-center gap-2"
          >
            <span>Мұғалім ретінде кіру</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== 6. FOOTER (Matching Dark Navy Reference from Screenshot) ===== */}
      <footer className="rounded-3xl bg-[#0F172A] text-white p-8 md:p-12 space-y-8 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E5BF0] flex items-center justify-center text-white font-bold shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-black text-lg text-white">QAZMARKET</div>
              <div className="text-[11px] text-slate-400">Білім беру платформасы</div>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-semibold">
            <a href="#modules" className="hover:text-white transition-colors">
              {isKz ? "Платформа туралы" : "О платформе"}
            </a>
            <Link href="/bilim" className="hover:text-white transition-colors">
              {isKz ? "Курстар" : "Курсы"}
            </Link>
            <Link href="/methodology" className="hover:text-white transition-colors">
              {isKz ? "Әдістеме" : "Методика"}
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              {isKz ? "Кіру" : "Войти"}
            </Link>
          </div>

          {/* Right Social Icons */}
          <div className="flex items-center gap-3 text-slate-400">
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#1E5BF0] hover:text-white flex items-center justify-center transition-colors"
              aria-label="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#1E5BF0] hover:text-white flex items-center justify-center transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#1E5BF0] hover:text-white flex items-center justify-center transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={() => setLang(isKz ? "ru" : "kk")}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#1E5BF0] hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
              title="Тіл ауыстыру"
            >
              {lang.toUpperCase()}
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>© 2026 QAZMARKET. Барлық құқықтар қорғалған.</div>
          <div>№ 6 Хромтау гимназиясы • Ақтөбе облысы</div>
        </div>
      </footer>
    </div>
  );
}
