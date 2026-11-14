"use client";

import { useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { questionBank, QuizQuestion } from "@/data/questions";
import { randomShuffle } from "@/lib/utils";
import {
  HelpCircle,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Filter,
  BarChart2,
  AlertCircle,
} from "lucide-react";

export default function TestPage() {
  const { lang, progress, updateProgress, addXp } = useApp();
  const t = getT(lang);

  const [activeQuizQuestions, setActiveQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("барлығы");
  const [quizMode, setQuizMode] = useState<"random10" | "full40">("random10");

  const startQuiz = (mode: "random10" | "full40", topic = selectedTopic) => {
    let pool = [...questionBank];
    if (topic !== "барлығы") {
      pool = pool.filter((q) => q.topic === topic);
    }
    const shuffled = randomShuffle(pool);
    const count = mode === "random10" ? 10 : Math.min(40, shuffled.length);
    setActiveQuizQuestions(shuffled.slice(0, count));
    setCurrentIndex(0);
    setUserAnswers({});
    setIsFinished(false);
    setQuizMode(mode);
  };

  const handleSelectAnswer = (optionIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: optionIdx }));
  };

  const finishQuiz = () => {
    setIsFinished(true);
    // calculate score
    let correctCount = 0;
    activeQuizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) correctCount++;
    });

    const xpEarned = correctCount * 15;
    addXp(xpEarned);

    // Save test score to progress
    const record = {
      testId: crypto.randomUUID(),
      score: correctCount,
      total: activeQuizQuestions.length,
      date: new Date().toISOString(),
    };
    updateProgress({
      testScores: [record, ...progress.testScores.slice(0, 19)],
    });
  };

  const currentQ = activeQuizQuestions[currentIndex];
  const isStarted = activeQuizQuestions.length > 0;

  // Score calculations
  const correctCount = activeQuizQuestions.reduce(
    (acc, q, idx) => (userAnswers[idx] === q.correctIndex ? acc + 1 : acc),
    0
  );
  const percentage = isStarted ? Math.round((correctCount / activeQuizQuestions.length) * 100) : 0;
  const passed = percentage >= 70;

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
            <HelpCircle className="w-3.5 h-3.5" />
            <span>03-бөлім • {t.nav.test}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {t.test.title}
          </h1>
          <p className="text-xs md:text-sm mt-1" style={{ color: "var(--muted-fg)" }}>
            {t.test.subtitle} (Банкте барлығы {questionBank.length} сұрақ)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl border bg-[var(--card)]" style={{ borderColor: "var(--border-color)" }}>
            Тапсырылған тестілер: {progress.testScores.length}
          </span>
        </div>
      </div>

      {/* QUIZ SELECTION / SETUP PANEL */}
      {!isStarted && (
        <div className="card p-6 md:p-8 rounded-3xl border space-y-6" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          <div>
            <h2 className="text-lg font-bold mb-1" style={{ color: "var(--fg)" }}>
              Тестілеу режимін таңдаңыз:
            </h2>
            <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
              Сұрақтар банктен кездейсоқ түрде таңдалады және қателермен жұмыс талдауы көрсетіледі
            </p>
          </div>

          {/* Topic selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
              Тақырыптық бағыт:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                "барлығы",
                "маркетинг негіздері",
                "терминдер",
                "жарнама тілі",
                "бренд",
                "коммуникация",
              ].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                    selectedTopic === topic
                      ? "bg-[var(--primary)] text-white shadow-sm"
                      : "bg-[var(--muted)] text-[var(--muted-fg)] hover:text-[var(--fg)]"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
            <button
              onClick={() => startQuiz("random10")}
              className="p-6 rounded-2xl border text-left transition-all hover:scale-[1.02] hover:border-[var(--primary)] group"
              style={{ background: "var(--muted)", borderColor: "var(--border-color)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--primary)]/15 text-[var(--primary)] font-bold mb-3">
                10
              </div>
              <h3 className="text-base font-bold mb-1" style={{ color: "var(--fg)" }}>
                {t.test.startRandomQuiz}
              </h3>
              <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
                Жылдам білім тексеру: 10 кездейсоқ сұрақ (шамамен 8 минут)
              </p>
            </button>

            <button
              onClick={() => startQuiz("full40")}
              className="p-6 rounded-2xl border text-left transition-all hover:scale-[1.02] hover:border-[var(--secondary)] group"
              style={{ background: "var(--muted)", borderColor: "var(--border-color)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--secondary)]/15 text-[var(--secondary)] font-bold mb-3">
                40
              </div>
              <h3 className="text-base font-bold mb-1" style={{ color: "var(--fg)" }}>
                {t.test.startFullQuiz}
              </h3>
              <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
                Кешенді қорытынды сынақ: толық 40 сұрақ (шамамен 30 минут)
              </p>
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE QUIZ VIEW */}
      {isStarted && !isFinished && currentQ && (
        <div className="card p-6 md:p-8 rounded-3xl border space-y-6" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          {/* Progress bar and Question index */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span style={{ color: "var(--muted-fg)" }}>
                {t.test.questionOf} {currentIndex + 1} / {activeQuizQuestions.length}
              </span>
              <span className="capitalize px-2 py-0.5 rounded bg-[var(--muted)] text-[var(--primary)]">
                {currentQ.topic}
              </span>
            </div>
            <div className="w-full bg-[var(--muted)] h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / activeQuizQuestions.length) * 100}%`,
                  background: "var(--gradient-primary)",
                }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h2 className="text-lg md:text-xl font-extrabold leading-snug" style={{ color: "var(--fg)" }}>
              {currentQ.text}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIndex) => {
              const isSelected = userAnswers[currentIndex] === optIndex;
              return (
                <button
                  key={optIndex}
                  onClick={() => handleSelectAnswer(optIndex)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between min-h-[50px] ${
                    isSelected
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 ring-2 ring-[var(--primary)]/20"
                      : "bg-[var(--muted)] hover:bg-[var(--card)]"
                  }`}
                  style={{
                    borderColor: isSelected ? "var(--primary)" : "var(--border-color)",
                    color: "var(--fg)",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs bg-[var(--card)] border">
                      {String.fromCharCode(65 + optIndex)}
                    </span>
                    <span>{opt}</span>
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="btn btn-secondary text-xs flex items-center gap-1.5 px-4 py-2.5 rounded-xl disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4" /> Алдыңғы
            </button>

            {currentIndex < activeQuizQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="btn btn-primary text-xs font-bold text-white flex items-center gap-1.5 px-6 py-2.5 rounded-xl shadow-sm"
              >
                Келесі <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={finishQuiz}
                className="btn btn-primary text-xs font-bold text-white flex items-center gap-1.5 px-6 py-2.5 rounded-xl shadow-md bg-[var(--success)]"
              >
                {t.test.finishTest}
              </button>
            )}
          </div>

          {/* Questions numbered pagination bar */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {activeQuizQuestions.map((_, i) => {
              const answered = userAnswers[i] !== undefined;
              const isCurrent = currentIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    isCurrent
                      ? "bg-[var(--primary)] text-white shadow-sm"
                      : answered
                      ? "bg-[var(--primary)]/20 text-[var(--primary)]"
                      : "bg-[var(--muted)] text-[var(--muted-fg)]"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TEST RESULTS & ERROR REVIEW SCREEN */}
      {isFinished && (
        <div className="space-y-6">
          <div className="card p-6 md:p-8 rounded-3xl border text-center space-y-4" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
            <div
              className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-white shadow-lg ${
                passed ? "bg-[var(--success)]" : "bg-[var(--warning)]"
              }`}
            >
              {passed ? <Award className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
            </div>

            <h2 className="text-2xl font-extrabold" style={{ color: "var(--fg)" }}>
              {passed ? t.test.passed : t.test.failed}
            </h2>

            <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
              {passed
                ? "Құттықтаймыз! Сіз маркетингтік білімді жоғары деңгейде меңгердіңіз!"
                : "Нәтижені жақсартуға болады. Төмендегі қателерді мұқият талдап шығыңыз."}
            </p>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[var(--muted)] max-w-lg mx-auto text-center">
              <div>
                <span className="text-[10px] text-[var(--muted-fg)] block">Дұрыс жауап:</span>
                <span className="text-lg font-bold text-[var(--success)]">
                  {correctCount} / {activeQuizQuestions.length}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-fg)] block">Көрсеткіш:</span>
                <span className="text-lg font-bold" style={{ color: "var(--fg)" }}>
                  {percentage}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-fg)] block">Қосылған XP:</span>
                <span className="text-lg font-bold text-[var(--primary)]">
                  +{correctCount * 15} XP
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => startQuiz(quizMode)}
                className="btn btn-primary text-xs font-bold text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.test.retake}</span>
              </button>
              <button
                onClick={() => setActiveQuizQuestions([])}
                className="btn btn-secondary text-xs font-semibold px-5 py-2.5 rounded-xl"
              >
                Басқа режимге оралу
              </button>
            </div>
          </div>

          {/* Detailed Error Review List */}
          <div className="card p-6 md:p-8 rounded-3xl border space-y-4" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
            <h3 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--fg)" }}>
              <BarChart2 className="w-4 h-4 text-[var(--primary)]" />
              <span>{t.test.reviewErrors}</span>
            </h3>

            <div className="space-y-4">
              {activeQuizQuestions.map((q, idx) => {
                const userAns = userAnswers[idx];
                const isCorrect = userAns === q.correctIndex;

                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border space-y-2.5 ${
                      isCorrect ? "bg-[var(--success)]/5" : "bg-[var(--danger)]/5"
                    }`}
                    style={{
                      borderColor: isCorrect
                        ? "color-mix(in srgb, var(--success) 30%, transparent)"
                        : "color-mix(in srgb, var(--danger) 30%, transparent)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs sm:text-sm font-bold" style={{ color: "var(--fg)" }}>
                        {idx + 1}. {q.text}
                      </p>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-[var(--success)] shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-[var(--danger)] shrink-0" />
                      )}
                    </div>

                    <div className="text-xs space-y-1">
                      <p>
                        <span className="font-semibold text-[var(--muted-fg)]">Сіздің жауабыңыз: </span>
                        <span className={isCorrect ? "text-[var(--success)] font-bold" : "text-[var(--danger)] font-bold"}>
                          {userAns !== undefined ? q.options[userAns] : "Жауап берілмеді"}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p>
                          <span className="font-semibold text-[var(--muted-fg)]">Дұрыс жауап: </span>
                          <span className="text-[var(--success)] font-bold">{q.options[q.correctIndex]}</span>
                        </p>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-[var(--card)] border text-xs" style={{ borderColor: "var(--border-color)" }}>
                      <span className="font-bold text-[var(--primary)]">Түсіндірме: </span>
                      <span style={{ color: "var(--muted-fg)" }}>{q.explanation}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
