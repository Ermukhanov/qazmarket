"use client";

import Link from "next/link";
import {
  GraduationCap,
  Play,
  ArrowRight,
  Search,
  BookOpen,
  Laptop,
  Trophy,
  ArrowDown,
} from "lucide-react";
import { useApp } from "@/store/app-context";

export function LandingView() {
  const { user, logout } = useApp();

  // Route protection helper for landing page: unauthenticated users are guided to login
  const getActionHref = (target: string) => (user ? target : "/login");
  const getRegisterHref = () => (user ? "/portfolio" : "/login?tab=register");

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto pb-10 font-sans select-none text-left">
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR                                                             */}
      {/* ========================================================================= */}
      <nav className="bg-white rounded-full border border-slate-200/90 px-3.5 sm:px-6 md:px-8 py-2 sm:py-3 flex items-center justify-between shadow-xs">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1E5BF0] flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900">
            QAZMARKET
          </span>
        </Link>

        {/* Center: Navigation Pills (Desktop only) */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-600">
          <Link
            href="/"
            className="px-4 py-2 rounded-full bg-[#E0ECFD] text-[#1E5BF0] font-black"
          >
            Басты бет
          </Link>
          <Link
            href="/bilim"
            className="px-4 py-2 rounded-full hover:text-[#1E5BF0] hover:bg-slate-50 transition-colors"
          >
            Білім алаңы
          </Link>
          <Link
            href="/studio"
            className="px-4 py-2 rounded-full hover:text-[#1E5BF0] hover:bg-slate-50 transition-colors"
          >
            Тәжірибе
          </Link>
          <Link
            href="/portfolio"
            className="px-4 py-2 rounded-full hover:text-[#1E5BF0] hover:bg-slate-50 transition-colors"
          >
            Портфолио
          </Link>
          <a
            href="#about"
            className="px-4 py-2 rounded-full hover:text-[#1E5BF0] hover:bg-slate-50 transition-colors"
          >
            Жоба туралы
          </a>
        </div>

        {/* Right: Search & Auth Buttons (Responsive) */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/bilim"
            className="hidden sm:flex w-9 h-9 rounded-full border border-slate-200 text-slate-500 hover:text-[#1E5BF0] transition-colors items-center justify-center"
            aria-label="Іздеу"
          >
            <Search className="w-4 h-4" />
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#1E5BF0] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5"
              >
                <span>Кабинет</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-xs font-bold text-slate-400 hover:text-red-500 px-2 py-1 transition-colors"
              >
                Шығу
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/login"
                className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-blue-200 text-[#1E5BF0] hover:bg-blue-50 font-bold text-xs sm:text-sm transition-all"
              >
                Кіру
              </Link>
              <Link
                href="/login?tab=register"
                className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#1E5BF0] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all"
              >
                Тіркелу
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative rounded-3xl overflow-hidden border border-blue-100 shadow-xs bg-[#EDF3FD] lg:bg-[url('/images/hero-bg.jpg')] lg:bg-cover lg:bg-no-repeat lg:bg-right-top min-h-[380px] sm:min-h-[440px] md:min-h-[470px] flex items-center">
        {/* Desktop Gradient Mask */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#EEF4FE] via-[#EEF4FE]/85 to-transparent pointer-events-none" />

        <div className="relative z-10 w-full p-5 sm:p-10 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column (Content area: 7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Top Pill Badge: 10-СЫНЫПҚА АРНАЛҒАН ИНТЕРАКТИВТІ ПЛАТФОРМА */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-black bg-[#E3EDFD] text-[#1E5BF0] border border-blue-200/90 shadow-2xs uppercase tracking-wide">
              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
              <span>10-сыныпқа арналған интерактивті платформа</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Қазақша ойла.<br />
              <span className="text-[#1E5BF0]">Креативті жаса.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
              Маркетинг әлемін қазақ тілінде меңгеріп, өз идеяңды цифрлық жобаға айналдыр.
            </p>

            {/* CTA Buttons (Mobile Responsive: Full-width stacked on mobile, inline on desktop) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href={getActionHref("/bilim")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#1E5BF0] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2.5 transition-all active:scale-95"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Оқуды бастау →</span>
              </Link>

              <a
                href="#bilim"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                <span>Платформамен танысу</span>
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Mobile Hero Illustration Banner: Cleanly shown on mobile without cropping */}
            <div className="lg:hidden relative w-full aspect-[16/10] sm:aspect-[2/1] rounded-2xl overflow-hidden border border-blue-200/80 shadow-md mt-4 bg-white">
              <img
                src="/images/hero-bg.jpg"
                alt="QAZMARKET интерактивті маркетинг платформасы"
                className="w-full h-full object-cover object-right"
              />
            </div>
          </div>

          {/* Right Column: Transparent space on desktop for background illustration */}
          <div className="lg:col-span-5 hidden lg:block h-full min-h-[360px] pointer-events-none" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 4-STATS DIVIDER BAR                                                    */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-5 md:p-6 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-0 md:divide-x divide-slate-200 items-center">
          {/* Stat 1 */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 md:px-5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#1E5BF0] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
              10-сынып
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 md:px-5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#1E5BF0] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
              Қазақ тілі + маркетинг
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 md:px-5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#1E5BF0] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30">
              <Laptop className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
              Практикалық оқу
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 md:px-5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#1E5BF0] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
              Жеке цифрлық портфолио
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. БІЛІМ АЛАҢЫ — 5 COURSE CARDS (PURE WHITE)                              */}
      {/* ========================================================================= */}
      <section id="bilim" className="space-y-4">
        {/* Section Header */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <span className="w-1.5 h-6 rounded-full bg-[#1E5BF0] inline-block" />
            <span>Білім алаңы</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium pl-4">
            Маркетинг саласындағы қазақ тілін тәжірибе арқылы меңгер
          </p>
        </div>

        {/* 5 Authentic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {/* Card 1: Маркетинг дегеніміз не? */}
          <Link
            href={getActionHref("/bilim")}
            className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E5BF0] flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition-transform">
                📢
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-[#1E5BF0] transition-colors">
                  Маркетинг дегеніміз не?
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Маркетингтің негізгі ұғымдары мен мақсаты.
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <div className="w-8 h-8 rounded-full bg-[#1E5BF0] text-white flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 2: Маркетинг терминдері */}
          <Link
            href={getActionHref("/bilim")}
            className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E5BF0] flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition-transform">
                💻
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-[#1E5BF0] transition-colors">
                  Маркетинг терминдері
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Негізгі терминдерді қазақ тілінде үйрен.
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <div className="w-8 h-8 rounded-full bg-[#1E5BF0] text-white flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 3: Қазақша кәсіби сөздік */}
          <Link
            href={getActionHref("/terminder")}
            className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E5BF0] flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition-transform">
                📖
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-[#1E5BF0] transition-colors">
                  Қазақша кәсіби сөздік
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Маркетингке қатысты негізгі сөздер топтамасы.
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <div className="w-8 h-8 rounded-full bg-[#1E5BF0] text-white flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 4: Жарнама тілінің ерекшеліктері */}
          <Link
            href={getActionHref("/jarname")}
            className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E5BF0] flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition-transform">
                💬
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-[#1E5BF0] transition-colors">
                  Жарнама тілінің ерекшеліктері
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Жарнама мәтінінің ерекшеліктерін біл.
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <div className="w-8 h-8 rounded-full bg-[#1E5BF0] text-white flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 5: Маркетингтік коммуникация */}
          <Link
            href={getActionHref("/studio")}
            className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E5BF0] flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition-transform">
                📊
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-[#1E5BF0] transition-colors">
                  Маркетингтік коммуникация
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Тиімді коммуникация жасауды үйрен.
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <div className="w-8 h-8 rounded-full bg-[#1E5BF0] text-white flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PRACTICE, ROLES & PORTFOLIO 3-BLOCK GRID                               */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Block A: Біліміңді тәжірибеде сына (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-white border border-slate-200/90 flex flex-col justify-between space-y-4 shadow-xs">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-[#1E5BF0] inline-block" />
              <span>Біліміңді тәжірибеде сына</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
              Интерактивті ойындар мен өзін-өзі бағалау қадамдары
            </p>
          </div>

          {/* 4 Step Cards in a row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <Link
              href={getActionHref("/game")}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#1E5BF0] flex items-center justify-center text-base shadow-2xs">
                🧩
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 group-hover:text-[#1E5BF0] transition-colors leading-tight">
                Терминді сәйкестендір
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>

            <Link
              href={getActionHref("/test")}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-base shadow-2xs">
                📋
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 group-hover:text-[#1E5BF0] transition-colors leading-tight">
                Интерактивті тест
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>

            <Link
              href={getActionHref("/terminder")}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-base shadow-2xs">
                🔍
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 group-hover:text-[#1E5BF0] transition-colors leading-tight">
                Қазақша баламасын тап
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>

            <Link
              href={getActionHref("/achievements")}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-base shadow-2xs">
                🛡️
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 group-hover:text-[#1E5BF0] transition-colors leading-tight">
                Өзіңді тексер
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>
          </div>
        </div>

        {/* Block B: Маркетолог рөлін байқап көр (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-white border border-slate-200/90 flex flex-col justify-between space-y-4 shadow-xs">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-[#1E5BF0] inline-block" />
              <span>Маркетолог рөлін байқап көр</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
              4 негізгі кәсіби бағытты сынап көр
            </p>
          </div>

          {/* 4 Role Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <Link
              href={getActionHref("/bilim")}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#1E5BF0] flex items-center justify-center text-base shadow-2xs">
                📢
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 group-hover:text-[#1E5BF0] transition-colors">
                Маркетолог
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>

            <Link
              href={getActionHref("/studio")}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-base shadow-2xs">
                ✒️
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 group-hover:text-[#1E5BF0] transition-colors">
                Копирайтер
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>

            <Link
              href={getActionHref("/brand")}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-base shadow-2xs">
                🎨
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 group-hover:text-[#1E5BF0] transition-colors leading-tight">
                Бренд-дизайнер
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>

            <Link
              href={getActionHref("/smm")}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-base shadow-2xs">
                📈
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 group-hover:text-[#1E5BF0] transition-colors leading-tight">
                Жарнама маманы
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>
          </div>
        </div>

        {/* Block C: Өз маркетингтік портфолиоңды жаса (3 cols, Royal Blue Gradient) */}
        <div className="lg:col-span-3 p-6 rounded-3xl bg-gradient-to-br from-[#1E5BF0] to-[#2563EB] text-white flex flex-col justify-between space-y-4 shadow-xl shadow-blue-500/25 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-md">
            🏆
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-black text-white leading-tight">
              Өз маркетингтік портфолиоңды жаса
            </h4>
            <p className="text-[11px] text-blue-100 font-medium">
              Әр тапсырма — сенің жеке жетістігің
            </p>
          </div>

          <div className="pt-1 flex justify-center">
            <Link
              href={getRegisterHref()}
              className="w-10 h-10 rounded-full bg-white text-[#1E5BF0] hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-md font-bold"
              aria-label="Портфолиоға өту"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. IMPROVED MODERN FOOTER (NO EXTERNAL SOCIAL LINKS, CLEAN & EDUCATIONAL)  */}
      {/* ========================================================================= */}
      <footer id="about" className="rounded-3xl bg-[#0B0F19] text-white p-6 sm:p-8 md:p-10 space-y-6 text-xs shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Col 1: Platform Brand & Info (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#1E5BF0] flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/30">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                QAZMARKET
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              10-сынып оқушыларына арналған қазақ тілі мен цифрлық маркетингті ұштастыратын интерактивті білім беру зертханасы.
            </p>
            <div className="text-[11px] text-slate-500">
              Хромтау ауданының білім бөлімі, №6 Хромтау гимназиясы
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-bold text-slate-300 text-xs uppercase tracking-wider">
              Бөлімдер
            </div>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li>
                <Link href="/bilim" className="hover:text-[#1E5BF0] transition-colors">
                  01. Білім алаңы
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-[#1E5BF0] transition-colors">
                  02. Ұран шеберханасы
                </Link>
              </li>
              <li>
                <Link href="/brand" className="hover:text-[#1E5BF0] transition-colors">
                  03. Бренд конструкторы
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#1E5BF0] transition-colors">
                  07. Оқушы портфолиосы
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Teacher & Curriculum Info (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-bold text-slate-300 text-xs uppercase tracking-wider">
              Әдістеме
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Авторлық бағдарлама: <span className="text-slate-200 font-semibold">А. П. Сарсенова</span>
            </p>
            <p className="text-slate-500 text-[11px]">
              ҚР Оқу-ағарту министрлігінің № 130 бұйрығы негізінде жасалған ҚМЖ үлгілері.
            </p>
            <div className="pt-1">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-[#1E5BF0] font-bold hover:underline"
              >
                <span>Жүйеге кіру</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 QAZMARKET. Барлық құқықтар қорғалған.
          </div>
          <div className="text-slate-400 font-medium">
            «Қазақша ойла. Креативті жаса. Нарықта таныт!»
          </div>
        </div>
      </footer>
    </div>
  );
}
