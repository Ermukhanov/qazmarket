"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  PenTool,
  Sparkles,
  Share2,
  Search,
  Gamepad2,
  FolderKanban,
  Trophy,
  FileText,
  BookMarked,
  LayoutDashboard,
  Users,
  LogOut,
  GraduationCap,
  Globe,
} from "lucide-react";
import { useApp } from "@/store/app-context";
import { translations } from "@/lib/i18n";

export function Sidebar() {
  const pathname = usePathname();
  const { lang, user, logout } = useApp();
  const t = translations[lang] || translations.kk;

  const studentLinks = [
    { href: "/bilim", label: t.nav.bilim, icon: BookOpen, tag: "Теория" },
    { href: "/studio", label: t.nav.studio, icon: PenTool, tag: "Мәтін" },
    { href: "/brand", label: t.nav.brand, icon: Sparkles, tag: "Бренд" },
    { href: "/smm", label: t.nav.smm, icon: Share2, tag: "SMM" },
    { href: "/seo", label: t.nav.seo, icon: Search, tag: "SEO" },
    { href: "/game", label: t.nav.game, icon: Gamepad2, tag: "Тест" },
    { href: "/portfolio", label: t.nav.portfolio, icon: FolderKanban, tag: "Жұмыс" },
    { href: "/achievements", label: t.nav.achievements, icon: Trophy, tag: "Ұпай" },
  ];

  const teacherLinks = [
    { href: "/lesson-plans", label: t.nav.lessonPlans, icon: FileText, tag: "ҚМЖ" },
    { href: "/methodology", label: t.nav.methodology, icon: BookMarked, tag: "Парақтар" },
    { href: "/teacher", label: t.nav.teacher, icon: Users, tag: "Сынып" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/studio" && (pathname === "/studio" || pathname === "/copywriter")) return true;
    if (href === "/smm" && (pathname === "/smm" || pathname === "/jarname")) return true;
    if (href === "/game" && (pathname === "/game" || pathname === "/terminder" || pathname === "/test" || pathname === "/cases")) return true;
    return pathname === href;
  };

  return (
    <aside
      className="hidden md:flex flex-col w-[280px] shrink-0 border-r transition-colors duration-200 z-40 select-none overflow-y-auto"
      style={{
        background: "var(--sidebar-bg)",
        borderColor: "var(--sidebar-border)",
      }}
      aria-label="Басты навигация"
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-[var(--border-color)]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-[#1E5BF0] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-[var(--fg)]">
                {t.appName}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500/15 text-[#1E5BF0] border border-blue-500/20">
                10-сынып
              </span>
            </div>
            <p className="text-[11px] text-[var(--muted-fg)] truncate font-medium mt-0.5">
              Маркетинг зертханасы
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
        {/* Main Dashboard Link */}
        <div className="space-y-1">
          <Link
            href="/"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-150 ${
              pathname === "/"
                ? "bg-[#1E5BF0] text-white shadow-md shadow-blue-500/25"
                : "text-[var(--fg)] hover:bg-[var(--muted)]"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>{t.nav.dashboard}</span>
          </Link>

          <Link
            href="/landing"
            className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
              pathname === "/landing"
                ? "bg-blue-500/15 text-[#1E5BF0] font-bold border border-blue-500/30"
                : "text-[var(--muted-fg)] hover:text-[var(--fg)] hover:bg-[var(--muted)]"
            }`}
          >
            <Globe className="w-4 h-4 shrink-0" />
            <span>Басты инфо-бет (Сайт)</span>
          </Link>
        </div>

        {/* Section: Students (8 items) */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-wider text-[var(--muted-fg)] flex items-center justify-between">
            <span>{t.sections.studentsTitle}</span>
            <span className="text-purple-400 font-bold">8</span>
          </div>

          <nav className="space-y-1">
            {studentLinks.map((item) => {
              const Icon = item.icon;
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 min-h-[42px] ${
                    active
                      ? "bg-purple-500/15 text-purple-400 font-bold border border-purple-500/30"
                      : "text-[var(--muted-fg)] hover:text-[var(--fg)] hover:bg-[var(--muted)]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${active ? "text-purple-400" : "text-[var(--muted-fg)]"}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                      active ? "bg-purple-500/25 text-purple-300" : "bg-[var(--muted)] text-[var(--muted-fg)]"
                    }`}
                  >
                    {item.tag}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Section: Teachers (Only visible to authenticated teachers & admins) */}
        {(user?.role === "teacher" || user?.role === "admin") && (
          <div className="pt-4 border-t border-[var(--border-color)]">
            <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-wider text-blue-400 flex items-center justify-between">
              <span>{t.sections.teachersTitle}</span>
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
            </div>

            <nav className="space-y-1">
              {teacherLinks.map((item) => {
                const Icon = item.icon;
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 min-h-[42px] ${
                      active
                        ? "bg-blue-500/15 text-blue-400 font-bold border border-blue-500/30"
                        : "text-[var(--muted-fg)] hover:text-[var(--fg)] hover:bg-[var(--muted)]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${active ? "text-blue-400" : "text-[var(--muted-fg)]"}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                        active ? "bg-blue-500/25 text-blue-300" : "bg-[var(--muted)] text-[var(--muted-fg)]"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Footer User Info */}
      <div className="p-4 border-t border-[var(--border-color)]">
        {user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[var(--fg)] truncate">{user.name}</div>
                <div className="text-[10px] text-[var(--muted-fg)] truncate">
                  {user.role === "teacher" ? "Мұғалім кабинеті" : `${user.classCode} сыныбы`}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-[var(--muted-fg)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title={t.auth.logout}
              aria-label={t.auth.logout}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Link
              href="/login"
              className="btn btn-primary text-xs w-full py-2.5 rounded-xl font-bold text-white shadow-md block"
            >
              {t.auth.loginBtn}
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
