"use client";

import { useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { lessonPlans, LessonPlan } from "@/data/lesson-plans";
import { generateOrder130Docx } from "@/lib/docx-generator";
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
  FileText,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function LessonPlansPage() {
  const { lang } = useApp();
  const t = getT(lang);

  const [selectedPlanId, setSelectedPlanId] = useState<string>(lessonPlans[0].id);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportingDocx, setIsExportingDocx] = useState<boolean>(false);

  const currentPlan = lessonPlans.find((p) => p.id === selectedPlanId) || lessonPlans[0];

  const handleCopyText = () => {
    let txt = `ҚЫСҚА МЕРЗІМДІ САБАҚ ЖОСПАРЫ (№ 130 бұйрық бойынша)\n\n`;
    txt += `Бөлім: Маркетингтегі қазақ тілі\n`;
    txt += `Педагог: Сарсенова Ақкүміс Піржанқызы\n`;
    txt += `Сынып: 10-сынып | Қатысушылар: 24\n`;
    txt += `Тақырыбы: ${currentPlan.title}\n`;
    txt += `Оқу мақсаттары: ${currentPlan.objective}\n`;
    txt += `Сабақтың мақсаты: ${currentPlan.expectedOutcome}\n\n`;
    txt += `САБАҚТЫҢ БАРЫСЫ (10+25+10 минут):\n`;
    currentPlan.stages.forEach((st) => {
      txt += `\n[${st.time}] ${st.name}\n`;
      txt += `Педагогтің әрекеті: ${st.teacherActivity}\n`;
      txt += `Оқушының әрекеті: ${st.studentActivity}\n`;
      txt += `Бағалау: ${st.formativeAssessment}\n`;
    });
    txt += `\nҮй тапсырмасы: ${currentPlan.homework}\n`;

    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDocx = async () => {
    try {
      setIsExportingDocx(true);
      await generateOrder130Docx(currentPlan);
    } catch (e) {
      console.error("DOCX generation error:", e);
      alert("DOCX дайындау барысында қате орын алды.");
    } finally {
      setIsExportingDocx(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const directions11 = [
    "1. Сабақтың құрылымы және уақытты ұтымды пайдалану (10+25+10 минут)",
    "2. Сабақ мақсаты мен күтілетін нәтиженің нақтылығы",
    "3. Оқыту әдістері мен ресурстарды тиімді қолдану",
    "4. Тапсырмалардың оқу мақсатына сәйкестігі мен дескрипторлар жүйесі",
    "5. Функционалдық сауаттылықты дамыту, сабақ барысында қолдану",
    "6. Цифрлық білім беру ресурстарын (QAZMARKET) қолдану",
    "7. Саралауды пайдалану (саралау тапсырмалары әр тапсырманың ішінде болу керек)",
    "8. Білім алушылардың өзара әрекеттесуі (жұптық, топтық жұмыстар)",
    "9. Бағалау әдістері мен құралдарын (ҚБ әдістері) қолдану",
    "10. «Адал азамат» құндылықтарын іске асыру",
    "11. Сабақ бойынша рефлексия жасау және кері байланыс беру",
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6 no-print">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/20 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>09. Сабақ жоспарлары</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]">
            {t.lessonPlans.title}
          </h1>
          <p className="text-xs md:text-sm text-[var(--muted-fg)] mt-1">
            {t.lessonPlans.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleCopyText}
            className="btn btn-secondary text-xs px-3.5 py-2.5 rounded-xl border flex items-center gap-1.5"
            title="Мәтінді көшіру"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.lessonPlans.copiedSuccess : t.lessonPlans.copyPlan}</span>
          </button>

          <button
            onClick={handlePrint}
            className="btn btn-secondary text-xs px-3.5 py-2.5 rounded-xl border flex items-center gap-1.5"
            title="Басып шығару"
          >
            <Printer className="w-4 h-4" />
            <span>{t.lessonPlans.print}</span>
          </button>

          <button
            onClick={handleDownloadDocx}
            disabled={isExportingDocx}
            className="btn btn-primary text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md"
            title="№ 130 бұйрық үлгісіндегі DOCX файлын жүктеу"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingDocx ? "Дайындалуда..." : t.lessonPlans.downloadDocx}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Lesson Selector Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-3 no-print">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
              17 Сабақ тақырыптары
            </span>
            <span className="text-xs font-bold text-blue-400">10-сынып</span>
          </div>

          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {lessonPlans.map((p) => {
              const isSelected = p.id === selectedPlanId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlanId(p.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-500 shadow-md"
                      : "border-[var(--border-color)] text-[var(--fg)] hover:bg-[var(--muted)]"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>Сабақ №{p.number}</span>
                    <span className="text-[10px] opacity-80">{p.duration}</span>
                  </div>
                  <div className="text-xs font-semibold leading-snug line-clamp-2">
                    {p.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lesson Plan Document View (8 cols) */}
        <div className="lg:col-span-8">
          <div className="card p-6 md:p-8 rounded-3xl border space-y-6 text-left shadow-xl bg-white text-slate-900 dark:bg-[#14112c] dark:text-slate-100">
            {/* Document Header (Order 130 Format) */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
              <span className="italic text-slate-500">Тексерілді: ________________</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                «№6 Хромтау гимназиясы» КММ
              </span>
            </div>

            {/* Passport Table */}
            <div className="border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
              <div className="grid grid-cols-12 border-b border-slate-300 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-900/40">
                <div className="col-span-4 font-bold text-slate-500 dark:text-slate-400">Бөлім:</div>
                <div className="col-span-8 font-semibold">Маркетингтегі қазақ тілі</div>
              </div>
              <div className="grid grid-cols-12 border-b border-slate-300 dark:border-slate-700 p-2.5">
                <div className="col-span-4 font-bold text-slate-500 dark:text-slate-400">Педагогтің аты-жөні:</div>
                <div className="col-span-8 font-semibold">Сарсенова Ақкүміс Піржанқызы</div>
              </div>
              <div className="grid grid-cols-12 border-b border-slate-300 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-900/40">
                <div className="col-span-4 font-bold text-slate-500 dark:text-slate-400">Сынып / Қатысушылар:</div>
                <div className="col-span-8">10-сынып | Қатысқандар: 24 | Қатыспағандар: 0</div>
              </div>
              <div className="grid grid-cols-12 border-b border-slate-300 dark:border-slate-700 p-2.5">
                <div className="col-span-4 font-bold text-slate-500 dark:text-slate-400">Сабақтың тақырыбы:</div>
                <div className="col-span-8 font-bold text-blue-600 dark:text-blue-400">{currentPlan.title}</div>
              </div>
              <div className="grid grid-cols-12 border-b border-slate-300 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-900/40">
                <div className="col-span-4 font-bold text-slate-500 dark:text-slate-400">Оқу мақсаттары:</div>
                <div className="col-span-8">{currentPlan.objective}</div>
              </div>
              <div className="grid grid-cols-12 p-2.5">
                <div className="col-span-4 font-bold text-slate-500 dark:text-slate-400">Сабақтың мақсаты:</div>
                <div className="col-span-8 font-medium">{currentPlan.expectedOutcome}</div>
              </div>
            </div>

            {/* Stages Table (10+25+10 min) */}
            <div className="space-y-3">
              <h4 className="text-sm font-extrabold text-[var(--fg)] uppercase tracking-wide">
                Сабақтың барысы (10 + 25 + 10 минут)
              </h4>

              <div className="border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
                <div className="grid grid-cols-12 bg-slate-100 dark:bg-slate-800 p-2.5 font-bold border-b border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <div className="col-span-3">Кезең/уақыт</div>
                  <div className="col-span-4">Педагогтің әрекеті</div>
                  <div className="col-span-3">Оқушының әрекеті</div>
                  <div className="col-span-2">Бағалау</div>
                </div>

                {currentPlan.stages.map((stage, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-12 p-3 border-b last:border-b-0 border-slate-200 dark:border-slate-800 leading-relaxed ${
                      idx % 2 === 1 ? "bg-slate-50/60 dark:bg-slate-900/20" : ""
                    }`}
                  >
                    <div className="col-span-3 pr-2">
                      <div className="font-bold text-blue-600 dark:text-blue-400">{stage.time}</div>
                      <div className="text-[11px] text-slate-500">{stage.name}</div>
                    </div>
                    <div className="col-span-4 pr-2 text-slate-700 dark:text-slate-300">
                      {stage.teacherActivity}
                    </div>
                    <div className="col-span-3 pr-2 text-slate-700 dark:text-slate-300">
                      {stage.studentActivity}
                    </div>
                    <div className="col-span-2 font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">
                      {stage.formativeAssessment}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 11 Directions of Lesson Analysis (Order 130 Requirement) */}
            <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 space-y-3 text-xs">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                Сабақты талдаудың 11 бағыты (№ 130 бұйрық бойынша):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                {directions11.map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rubrics & Homework */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Бағалау критерийлері:</span>
                {currentPlan.assessmentRubric?.[0]?.descriptors?.map((d, i) => (
                  <div key={i} className="text-slate-600 dark:text-slate-400">
                    • {d}
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Үй тапсырмасы:</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {currentPlan.homework}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
