"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { marketingTerms, MarketingTerm } from "@/data/terms";
import { randomShuffle } from "@/lib/utils";
import {
  Gamepad2,
  Trophy,
  Timer,
  RotateCcw,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Zap,
  Volume2,
  Search,
  X,
  Award,
} from "lucide-react";

interface CardItem {
  id: string; // term-id
  content: string; // text to display
  type: "en" | "kk";
  termId: string;
}

export default function TerminderPage() {
  const { lang, progress, updateProgress, addXp } = useApp();
  const t = getT(lang);

  const [activeCategory, setActiveCategory] = useState<string>("барлығы");
  const [gameSize, setGameSize] = useState<number>(8); // 8 pairs = 16 cards
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [dictionaryOpen, setDictionaryOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Start/Restart Game
  const startNewGame = (size = gameSize, category = activeCategory) => {
    let pool = [...marketingTerms];
    if (category !== "барлығы") {
      pool = pool.filter((t) => t.category === category);
    }
    const shuffledTerms = randomShuffle(pool).slice(0, size);

    const generatedCards: CardItem[] = [];
    shuffledTerms.forEach((term) => {
      generatedCards.push({
        id: `${term.id}-en`,
        content: term.english,
        type: "en",
        termId: term.id,
      });
      generatedCards.push({
        id: `${term.id}-kk`,
        content: term.kazakh.split(",")[0], // primary kazakh word
        type: "kk",
        termId: term.id,
      });
    });

    setCards(randomShuffle(generatedCards));
    setSelectedCard(null);
    setMatchedIds([]);
    setScore(0);
    setTimer(0);
    setStreak(0);
    setIsGameActive(true);
    setIsGameOver(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive && !isGameOver) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, isGameOver]);

  // Handle Card Click
  const handleCardClick = (card: CardItem) => {
    if (!isGameActive || isGameOver) return;
    if (matchedIds.includes(card.termId)) return;
    if (selectedCard && selectedCard.id === card.id) return; // clicked same card

    if (!selectedCard) {
      setSelectedCard(card);
    } else {
      // Check match: different type and same termId
      if (selectedCard.type !== card.type && selectedCard.termId === card.termId) {
        // MATCH!
        const newMatched = [...matchedIds, card.termId];
        setMatchedIds(newMatched);
        const addedScore = 50 + streak * 15;
        setScore((prev) => prev + addedScore);
        setStreak((prev) => prev + 1);
        setSelectedCard(null);

        // Check victory
        if (newMatched.length === cards.length / 2) {
          setIsGameOver(true);
          setIsGameActive(false);
          const totalEarned = score + addedScore + Math.max(0, 100 - timer);
          addXp(totalEarned);
          if (totalEarned > progress.termGameHighScore) {
            updateProgress({ termGameHighScore: totalEarned });
          }
        }
      } else {
        // WRONG MATCH
        setStreak(0);
        setSelectedCard(null);
      }
    }
  };

  const filteredDictionary = marketingTerms.filter(
    (term) =>
      term.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.kazakh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definitionKk.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>02-бөлім • {t.nav.terminder}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {t.terminder.title}
          </h1>
          <p className="text-xs md:text-sm mt-1" style={{ color: "var(--muted-fg)" }}>
            {t.terminder.subtitle}
          </p>
        </div>

        <button
          onClick={() => setDictionaryOpen(true)}
          className="btn btn-secondary text-xs flex items-center gap-2 py-2 px-4 rounded-xl font-bold shadow-sm"
        >
          <BookOpen className="w-4 h-4 text-[var(--primary)]" />
          <span>Толық сөздікті ашу (35 термин)</span>
        </button>
      </div>

      {/* Control Panel: Categories, Game Size & Scoreboard */}
      <div className="card p-5 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {["барлығы", "негізгі", "digital", "жарнама", "бренд", "коммуникация"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                startNewGame(gameSize, cat);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                activeCategory === cat
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "bg-[var(--muted)] text-[var(--muted-fg)] hover:text-[var(--fg)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Stats Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--muted)] text-xs font-bold" style={{ color: "var(--fg)" }}>
            <Timer className="w-4 h-4 text-[var(--secondary)]" />
            <span>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--primary)]/10 text-xs font-bold text-[var(--primary)]">
            <Trophy className="w-4 h-4" />
            <span>{score} ұпай</span>
          </div>

          <button
            onClick={() => startNewGame()}
            className="p-2 rounded-xl border hover:bg-[var(--muted)] transition-colors"
            title={t.terminder.resetGame}
            aria-label={t.terminder.resetGame}
          >
            <RotateCcw className="w-4 h-4" style={{ color: "var(--fg)" }} />
          </button>
        </div>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card) => {
          const isMatched = matchedIds.includes(card.termId);
          const isSelected = selectedCard?.id === card.id;

          return (
            <button
              key={card.id}
              disabled={isMatched}
              onClick={() => handleCardClick(card)}
              className={`p-4 sm:p-5 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center min-h-[90px] sm:min-h-[110px] relative ${
                isMatched
                  ? "opacity-30 bg-[var(--success)]/10 border-[var(--success)] scale-95"
                  : isSelected
                  ? "ring-4 ring-[var(--primary)]/30 border-[var(--primary)] bg-[var(--primary)]/15 scale-105 shadow-md"
                  : "bg-[var(--card)] hover:border-[var(--primary)] hover:scale-[1.02]"
              }`}
              style={{
                borderColor: isMatched
                  ? "var(--success)"
                  : isSelected
                  ? "var(--primary)"
                  : "var(--border-color)",
              }}
            >
              <span
                className={`text-[9px] font-bold uppercase tracking-wider mb-1 px-1.5 py-0.5 rounded ${
                  card.type === "en"
                    ? "bg-blue-500/10 text-blue-500"
                    : "bg-purple-500/10 text-purple-500"
                }`}
              >
                {card.type === "en" ? "English" : "Қазақша"}
              </span>

              <span
                className="text-xs sm:text-sm font-extrabold line-clamp-2"
                style={{ color: "var(--fg)" }}
              >
                {card.content}
              </span>

              {isMatched && (
                <CheckCircle2 className="w-4 h-4 text-[var(--success)] absolute top-2 right-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Victory Dialog */}
      {isGameOver && (
        <div className="overlay animate-in fade-in">
          <div className="dialog text-center space-y-4" style={{ background: "var(--card)", color: "var(--fg)" }}>
            <div className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center bg-[var(--warning)]/20 text-[var(--warning)] shadow-lg animate-bounce">
              <Trophy className="w-8 h-8 fill-current" />
            </div>

            <h3 className="text-2xl font-extrabold">{t.terminder.congratulations}</h3>
            <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
              Барлық терминдер сәйкестендірілді! Сіз нағыз қазақ тілді маркетологсыз!
            </p>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[var(--muted)] text-left">
              <div>
                <span className="text-[10px] text-[var(--muted-fg)] block">Жинаған ұпайыңыз:</span>
                <span className="text-xl font-extrabold text-[var(--primary)]">+{score} XP</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-fg)] block">Жұмсалған уақыт:</span>
                <span className="text-xl font-extrabold" style={{ color: "var(--fg)" }}>
                  {timer} секунд
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => startNewGame()}
                className="btn btn-primary flex-1 py-3 rounded-xl text-xs font-bold text-white shadow-md"
              >
                {t.terminder.newGame}
              </button>
              <button
                onClick={() => setIsGameOver(false)}
                className="btn btn-secondary px-4 py-3 rounded-xl text-xs font-semibold"
              >
                Жабу
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Marketing Dictionary Modal */}
      {dictionaryOpen && (
        <div className="overlay animate-in fade-in" onClick={() => setDictionaryOpen(false)}>
          <div
            className="dialog max-w-3xl max-h-[85vh] flex flex-col"
            style={{ background: "var(--card)", color: "var(--fg)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "var(--border-color)" }}>
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-[var(--primary)]" />
                <div>
                  <h3 className="text-lg font-bold">Маркетинг терминдерінің қазақша кәсіби сөздігі</h3>
                  <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
                    Барлығы {marketingTerms.length} бекітілген термин
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDictionaryOpen(false)}
                className="p-2 rounded-xl hover:bg-[var(--muted)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="py-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3.5 text-[var(--muted-fg)]" />
                <input
                  type="text"
                  placeholder="Терминді немесе анықтаманы іздеу..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-9"
                />
              </div>
            </div>

            {/* Terms List Scrollable Area */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-2">
              {filteredDictionary.map((term) => (
                <div
                  key={term.id}
                  className="p-4 rounded-2xl border space-y-1.5 transition-colors hover:border-[var(--primary)]"
                  style={{ background: "var(--muted)", borderColor: "var(--border-color)" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm" style={{ color: "var(--primary)" }}>
                        {term.english}
                      </span>
                      <span className="text-xs font-bold" style={{ color: "var(--fg)" }}>
                        — {term.kazakh}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full capitalize font-semibold bg-[var(--card)]" style={{ color: "var(--muted-fg)" }}>
                      {term.category}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed" style={{ color: "var(--fg)" }}>
                    {term.definitionKk}
                  </p>

                  <p className="text-[11px] italic pt-1 border-t" style={{ borderColor: "var(--border-color)", color: "var(--muted-fg)" }}>
                    💬 Мысалы: «{term.exampleSentenceKk}»
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
