"use client";

import { useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { lessonPlans, LessonPlan } from "@/data/lesson-plans";
import {
  GraduationCap,
  Copy,
  Check,
  Download,
  Printer,
  Clock,
  Layers,
  Target,
  CheckCircle2,
  BookOpen,
  FileText,
  Award,
} from "lucide-react";

export default function LessonPlansPage() {
  const { lang } = useApp();
  const t = getT(lang);

  const [selectedPlanId, setSelectedPlanId] = useState<string>(lessonPlans[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const currentPlan = lessonPlans.find((p) => p.id === selectedPlanId) || lessonPlans[0];

  const generatePlanText = (plan: LessonPlan) => {
    let txt = `ҚАЗАҚ ТІЛІ ЖӘНЕ МАРКЕТИНГ КУРСЫ БОЙЫНША ҚЫСҚА МЕРЗІМДІ САБАҚ ЖОСПАРЫ\n\n`;
    txt += `Сабақ №${plan.number}: ${plan.title}\n`;
    txt += `Сыныбы: ${plan.grade} | Ұзақтығы: ${plan.duration}\n\n`;
    txt += `1. Сабақтың мақсаты:\n${plan.objective}\n\n`;
    txt += `2. Күтілетін нәтиже:\n${plan.expectedOutcome}\n\n`;
    txt += `3. Сабақтың кезең-кезеңімен құрылымы (45 минут):\n`;
    plan.stages.forEach((st) => {
      txt += `\n[${st.time}] ${st.name}\n`;
      txt += `- Мұғалімнің іс-әрекеті: ${st.teacherActivity}\n`;
      txt += `- Оқушының іс-әрекеті: ${st.studentActivity}\n`;
      txt += `- Қалыптастырушы бағалау: ${st.formativeAssessment}\n`;
    });
    txt += `\n4. Бағалау критерийлері:\n`;
    plan.assessmentRubric.forEach((rub) => {
      txt += `\nКритерий: ${rub.criteria}\n`;
      rub.descriptors.forEach((desc) => {
        txt += `  • ${desc}\n`;
      });
    });
    txt += `\n5. Үй тапсырмасы:\n${plan.homework}\n`;
    return txt;
  };

  const handleCopy = async () => {
    try {
      const text = generatePlanText(currentPlan);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownloadDocx = () => {
    const text = generatePlanText(currentPlan);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Сабақ_жоспары_${currentPlan.number}_${currentPlan.title.replace(/\s+/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b no-print" style={{ borderColor: "var(--border-color)" }}>
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-2"
            style={{
              background: "color-mix(in srgb, var(--primary) 15%, transparent)",
              color: "var(--primary)",
            }}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>09-бөлім • {t.nav.lessonPlans}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {t.lessonPlans.title}
          </h1>
          <p className="text-xs md:text-sm mt-1" style={{ color: "var(--muted-fg)" }}>
            {t.lessonPlans.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="btn btn-secondary text-xs flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[var(--success)]" />
                <span>Көшірілді!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[var(--primary)]" />
                <span>{t.lessonPlans.copyPlan}</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadDocx}
            className="btn btn-primary text-xs flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>{t.lessonPlans.downloadDocx}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="p-2.5 rounded-xl border hover:bg-[var(--muted)] transition-colors"
            title="Басып шығару"
            aria-label="Басып шығару"
          >
            <Printer className="w-4 h-4" style={{ color: "var(--fg)" }} />
          </button>
        </div>
      </div>

      {/* Lesson Plan Selector Grid (10 plans) */}
      <div className="space-y-2 no-print">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
          10 дайын авторлық сабақ жоспары:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {lessonPlans.map((lp) => {
            const isSelected = selectedPlanId === lp.id;
            return (
              <button
                key={lp.id}
                onClick={() => setSelectedPlanId(lp.id)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[72px] ${
                  isSelected
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 ring-2 ring-[var(--primary)]/20"
                    : "bg-[var(--card)] hover:bg-[var(--muted)]"
                }`}
                style={{
                  borderColor: isSelected ? "var(--primary)" : "var(--border-color)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-[var(--muted)] text-[var(--primary)]">
                    №{lp.number}
                  </span>
                  <span className="text-[9px] text-[var(--muted-fg)]">45 мин</span>
                </div>
                <p className="text-xs font-bold line-clamp-1 mt-1" style={{ color: "var(--fg)" }}>
                  {lp.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* LESSON PLAN DETAIL VIEW */}
      <div
        className="card p-6 md:p-10 rounded-3xl border space-y-8 print:border-none print:shadow-none print:p-0"
        style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
      >
        {/* Title banner */}
        <div className="p-6 rounded-2xl bg-[var(--muted)] border space-y-2" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
              {t.lessonPlans.planNumber} {currentPlan.number} • Қысқа мерзімді сабақ жоспары (ҚМЖ)
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--card)] border" style={{ borderColor: "var(--border-color)" }}>
              {currentPlan.duration}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-black" style={{ color: "var(--fg)" }}>
            {currentPlan.title}
          </h2>

          <p className="text-xs text-[var(--muted-fg)]">
            Бағыты: {currentPlan.topic} • Сынып: {currentPlan.grade}
          </p>
        </div>

        {/* Goals & Expected Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border space-y-2" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
            <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-[var(--primary)]">
              <Target className="w-4 h-4" />
              <span>{t.lessonPlans.objective}</span>
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
              {currentPlan.objective}
            </p>
          </div>

          <div className="p-5 rounded-2xl border space-y-2" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
            <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-[var(--success)]">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.lessonPlans.expectedOutcome}</span>
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
              {currentPlan.expectedOutcome}
            </p>
          </div>
        </div>

        {/* Resources & Competencies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[var(--muted)] text-xs space-y-1.5">
            <span className="font-bold uppercase tracking-wider text-[var(--muted-fg)] block">
              Қалыптасатын негізгі дағдылар:
            </span>
            <ul className="space-y-1">
              {currentPlan.competencies.map((comp, idx) => (
                <li key={idx} className="flex items-center gap-2 font-medium" style={{ color: "var(--fg)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--muted)] text-xs space-y-1.5">
            <span className="font-bold uppercase tracking-wider text-[var(--muted-fg)] block">
              Қолданылатын әдіс-тәсілдер мен ресурстар:
            </span>
            <p className="font-medium" style={{ color: "var(--fg)" }}>
              {currentPlan.methods.join(", ")}. Ресурстар: {currentPlan.resources.join(", ")}.
            </p>
          </div>
        </div>

        {/* Stages Table (Minute-by-minute breakdown) */}
        <div className="space-y-3">
          <h3 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--fg)" }}>
            <Clock className="w-5 h-5 text-[var(--primary)]" />
            <span>{t.lessonPlans.stagesTable}</span>
          </h3>

          <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border-color)" }}>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[var(--muted)] border-b" style={{ borderColor: "var(--border-color)" }}>
                  <th className="p-3.5 font-bold uppercase tracking-wider w-20">{t.lessonPlans.stageTime}</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider w-40">{t.lessonPlans.stageName}</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider">{t.lessonPlans.teacherActivity}</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider">{t.lessonPlans.studentActivity}</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider w-36">{t.lessonPlans.assessment}</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--border-color)" }}>
                {currentPlan.stages.map((st, idx) => (
                  <tr key={idx} className="hover:bg-[var(--muted)]/50 transition-colors">
                    <td className="p-3.5 font-bold text-[var(--primary)] whitespace-nowrap">
                      {st.time}
                    </td>
                    <td className="p-3.5 font-bold" style={{ color: "var(--fg)" }}>
                      {st.name}
                    </td>
                    <td className="p-3.5 leading-relaxed" style={{ color: "var(--fg)" }}>
                      {st.teacherActivity}
                    </td>
                    <td className="p-3.5 leading-relaxed text-[var(--muted-fg)]">
                      {st.studentActivity}
                    </td>
                    <td className="p-3.5 font-medium text-[var(--success)]">
                      {st.formativeAssessment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assessment Rubrics */}
        <div className="space-y-3">
          <h3 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--fg)" }}>
            <Award className="w-5 h-5 text-[var(--warning)]" />
            <span>Бағалау критерийлері мен дескрипторлары</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPlan.assessmentRubric.map((rub, i) => (
              <div key={i} className="p-5 rounded-2xl border space-y-2 bg-[var(--muted)]" style={{ borderColor: "var(--border-color)" }}>
                <h4 className="text-xs font-bold text-[var(--fg)]">
                  {rub.criteria}
                </h4>
                <ul className="space-y-1.5 text-xs text-[var(--muted-fg)]">
                  {rub.descriptors.map((desc, di) => (
                    <li key={di} className="flex items-start gap-2">
                      <span className="text-[var(--primary)] font-bold">✓</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Homework */}
        <div className="p-5 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] block">
            {t.lessonPlans.homework}:
          </span>
          <p className="text-xs sm:text-sm font-semibold" style={{ color: "var(--fg)" }}>
            {currentPlan.homework}
          </p>
        </div>
      </div>
    </div>
  );
}
