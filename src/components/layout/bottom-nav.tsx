"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import {
  LayoutDashboard,
  BookOpen,
  Gamepad2,
  HelpCircle,
  FolderHeart,
  Grid,
  X,
  PenTool,
  Sparkles,
  Megaphone,
  Briefcase,
  GraduationCap,
  FileSpreadsheet,
  Users,
} from "lucide-react";
import { useState } from "react";

export function BottomNav() {
  const pathname = usePathname();
  const { lang, user } = useApp();
  const t = getT(lang);
  const [moreOpen, setMoreOpen] = useState(false);

  const mainTabs = [
    { href: "/", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/bilim", label: t.nav.bilim, icon: BookOpen },
    { href: "/terminder", label: t.nav.terminder, icon: Gamepad2 },
    { href: "/test", label: t.nav.test, icon: HelpCircle },
    { href: "/portfolio", label: t.nav.portfolio, icon: FolderHeart },
  ];

  const additionalTabs = [
    { href: "/copywriter", label: t.nav.copywriter, icon: PenTool, cat: "Оқушы" },
    { href: "/brand", label: t.nav.brand, icon: Sparkles, cat: "Оқушы" },
    { href: "/jarname", label: t.nav.jarname, icon: Megaphone, cat: "Оқушы" },
    { href: "/cases", label: t.nav.cases, icon: Briefcase, cat: "Оқушы" },
    { href: "/lesson-plans", label: t.nav.lessonPlans, icon: GraduationCap, cat: "Мұғалім" },
    { href: "/methodology", label: t.nav.methodology, icon: FileSpreadsheet, cat: "Мұғалім" },
    { href: "/teacher", label: t.nav.teacher, icon: Users, cat: "Мұғалім" },
  ];

  return (
    <>
      {/* Mobile Drawer for More Modules */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden flex flex-col justify-end"
          onClick={() => setMoreOpen(false)}
        >
          <div
            className="p-5 rounded-t-3xl border-t max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-200"
            style={{
              background: "var(--card)",
              borderColor: "var(--border-color)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: "var(--border-color)" }}>
              <div>
                <h3 className="text-base font-bold" style={{ color: "var(--fg)" }}>
                  Барлық бөлімдер
                </h3>
                <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
                  10 бөлімнен тұратын толық лаборатория
                </p>
              </div>
              <button
                onClick={() => setMoreOpen(false)}
                className="p-2 rounded-xl hover:bg-[var(--muted)] min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Жабу"
              >
                <X className="w-5 h-5" style={{ color: "var(--fg)" }} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 py-4">
              {additionalTabs.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all min-h-[48px]"
                    style={{
                      background: isActive
                        ? "color-mix(in srgb, var(--primary) 15%, transparent)"
                        : "var(--muted)",
                      borderColor: isActive ? "var(--primary)" : "var(--border-color)",
                      color: isActive ? "var(--primary)" : "var(--fg)",
                    }}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t flex items-center justify-around px-2 py-1.5 transition-colors duration-200"
        style={{
          background: "var(--card)",
          borderColor: "var(--border-color)",
          paddingBottom: "max(6px, env(safe-area-inset-bottom))",
        }}
        aria-label="Мобильді навигация"
      >
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors min-h-[48px] min-w-[52px]"
              style={{
                color: isActive ? "var(--primary)" : "var(--muted-fg)",
              }}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? "scale-110" : ""}`} />
              <span className="truncate max-w-[56px] text-center font-semibold">
                {tab.label}
              </span>
            </Link>
          );
        })}

        {/* More button */}
        <button
          onClick={() => setMoreOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors min-h-[48px] min-w-[52px]"
          style={{
            color: moreOpen ? "var(--primary)" : "var(--muted-fg)",
          }}
          aria-label="Қосымша бөлімдер"
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span className="font-semibold">Тағы</span>
        </button>
      </nav>
    </>
  );
}
