"use client";

import Link from "next/link";
import {
  GraduationCap,
  Play,
  ArrowRight,
  Search,
  BookOpen,
  Code2,
  Trophy,
  Send,
  Youtube,
  Instagram,
  ArrowDown,
  Puzzle,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/store/app-context";

export function LandingView() {
  const { user } = useApp();

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto pb-10 font-sans select-none text-left">
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR                                                             */}
      {/* ========================================================================= */}
      <nav className="bg-white/95 dark:bg-[#161B38]/95 backdrop-blur-md rounded-full border border-slate-200/90 dark:border-slate-800 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-xs">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#1E5BF0] flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
            QAZMARKET
          </span>
        </Link>

        {/* Center: Navigation Pills */}
        <div className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300">
          <Link
            href="/"
            className="px-4 py-2 rounded-full bg-[#E0ECFD] text-[#1E5BF0] font-black"
          >
            Басты бет
          </Link>
          <Link
            href="/bilim"
            className="px-4 py-2 rounded-full hover:text-[#1E5BF0] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Білім алаңы
          </Link>
          <Link
            href="/studio"
            className="px-4 py-2 rounded-full hover:text-[#1E5BF0] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Тәжірибе
          </Link>
          <Link
            href="/portfolio"
            className="px-4 py-2 rounded-full hover:text-[#1E5BF0] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Портфолио
          </Link>
          <a
            href="#about"
            className="px-4 py-2 rounded-full hover:text-[#1E5BF0] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Жоба туралы
          </a>
        </div>

        {/* Right: Search & Auth Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/bilim"
            className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-[#1E5BF0] transition-colors flex items-center justify-center"
            aria-label="Іздеу"
          >
            <Search className="w-4 h-4" />
          </Link>

          {user ? (
            <Link
              href="/"
              className="px-5 py-2 rounded-full bg-[#1E5BF0] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5"
            >
              <span>Кабинетке өту</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-full border border-blue-200 dark:border-blue-900 text-[#1E5BF0] hover:bg-blue-50 dark:hover:bg-blue-950 font-bold text-xs sm:text-sm transition-all"
              >
                Кіру
              </Link>
              <Link
                href="/login?tab=register"
                className="px-5 py-2 rounded-full bg-[#1E5BF0] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all"
              >
                Тіркелу
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION WITH AUTHENTIC BACKGROUND ARTWORK                          */}
      {/* ========================================================================= */}
      <section className="relative rounded-3xl overflow-hidden border border-blue-100/80 dark:border-slate-800 shadow-xs bg-[#EDF3FD] dark:bg-[#141832] bg-[url('/images/hero-bg.jpg')] bg-cover bg-no-repeat bg-[center_right_-20px] md:bg-right-top min-h-[400px] sm:min-h-[440px] md:min-h-[470px] flex items-center">
        {/* Soft gradient mask for mobile readability to ensure left text is always 100% legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EEF4FE] via-[#EEF4FE]/92 sm:via-[#EEF4FE]/80 to-transparent lg:to-transparent pointer-events-none" />

        <div className="relative z-10 w-full p-6 sm:p-10 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (Content area: 7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Top Pill Badge: 10-СЫНЫПҚА АРНАЛҒАН ИНТЕРАКТИВТІ ПЛАТФОРМА */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-black bg-[#E3EDFD]/90 dark:bg-blue-950/80 text-[#1E5BF0] border border-blue-200/90 dark:border-blue-800/80 shadow-2xs uppercase tracking-wide backdrop-blur-xs">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>10-сыныпқа арналған интерактивті платформа</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Қазақша ойла.<br />
              <span className="text-[#1E5BF0]">Креативті жаса.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-lg">
              Маркетинг әлемін қазақ тілінде меңгеріп, өз идеяңды цифрлық жобаға айналдыр.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/login?tab=register"
                className="px-6 py-3.5 rounded-2xl bg-[#1E5BF0] hover:bg-blue-600 text-white font-extrabold text-sm shadow-lg shadow-blue-500/30 flex items-center gap-2.5 transition-all active:scale-95"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Оқуды бастау →</span>
              </Link>

              <a
                href="#bilim"
                className="px-6 py-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 hover:bg-white text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700 font-bold text-sm flex items-center gap-2 transition-all shadow-2xs backdrop-blur-xs"
              >
                <span>Платформамен танысу</span>
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
      <section className="bg-white dark:bg-[#161B38] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 md:p-6 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-slate-200 dark:divide-slate-800 items-center">
          {/* Stat 1 */}
          <div className="flex items-center gap-3.5 md:px-5">
            <div className="w-10 h-10 rounded-xl bg-[#1E5BF0] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
              10-сынып
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3.5 md:px-5">
            <div className="w-10 h-10 rounded-xl bg-[#1E5BF0] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
              Қазақ тілі + маркетинг
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-3.5 md:px-5">
            <div className="w-10 h-10 rounded-xl bg-[#1E5BF0] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
              Практикалық оқу
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-3.5 md:px-5">
            <div className="w-10 h-10 rounded-xl bg-[#1E5BF0] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
              Жеке цифрлық портфолио
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION: «БІЛІМ АЛАҢЫ» (5 Cards)                                       */}
      {/* ========================================================================= */}
      <section id="bilim" className="space-y-4 scroll-mt-24">
        {/* Title with Vertical Blue Bar */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-[#1E5BF0] inline-block" />
            <span>Білім алаңы</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Маркетинг саласындағы қазақ тілін тәжірибе арқылы меңгер
          </p>
        </div>

        {/* 5 Theory Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Card 1 */}
          <Link
            href="/bilim"
            className="p-5 rounded-2xl bg-white dark:bg-[#161B38] border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 flex flex-col justify-between group transition-all shadow-2xs hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#1E5BF0] flex items-center justify-center text-2xl shadow-2xs group-hover:scale-105 transition-transform">
                📢
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-[#1E5BF0] transition-colors leading-snug">
                Маркетинг дегеніміз не?
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                Маркетингтің негізгі ұғымдары мен мақсаты.
              </p>
            </div>
            <div className="pt-4 flex justify-end">
              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-[#1E5BF0] group-hover:text-white transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>

          {/* Card 2 */}
          <Link
            href="/terminder"
            className="p-5 rounded-2xl bg-white dark:bg-[#161B38] border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 flex flex-col justify-between group transition-all shadow-2xs hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#1E5BF0] flex items-center justify-center text-2xl shadow-2xs group-hover:scale-105 transition-transform">
                💻
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-[#1E5BF0] transition-colors leading-snug">
                Маркетинг терминдері
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                Негізгі терминдерді қазақ тілінде үйрен.
              </p>
            </div>
            <div className="pt-4 flex justify-end">
              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-[#1E5BF0] group-hover:text-white transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>

          {/* Card 3 */}
          <Link
            href="/bilim"
            className="p-5 rounded-2xl bg-white dark:bg-[#161B38] border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 flex flex-col justify-between group transition-all shadow-2xs hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#1E5BF0] flex items-center justify-center text-2xl shadow-2xs group-hover:scale-105 transition-transform">
                📖
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-[#1E5BF0] transition-colors leading-snug">
                Қазақша кәсіби сөздік
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                Маркетингке қатысты негізгі сөздер топтамасы.
              </p>
            </div>
            <div className="pt-4 flex justify-end">
              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-[#1E5BF0] group-hover:text-white transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>

          {/* Card 4 */}
          <Link
            href="/jarname"
            className="p-5 rounded-2xl bg-white dark:bg-[#161B38] border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 flex flex-col justify-between group transition-all shadow-2xs hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#1E5BF0] flex items-center justify-center text-2xl shadow-2xs group-hover:scale-105 transition-transform">
                💬
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-[#1E5BF0] transition-colors leading-snug">
                Жарнама тілінің ерекшеліктері
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                Жарнама мәтінінің ерекшеліктерін біл.
              </p>
            </div>
            <div className="pt-4 flex justify-end">
              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-[#1E5BF0] group-hover:text-white transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>

          {/* Card 5 */}
          <Link
            href="/smm"
            className="p-5 rounded-2xl bg-white dark:bg-[#161B38] border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 flex flex-col justify-between group transition-all shadow-2xs hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#1E5BF0] flex items-center justify-center text-2xl shadow-2xs group-hover:scale-105 transition-transform">
                📈
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-[#1E5BF0] transition-colors leading-snug">
                Маркетингтік коммуникация
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                Тиімді коммуникация жасауды үйрен.
              </p>
            </div>
            <div className="pt-4 flex justify-end">
              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-[#1E5BF0] group-hover:text-white transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BOTTOM 3-BLOCK GRID                                                    */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Block A: Біліміңді тәжірибеде сына (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-white dark:bg-[#161B38] border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-xs">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-[#1E5BF0] inline-block" />
              <span>Біліміңді тәжірибеде сына</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Интерактивті ойындар мен өзін-өзі бағалау қадамдары
            </p>
          </div>

          {/* 4 Step Cards in a row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <Link
              href="/game"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-[#1E5BF0] flex items-center justify-center text-base shadow-2xs">
                🧩
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-[#1E5BF0] transition-colors leading-tight">
                Терминді сәйкестендір
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>

            <Link
              href="/test"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center text-base shadow-2xs">
                📋
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-[#1E5BF0] transition-colors leading-tight">
                Интерактивті тест
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>

            <Link
              href="/terminder"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-base shadow-2xs">
                🔍
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-[#1E5BF0] transition-colors leading-tight">
                Қазақша баламасын тап
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>

            <Link
              href="/achievements"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center text-base shadow-2xs">
                🛡️
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-[#1E5BF0] transition-colors leading-tight">
                Өзіңді тексер
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>
          </div>
        </div>

        {/* Block B: Маркетолог рөлін байқап көр (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-white dark:bg-[#161B38] border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-xs">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-[#1E5BF0] inline-block" />
              <span>Маркетолог рөлін байқап көр</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              4 негізгі кәсіби бағытты сынап көр
            </p>
          </div>

          {/* 4 Role Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <Link
              href="/bilim"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-[#1E5BF0] flex items-center justify-center text-base shadow-2xs">
                📢
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-[#1E5BF0] transition-colors">
                Маркетолог
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>

            <Link
              href="/studio"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center text-base shadow-2xs">
                ✒️
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-[#1E5BF0] transition-colors">
                Копирайтер
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>

            <Link
              href="/brand"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-950 text-pink-600 flex items-center justify-center text-base shadow-2xs">
                🎨
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-[#1E5BF0] transition-colors leading-tight">
                Бренд-дизайнер
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#1E5BF0]" />
            </Link>

            <Link
              href="/smm"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 flex flex-col items-center text-center justify-between space-y-2 group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center text-base shadow-2xs">
                📈
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-[#1E5BF0] transition-colors leading-tight">
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
              href="/portfolio"
              className="w-10 h-10 rounded-full bg-white text-[#1E5BF0] hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-md font-bold"
              aria-label="Портфолиоға өту"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. DARK NAVY FOOTER                                                       */}
      {/* ========================================================================= */}
      <footer id="about" className="rounded-3xl bg-[#0B0F19] text-white px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        {/* Left: Brand Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#1E5BF0] flex items-center justify-center text-white font-bold">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-white text-xs sm:text-sm">
            QAZMARKET — Қазақ тіліндегі маркетинг зертханасы
          </span>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-3 text-slate-400">
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
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-[#1E5BF0] hover:text-white flex items-center justify-center transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Right: Slogan */}
        <div className="text-[11px] text-slate-400 font-semibold text-center sm:text-right">
          Біліммен бірге — жарқын болашаққа!
        </div>
      </footer>
    </div>
  );
}
