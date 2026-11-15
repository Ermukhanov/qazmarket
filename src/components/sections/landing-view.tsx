"use client";

import Link from "next/link";
import {
  GraduationCap,
  Play,
  ArrowRight,
  Search,
  Users,
  BookOpen,
  Trophy,
  Star,
  Calculator,
  Atom,
  FlaskConical,
  Code2,
  Feather,
  Globe2,
  Landmark,
  Send,
  Youtube,
  Github,
  Globe,
  ArrowDown,
} from "lucide-react";
import { useApp } from "@/store/app-context";

export function LandingView() {
  const { user, lang, setLang } = useApp();

  const isRu = lang === "ru";

  const subjects = [
    {
      id: "math",
      titleRu: "Математика",
      titleKk: "Математика",
      subRu: "Логика и точность",
      subKk: "Логика мен дәлдік",
      icon: Calculator,
      color: "bg-emerald-50 text-emerald-600",
      href: "/bilim",
    },
    {
      id: "physics",
      titleRu: "Физика",
      titleKk: "Физика",
      subRu: "Открывай законы мира",
      subKk: "Әлем заңдарын аш",
      icon: Atom,
      color: "bg-blue-50 text-[#1E5BF0]",
      href: "/bilim",
    },
    {
      id: "chemistry",
      titleRu: "Химия",
      titleKk: "Химия",
      subRu: "Исследуй и экспериментируй",
      subKk: "Зертте және сынақ жаса",
      icon: FlaskConical,
      color: "bg-teal-50 text-teal-600",
      href: "/bilim",
    },
    {
      id: "it",
      titleRu: "Информатика",
      titleKk: "Информатика",
      subRu: "Создавай будущее",
      subKk: "Болашақты жаса",
      icon: Code2,
      color: "bg-indigo-50 text-indigo-600",
      href: "/studio",
    },
    {
      id: "kazakh",
      titleRu: "Казахский язык",
      titleKk: "Қазақ тілі",
      subRu: "Говори и пиши красиво",
      subKk: "Әдемі сөйле және жаз",
      icon: Feather,
      color: "bg-sky-50 text-[#00A3FF]",
      href: "/bilim",
    },
    {
      id: "russian",
      titleRu: "Русский язык",
      titleKk: "Орыс тілі",
      subRu: "Учись уверенно",
      subKk: "Сенімді үйрен",
      icon: BookOpen,
      color: "bg-blue-50 text-[#1E5BF0]",
      href: "/bilim",
    },
    {
      id: "english",
      titleRu: "Английский язык",
      titleKk: "Ағылшын тілі",
      subRu: "Открывай новые горизонты",
      subKk: "Жаңа көкжиектерді аш",
      icon: Globe2,
      color: "bg-rose-50 text-rose-600",
      href: "/bilim",
    },
    {
      id: "history",
      titleRu: "История Казахстана",
      titleKk: "Қазақстан тарихы",
      subRu: "Знай свою историю",
      subKk: "Тарихыңды біл",
      icon: Landmark,
      color: "bg-emerald-50 text-emerald-600",
      href: "/bilim",
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto pb-10 font-sans select-none text-left">
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR (ТОЧЬ В ТОЧЬ С ОБРАЗЦА)                                      */}
      {/* ========================================================================= */}
      <nav className="bg-white rounded-full border border-slate-200 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-xs">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#1E5BF0] flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900">
            QAZMARKET
          </span>
        </Link>

        {/* Center: Navigation Pills */}
        <div className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-600">
          <Link
            href="/"
            className="px-4 py-2 rounded-full bg-[#E0ECFD] text-[#1E5BF0] font-black"
          >
            {isRu ? "Главная" : "Басты бет"}
          </Link>
          <Link
            href="/bilim"
            className="px-4 py-2 rounded-full hover:text-[#1E5BF0] hover:bg-slate-50 transition-colors"
          >
            {isRu ? "Курсы" : "Курстар"}
          </Link>
          <Link
            href="/game"
            className="px-4 py-2 rounded-full hover:text-[#1E5BF0] hover:bg-slate-50 transition-colors"
          >
            {isRu ? "Тесты" : "Тесттер"}
          </Link>
          <Link
            href="/studio"
            className="px-4 py-2 rounded-full hover:text-[#1E5BF0] hover:bg-slate-50 transition-colors"
          >
            {isRu ? "Задания" : "Тапсырмалар"}
          </Link>
          <Link
            href="/portfolio"
            className="px-4 py-2 rounded-full hover:text-[#1E5BF0] hover:bg-slate-50 transition-colors"
          >
            {isRu ? "Портфолио" : "Портфолио"}
          </Link>
          <a
            href="#about"
            className="px-4 py-2 rounded-full hover:text-[#1E5BF0] hover:bg-slate-50 transition-colors"
          >
            {isRu ? "О платформе" : "Платформа туралы"}
          </a>
        </div>

        {/* Right: Search, Lang Switch & Auth Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex items-center rounded-full bg-slate-100 p-0.5 text-[11px] font-bold text-slate-600">
            <button
              onClick={() => setLang("ru")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                isRu ? "bg-white text-[#1E5BF0] shadow-2xs font-black" : "hover:text-slate-900"
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLang("kk")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                !isRu ? "bg-white text-[#1E5BF0] shadow-2xs font-black" : "hover:text-slate-900"
              }`}
            >
              KZ
            </button>
          </div>

          <Link
            href="/bilim"
            className="w-9 h-9 rounded-full border border-slate-200 text-slate-500 hover:text-[#1E5BF0] transition-colors flex items-center justify-center"
            aria-label="Поиск"
          >
            <Search className="w-4 h-4" />
          </Link>

          {user ? (
            <Link
              href="/"
              className="px-5 py-2 rounded-full bg-[#1E5BF0] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5"
            >
              <span>{isRu ? "Кабинет" : "Кабинет"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-full border border-slate-300 text-slate-700 hover:border-[#1E5BF0] hover:text-[#1E5BF0] font-bold text-xs sm:text-sm transition-all"
              >
                {isRu ? "Войти" : "Кіру"}
              </Link>
              <Link
                href="/login?tab=register"
                className="px-5 py-2 rounded-full bg-[#1E5BF0] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all"
              >
                {isRu ? "Регистрация" : "Тіркелу"}
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative rounded-3xl overflow-hidden border border-blue-100/90 shadow-xs bg-[#EDF3FD] bg-[url('/images/hero-bg.jpg')] bg-cover bg-no-repeat bg-[center_right_-20px] md:bg-right-top min-h-[400px] sm:min-h-[440px] md:min-h-[470px] flex items-center">
        {/* Soft gradient mask for mobile readability to ensure left text is always 100% legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EEF4FE] via-[#EEF4FE]/92 sm:via-[#EEF4FE]/80 to-transparent lg:to-transparent pointer-events-none" />

        <div className="relative z-10 w-full p-6 sm:p-10 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (Content area: 7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Top Pill: 🏛️ Aqbobek Lyceum • Образовательная платформа */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-[#E0ECFD] text-[#1E5BF0] border border-blue-200/90 shadow-2xs">
              <Landmark className="w-3.5 h-3.5 text-[#1E5BF0]" />
              <span>
                {isRu
                  ? "Aqbobek Lyceum • Образовательная платформа"
                  : "Aqbobek Lyceum • Білім беру платформасы"}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
              QAZMARKET —<br />
              <span>{isRu ? "Твой путь к знаниям" : "Білімге бастар жол"}</span><br />
              <span className="text-[#1E5BF0]">
                {isRu ? "и большим возможностям" : "және зор мүмкіндіктер"}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
              {isRu
                ? "Учись. Развивайся. Достигай успеха вместе с нами!"
                : "Үйрен. Дамы. Бізбен бірге табысқа жет!"}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/login?tab=register"
                className="px-6 py-3.5 rounded-2xl bg-[#1E5BF0] hover:bg-blue-600 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2.5 transition-all active:scale-95"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>{isRu ? "Начать обучение" : "Оқуды бастау →"}</span>
              </Link>

              <a
                href="#sections"
                className="px-6 py-3.5 rounded-2xl bg-white/95 hover:bg-white text-slate-800 border border-slate-200 font-bold text-sm flex items-center gap-2 transition-all shadow-2xs backdrop-blur-xs"
              >
                <span>{isRu ? "Узнать больше" : "Толығырақ білу"}</span>
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Kept transparent so the authentic student artwork from hero-bg.jpg shines through */}
          <div className="lg:col-span-5 hidden lg:block h-full min-h-[360px] pointer-events-none" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 4-STATS DIVIDER BAR                                                    */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 md:p-6 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-slate-100 items-center">
          {/* Stat 1: 500+ Активных учеников */}
          <div className="flex items-center gap-3.5 md:px-5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E5BF0] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">500+</div>
              <div className="text-[11px] text-slate-500 font-medium">
                {isRu ? "Активных учеников" : "Белсенді оқушы"}
              </div>
            </div>
          </div>

          {/* Stat 2: 8 Образовательных разделов */}
          <div className="flex items-center gap-3.5 md:px-5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E5BF0] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">8</div>
              <div className="text-[11px] text-slate-500 font-medium">
                {isRu ? "Образовательных разделов" : "Оқу бағыттары"}
              </div>
            </div>
          </div>

          {/* Stat 3: 100% Возможность отслеживать прогресс */}
          <div className="flex items-center gap-3.5 md:px-5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E5BF0] flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">100%</div>
              <div className="text-[11px] text-slate-500 font-medium">
                {isRu ? "Возможность отслеживать прогресс" : "Прогресті бақылау мүмкіндігі"}
              </div>
            </div>
          </div>

          {/* Stat 4: Твой успех в наших руках! */}
          <div className="flex items-center gap-3.5 md:px-5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E5BF0] flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-[#1E5BF0]" />
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
              {isRu ? "Твой успех в наших руках!" : "Сенің табысың біздің қолымызда!"}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION: «НАШИ РАЗДЕЛЫ» + TALL PROMO CARD                              */}
      {/* ========================================================================= */}
      <section id="sections" className="space-y-4 scroll-mt-24">
        {/* Header with Title and "Все разделы →" */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              {isRu ? "Наши разделы" : "Біздің бөлімдер"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              {isRu
                ? "8 ключевых направлений для всестороннего развития"
                : "Жан-жақты дамуға арналған 8 негізгі бағыт"}
            </p>
          </div>
          <Link
            href="/bilim"
            className="text-xs font-bold text-[#1E5BF0] hover:underline flex items-center gap-1"
          >
            <span>{isRu ? "Все разделы" : "Барлық бөлімдер"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2-Columns Layout: Left 8 Subject Cards (2x4) + Right Tall Promo Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: 8 Subject Cards Grid (8 cols) */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            {subjects.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.id}
                  href={s.href}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#1E5BF0] flex items-center justify-between gap-3 group transition-all shadow-2xs hover:shadow-md"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-[#1E5BF0] transition-colors truncate">
                        {isRu ? s.titleRu : s.titleKk}
                      </h3>
                      <p className="text-[11px] text-slate-500 truncate font-medium">
                        {isRu ? s.subRu : s.subKk}
                      </p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-50 group-hover:bg-[#1E5BF0] flex items-center justify-center text-slate-400 group-hover:text-white transition-all shrink-0">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right: Tall Promo Card (3 cols) */}
          <div className="lg:col-span-3 p-6 rounded-3xl bg-gradient-to-b from-[#F0F5FE] to-[#E3EDFD] border border-blue-100 flex flex-col items-center text-center justify-between space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center text-3xl shadow-sm">
              🏆
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-black text-slate-900 leading-snug">
                {isRu ? "Начни свой путь к успеху!" : "Табысқа бастар жолды баста!"}
              </h4>
              <p className="text-[11px] text-slate-500 font-medium">
                {isRu
                  ? "Присоединяйся к QAZMARKET уже сегодня"
                  : "QAZMARKET қатарына бүгін қосыл"}
              </p>
            </div>

            <Link
              href="/login?tab=register"
              className="w-full py-3 rounded-xl bg-[#1E5BF0] hover:bg-blue-600 text-white font-extrabold text-xs shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 transition-all"
            >
              <span>{isRu ? "Зарегистрироваться" : "Тіркелу"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. DARK NAVY FOOTER                                                       */}
      {/* ========================================================================= */}
      <footer id="about" className="rounded-3xl bg-[#0B0F19] text-white px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        {/* Left: Brand Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#1E5BF0] flex items-center justify-center text-white font-bold">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-white text-xs sm:text-sm">
              QAZMARKET
            </span>
            <span className="text-[11px] text-slate-400 block sm:inline sm:ml-2">
              {isRu ? "Образовательная платформа" : "Білім беру платформасы"}
            </span>
          </div>
        </div>

        {/* Center: Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-300 font-medium">
          <a href="#about" className="hover:text-[#1E5BF0] transition-colors">
            {isRu ? "О платформе" : "Платформа туралы"}
          </a>
          <a href="mailto:support@qazmarket.kz" className="hover:text-[#1E5BF0] transition-colors">
            {isRu ? "Поддержка" : "Қолдау"}
          </a>
          <Link href="/privacy" className="hover:text-[#1E5BF0] transition-colors">
            {isRu ? "Политика конфиденциальности" : "Құпиялылық саясаты"}
          </Link>
          <a href="#about" className="hover:text-[#1E5BF0] transition-colors">
            {isRu ? "Контакты" : "Байланыс"}
          </a>
        </div>

        {/* Right: Social Icons & Copyright */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-[#1E5BF0] hover:text-white flex items-center justify-center transition-colors"
              aria-label="Telegram"
            >
              <Send className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-[#1E5BF0] hover:text-white flex items-center justify-center transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-[#1E5BF0] hover:text-white flex items-center justify-center transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://qazmarket.kz"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-[#1E5BF0] hover:text-white flex items-center justify-center transition-colors"
              aria-label="Website"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="text-[10px] text-slate-500 whitespace-nowrap">
            © 2026 QAZMARKET. {isRu ? "Все права защищены." : "Барлық құқықтар қорғалған."}
          </div>
        </div>
      </footer>
    </div>
  );
}
