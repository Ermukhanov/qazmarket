"use client";

import { useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { printableWorksheets, Worksheet } from "@/data/worksheets";
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
} from "lucide-react";

export default function MethodologyPage() {
  const { lang, user } = useApp();
  const t = getT(lang);

  const [activeTab, setActiveTab] = useState<"worksheets" | "rubrics" | "guide">("worksheets");
  const [selectedWsId, setSelectedWsId] = useState<string>(printableWorksheets[0].id);
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(user?.role === "teacher");

  const currentWs = printableWorksheets.find((w) => w.id === selectedWsId) || printableWorksheets[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadDocx = () => {
    let content = `QAZMARKET БАСПАЛЫҚ ЖҰМЫС ПАРАҒЫ\n\n${currentWs.title}\nТақырыбы: ${currentWs.topic}\nСыныбы: ${currentWs.grade} | Уақыты: ${currentWs.duration}\n\n`;
    content += `Мақсаты: ${currentWs.objective}\nНұсқаулық: ${currentWs.instructions}\n\nТАПСЫРМАЛАР:\n`;
    currentWs.tasks.forEach((tsk) => {
      content += `\n${tsk.number}-тапсырма. ${tsk.instruction}\n${tsk.content}\n`;
      if (tsk.options) {
        content += `Нұсқалар: ${tsk.options.join(" | ")}\n`;
      }
    });

    if (showAnswerKey) {
      content += `\n\n===============================\nМҰҒАЛІМГЕ АРНАЛҒАН ЖАУАП КІЛТТЕРІ:\n`;
      currentWs.teacherAnswerKey.forEach((k) => {
        content += `Тапсырма №${k.taskNumber}: ${k.explanation} (${k.points} балл)\n`;
      });
      content += `Жалпы балл: ${currentWs.totalPoints} балл\n`;
    }

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Жұмыс_парағы_${currentWs.number}.txt`;
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
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>10-бөлім • {t.nav.methodology}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {t.methodology.title}
          </h1>
          <p className="text-xs md:text-sm mt-1" style={{ color: "var(--muted-fg)" }}>
            {t.methodology.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="btn btn-secondary text-xs flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold shadow-sm"
          >
            <Printer className="w-4 h-4 text-[var(--primary)]" />
            <span>{t.methodology.printWorksheet}</span>
          </button>

          <button
            onClick={handleDownloadDocx}
            className="btn btn-primary text-xs flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>DOCX / Текст жүктеу</span>
          </button>
        </div>
      </div>

      {/* Main Tabs (Worksheets / Rubrics / Guide) */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[var(--muted)] no-print">
        <button
          onClick={() => setActiveTab("worksheets")}
          className={`tab px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "worksheets" ? "bg-[var(--card)] shadow-sm text-[var(--primary)]" : "text-[var(--muted-fg)]"
          }`}
        >
          {t.methodology.worksheetsTab}
        </button>
        <button
          onClick={() => setActiveTab("rubrics")}
          className={`tab px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "rubrics" ? "bg-[var(--card)] shadow-sm text-[var(--primary)]" : "text-[var(--muted-fg)]"
          }`}
        >
          {t.methodology.rubricsTab}
        </button>
        <button
          onClick={() => setActiveTab("guide")}
          className={`tab px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "guide" ? "bg-[var(--card)] shadow-sm text-[var(--primary)]" : "text-[var(--muted-fg)]"
          }`}
        >
          {t.methodology.guideTab}
        </button>
      </div>

      {/* TAB 1: 10 PRINTABLE WORKSHEETS */}
      {activeTab === "worksheets" && (
        <div className="space-y-6">
          {/* Worksheet selector pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 no-print">
            {printableWorksheets.map((w) => {
              const isSelected = selectedWsId === w.id;
              return (
                <button
                  key={w.id}
                  onClick={() => setSelectedWsId(w.id)}
                  className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between min-h-[50px] ${
                    isSelected
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 ring-2 ring-[var(--primary)]/20"
                      : "bg-[var(--card)] hover:bg-[var(--muted)]"
                  }`}
                  style={{
                    borderColor: isSelected ? "var(--primary)" : "var(--border-color)",
                    color: isSelected ? "var(--primary)" : "var(--fg)",
                  }}
                >
                  <span className="truncate">Парақ №{w.number}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--muted)]">
                    10б
                  </span>
                </button>
              );
            })}
          </div>

          {/* Worksheet Paper Card */}
          <div
            className="card p-6 md:p-10 rounded-3xl border space-y-6 print:border-none print:shadow-none print:p-0"
            style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
          >
            {/* Paper Header */}
            <div className="border-b-2 pb-4 space-y-2 border-black/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold">
                <span className="uppercase text-[var(--primary)]">QAZMARKET Цифрлық білім беру платформасы</span>
                <span className="text-[var(--muted-fg)]">10-сынып • Қазақ тілі мен маркетинг</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black" style={{ color: "var(--fg)" }}>
                {currentWs.title}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-2">
                <div className="p-2 rounded-xl bg-[var(--muted)]">
                  <span className="text-[10px] text-[var(--muted-fg)] block">Оқушының аты-жөні:</span>
                  <span className="font-semibold">____________________</span>
                </div>
                <div className="p-2 rounded-xl bg-[var(--muted)]">
                  <span className="text-[10px] text-[var(--muted-fg)] block">Сыныбы:</span>
                  <span className="font-semibold">10 «_____»</span>
                </div>
                <div className="p-2 rounded-xl bg-[var(--muted)]">
                  <span className="text-[10px] text-[var(--muted-fg)] block">Күні:</span>
                  <span className="font-semibold">«____» ________ 2026 ж.</span>
                </div>
                <div className="p-2 rounded-xl bg-[var(--muted)]">
                  <span className="text-[10px] text-[var(--muted-fg)] block">Баллы:</span>
                  <span className="font-bold text-[var(--primary)]">______ / {currentWs.totalPoints} б</span>
                </div>
              </div>
            </div>

            {/* Instruction */}
            <div className="p-3.5 rounded-2xl bg-[var(--primary)]/10 text-xs font-medium text-[var(--primary)]">
              📌 {currentWs.instructions}
            </div>

            {/* Tasks List */}
            <div className="space-y-6">
              {currentWs.tasks.map((task) => (
                <div
                  key={task.number}
                  className="p-5 rounded-2xl border space-y-3 bg-[var(--muted)]"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[var(--card)] text-[var(--primary)]">
                      №{task.number} Тапсырма
                    </span>
                    <span className="text-[10px] font-bold text-[var(--muted-fg)] uppercase">
                      {task.type}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-[var(--fg)]">
                    {task.instruction}
                  </p>

                  <div className="p-4 rounded-xl bg-[var(--card)] border text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line" style={{ borderColor: "var(--border-color)", color: "var(--fg)" }}>
                    {task.content}
                  </div>

                  {task.options && (
                    <div className="flex flex-wrap gap-2 pt-1 text-xs">
                      {task.options.map((opt, oi) => (
                        <span key={oi} className="px-2.5 py-1 rounded-lg bg-[var(--card)] border font-semibold">
                          {opt}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Student Answer Space */}
                  <div className="pt-2 text-xs space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)]">
                      Оқушы жауабы:
                    </span>
                    <div className="w-full min-h-[44px] rounded-xl border border-dashed border-gray-400 bg-white/50 p-2.5 text-xs text-black">
                      {/* Blank area for print */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TEACHER ANSWER KEY COLLAPSIBLE */}
            <div className="pt-6 border-t space-y-3" style={{ borderColor: "var(--border-color)" }}>
              <div className="flex items-center justify-between no-print">
                <button
                  onClick={() => setShowAnswerKey(!showAnswerKey)}
                  className="btn btn-secondary text-xs flex items-center gap-2 py-2 px-3 rounded-xl font-bold"
                >
                  <Key className="w-4 h-4 text-[var(--warning)]" />
                  <span>{showAnswerKey ? "Жауап кілттерін жасыру" : "Мұғалімге арналған жауап кілттерін ашу"}</span>
                </button>
                <span className="text-xs text-[var(--muted-fg)]">
                  Тек мұғалімдердің тексеруіне арналған
                </span>
              </div>

              {showAnswerKey && (
                <div className="p-6 rounded-2xl bg-[var(--warning)]/10 border border-[var(--warning)]/30 space-y-3 animate-in fade-in">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--warning)] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.methodology.answerKeyHeader}</span>
                  </h4>

                  <div className="space-y-2 text-xs">
                    {currentWs.teacherAnswerKey.map((key) => (
                      <div key={key.taskNumber} className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-[var(--card)] border" style={{ borderColor: "var(--border-color)" }}>
                        <div>
                          <span className="font-bold text-[var(--primary)] mr-2">
                            Тапсырма {key.taskNumber}:
                          </span>
                          <span style={{ color: "var(--fg)" }}>{key.explanation}</span>
                        </div>
                        <span className="font-bold text-[var(--success)] shrink-0">
                          +{key.points} балл
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EVALUATION RUBRICS */}
      {activeTab === "rubrics" && (
        <div className="card p-6 md:p-8 rounded-3xl border space-y-6" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          <h3 className="text-lg font-bold" style={{ color: "var(--fg)" }}>
            Қазақ тілі мен маркетинг курсының критериалды бағалау рубрикалары (10-сынып)
          </h3>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl border space-y-2 bg-[var(--muted)]" style={{ borderColor: "var(--border-color)" }}>
              <h4 className="text-sm font-bold text-[var(--primary)]">
                1. Ұран және жарнамалық мәтінді бағалау критерийі (10 балл)
              </h4>
              <ul className="space-y-1 text-xs text-[var(--muted-fg)]">
                <li>• 9-10 балл: Ұран нақты, ырғақты, қазақ тілінің үндестік заңы мен төл әріптері мінсіз сақталған, бренд құндылығы мен әрекетке шақыру анық.</li>
                <li>• 7-8 балл: Мәтін жақсы құрылған, бірақ ырғағында немесе әрекетке шақыру етістігінде шағын кемшілік бар.</li>
                <li>• 4-6 балл: Калька сөздер кездеседі, қазақ тілінің төл әріптері толық қолданылмаған, ұран тым ұзын немесе тым қысқа.</li>
                <li>• 1-3 балл: Талаптар сақталмаған, орыс тіліндегі штамптар көп, бренд атауы жоқ.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl border space-y-2 bg-[var(--muted)]" style={{ borderColor: "var(--border-color)" }}>
              <h4 className="text-sm font-bold text-[var(--secondary)]">
                2. Бренд карточкасын бағалау критерийі (10 балл)
              </h4>
              <ul className="space-y-1 text-xs text-[var(--muted-fg)]">
                <li>• 9-10 балл: Бренд концепциясы толық (атауы, өнімі, ЦА, ұраны, құндылықтары, 2 үйлесімді түсі), ұлттық колорит пен заманауи нақыш үйлесім тапқан.</li>
                <li>• 7-8 балл: Барлық өрістер толтырылған, бірақ мақсатты аудитория сипаттамасы тым жалпылама берілген.</li>
                <li>• 4-6 балл: Бренд карточкасының кейбір бөліктері толық емес, түстер үйлесімі әлсіз.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl border space-y-2 bg-[var(--muted)]" style={{ borderColor: "var(--border-color)" }}>
              <h4 className="text-sm font-bold text-[var(--success)]">
                3. Жобаны қорғау және питчингті бағалау критерийі (10 балл)
              </h4>
              <ul className="space-y-1 text-xs text-[var(--muted-fg)]">
                <li>• 9-10 балл: Көпшілік алдында регламентті (2 мин) сақтап, қазақ тілінде еркін әрі сенімді сөйледі, аудитория сұрақтарына дәлелді жауап берді.</li>
                <li>• 7-8 балл: Баяндама мазмұнды, бірақ сөйлеу қарқынында сенімсіздік байқалады.</li>
                <li>• 4-6 балл: Тек жазылған қағаздан оқып берді, сұрақтарға жауап беруде қиналды.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: METHODOLOGICAL GUIDE */}
      {activeTab === "guide" && (
        <div className="card p-6 md:p-8 rounded-3xl border space-y-6" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          <h3 className="text-lg font-bold" style={{ color: "var(--fg)" }}>
            Мұғалімге арналған әдістемелік нұсқаулық
          </h3>

          <div className="space-y-4 text-xs leading-relaxed" style={{ color: "var(--fg)" }}>
            <p>
              <strong>Бағдарламаның жаңалығы:</strong> Бұл курс қазақ тілі сабағын дәстүрлі грамматикалық жаттығулардан практикалық маркетингтік шығармашылыққа бағыттайды. Оқушы сайтқа кіргенде жай ғана ақпарат оқымайды, өзі маркетолог, копирайтер, бренд-дизайнер және жарнама маманы ретінде жұмыс істейді.
            </p>

            <p>
              <strong>Сабақты өткізу алгоритмі:</strong>
              <br />1. Қызығушылықты ояту: сыныпты күнделікті өмірдегі жарнамаларды талдауға тарту;
              <br />2. QAZMARKET платформасындағы тиісті интерактивті модульге кіру;
              <br />3. Оқушылардың дербес немесе жұптық практикалық жұмысын ұйымдастыру;
              <br />4. Жұмыс нәтижелерін жеке цифрлық портфолиоға сақтау;
              <br />5. Әр сабақ соңында баспалық жұмыс парағымен бекіту немесе тест тапсыру.
            </p>

            <p>
              <strong>Мұғалім кабинетінің мүмкіндіктері:</strong> Мұғалім өз сыныбының бірегей кодын (мысалы 10A-MARKET) оқушыларға таратып, олардың прогресін нақты уақытта мониторинг жасай алады және нәтижелерді Excel кестесіне жүктей алады.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
