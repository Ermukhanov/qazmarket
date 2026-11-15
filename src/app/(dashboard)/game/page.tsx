"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { marketingTerms } from "@/data/terms";
import { questionsBank, QuizQuestion } from "@/data/questions";
import { marketingCases, MarketingCase } from "@/data/cases";
import {
  Gamepad2,
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Search,
  Sparkles,
  Zap,
  Timer,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Check,
} from "lucide-react";

export default function GamePage() {
  const router = useRouter();
  const { user, lang, addXp, updateProgress, progress } = useApp();
  const t = getT(lang);

  const [activeTab, setActiveTab] = useState<"terms" | "quiz" | "cases">("terms");

  // ===================== TAB 1: TERMS MATCHING GAME =====================
  const [isPlayingTerms, setIsPlayingTerms] = useState(false);
  const [termPairs, setTermPairs] = useState<{ id: string; en: string; kk: string }[]>([]);
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [matchedEnIds, setMatchedEnIds] = useState<string[]>([]);
  const [termScore, setTermScore] = useState(0);
  const [termCombo, setTermCombo] = useState(0);
  const [termTimeLeft, setTermTimeLeft] = useState(60);
  const [termSearchQuery, setTermSearchQuery] = useState("");

  const startTermsGame = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    // Pick 8 random terms from the 35+ bank
    const shuffled = [...marketingTerms].sort(() => 0.5 - Math.random()).slice(0, 8);
    setTermPairs(shuffled.map((t) => ({ id: t.id, en: t.english, kk: t.kazakh })));
    setSelectedEn(null);
    setMatchedEnIds([]);
    setTermScore(0);
    setTermCombo(0);
    setTermTimeLeft(60);
    setIsPlayingTerms(true);
  };

  const handleTermMatch = (enId: string, isEn: boolean) => {
    if (!isPlayingTerms) return;

    if (isEn) {
      setSelectedEn(enId);
    } else if (selectedEn) {
      if (selectedEn === enId) {
        // Correct pair!
        const newMatched = [...matchedEnIds, enId];
        setMatchedEnIds(newMatched);
        const newCombo = termCombo + 1;
        setTermCombo(newCombo);
        const addedPoints = 20 * newCombo;
        setTermScore((prev) => prev + addedPoints);
        addXp(addedPoints, "Терминдер ойыны жұбы табылды");
        setSelectedEn(null);

        if (newMatched.length === termPairs.length) {
          setIsPlayingTerms(false);
          addXp(100, "Терминдер ойыны толық аяқталды");
        }
      } else {
        // Wrong match
        setTermCombo(0);
        setSelectedEn(null);
      }
    }
  };

  const filteredTerms = useMemo(() => {
    if (!termSearchQuery.trim()) return marketingTerms;
    const q = termSearchQuery.toLowerCase();
    return marketingTerms.filter(
      (item) =>
        item.kazakh.toLowerCase().includes(q) ||
        item.english.toLowerCase().includes(q) ||
        item.russian.toLowerCase().includes(q) ||
        (item.definition || item.definitionKk || "").toLowerCase().includes(q)
    );
  }, [termSearchQuery]);

  // ===================== TAB 2: 65+ QUESTIONS QUIZ BANK =====================
  const [quizMode, setQuizMode] = useState<"10" | "40">("10");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuiz = (mode: "10" | "40") => {
    if (!user) {
      router.push("/login");
      return;
    }
    setQuizMode(mode);
    const count = mode === "10" ? 10 : Math.min(40, questionsBank.length);
    const selected = [...questionsBank].sort(() => 0.5 - Math.random()).slice(0, count);
    setQuizQuestions(selected);
    setQuizIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
  };

  // Initialize quiz questions
  useEffect(() => {
    if (quizQuestions.length === 0 && questionsBank.length > 0) {
      const initial = [...questionsBank].sort(() => 0.5 - Math.random()).slice(0, 10);
      setQuizQuestions(initial);
    }
  }, [quizQuestions.length]);

  const currentQ = quizQuestions[quizIndex];

  const handleSelectQuizOption = (optionIndex: number) => {
    if (quizFinished) return;
    setSelectedAnswers((prev) => ({ ...prev, [quizIndex]: optionIndex }));
  };

  const handleFinishQuiz = () => {
    setQuizFinished(true);
    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    const xpEarned = correctCount * 15;
    addXp(xpEarned, `Тест нәтижесі: ${correctCount}/${quizQuestions.length}`);

    updateProgress({
      testScores: [
        {
          testId: "test_" + Date.now(),
          score: correctCount,
          total: quizQuestions.length,
          date: new Date().toISOString().split("T")[0],
        },
        ...progress.testScores,
      ],
    });
  };

  // ===================== TAB 3: MARKETING CASES =====================
  const [selectedCaseId, setSelectedCaseId] = useState(marketingCases[0].id);
  const [caseAnswers, setCaseAnswers] = useState<Record<string, number>>({});
  const [revealedCases, setRevealedCases] = useState<Record<string, boolean>>({});

  const currentCase = marketingCases.find((c) => c.id === selectedCaseId) || marketingCases[0];

  const handleSelectCaseOption = (optIndex: number) => {
    setCaseAnswers((prev) => ({ ...prev, [currentCase.id]: optIndex }));
    setRevealedCases((prev) => ({ ...prev, [currentCase.id]: true }));
    addXp(40, `«${currentCase.company}» маркетингтік кейсі талданды`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20 mb-2">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>06. Маркетинг ойыны</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]">
            {t.game.title}
          </h1>
          <p className="text-xs md:text-sm text-[var(--muted-fg)] mt-1">
            {t.game.subtitle}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center p-1 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)]">
          <button
            onClick={() => setActiveTab("terms")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "terms"
                ? "bg-purple-600 text-white shadow-md"
                : "text-[var(--muted-fg)] hover:text-[var(--fg)]"
            }`}
          >
            {t.game.tabTerms}
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "quiz"
                ? "bg-purple-600 text-white shadow-md"
                : "text-[var(--muted-fg)] hover:text-[var(--fg)]"
            }`}
          >
            {t.game.tabQuiz}
          </button>
          <button
            onClick={() => setActiveTab("cases")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "cases"
                ? "bg-purple-600 text-white shadow-md"
                : "text-[var(--muted-fg)] hover:text-[var(--fg)]"
            }`}
          >
            {t.game.tabCases}
          </button>
        </div>
      </div>

      {/* ===== TAB 1: TERMS MATCHING GAME & DICTIONARY ===== */}
      {activeTab === "terms" && (
        <div className="space-y-8">
          <div className="card p-6 rounded-3xl border space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
              <div>
                <h3 className="text-lg font-bold text-[var(--fg)] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>Терминдерді жылдам сәйкестендіру ойыны</span>
                </h3>
                <p className="text-xs text-[var(--muted-fg)] mt-0.5">
                  Ағылшын тіліндегі терминді оның қазақша баламасымен жұптастырыңыз
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[10px] text-[var(--muted-fg)] uppercase font-bold">Ұпай</div>
                  <div className="text-xl font-black text-purple-400">{termScore} XP</div>
                </div>
                {termCombo > 1 && (
                  <div className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-400 text-xs font-black animate-pulse">
                    x{termCombo} Комбо!
                  </div>
                )}
                {!isPlayingTerms ? (
                  <button
                    onClick={startTermsGame}
                    className="btn btn-primary text-xs px-5 py-2.5 rounded-xl font-bold"
                  >
                    {t.game.startBtn}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPlayingTerms(false)}
                    className="btn btn-secondary text-xs px-4 py-2 rounded-xl"
                  >
                    {t.game.finishBtn}
                  </button>
                )}
              </div>
            </div>

            {/* Game Board */}
            {isPlayingTerms ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* English Column */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
                    Ағылшын терминдері
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {termPairs.map((p) => {
                      const matched = matchedEnIds.includes(p.id);
                      const isSel = selectedEn === p.id;
                      return (
                        <button
                          key={"en_" + p.id}
                          disabled={matched}
                          onClick={() => handleTermMatch(p.id, true)}
                          className={`p-3.5 rounded-xl border text-sm font-bold text-left transition-all ${
                            matched
                              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 opacity-60"
                              : isSel
                              ? "bg-purple-600 text-white border-purple-500 shadow-md scale-[1.02]"
                              : "border-[var(--border-color)] text-[var(--fg)] hover:bg-[var(--muted)]"
                          }`}
                        >
                          {p.en}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Kazakh Column (Shuffled) */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
                    Қазақша баламалары
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {[...termPairs]
                      .sort((a, b) => a.kk.localeCompare(b.kk))
                      .map((p) => {
                        const matched = matchedEnIds.includes(p.id);
                        return (
                          <button
                            key={"kk_" + p.id}
                            disabled={matched}
                            onClick={() => handleTermMatch(p.id, false)}
                            className={`p-3.5 rounded-xl border text-sm font-bold text-left transition-all ${
                              matched
                                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 opacity-60"
                                : "border-[var(--border-color)] text-[var(--fg)] hover:bg-[var(--muted)] hover:border-purple-500"
                            }`}
                          >
                            {p.kk}
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center">
                  <Gamepad2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[var(--fg)]">
                    Ойынды бастауға дайынсыз ба?
                  </h4>
                  <p className="text-xs text-[var(--muted-fg)] max-w-md mx-auto mt-1">
                    Әрбір дұрыс табылған термин үшін комбо-ұпайлар беріледі. 35+ кәсіби маркетинг терминін есте сақтаңыз.
                  </p>
                </div>
                <button
                  onClick={startTermsGame}
                  className="btn btn-primary text-sm px-6 py-3 rounded-2xl font-bold shadow-lg shadow-purple-600/30"
                >
                  Ойынды бастау (+100 XP)
                </button>
              </div>
            )}
          </div>

          {/* 35+ Marketing Terms Dictionary */}
          <div className="card p-6 rounded-3xl border space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <span>35+ Кәсіби маркетинг сөздігі (KK / EN / RU)</span>
                </h3>
                <p className="text-xs text-[var(--muted-fg)] mt-0.5">
                  Мемлекеттік тілдегі кәсіби анықтамалар мен қолданыс мысалдары
                </p>
              </div>

              {/* Search bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--muted-fg)]" />
                <input
                  type="text"
                  value={termSearchQuery}
                  onChange={(e) => setTermSearchQuery(e.target.value)}
                  placeholder={t.game.dictionarySearch}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTerms.map((term) => (
                <div
                  key={term.id}
                  className="p-4 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] space-y-2 text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-purple-400">{term.kazakh}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-bold uppercase">
                      {term.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--muted-fg)]">
                    EN: <strong className="text-[var(--fg)]">{term.english}</strong> | RU: {term.russian}
                  </div>
                  <p className="text-xs text-[var(--fg)] leading-relaxed pt-1">
                    {term.definition || term.definitionKk}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== TAB 2: 65+ QUESTIONS QUIZ BANK ===== */}
      {activeTab === "quiz" && (
        <div className="space-y-6">
          {/* Quiz Mode Switcher */}
          <div className="card p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span>Маркетингтік тесттер банкі (Барлығы 65+ сұрақ)</span>
              </h3>
              <p className="text-xs text-[var(--muted-fg)] mt-0.5">
                Кездейсоқ таңдалған сұрақтар бойынша біліміңізді тексеріңіз
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => startQuiz("10")}
                className={`btn text-xs px-4 py-2 rounded-xl font-bold transition-all ${
                  quizMode === "10" ? "btn-primary shadow-md" : "btn-secondary"
                }`}
              >
                10 сұрақ (Жедел тест)
              </button>
              <button
                onClick={() => startQuiz("40")}
                className={`btn text-xs px-4 py-2 rounded-xl font-bold transition-all ${
                  quizMode === "40" ? "btn-primary shadow-md" : "btn-secondary"
                }`}
              >
                40 сұрақ (Толық емтихан)
              </button>
            </div>
          </div>

          {/* Active Question Card */}
          {currentQ && !quizFinished && (
            <div className="card p-6 md:p-8 rounded-3xl border space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400">
                  {currentQ.topicTitle || currentQ.topic || "Маркетинг"}
                </span>
                <span className="text-xs font-bold text-[var(--muted-fg)]">
                  Сұрақ {quizIndex + 1} / {quizQuestions.length}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[var(--fg)] leading-relaxed">
                {currentQ.question || currentQ.text}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedAnswers[quizIndex] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectQuizOption(i)}
                      className={`w-full p-4 rounded-2xl border text-sm font-semibold text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-purple-600 text-white border-purple-500 shadow-md"
                          : "border-[var(--border-color)] text-[var(--fg)] hover:bg-[var(--muted)]"
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />}
                    </button>
                  );
                })}
              </div>

              {/* Navigation Bar */}
              <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                <button
                  onClick={() => setQuizIndex((prev) => Math.max(0, prev - 1))}
                  disabled={quizIndex === 0}
                  className="btn btn-secondary text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 disabled:opacity-40"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t.game.prevQuestion}</span>
                </button>

                {quizIndex < quizQuestions.length - 1 ? (
                  <button
                    onClick={() => setQuizIndex((prev) => prev + 1)}
                    className="btn btn-primary text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-1.5"
                  >
                    <span>{t.game.nextQuestion}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishQuiz}
                    className="btn btn-primary text-xs px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg"
                  >
                    {t.game.finishQuiz}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Quiz Results Summary */}
          {quizFinished && (
            <div className="card p-8 rounded-3xl border text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-black text-2xl">
                ✓
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-[var(--fg)]">
                  Тест сәтті аяқталды!
                </h3>
                <p className="text-sm text-[var(--muted-fg)]">
                  Сіз {quizQuestions.length} сұрақтың{" "}
                  <strong className="text-purple-400 font-extrabold">
                    {Object.entries(selectedAnswers).filter(([idx, ans]) => quizQuestions[Number(idx)].correctIndex === ans).length}
                  </strong>
                  -не дұрыс жауап бердіңіз.
                </p>
              </div>

              {/* Error Review */}
              <div className="text-left space-y-3 pt-4 border-t border-[var(--border-color)] max-h-96 overflow-y-auto">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
                  Сұрақтар мен қателерді талдау
                </h4>
                {quizQuestions.map((q, idx) => {
                  const userAns = selectedAnswers[idx];
                  const isCorrect = userAns === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        isCorrect
                          ? "bg-emerald-500/10 border-emerald-500/30"
                          : "bg-red-500/10 border-red-500/30"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        )}
                        <span className="font-bold text-[var(--fg)]">{q.question || q.text}</span>
                      </div>
                      <div className="text-[11px] text-[var(--muted-fg)] pl-6">
                        Дұрыс жауап: <strong className="text-emerald-400">{q.options[q.correctIndex]}</strong>
                      </div>
                      <div className="text-[11px] text-purple-300 pl-6 italic">
                        Түсіндірме: {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => startQuiz(quizMode)}
                className="btn btn-primary text-sm px-6 py-3 rounded-2xl font-bold"
              >
                Қайта тапсыру
              </button>
            </div>
          )}
        </div>
      )}

      {/* ===== TAB 3: MARKETING CASES ===== */}
      {activeTab === "cases" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Case List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] px-2">
              10 Отандық және әлемдік кейстер
            </h4>
            <div className="space-y-2">
              {marketingCases.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    selectedCaseId === c.id
                      ? "bg-purple-600 text-white border-purple-500 shadow-md"
                      : "border-[var(--border-color)] text-[var(--fg)] hover:bg-[var(--muted)]"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>{c.company}</span>
                    <span className="text-[10px] opacity-80">№{i + 1}</span>
                  </div>
                  <div className="text-[11px] opacity-80 truncate mt-0.5">{c.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Case Details & Decision (8 cols) */}
          <div className="lg:col-span-8">
            <div className="card p-6 md:p-8 rounded-3xl border space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--fg)]">{currentCase.company || currentCase.brandName}</h3>
                    <span className="text-[11px] text-purple-400 font-semibold">{currentCase.title}</span>
                  </div>
                </div>
              </div>

              {/* Scenario */}
              <div className="p-4 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] text-xs leading-relaxed text-[var(--fg)]">
                <span className="font-bold text-purple-400 block mb-1 uppercase tracking-wide">
                  Жағдаят (Кейс сипаттамасы):
                </span>
                {currentCase.scenario}
              </div>

              {/* Options */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-wide">
                  Сіз маркет-директор болсаңыз, қандай шешім қабылдар едіңіз?
                </span>
                {currentCase.options.map((opt, i) => {
                  const isChosen = caseAnswers[currentCase.id] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectCaseOption(i)}
                      className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-semibold text-left transition-all ${
                        isChosen
                          ? "bg-purple-600 text-white border-purple-500 shadow-md"
                          : "border-[var(--border-color)] text-[var(--fg)] hover:bg-[var(--muted)]"
                      }`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {/* Expert Verdict */}
              {revealedCases[currentCase.id] && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
                    <Sparkles className="w-4 h-4" />
                    <span>{t.game.expertVerdict}</span>
                  </div>
                  <p className="text-xs text-[var(--fg)] leading-relaxed">
                    {currentCase.explanation || currentCase.expertExplanation}
                  </p>
                  <div className="pt-2 border-t border-purple-500/20 text-[11px] text-emerald-400 font-semibold">
                    💡 Басты сабақ: {currentCase.keyTakeaway || currentCase.marketingLesson}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
