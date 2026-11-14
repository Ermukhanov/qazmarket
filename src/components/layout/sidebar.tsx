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
  PenTool,
  Sparkles,
  Megaphone,
  Briefcase,
  FolderHeart,
  GraduationCap,
  FileSpreadsheet,
  Users,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { lang, user, logout } = useApp();
  const t = getT(lang);

  const studentLinks = [
    { href: "/", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/bilim", label: t.nav.bilim, icon: BookOpen },
    { href: "/terminder", label: t.nav.terminder, icon: Gamepad2 },
    { href: "/test", label: t.nav.test, icon: HelpCircle },
    { href: "/copywriter", label: t.nav.copywriter, icon: PenTool },
    { href: "/brand", label: t.nav.brand, icon: Sparkles },
    { href: "/jarname", label: t.nav.jarname, icon: Megaphone },
    { href: "/cases", label: t.nav.cases, icon: Briefcase },
    { href: "/portfolio", label: t.nav.portfolio, icon: FolderHeart },
  ];

  const teacherLinks = [
    { href: "/lesson-plans", label: t.nav.lessonPlans, icon: GraduationCap },
    { href: "/methodology", label: t.nav.methodology, icon: FileSpreadsheet },
    { href: "/teacher", label: t.nav.teacher, icon: Users },
  ];

  return (
    <aside
      className="hidden md:flex flex-col w-64 shrink-0 border-r transition-colors duration-200"
      style={{
        background: "var(--sidebar-bg)",
        borderColor: "var(--border-color)",
      }}
      aria-label="Басты навигация"
    >
      {/* Brand Header */}
      <div className="p-5 border-b" style={{ borderColor: "var(--border-color)" }}>
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md transition-transform group-hover:scale-105"
            style={{ background: "var(--gradient-primary)" }}
          >
            QM
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight" style={{ color: "var(--fg)" }}>
                QAZMARKET
              </span>
              <span
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                style={{
                  background: "color-mix(in srgb, var(--primary) 15%, transparent)",
                  color: "var(--primary)",
                }}
              >
                10-сынып
              </span>
            </div>
            <p className="text-[11px] truncate" style={{ color: "var(--muted-fg)" }}>
              {t.appSubtitle}
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Student Section */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span
              className="text-[10px] font-bold tracking-wider uppercase"
              style={{ color: "var(--muted-fg)" }}
            >
              {t.sections.studentsTitle}
            </span>
          </div>
          <nav className="space-y-1">
            {studentLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group min-h-[42px] ${
                    isActive ? "shadow-sm font-semibold" : "hover:bg-[var(--muted)]"
                  }`}
                  style={{
                    background: isActive
                      ? "color-mix(in srgb, var(--primary) 12%, transparent)"
                      : "transparent",
                    color: isActive ? "var(--primary)" : "var(--fg)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? "text-[var(--primary)]" : "text-[var(--muted-fg)]"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[var(--primary)]" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Teacher Section */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span
              className="text-[10px] font-bold tracking-wider uppercase"
              style={{ color: "var(--muted-fg)" }}
            >
              {t.sections.teachersTitle}
            </span>
            <span
              className="text-[9px] font-bold px-1.5 py-0.2 rounded"
              style={{
                background: "color-mix(in srgb, var(--accent) 15%, transparent)",
                color: "var(--accent)",
              }}
            >
              Мұғалім
            </span>
          </div>
          <nav className="space-y-1">
            {teacherLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group min-h-[42px] ${
                    isActive ? "shadow-sm font-semibold" : "hover:bg-[var(--muted)]"
                  }`}
                  style={{
                    background: isActive
                      ? "color-mix(in srgb, var(--primary) 12%, transparent)"
                      : "transparent",
                    color: isActive ? "var(--primary)" : "var(--fg)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? "text-[var(--primary)]" : "text-[var(--muted-fg)]"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[var(--primary)]" />}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User profile & Logout Footer */}
      <div className="p-3 border-t" style={{ borderColor: "var(--border-color)" }}>
        {user ? (
          <div className="flex items-center justify-between p-2 rounded-xl bg-[var(--muted)]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shrink-0"
                style={{ background: "var(--gradient-primary)" }}
              >
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: "var(--fg)" }}>
                  {user.name}
                </p>
                <p className="text-[10px] flex items-center gap-1" style={{ color: "var(--muted-fg)" }}>
                  <ShieldCheck className="w-3 h-3 text-[var(--success)]" />
                  {user.role === "teacher" ? t.auth.teacher : `${user.classCode || "10A"}`}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg hover:bg-[var(--card)] transition-colors"
              title={t.auth.logout}
              aria-label={t.auth.logout}
            >
              <LogOut className="w-4 h-4" style={{ color: "var(--muted-fg)" }} />
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white shadow-sm transition-all hover:opacity-95"
            style={{ background: "var(--gradient-primary)" }}
          >
            {t.auth.loginTitle}
          </Link>
        )}
      </div>
    </aside>
  );
}
