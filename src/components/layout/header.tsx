"use client";

import Link from "next/link";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { calculateLevel } from "@/lib/utils";
import {
  Sun,
  Moon,
  Flame,
  Award,
  Globe,
  Bell,
  Menu,
  X,
  User as UserIcon,
} from "lucide-react";
import { useState } from "react";

export function Header({ onMobileMenuToggle }: { onMobileMenuToggle?: () => void }) {
  const { lang, setLang, theme, setTheme, progress, user } = useApp();
  const t = getT(lang);
  const { level, currentXp, nextLevelXp } = calculateLevel(progress.xp);
  const xpPercent = Math.min(100, Math.round((currentXp / Math.max(1, nextLevelXp)) * 100));

  return (
    <header
      className="sticky top-0 z-30 h-16 border-b transition-colors duration-200 px-4 md:px-6 flex items-center justify-between"
      style={{
        background: "var(--card)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Left side: Mobile menu toggle + Logo/Greeting */}
      <div className="flex items-center gap-3">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-xl hover:bg-[var(--muted)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Мәзірді ашу"
          >
            <Menu className="w-5 h-5" style={{ color: "var(--fg)" }} />
          </button>
        )}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: "color-mix(in srgb, var(--primary) 15%, transparent)",
              color: "var(--primary)",
            }}
          >
            QAZMARKET
          </span>
          <span className="text-xs font-medium truncate max-w-[200px] md:max-w-none" style={{ color: "var(--muted-fg)" }}>
            {user ? `${t.dashboard.greeting}, ${user.name.split(" ")[0]}!` : t.slogan}
          </span>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Streak pill */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all"
          style={{
            borderColor: "color-mix(in srgb, var(--warning) 30%, transparent)",
            background: "color-mix(in srgb, var(--warning) 10%, transparent)",
            color: "var(--warning)",
          }}
          title={`${progress.streak} күн қатарынан оқу белсенділігі`}
        >
          <Flame className="w-4 h-4 fill-current animate-pulse" />
          <span>{progress.streak}</span>
          <span className="hidden sm:inline font-normal text-[11px]">күн</span>
        </div>

        {/* Level & XP Badge */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium"
          style={{
            borderColor: "var(--border-color)",
            background: "var(--muted)",
          }}
        >
          <Award className="w-4 h-4 text-[var(--primary)]" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold" style={{ color: "var(--primary)" }}>
              {level}-деңгей
            </span>
            <div className="w-16 h-1.5 rounded-full overflow-hidden bg-[var(--border-color)]">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${xpPercent}%`,
                  background: "var(--gradient-primary)",
                }}
              />
            </div>
          </div>
          <span className="text-[11px] font-bold" style={{ color: "var(--fg)" }}>
            {progress.xp} XP
          </span>
        </div>

        {/* Language switch */}
        <button
          onClick={() => setLang(lang === "kk" ? "ru" : "kk")}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-colors hover:bg-[var(--muted)] min-h-[44px]"
          style={{
            borderColor: "var(--border-color)",
            color: "var(--fg)",
          }}
          title="Тілді ауыстыру / Сменить язык"
          aria-label="Тілді ауыстыру"
        >
          <Globe className="w-3.5 h-3.5 text-[var(--muted-fg)]" />
          <span>{lang === "kk" ? "ҚАЗ" : "РУС"}</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-xl border transition-colors hover:bg-[var(--muted)] min-h-[44px] min-w-[44px] flex items-center justify-center"
          style={{
            borderColor: "var(--border-color)",
            color: "var(--fg)",
          }}
          title={theme === "light" ? "Түнгі режим" : "Күндізгі режим"}
          aria-label="Теманы өзгерту"
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4 text-[var(--muted-fg)]" />
          ) : (
            <Sun className="w-4 h-4 text-[var(--warning)]" />
          )}
        </button>

        {/* User Avatar / Auth shortcut */}
        {user ? (
          <Link
            href="/portfolio"
            className="flex items-center gap-2 p-1 pl-1.5 rounded-xl border hover:bg-[var(--muted)] transition-colors min-h-[44px]"
            style={{ borderColor: "var(--border-color)" }}
            title="Менің профилім"
          >
            <span className="hidden md:inline text-xs font-semibold max-w-[90px] truncate" style={{ color: "var(--fg)" }}>
              {user.name.split(" ")[0]}
            </span>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white"
              style={{ background: "var(--gradient-primary)" }}
            >
              {user.name.slice(0, 2).toUpperCase()}
            </div>
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90 min-h-[44px]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.auth.loginTitle}</span>
          </Link>
        )}
      </div>
    </header>
  );
}
