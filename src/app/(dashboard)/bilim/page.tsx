"use client";

import { useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { educationalTopics, TopicData } from "@/data/topics";
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Award,
  Clock,
  Layers,
  Search,
  Eye,
  RefreshCw,
} from "lucide-react";

export default function BilimPage() {
  const { lang, progress, updateProgress, addXp } = useApp();
  const t = getT(lang);

  const [selectedTopicId, setSelectedTopicId] = useState<string>(educationalTopics[0].id);
  const [activeTab, setActiveTab] = useState<"theory" | "match" | "quiz" | "find_kazakh" | "self_check">("theory");

  // Matching game state
  const currentTopic = educationalTopics.find((top) => top.id === selectedTopicId) || educationalTopics[0];
  const [selectedMatchTerm, setSelectedMatchTerm] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Find Kazakh state
  const [findKazakhAnswers, setFindKazakhAnswers] = useState<Record<number, string>>({});

  // Self check state
  const [showSelfAnswers, setShowSelfAnswers] = useState<Record<number, boolean>>({});

  const isCompleted = progress.completedTopics.includes(currentTopic.id);

  const handleMatchClick = (termOrMatch: string, isTerm: boolean) => {
    if (isTerm) {
      setSelectedMatchTerm(termOrMatch);
    } else if (selectedMatchTerm) {
      const pair = currentTopic.matchPairs.find(
        (p) => p.term === selectedMatchTerm && p.match === termOrMatch
      );
      if (pair) {
        setMatchedPairs((prev) => [...prev, selectedMatchTerm]);
        setSelectedMatchTerm(null);
        addXp(15);
      } else {
        setSelectedMatchTerm(null);
      }
    }
  };

  const handleCompleteTopic = () => {
    if (!isCompleted) {
      updateProgress({
        completedTopics: [...progress.completedTopics, currentTopic.id],
      });
      addXp(currentTopic.xpReward);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: "var(--border-color)" }}>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-2"
            style={{
              background: "color-mix(in srgb, var(--primary) 15%, transparent)",
              color: "var(--primary)",
            }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>01-бөлім • {t.nav.bilim}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {t.bilim.title}
          </h1>
          <p className="text-xs md:text-sm mt-1" style={{ color: "var(--muted-fg)" }}>
            {t.bilim.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold"
            style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
          >
            <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
            <span>
              {progress.completedTopics.length} / {educationalTopics.length} тақырып аяқталды
            </span>
          </div>
        </div>
      </div>

      {/* Topics selector cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {educationalTopics.map((top) => {
          const isSelected = top.id === selectedTopicId;
          const isDone = progress.completedTopics.includes(top.id);
          return (
            <button
              key={top.id}
              onClick={() => {
                setSelectedTopicId(top.id);
                setActiveTab("theory");
                setSelectedMatchTerm(null);
                setMatchedPairs([]);
                setQuizAnswers({});
                setQuizSubmitted(false);
                setFindKazakhAnswers({});
                setShowSelfAnswers({});
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[96px] ${
                isSelected ? "ring-2 shadow-sm" : "hover:bg-[var(--muted)]"
              }`}
              style={{
                background: isSelected
                  ? "color-mix(in srgb, var(--primary) 10%, var(--card))"
                  : "var(--card)",
                borderColor: isSelected ? "var(--primary)" : "var(--border-color)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-[var(--muted)]" style={{ color: "var(--muted-fg)" }}>
                  0{top.number}
                </span>
                {isDone && <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />}
              </div>
              <p className="text-xs font-bold line-clamp-2 mt-1" style={{ color: "var(--fg)" }}>
                {top.title}
              </p>
              <span className="text-[10px] flex items-center gap-1 mt-2" style={{ color: "var(--muted-fg)" }}>
                <Clock className="w-3 h-3" /> {top.estimatedTime}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Topic Banner */}
      <div
        className="card p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 12%, transparent), var(--card))",
          borderColor: "var(--border-color)",
        }}
      >
        <div>
          <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
            Тақырып №{currentTopic.number}
          </span>
          <h2 className="text-lg md:text-xl font-extrabold mt-0.5" style={{ color: "var(--fg)" }}>
            {currentTopic.title}
          </h2>
          <p className="text-xs mt-1" style={{ color: "var(--muted-fg)" }}>
            {currentTopic.shortDesc}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="px-3 py-1.5 rounded-xl bg-[var(--success)]/15 text-[var(--success)] text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Тақырып меңгерілді
            </span>
          ) : (
            <button
              onClick={handleCompleteTopic}
              className="btn btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm text-white"
            >
              <Award className="w-4 h-4" />
              <span>Тақырыпты бекіту (+{currentTopic.xpReward} XP)</span>
            </button>
          )}
        </div>
      </div>

      {/* Section Tabs (5 functional requirements from docx) */}
      <div className="flex items-center gap-1 overflow-x-auto p-1.5 rounded-2xl bg-[var(--muted)]">
        <button
          onClick={() => setActiveTab("theory")}
          className={`tab px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "theory" ? "bg-[var(--card)] shadow-sm text-[var(--primary)]" : "text-[var(--muted-fg)]"
          }`}
        >
          {t.bilim.theoryTab}
        </button>
        <button
          onClick={() => setActiveTab("match")}
          className={`tab px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "match" ? "bg-[var(--card)] shadow-sm text-[var(--primary)]" : "text-[var(--muted-fg)]"
          }`}
        >
          {t.bilim.matchTab}
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={`tab px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "quiz" ? "bg-[var(--card)] shadow-sm text-[var(--primary)]" : "text-[var(--muted-fg)]"
          }`}
        >
          {t.bilim.quizTab}
        </button>
        <button
          onClick={() => setActiveTab("find_kazakh")}
          className={`tab px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "find_kazakh" ? "bg-[var(--card)] shadow-sm text-[var(--primary)]" : "text-[var(--muted-fg)]"
          }`}
        >
          {t.bilim.findKazakhTab}
        </button>
        <button
          onClick={() => setActiveTab("self_check")}
          className={`tab px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "self_check" ? "bg-[var(--card)] shadow-sm text-[var(--primary)]" : "text-[var(--muted-fg)]"
          }`}
        >
          {t.bilim.selfCheckTab}
        </button>
      </div>

      {/* TAB CONTENT 1: THEORY */}
      {activeTab === "theory" && (
        <div className="card p-6 md:p-8 rounded-3xl border space-y-6" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          <h3 className="text-xl font-bold border-b pb-3" style={{ color: "var(--fg)", borderColor: "var(--border-color)" }}>
            {currentTopic.theory.title}
          </h3>

          <div className="space-y-6">
            {currentTopic.theory.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-base font-bold text-[var(--primary)]">
                  {sec.heading}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl border" style={{ background: "var(--muted)", borderColor: "var(--border-color)" }}>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted-fg)" }}>
              Басты қорытындылар (Key takeaways):
            </h4>
            <ul className="space-y-2">
              {currentTopic.theory.keyTakeaways.map((item, i) => (
                <li key={i} className="text-xs font-medium flex items-start gap-2" style={{ color: "var(--fg)" }}>
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: MATCHING */}
      {activeTab === "match" && (
        <div className="card p-6 md:p-8 rounded-3xl border space-y-6" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold" style={{ color: "var(--fg)" }}>
                {t.bilim.matchTab}
              </h3>
              <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
                Алдымен сол жақтан терминді, кейін оң жақтан сәйкес қазақша түсіндірмесін таңдаңыз:
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--muted)] text-[var(--primary)]">
              {matchedPairs.length} / {currentTopic.matchPairs.length} жұп табылды
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Terms */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted-fg)] block mb-1">
                Терминдер (басыңыз)
              </span>
              {currentTopic.matchPairs.map((p) => {
                const isMatched = matchedPairs.includes(p.term);
                const isSelected = selectedMatchTerm === p.term;
                return (
                  <button
                    key={p.term}
                    disabled={isMatched}
                    onClick={() => handleMatchClick(p.term, true)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold transition-all min-h-[46px] ${
                      isMatched
                        ? "opacity-40 bg-[var(--muted)] border-transparent line-through"
                        : isSelected
                        ? "border-[var(--primary)] bg-[var(--primary)]/10 ring-2 ring-[var(--primary)]/20"
                        : "hover:bg-[var(--muted)]"
                    }`}
                    style={{
                      borderColor: isSelected ? "var(--primary)" : "var(--border-color)",
                      color: "var(--fg)",
                    }}
                  >
                    {p.term}
                  </button>
                );
              })}
            </div>

            {/* Right Column: Definitions */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted-fg)] block mb-1">
                Қазақша мағынасы (жұбын басыңыз)
              </span>
              {currentTopic.matchPairs.map((p) => {
                const isMatched = matchedPairs.includes(p.term);
                return (
                  <button
                    key={p.match}
                    disabled={isMatched || !selectedMatchTerm}
                    onClick={() => handleMatchClick(p.match, false)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all min-h-[46px] ${
                      isMatched
                        ? "opacity-40 bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)] font-medium"
                        : "hover:border-[var(--primary)] hover:bg-[var(--muted)]"
                    }`}
                    style={{
                      borderColor: isMatched ? "var(--success)" : "var(--border-color)",
                      color: "var(--fg)",
                    }}
                  >
                    {p.match}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: INTERACTIVE QUIZ */}
      {activeTab === "quiz" && (
        <div className="card p-6 md:p-8 rounded-3xl border space-y-6" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
            <div>
              <h3 className="text-lg font-bold" style={{ color: "var(--fg)" }}>
                {t.bilim.quizTab}
              </h3>
              <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
                Тақырып бойынша 5 сұраққа жауап беріңіз
              </p>
            </div>
            {quizSubmitted && (
              <button
                onClick={() => {
                  setQuizAnswers({});
                  setQuizSubmitted(false);
                }}
                className="btn btn-secondary text-xs flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Қайта тапсыру
              </button>
            )}
          </div>

          <div className="space-y-6">
            {currentTopic.quiz.map((q, qIndex) => {
              const selectedOpt = quizAnswers[qIndex];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={qIndex} className="p-5 rounded-2xl border space-y-3" style={{ background: "var(--muted)", borderColor: "var(--border-color)" }}>
                  <p className="text-sm font-bold" style={{ color: "var(--fg)" }}>
                    {qIndex + 1}. {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIndex) => {
                      const isChosen = selectedOpt === optIndex;
                      let btnStyle = "border-[var(--border-color)] bg-[var(--card)]";

                      if (quizSubmitted) {
                        if (optIndex === q.correctIndex) {
                          btnStyle = "border-[var(--success)] bg-[var(--success)]/15 text-[var(--success)] font-bold";
                        } else if (isChosen && !isCorrect) {
                          btnStyle = "border-[var(--danger)] bg-[var(--danger)]/15 text-[var(--danger)]";
                        }
                      } else if (isChosen) {
                        btnStyle = "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-bold";
                      }

                      return (
                        <button
                          key={optIndex}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers((prev) => ({ ...prev, [qIndex]: optIndex }))}
                          className={`p-3 rounded-xl border text-left text-xs transition-all min-h-[44px] ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 rounded-xl bg-[var(--card)] border text-xs" style={{ borderColor: "var(--border-color)" }}>
                      <span className="font-bold text-[var(--primary)]">Түсіндірме: </span>
                      <span style={{ color: "var(--muted-fg)" }}>{q.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted && Object.keys(quizAnswers).length === currentTopic.quiz.length && (
            <button
              onClick={() => {
                setQuizSubmitted(true);
                addXp(50);
              }}
              className="btn btn-primary w-full py-3 rounded-xl text-xs font-bold text-white shadow-md"
            >
              Жауаптарды тексеру (+50 XP)
            </button>
          )}
        </div>
      )}

      {/* TAB CONTENT 4: FIND KAZAKH EQUIVALENT */}
      {activeTab === "find_kazakh" && (
        <div className="card p-6 md:p-8 rounded-3xl border space-y-6" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          <div>
            <h3 className="text-lg font-bold" style={{ color: "var(--fg)" }}>
              {t.bilim.findKazakhTab}
            </h3>
            <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
              Шетелдік маркетингтік сөздердің дұрыс қазақша баламасын таңдаңыз:
            </p>
          </div>

          <div className="space-y-4">
            {currentTopic.findKazakh.map((item, idx) => {
              const selectedAnswer = findKazakhAnswers[idx];
              const isCorrect = selectedAnswer === item.correctAnswer;

              return (
                <div key={idx} className="p-5 rounded-2xl border space-y-3" style={{ background: "var(--muted)", borderColor: "var(--border-color)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold font-mono" style={{ color: "var(--primary)" }}>
                      {item.foreignTerm}
                    </span>
                    <span className="text-[11px]" style={{ color: "var(--muted-fg)" }}>
                      Қазақша баламасы?
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {item.options.map((opt) => {
                      const isChosen = selectedAnswer === opt;
                      let btnClass = "border-[var(--border-color)] bg-[var(--card)]";
                      if (selectedAnswer) {
                        if (opt === item.correctAnswer) {
                          btnClass = "border-[var(--success)] bg-[var(--success)]/15 text-[var(--success)] font-bold";
                        } else if (isChosen && !isCorrect) {
                          btnClass = "border-[var(--danger)] bg-[var(--danger)]/15 text-[var(--danger)]";
                        }
                      }

                      return (
                        <button
                          key={opt}
                          disabled={Boolean(selectedAnswer)}
                          onClick={() => {
                            setFindKazakhAnswers((prev) => ({ ...prev, [idx]: opt }));
                            if (opt === item.correctAnswer) addXp(10);
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${btnClass}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {selectedAnswer && (
                    <p className="text-xs italic pt-1" style={{ color: "var(--muted-fg)" }}>
                      💡 {item.comment}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: SELF CHECK */}
      {activeTab === "self_check" && (
        <div className="card p-6 md:p-8 rounded-3xl border space-y-6" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          <div>
            <h3 className="text-lg font-bold" style={{ color: "var(--fg)" }}>
              {t.bilim.selfCheckTab}
            </h3>
            <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
              Сұрақтарға алдымен өзіңіз жауап беріп көріңіз, содан соң үлгі жауаппен салыстырыңыз:
            </p>
          </div>

          <div className="space-y-4">
            {currentTopic.selfCheck.map((sc, idx) => (
              <div key={idx} className="p-5 rounded-2xl border space-y-3" style={{ background: "var(--muted)", borderColor: "var(--border-color)" }}>
                <p className="text-sm font-bold" style={{ color: "var(--fg)" }}>
                  {idx + 1}. {sc.question}
                </p>

                <button
                  onClick={() => setShowSelfAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                  className="btn btn-secondary text-xs flex items-center gap-1.5 py-1.5 px-3 rounded-lg"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showSelfAnswers[idx] ? "Жауапты жасыру" : "Үлгі жауапты көру"}</span>
                </button>

                {showSelfAnswers[idx] && (
                  <div className="p-4 rounded-xl bg-[var(--card)] border text-xs leading-relaxed animate-in fade-in" style={{ borderColor: "var(--border-color)" }}>
                    <span className="font-bold text-[var(--success)]">Үлгі жауап: </span>
                    <span style={{ color: "var(--fg)" }}>{sc.sampleAnswer}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
