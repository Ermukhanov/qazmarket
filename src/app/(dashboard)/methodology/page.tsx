"use client";

import { useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { fullWorksheets, FullWorksheet } from "@/data/worksheets-full";
import { evaluationRubrics, EvaluationRubric } from "@/data/rubrics-full";
import { officialLiterature } from "@/data/literature-full";
import NotFound from "@/app/not-found";
import {
  FileSpreadsheet,
  Download,
  Printer,
  CheckCircle2,
  Key,
  BookOpen,
  Eye,
  EyeOff,
  Check,
  Award,
  Layers,
  HelpCircle,
  Bookmark,
  Sparkles,
  Search,
} from "lucide-react";

export default function MethodologyPage() {
  const { lang, user } = useApp();
  const t = getT(lang);

  const isAuthorized = user && (user.role === "teacher" || user.role === "admin");
  if (!isAuthorized) {
    return <NotFound />;
  }

  const [activeTab, setActiveTab] = useState<"worksheets" | "rubrics" | "guide" | "literature">("worksheets");
  const [selectedWsId, setSelectedWsId] = useState<string>(fullWorksheets[0].id);
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(true);
  const [wsSearch, setWsSearch] = useState<string>("");

  const currentWs = fullWorksheets.find((w) => w.id === selectedWsId) || fullWorksheets[0];

  const filteredWorksheets = fullWorksheets.filter(
    (w) =>
      w.title.toLowerCase().includes(wsSearch.toLowerCase()) ||
      w.topic.toLowerCase().includes(wsSearch.toLowerCase()) ||
      w.number.toString().includes(wsSearch)
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadDocx = () => {
    let content = `«МАРКЕТИНГТЕГІ ҚАЗАҚ ТІЛІ» КУРСЫНЫҢ БАСПАЛЫҚ ЖҰМЫС ПАРАҒЫ\n\n`;
    content += `Тақырыбы: ${currentWs.topic}\n`;
    content += `Сыныбы: 10-сынып | Ең жоғары балл: ${currentWs.maxScore} балл\n`;
    content += `Оқушының аты-жөні: ____________________________________\n\n`;
    content += `МАҚСАТЫ:\n${currentWs.goal}\n\n`;
    content += `ТАПСЫРМАЛАР:\n`;
    currentWs.tasks.forEach((tsk) => {
      content += `\n${tsk.taskNumber}-тапсырма: ${tsk.prompt}\n`;
      tsk.details.forEach((d) => {
        content += `• ${d}\n`;
      });
      content += `Жауабыңыз үшін орын: _________________________________________________\n`;
    });

    if (showAnswerKey) {
      content += `\n\n=======================================================\nМҰҒАЛІМГЕ АРНАЛҒАН ЖАУАП КІЛТТЕРІ МЕН БАҒАЛАУ КРИТЕРИЙІ:\n`;
      currentWs.teacherAnswerKey.forEach((k) => {
        content += `Тапсырма №${k.taskNumber} (${k.maxPoints} балл):\nКритерийі: ${k.criteria}\nҮлгі жауап: ${k.sampleAnswer}\n\n`;
      });
    }

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Жұмыс_парағы_${currentWs.number}_${currentWs.title.replace(/\s+/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6 no-print">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/20 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>10. Әдістемелік құрал және жұмыс парақтары</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]">
            {t.methodology.title}
          </h1>
          <p className="text-xs md:text-sm text-[var(--muted-fg)] mt-1">
            21 баспалық жұмыс парағы (жауап кілттерімен), 9 критериалды рубрика және пайдаланылған әдебиеттер тізімі
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="btn btn-secondary text-xs flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold shadow-sm"
          >
            <Printer className="w-4 h-4 text-[var(--primary)]" />
            <span>Басып шығару</span>
          </button>

          <button
            onClick={handleDownloadDocx}
            className="btn btn-primary text-xs flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Жұмыс парағын жүктеу</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3 no-print overflow-x-auto">
        <button
          onClick={() => setActiveTab("worksheets")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
            activeTab === "worksheets"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-[var(--card)] text-[var(--muted-fg)] hover:text-[var(--fg)] border border-[var(--border-color)]"
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>21 Жұмыс парағы (Әдістемелік құрал)</span>
        </button>

        <button
          onClick={() => setActiveTab("rubrics")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
            activeTab === "rubrics"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-[var(--card)] text-[var(--muted-fg)] hover:text-[var(--fg)] border border-[var(--border-color)]"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>9 бағалау критерийі (Рубрикатор)</span>
        </button>

        <button
          onClick={() => setActiveTab("literature")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
            activeTab === "literature"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-[var(--card)] text-[var(--muted-fg)] hover:text-[var(--fg)] border border-[var(--border-color)]"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Пайдаланылған әдебиеттер</span>
        </button>

        <button
          onClick={() => setActiveTab("guide")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
            activeTab === "guide"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-[var(--card)] text-[var(--muted-fg)] hover:text-[var(--fg)] border border-[var(--border-color)]"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Әдістемелік нұсқаулық</span>
        </button>
      </div>

      {/* TAB 1: 21 FULL WORKSHEETS */}
      {activeTab === "worksheets" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Worksheets list (4 cols) */}
          <div className="lg:col-span-4 space-y-3 no-print">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
                21 Баспалық жұмыс парағы
              </span>
              <span className="text-xs font-bold text-blue-400">10-сынып</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-fg)]" />
              <input
                type="text"
                placeholder="Парақ тақырыбы бойынша іздеу..."
                value={wsSearch}
                onChange={(e) => setWsSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-[var(--card-subtle)] border border-[var(--border-color)]"
              />
            </div>

            <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
              {filteredWorksheets.map((ws) => {
                const isSelected = ws.id === selectedWsId;
                return (
                  <button
                    key={ws.id}
                    onClick={() => setSelectedWsId(ws.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-500 shadow-md"
                        : "border-[var(--border-color)] text-[var(--fg)] hover:bg-[var(--muted)]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span>№ {ws.number}-парақ</span>
                      <span className="text-[10px] opacity-80">{ws.maxScore} балл</span>
                    </div>
                    <div className="text-xs font-semibold leading-snug line-clamp-2">
                      {ws.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Worksheet Preview Canvas (8 cols) */}
          <div className="lg:col-span-8">
            <div className="card p-6 md:p-10 rounded-3xl border space-y-6 shadow-xl bg-white text-slate-900 dark:bg-[#171A36] dark:text-slate-100 print:shadow-none print:border-0 print:p-0">
              {/* Answer Key Toggle (No Print) */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 no-print">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                  Баспаға арналған жұмыс парағы (A4)
                </span>

                <button
                  onClick={() => setShowAnswerKey(!showAnswerKey)}
                  className={`btn text-xs px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                    showAnswerKey
                      ? "bg-amber-500/20 text-amber-500 border border-amber-500/40"
                      : "btn-secondary text-[var(--muted-fg)]"
                  }`}
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>{showAnswerKey ? "Жауап кілттерін жасыру" : "Мұғалім жауап кілтін ашу"}</span>
                </button>
              </div>

              {/* Printable Header */}
              <div className="text-center space-y-1 pb-4 border-b-2 border-slate-900 dark:border-slate-100">
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  «МАРКЕТИНГТЕГІ ҚАЗАҚ ТІЛІ» КУРСЫ | 10-СЫНЫП
                </div>
                <h2 className="text-lg sm:text-xl font-black uppercase">
                  ЖҰМЫС ПАРАҒЫ №{currentWs.number}: {currentWs.title}
                </h2>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {currentWs.goal}
                </div>
              </div>

              {/* Student Metadata Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold pb-2 border-b border-dashed border-slate-300 dark:border-slate-700">
                <div>Оқушының аты-жөні: _________________________________________</div>
                <div className="sm:text-right">Балы: _____ / {currentWs.maxScore} балл | Күні: «____» _________ 2026 ж.</div>
              </div>

              {/* Tasks List */}
              <div className="space-y-6">
                {currentWs.tasks.map((task) => (
                  <div key={task.taskNumber} className="space-y-2">
                    <h3 className="text-xs sm:text-sm font-extrabold flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0">
                        {task.taskNumber}
                      </span>
                      <span>{task.prompt}</span>
                    </h3>

                    {task.details && task.details.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-xs space-y-1 font-medium">
                        {task.details.map((d, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Answer writing lines */}
                    <div className="pt-2 space-y-3">
                      <div className="border-b border-dashed border-slate-300 dark:border-slate-700 h-6" />
                      <div className="border-b border-dashed border-slate-300 dark:border-slate-700 h-6" />
                      <div className="border-b border-dashed border-slate-300 dark:border-slate-700 h-6" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Teacher Answer Key Block (Toggleable) */}
              {showAnswerKey && (
                <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 space-y-3 no-print">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
                    <Key className="w-4 h-4" />
                    <span>Мұғалімге арналған жауап кілттері мен бағалау рубрикасы:</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {currentWs.teacherAnswerKey.map((key) => (
                      <div
                        key={key.taskNumber}
                        className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-amber-500/30 space-y-1"
                      >
                        <div className="flex items-center justify-between font-bold text-[var(--fg)]">
                          <span>Тапсырма №{key.taskNumber} (Ең жоғары: {key.maxPoints} балл)</span>
                          <span className="text-amber-500 text-[10px]">Критериалды үлгі</span>
                        </div>
                        <div className="text-[var(--muted-fg)]">
                          <strong>Критерий:</strong> {key.criteria}
                        </div>
                        <div className="text-emerald-500">
                          <strong>Үлгі жауап:</strong> {key.sampleAnswer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 9 EVALUATION RUBRICS */}
      {activeTab === "rubrics" && (
        <div className="space-y-6">
          <div className="card p-6 md:p-8 rounded-3xl border space-y-2">
            <h3 className="text-xl font-extrabold text-[var(--fg)] flex items-center gap-2">
              <Award className="w-6 h-6 text-purple-400" />
              <span>«Маркетингтегі қазақ тілі» курсының 9 бағалау критерийі</span>
            </h3>
            <p className="text-xs text-[var(--muted-fg)] leading-relaxed">
              Авторлық бағдарлама аясында қазақ тілінің маркетингтік коммуникацияларда қолданылуын бағалау үшін қолданылатын ресми өлшемдер мен дескрипторлар жүйесі.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evaluationRubrics.map((rubric) => (
              <div
                key={rubric.id}
                className="card p-6 rounded-3xl border flex flex-col justify-between space-y-4 hover:border-purple-500/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 font-black text-xs flex items-center justify-center">
                      0{rubric.number}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                      10 баллдық жүйе
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-[var(--fg)] leading-snug">
                    {rubric.title}
                  </h4>

                  <p className="text-xs text-[var(--muted-fg)] leading-relaxed">
                    {rubric.description}
                  </p>

                  <div className="pt-2 border-t border-[var(--border-color)] space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                      Бағалау дескрипторлары:
                    </span>
                    {rubric.indicators.map((ind, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-2 text-[11px] text-[var(--fg)]">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: OFFICIAL LITERATURE */}
      {activeTab === "literature" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teachers literature */}
            <div className="card p-6 md:p-8 rounded-3xl border space-y-4">
              <h3 className="text-base font-extrabold text-[var(--fg)] flex items-center gap-2 pb-3 border-b border-[var(--border-color)]">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>Пайдаланылған әдебиеттер (Мұғалімдер үшін):</span>
              </h3>

              <div className="space-y-3">
                {officialLiterature.teachers.map((lit, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)] text-xs font-semibold text-[var(--fg)] leading-relaxed flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{lit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Students literature */}
            <div className="card p-6 md:p-8 rounded-3xl border space-y-4">
              <h3 className="text-base font-extrabold text-[var(--fg)] flex items-center gap-2 pb-3 border-b border-[var(--border-color)]">
                <Bookmark className="w-5 h-5 text-purple-400" />
                <span>Пайдаланылған әдебиеттер (Оқушылар үшін):</span>
              </h3>

              <div className="space-y-3">
                {officialLiterature.students.map((lit, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)] text-xs font-semibold text-[var(--fg)] leading-relaxed flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{lit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: METHODOLOGY GUIDE */}
      {activeTab === "guide" && (
        <div className="card p-6 md:p-8 rounded-3xl border space-y-6 leading-relaxed text-xs sm:text-sm text-[var(--fg)]">
          <h3 className="text-lg font-extrabold text-blue-400 border-b border-[var(--border-color)] pb-3">
            «Маркетингтегі қазақ тілі» курсын оқытудың әдістемелік нұсқаулығы
          </h3>
          <p>
            Бұл авторлық курстың басты міндеті — оқушылардың мемлекеттік тілде сапалы, тартымды және бәсекеге қабілетті маркетингтік контент құру дағдыларын қалыптастыру.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] space-y-1.5">
              <div className="font-bold text-blue-400">1. Практикалық бағыт:</div>
              <p className="text-xs text-[var(--muted-fg)]">
                Әрбір 45 минуттық сабақта оқушылар нақты брендтермен, слогандармен және жарнамалық посттармен жұмыс істейді.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] space-y-1.5">
              <div className="font-bold text-purple-400">2. Дескрипторлық жүйе:</div>
              <p className="text-xs text-[var(--muted-fg)]">
                Әр тапсырмада оқушыға алдын ала критериалды дескрипторлар ұсынылады, бұл өзін-өзі бағалауға мүмкіндік береді.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] space-y-1.5">
              <div className="font-bold text-emerald-400">3. Цифрлық портфолио:</div>
              <p className="text-xs text-[var(--muted-fg)]">
                Курс соңында оқушы орындаған барлық жұмыстарынан жеке маркетингтік портфолио жинақтап, ресми сертификат алады.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
