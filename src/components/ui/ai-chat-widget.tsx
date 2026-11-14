"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User as UserIcon, Sparkles } from "lucide-react";
import { useApp } from "@/store/app-context";
import { translations } from "@/lib/i18n";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

export function AiChatWidget() {
  const { lang, adminSettings } = useApp();
  const t = translations[lang] || translations.kk;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: t.aiChat.welcomeMessage,
      time: "10:00",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Load daily count from localStorage
  useEffect(() => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const stored = localStorage.getItem("qazmarket_chat_count");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.date === today) {
          setMessageCount(parsed.count);
        } else {
          localStorage.setItem("qazmarket_chat_count", JSON.stringify({ date: today, count: 0 }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!adminSettings.aiChatEnabled) {
    return null;
  }

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    if (messageCount >= adminSettings.aiDailyLimit) {
      alert("Бүгінгі хабарлама лимиті таусылды.");
      return;
    }

    const userTime = new Date().toLocaleTimeString("kk-KZ", { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: "user_" + Date.now(),
      sender: "user",
      text: textToSend.trim(),
      time: userTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: "bot_" + Date.now(),
        sender: "bot",
        text: data.reply || data.error || "Жауап алу мүмкін болмады.",
        time: userTime,
      };

      setMessages((prev) => [...prev, botMsg]);

      // Update count
      const newCount = messageCount + 1;
      setMessageCount(newCount);
      const today = new Date().toISOString().split("T")[0];
      localStorage.setItem("qazmarket_chat_count", JSON.stringify({ date: today, count: newCount }));
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "bot_err_" + Date.now(),
          sender: "bot",
          text: "Қосылу қатесі орын алды. Қайталап көріңіз.",
          time: userTime,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border border-purple-400/30"
          aria-label="ИИ-чат"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <span className="text-sm tracking-wide">QazBot</span>
        </button>
      )}

      {/* Chat Window / Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 z-50 flex flex-col md:w-[420px] md:h-[600px] bg-[var(--card)] border border-[var(--border-color)] md:rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
          style={{ background: "var(--card)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] bg-gradient-to-r from-purple-600/10 to-blue-600/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--fg)] flex items-center gap-1.5">
                  QAZMARKET AI
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-400 font-semibold">
                    <Sparkles className="w-2.5 h-2.5" />
                    Көмекші
                  </span>
                </h4>
                <p className="text-[11px] text-[var(--muted-fg)]">
                  {messageCount} / {adminSettings.aiDailyLimit} хабарлама қолданылды
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-[var(--muted-fg)] hover:text-[var(--fg)] hover:bg-[var(--muted)] transition-colors"
              aria-label="Жабу"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5 text-purple-400">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs md:text-sm leading-relaxed whitespace-pre-line ${
                    m.sender === "user"
                      ? "bg-purple-600 text-white rounded-br-none shadow-sm"
                      : "bg-[var(--card-subtle)] text-[var(--fg)] border border-[var(--border-color)] rounded-bl-none shadow-sm"
                  }`}
                >
                  {m.text}
                  <div
                    className={`text-[10px] mt-1 text-right ${
                      m.sender === "user" ? "text-purple-200" : "text-[var(--muted-fg)]"
                    }`}
                  >
                    {m.time}
                  </div>
                </div>
                {m.sender === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 text-blue-400">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-[var(--muted-fg)] text-xs p-2">
                <Bot className="w-4 h-4 animate-bounce text-purple-500" />
                <span>QazBot жауап дайындауда...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-4 py-2 border-t border-[var(--border-color)] bg-[var(--muted)]/40 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <button
              onClick={() => handleSend(t.aiChat.suggestion1)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[var(--card)] border border-[var(--border-color)] text-[var(--fg)] hover:border-purple-500 hover:text-purple-400 transition-colors"
            >
              🎯 Ұран критерийлері
            </button>
            <button
              onClick={() => handleSend(t.aiChat.suggestion2)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[var(--card)] border border-[var(--border-color)] text-[var(--fg)] hover:border-purple-500 hover:text-purple-400 transition-colors"
            >
              📊 4P моделі
            </button>
            <button
              onClick={() => handleSend(t.aiChat.suggestion3)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[var(--card)] border border-[var(--border-color)] text-[var(--fg)] hover:border-purple-500 hover:text-purple-400 transition-colors"
            >
              📝 №130 ҚМЖ кеңесі
            </button>
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-[var(--border-color)] bg-[var(--card)] flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t.aiChat.inputPlaceholder}
              disabled={loading || messageCount >= adminSettings.aiDailyLimit}
              className="flex-1 bg-[var(--card-subtle)] border border-[var(--border-color)] rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-[var(--fg)] focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim() || messageCount >= adminSettings.aiDailyLimit}
              className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold disabled:opacity-50 hover:brightness-110 active:scale-95 transition-all shadow-md shrink-0"
              aria-label="Жіберу"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
