"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/store/app-context";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  PenTool,
  Share2,
  Search,
  Gamepad2,
  FolderKanban,
  Trophy,
  X,
  Target,
  Award,
} from "lucide-react";

export function OnboardingModal() {
  const { user, addXp } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState("portfolio");

  useEffect(() => {
    // Only show if user is logged in and hasn't completed onboarding yet
    if (user) {
      const completed = localStorage.getItem("qazmarket_onboarding_done");
      if (!completed) {
        setIsOpen(true);
      }
    }
  }, [user]);

  const handleFinish = () => {
    localStorage.setItem("qazmarket_onboarding_done", "true");
    addXp(50, "Платформамен танысу және алғашқы қадам");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl card p-6 md:p-8 rounded-3xl border border-blue-200 bg-white dark:bg-[#161B38] shadow-2xl space-y-6 relative text-left">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          aria-label="Жабу"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-8 bg-[#1E5BF0]"
                  : s < step
                  ? "w-4 bg-emerald-500"
                  : "w-4 bg-slate-200 dark:bg-slate-700"
              }`}
            />
          ))}
          <span className="text-[11px] font-bold text-slate-400 ml-2">
            Қадам {step} / 3
          </span>
        </div>

        {/* STEP 1: WELCOME */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E5BF0] to-[#3B82F6] flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <GraduationCap className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Қош келдіңіз, {user?.name || "Жас маркетолог"}! 👋
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                <strong>QAZMARKET</strong> — 10-сыныпқа арналған қазақ тілі, заманауи маркетинг және цифрлық сауаттылықты кіріктіретін интерактивті зертхана.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs space-y-1.5">
              <div className="font-extrabold text-[#1E5BF0]">Платформа мақсаты:</div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Әрбір оқушы сабақ барысында теорияны оқып қана қоймай, өз брендін, жарнамалық ұрандарын, SMM постын жасап, цифрлық жеке портфолиосын құрайды!
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="btn btn-primary px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
              >
                <span>8 Бағытпен танысу</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: 8 MODULES PREVIEW */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Сіз жұмыс істейтін 8 бағыт:
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Әр бөлімде нақты тапсырмалар мен дескрипторлар жүйесі бар
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="font-bold text-slate-800 dark:text-slate-200">01. Білім алаңы</span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2.5">
                <PenTool className="w-4 h-4 text-purple-500 shrink-0" />
                <span className="font-bold text-slate-800 dark:text-slate-200">02. Жарнама студиясы</span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
                <span className="font-bold text-slate-800 dark:text-slate-200">03. Бренд зертханасы</span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2.5">
                <Share2 className="w-4 h-4 text-violet-500 shrink-0" />
                <span className="font-bold text-slate-800 dark:text-slate-200">04. SMM орталығы</span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2.5">
                <Search className="w-4 h-4 text-sky-500 shrink-0" />
                <span className="font-bold text-slate-800 dark:text-slate-200">05. SEO шеберханасы</span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2.5">
                <Gamepad2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-bold text-slate-800 dark:text-slate-200">06. Маркетинг ойыны</span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2.5">
                <FolderKanban className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-bold text-slate-800 dark:text-slate-200">07. Жоба портфолиосы</span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2.5">
                <Trophy className="w-4 h-4 text-yellow-500 shrink-0" />
                <span className="font-bold text-slate-800 dark:text-slate-200">08. Жетістік алаңы</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="btn btn-secondary text-xs px-4 py-2 rounded-xl font-bold"
              >
                ← Артқа
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn btn-primary px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
              >
                <span>Мақсатты таңдау</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SET GOAL & BONUS */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Сіздің басты оқу мақсатыңыз:
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Курс соңында нені қорғағыңыз келеді?
              </p>
            </div>

            <div className="space-y-2">
              <div
                onClick={() => setSelectedGoal("portfolio")}
                className={`p-3.5 rounded-2xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
                  selectedGoal === "portfolio"
                    ? "border-[#1E5BF0] bg-blue-50 dark:bg-blue-950/40 text-[#1E5BF0]"
                    : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FolderKanban className="w-5 h-5 text-[#1E5BF0]" />
                  <div>
                    <div>Толық сандық портфолио жасап, PDF жүктеу</div>
                    <div className="text-[10px] text-slate-500 font-normal">Бренд, жарнама, слогандар жинағы</div>
                  </div>
                </div>
                {selectedGoal === "portfolio" && <CheckCircle2 className="w-4 h-4 text-[#1E5BF0]" />}
              </div>

              <div
                onClick={() => setSelectedGoal("cert")}
                className={`p-3.5 rounded-2xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
                  selectedGoal === "cert"
                    ? "border-[#1E5BF0] bg-blue-50 dark:bg-blue-950/40 text-[#1E5BF0]"
                    : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <div>
                    <div>10-сынып ресми сертификатына қол жеткізу</div>
                    <div className="text-[10px] text-slate-500 font-normal">Барлық 17 сабақ пен тесттерден өту</div>
                  </div>
                </div>
                {selectedGoal === "cert" && <CheckCircle2 className="w-4 h-4 text-[#1E5BF0]" />}
              </div>
            </div>

            {/* Welcome Bonus Callout */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-blue-500/15 border border-amber-400/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🎁</span>
                <div>
                  <div className="font-extrabold text-slate-900 dark:text-white">Бастапқы сәлемдесу бонусы!</div>
                  <div className="text-[10px] text-slate-500">Курсты сәтті бастағаныңыз үшін беріледі</div>
                </div>
              </div>
              <span className="font-black text-amber-500 text-sm bg-white dark:bg-slate-800 px-3 py-1 rounded-xl shadow-xs">
                +50 XP
              </span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="btn btn-secondary text-xs px-4 py-2 rounded-xl font-bold"
              >
                ← Артқа
              </button>
              <button
                onClick={handleFinish}
                className="btn btn-primary px-7 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg shadow-blue-500/30"
              >
                <Sparkles className="w-4 h-4" />
                <span>Зертханаға өту!</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
