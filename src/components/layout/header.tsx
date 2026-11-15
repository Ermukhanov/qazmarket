"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Sparkles, User as UserIcon } from "lucide-react";
import { useApp } from "@/store/app-context";
import { translations } from "@/lib/i18n";

export function Header() {
  const { lang, theme, setLang, setTheme, user, logout } = useApp();
  const t = translations[lang] || translations.kk;
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case "/":
        return user ? t.nav.dashboard : "Басты бет";
      case "/landing":
        return "Платформа туралы";
      case "/bilim":
        return t.nav.bilim;
      case "/studio":
      case "/copywriter":
        return t.nav.studio;
      case "/brand":
        return t.nav.brand;
      case "/smm":
      case "/jarname":
        return t.nav.smm;
      case "/seo":
        return t.nav.seo;
      case "/game":
      case "/terminder":
      case "/test":
      case "/cases":
        return t.nav.game;
      case "/portfolio":
        return t.nav.portfolio;
      case "/achievements":
        return t.nav.achievements;
      case "/lesson-plans":
        return t.nav.lessonPlans;
      case "/methodology":
        return t.nav.methodology;
      case "/teacher":
        return t.nav.teacher;
      case "/login":
        return t.auth.loginTitle;
      default:
        return t.appName;
    }
  };

  return (
    <header
      className="h-[68px] md:h-[72px] shrink-0 border-b px-3 sm:px-6 md:px-8 flex items-center justify-between transition-colors duration-200 z-30 sticky top-0 backdrop-blur-md"
      style={{
        background: "var(--header-bg)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Left: Mobile Logo & Desktop Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <Link href="/" className="md:hidden flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md">
            QM
          </div>
        </Link>

        <div className="flex items-center gap-2.5 truncate">
          <h2 className="text-sm md:text-base font-bold text-[var(--fg)] truncate">
            {getPageTitle()}
          </h2>
          <span className="hidden xl:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
            <Sparkles className="w-3 h-3" />
            10-сынып
          </span>
        </div>
      </div>

      {/* Right Controls: Stats, Lang, Theme, User */}
      <div className="flex items-center gap-2.5 md:gap-4 shrink-0">
        {/* Language Switch */}
        <button
          onClick={() => setLang(lang === "kk" ? "ru" : "kk")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all hover:border-purple-500 hover:text-purple-400"
          style={{
            background: "var(--card)",
            borderColor: "var(--border-color)",
            color: "var(--fg)",
          }}
          title={lang === "kk" ? "Орыс тіліне ауысу" : "Қазақ тіліне ауысу"}
          aria-label="Тілді ауыстыру"
        >
          <span className="uppercase">{lang}</span>
        </button>

        {/* Theme Switch */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-xl border text-[var(--fg)] transition-all hover:border-purple-500 hover:text-purple-400"
          style={{
            background: "var(--card)",
            borderColor: "var(--border-color)",
          }}
          title={theme === "dark" ? "Ашық тақырыпқа ауысу" : "Қараңғы тақырыпқа ауысу"}
          aria-label="Тақырыпты ауыстыру"
        >
          {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
        </button>

        {/* User Status / Login */}
        {user ? (
          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border"
              style={{
                background: "var(--card)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-[var(--fg)] max-w-[120px] truncate leading-tight">
                  {user.name}
                </div>
                <div className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider">
                  {user.role === "teacher" ? "Мұғалім" : user.role === "admin" ? "Әкімші" : "Оқушы"}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="hidden lg:inline-flex text-xs text-[var(--muted-fg)] hover:text-red-400 px-2 py-1 transition-colors"
              title="Жүйеден шығу"
            >
              {t.auth.logout}
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="btn btn-primary text-xs md:text-sm px-4 md:px-5 py-2 rounded-xl font-bold text-white shadow-md flex items-center gap-2 shrink-0 whitespace-nowrap"
          >
            <UserIcon className="w-4 h-4" />
            <span>{t.auth.loginBtn}</span>
          </Link>
        )}
      </div>
    </header>
  );
}
