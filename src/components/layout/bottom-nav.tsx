"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Gamepad2,
  FolderKanban,
  Menu,
  X,
  PenTool,
  Sparkles,
  Share2,
  Search,
  Trophy,
  FileText,
  BookMarked,
  Users,
} from "lucide-react";
import { useApp } from "@/store/app-context";
import { translations } from "@/lib/i18n";

export function BottomNav() {
  const pathname = usePathname();
  const { lang, user } = useApp();
  const t = translations[lang] || translations.kk;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainTabs = [
    { href: "/", label: "Басты", icon: LayoutDashboard },
    { href: "/bilim", label: "Модуль", icon: BookOpen },
    { href: "/game", label: "Ойын", icon: Gamepad2 },
    { href: "/portfolio", label: "Портфолио", icon: FolderKanban },
  ];

  const allSections = [
    { href: "/bilim", label: t.nav.bilim, icon: BookOpen, tag: "01" },
    { href: "/studio", label: t.nav.studio, icon: PenTool, tag: "02" },
    { href: "/brand", label: t.nav.brand, icon: Sparkles, tag: "03" },
    { href: "/smm", label: t.nav.smm, icon: Share2, tag: "04" },
    { href: "/seo", label: t.nav.seo, icon: Search, tag: "05" },
    { href: "/game", label: t.nav.game, icon: Gamepad2, tag: "06" },
    { href: "/portfolio", label: t.nav.portfolio, icon: FolderKanban, tag: "07" },
    { href: "/achievements", label: t.nav.achievements, icon: Trophy, tag: "08" },
    { href: "/lesson-plans", label: t.nav.lessonPlans, icon: FileText, tag: "09" },
    { href: "/methodology", label: t.nav.methodology, icon: BookMarked, tag: "10" },
    { href: "/teacher", label: t.nav.teacher, icon: Users, tag: "Кабинет" },
  ];

  return (
    <>
      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          <div
            className="relative z-10 rounded-t-3xl border-t p-6 max-h-[80vh] overflow-y-auto space-y-4 animate-in slide-in-from-bottom duration-200"
            style={{
              background: "var(--card)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
              <div>
                <h3 className="text-base font-bold text-[var(--fg)]">Барлық бөлімдер</h3>
                <p className="text-xs text-[var(--muted-fg)]">
                  {user ? `${user.name} (${user.role})` : "QAZMARKET интерактивті зертханасы"}
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-xl text-[var(--muted-fg)] hover:text-[var(--fg)] bg-[var(--muted)]"
                aria-label="Жабу"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2">
              {allSections.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-sm font-semibold transition-all ${
                      active
                        ? "bg-purple-500/15 border-purple-500/40 text-purple-400"
                        : "border-[var(--border-color)] text-[var(--fg)] hover:bg-[var(--muted)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-purple-400" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-[var(--muted)] text-[var(--muted-fg)] font-bold">
                      {item.tag}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t flex items-center justify-around px-2 py-2 backdrop-blur-lg transition-colors duration-200"
        style={{
          background: "var(--header-bg)",
          borderColor: "var(--border-color)",
        }}
        aria-label="Мобильді навигация"
      >
        {mainTabs.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] rounded-xl transition-all duration-150 ${
                active
                  ? "text-purple-400 font-bold scale-105"
                  : "text-[var(--muted-fg)] hover:text-[var(--fg)]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </Link>
          );
        })}

        {/* Menu toggle button */}
        <button
          onClick={() => setDrawerOpen(true)}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] rounded-xl transition-all duration-150 ${
            drawerOpen ? "text-purple-400 font-bold" : "text-[var(--muted-fg)] hover:text-[var(--fg)]"
          }`}
          aria-label="Барлық мәзірді ашу"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Мәзір</span>
        </button>
      </nav>
    </>
  );
}
