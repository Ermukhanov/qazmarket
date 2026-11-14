"use client";

import { useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { copywriterTasks, CopywriterTask } from "@/data/copywriter-tasks";
import { checkSloganQuality } from "@/lib/utils";
import {
  PenTool,
  CheckCircle2,
  XCircle,
  Sparkles,
  Save,
  BookOpen,
  ArrowRight,
  Info,
  Layers,
  Award,
  Flame,
  Check,
} from "lucide-react";

export default function CopywriterPage() {
  const { lang, progress, updateProgress, addXp } = useApp();
  const t = getT(lang);

  const [selectedTask, setSelectedTask] = useState<CopywriterTask>(copywriterTasks[0]);
  const [inputText, setInputText] = useState<string>("");
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const quality = checkSloganQuality(inputText, selectedTask.brandName);

  const handleSaveToPortfolio = () => {
    if (!inputText.trim()) return;

    const newSlogan = {
      id: crypto.randomUUID(),
      text: inputText.trim(),
      brandName: selectedTask.brandName,
      score: quality.score,
      date: new Date().toISOString(),
    };

    updateProgress({
      savedSlogans: [newSlogan, ...progress.savedSlogans],
    });

    addXp(quality.score);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
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
            <PenTool className="w-3.5 h-3.5" />
            <span>04-бөлім • {t.nav.copywriter}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {t.copywriter.title}
          </h1>
          <p className="text-xs md:text-sm mt-1" style={{ color: "var(--muted-fg)" }}>
            {t.copywriter.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl border bg-[var(--card)]" style={{ borderColor: "var(--border-color)" }}>
            Жазылған мәтіндер: {progress.savedSlogans.length}
          </span>
        </div>
      </div>

      {/* Task Selector Tabs */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
          Тапсырманы таңдаңыз ({copywriterTasks.length} дайын тақырып):
        </span>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {copywriterTasks.map((task) => {
            const isSelected = selectedTask.id === task.id;
            return (
              <button
                key={task.id}
                onClick={() => {
                  setSelectedTask(task);
                  setInputText("");
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-sm"
                    : "bg-[var(--card)] hover:bg-[var(--muted)]"
                }`}
                style={{
                  borderColor: isSelected ? "var(--primary)" : "var(--border-color)",
                  color: isSelected ? "white" : "var(--fg)",
                }}
              >
                {task.brandName} ({task.type === "slogan" ? "Ұран" : "Мәтін"})
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Writing area & Live verification */}
        <div className="lg:col-span-2 space-y-6">
          {/* Selected Task Details */}
          <div
            className="card p-6 rounded-3xl border space-y-3"
            style={{
              background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 8%, transparent), var(--card))",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
                Бренд: {selectedTask.brandName}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--muted)]" style={{ color: "var(--muted-fg)" }}>
                {selectedTask.targetAudience}
              </span>
            </div>

            <h3 className="text-lg font-bold" style={{ color: "var(--fg)" }}>
              {selectedTask.title}
            </h3>

            <p className="text-xs leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              {selectedTask.description}
            </p>
          </div>

          {/* Textarea Input Card */}
          <div className="card p-6 rounded-3xl border space-y-4" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--fg)" }}>
                Сіздің жарнамалық мәтініңіз немесе ұраныңыз:
              </label>
              <span className="text-xs font-mono font-bold" style={{ color: "var(--muted-fg)" }}>
                {inputText.length} таңба
              </span>
            </div>

            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Мысалы: «${selectedTask.exampleGood}» сияқты жазыңыз...`}
              className="textarea w-full text-sm font-medium"
            />

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setInputText(selectedTask.exampleGood)}
                className="text-xs text-[var(--primary)] hover:underline font-semibold"
              >
                Үлгіні қойып көру
              </button>

              <button
                disabled={!inputText.trim()}
                onClick={handleSaveToPortfolio}
                className="btn btn-primary px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-2 disabled:opacity-40"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Портфолиоға сақталды!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{t.copywriter.saveToPortfolio} (+{quality.score} XP)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 5 STRICT CRITERIA REAL-TIME CHECKLIST */}
          <div className="card p-6 rounded-3xl border space-y-4" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                <h3 className="text-sm font-bold" style={{ color: "var(--fg)" }}>
                  {t.copywriter.criteriaHeader}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold" style={{ color: "var(--muted-fg)" }}>
                  Сапа көрсеткіші:
                </span>
                <span
                  className={`text-sm font-extrabold ${
                    quality.score >= 80
                      ? "text-[var(--success)]"
                      : quality.score >= 50
                      ? "text-[var(--warning)]"
                      : "text-[var(--danger)]"
                  }`}
                >
                  {quality.score} / 100%
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Criterion 1 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--muted)] text-xs">
                <span className="font-medium" style={{ color: "var(--fg)" }}>
                  {t.copywriter.criterion1}
                </span>
                {quality.lengthOk ? (
                  <span className="flex items-center gap-1 text-[var(--success)] font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Орындалды
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[var(--danger)] font-medium">
                    <XCircle className="w-4 h-4" /> {inputText.length < 10 ? "Тым қысқа" : "Тым ұзын"}
                  </span>
                )}
              </div>

              {/* Criterion 2 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--muted)] text-xs">
                <span className="font-medium" style={{ color: "var(--fg)" }}>
                  {t.copywriter.criterion2}
                </span>
                {quality.hasKazakh ? (
                  <span className="flex items-center gap-1 text-[var(--success)] font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Қазақ әріптері бар
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[var(--danger)] font-medium">
                    <XCircle className="w-4 h-4" /> Қазақ әріптерін қосыңыз
                  </span>
                )}
              </div>

              {/* Criterion 3 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--muted)] text-xs">
                <span className="font-medium" style={{ color: "var(--fg)" }}>
                  {t.copywriter.criterion3}
                </span>
                {quality.noRussianOnly ? (
                  <span className="flex items-center gap-1 text-[var(--success)] font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Таза қазақша
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[var(--danger)] font-medium">
                    <XCircle className="w-4 h-4" /> Тек орысша әріптер
                  </span>
                )}
              </div>

              {/* Criterion 4 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--muted)] text-xs">
                <span className="font-medium" style={{ color: "var(--fg)" }}>
                  {t.copywriter.criterion4} («{selectedTask.brandName}»)
                </span>
                {quality.hasBrand ? (
                  <span className="flex items-center gap-1 text-[var(--success)] font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Бренд аталған
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[var(--danger)] font-medium">
                    <XCircle className="w-4 h-4" /> Бренд атауын жазыңыз
                  </span>
                )}
              </div>

              {/* Criterion 5 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--muted)] text-xs">
                <span className="font-medium" style={{ color: "var(--fg)" }}>
                  {t.copywriter.criterion5}
                </span>
                {quality.hasRhythmOrCall ? (
                  <span className="flex items-center gap-1 text-[var(--success)] font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Шақыру етістігі бар
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[var(--danger)] font-medium">
                    <XCircle className="w-4 h-4" /> «Таңда», «ал», «қосыл» қосыңыз
                  </span>
                )}
              </div>
            </div>

            {/* Verdict */}
            <div
              className={`p-4 rounded-2xl text-xs font-semibold ${
                quality.score >= 80
                  ? "bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/30"
                  : "bg-[var(--warning)]/10 text-[var(--warning)] border border-[var(--warning)]/30"
              }`}
            >
              {quality.score >= 80 ? t.copywriter.verdictSuccess : t.copywriter.verdictNeedsWork}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Tips & Model Examples */}
        <div className="space-y-6">
          {/* Examples Card */}
          <div className="card p-6 rounded-3xl border space-y-4" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--fg)" }}>
              <BookOpen className="w-4 h-4 text-[var(--primary)]" />
              <span>Үлгілер мен қателер</span>
            </h3>

            {/* Good example */}
            <div className="p-3.5 rounded-2xl bg-[var(--success)]/10 border border-[var(--success)]/20 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--success)] block">
                Жақсы үлгі (Good):
              </span>
              <p className="text-xs font-semibold text-[var(--fg)]">
                {selectedTask.exampleGood}
              </p>
            </div>

            {/* Bad example */}
            <div className="p-3.5 rounded-2xl bg-[var(--danger)]/10 border border-[var(--danger)]/20 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--danger)] block">
                Нашар үлгі (Bad):
              </span>
              <p className="text-xs font-medium text-[var(--fg)]">
                {selectedTask.exampleBad}
              </p>
            </div>
          </div>

          {/* Practical Tips */}
          <div className="card p-6 rounded-3xl border space-y-3" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--fg)" }}>
              <Info className="w-4 h-4 text-[var(--secondary)]" />
              <span>Копирайтерге 3 кеңес:</span>
            </h3>

            <ul className="space-y-2 text-xs" style={{ color: "var(--muted-fg)" }}>
              {selectedTask.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[var(--muted)] flex items-center justify-center font-bold text-[10px] shrink-0 text-[var(--primary)]">
                    {idx + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
