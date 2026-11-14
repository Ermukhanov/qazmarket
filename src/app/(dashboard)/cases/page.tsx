"use client";

import { useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { marketingCases, MarketingCase } from "@/data/cases";
import {
  Briefcase,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lightbulb,
  Building,
  Target,
  ChevronRight,
} from "lucide-react";

export default function CasesPage() {
  const { lang, progress, addXp } = useApp();
  const t = getT(lang);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [completedCases, setCompletedCases] = useState<number[]>([]);

  const currentCase = marketingCases[currentIndex];
  const userSelectedOptId = selectedOptions[currentIndex];
  const selectedOptObj = currentCase.options.find((o) => o.id === userSelectedOptId);
  const isCaseAnswered = userSelectedOptId !== undefined;
  const isCorrect = selectedOptObj?.isCorrect || false;

  const handleSelectOption = (optId: string) => {
    if (isCaseAnswered) return;
    setSelectedOptions((prev) => ({ ...prev, [currentIndex]: optId }));

    const opt = currentCase.options.find((o) => o.id === optId);
    if (opt?.isCorrect) {
      if (!completedCases.includes(currentIndex)) {
        setCompletedCases((prev) => [...prev, currentIndex]);
        addXp(100);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: "var(--border-color)" }}>
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-2"
            style={{
              background: "color-mix(in srgb, var(--primary) 15%, transparent)",
              color: "var(--primary)",
            }}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>07-бөлім • {t.nav.cases}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {t.cases.title}
          </h1>
          <p className="text-xs md:text-sm mt-1" style={{ color: "var(--muted-fg)" }}>
            {t.cases.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl border bg-[var(--card)]" style={{ borderColor: "var(--border-color)" }}>
            {completedCases.length} / {marketingCases.length} кейс шешілді
          </span>
        </div>
      </div>

      {/* Case Navigator Horizontal Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {marketingCases.map((c, i) => {
          const isSelected = currentIndex === i;
          const isDone = completedCases.includes(i);
          return (
            <button
              key={c.id}
              onClick={() => setCurrentIndex(i)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 flex items-center gap-2 ${
                isSelected
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-sm"
                  : isDone
                  ? "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/30"
                  : "bg-[var(--card)] hover:bg-[var(--muted)]"
              }`}
            >
              <span>Кейс {c.number}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Main Case Content Card */}
      <div className="card p-6 md:p-8 rounded-3xl border space-y-6" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
        {/* Case Meta Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[var(--muted)] border" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center font-extrabold text-sm shrink-0">
              {currentCase.number}
            </div>
            <div>
              <h2 className="text-base font-extrabold" style={{ color: "var(--fg)" }}>
                {currentCase.title}
              </h2>
              <p className="text-xs flex items-center gap-2" style={{ color: "var(--muted-fg)" }}>
                <span className="flex items-center gap-1">
                  <Building className="w-3 h-3 text-[var(--primary)]" /> {currentCase.brandName}
                </span>
                <span>•</span>
                <span>{currentCase.industry}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-xl bg-[var(--card)] border shrink-0" style={{ borderColor: "var(--border-color)" }}>
            <Target className="w-3.5 h-3.5 text-[var(--secondary)]" />
            <span className="text-[11px] truncate max-w-[200px]" title={currentCase.targetAudience}>
              {currentCase.targetAudience}
            </span>
          </div>
        </div>

        {/* Scenario description */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
            {t.cases.scenario}:
          </span>
          <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
            {currentCase.scenario}
          </p>
        </div>

        {/* Challenge question */}
        <div className="p-4 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-xs sm:text-sm font-bold text-[var(--primary)] flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{currentCase.challenge}</span>
        </div>

        {/* Options to choose */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] block">
            {t.cases.chooseOption}
          </span>
          {currentCase.options.map((opt) => {
            const isChosen = userSelectedOptId === opt.id;
            let btnClass = "border-[var(--border-color)] bg-[var(--muted)] hover:bg-[var(--card)]";

            if (isCaseAnswered) {
              if (opt.isCorrect) {
                btnClass = "border-[var(--success)] bg-[var(--success)]/15 text-[var(--success)] font-bold";
              } else if (isChosen && !opt.isCorrect) {
                btnClass = "border-[var(--danger)] bg-[var(--danger)]/15 text-[var(--danger)]";
              } else {
                btnClass = "opacity-40 border-[var(--border-color)] bg-[var(--muted)]";
              }
            }

            return (
              <button
                key={opt.id}
                disabled={isCaseAnswered}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex flex-col gap-1.5 min-h-[54px] ${btnClass}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{opt.text}</span>
                  {isCaseAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-[var(--success)] shrink-0" />
                  )}
                  {isCaseAnswered && isChosen && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-[var(--danger)] shrink-0" />
                  )}
                </div>

                {/* Show critique if selected or if correct after answer */}
                {isCaseAnswered && (isChosen || opt.isCorrect) && (
                  <p className="text-xs pt-1 border-t opacity-90 font-normal">
                    💡 {opt.critique}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* Expert explanation and Marketing Lesson upon answer */}
        {isCaseAnswered && (
          <div className="space-y-4 pt-4 border-t animate-in fade-in" style={{ borderColor: "var(--border-color)" }}>
            <div className="p-5 rounded-2xl bg-[var(--muted)] border space-y-2" style={{ borderColor: "var(--border-color)" }}>
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--primary)]">
                <Sparkles className="w-4 h-4" />
                <span>Әдістемелік түсіндірме:</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--fg)" }}>
                {currentCase.expertExplanation}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--warning)]/10 border border-[var(--warning)]/30 flex items-start gap-3 text-xs">
              <Lightbulb className="w-5 h-5 text-[var(--warning)] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[var(--warning)] block mb-0.5">Басты маркетингтік сабақ:</span>
                <span style={{ color: "var(--fg)" }}>{currentCase.marketingLesson}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Pagination */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            className="btn btn-secondary text-xs flex items-center gap-1.5 px-4 py-2.5 rounded-xl disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4" /> Алдыңғы кейс
          </button>

          <span className="text-xs font-bold" style={{ color: "var(--muted-fg)" }}>
            {currentIndex + 1} / {marketingCases.length}
          </span>

          <button
            disabled={currentIndex === marketingCases.length - 1}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="btn btn-primary text-xs font-bold text-white flex items-center gap-1.5 px-5 py-2.5 rounded-xl shadow-sm disabled:opacity-30"
          >
            Келесі кейс <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
