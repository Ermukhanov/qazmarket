"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import {
  Sparkles,
  Lock,
  Mail,
  User,
  GraduationCap,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Shield,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { lang, setUser, login, register } = useApp();
  const t = getT(lang);

  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [classCode, setClassCode] = useState<string>("10A-MARKET");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (mode === "login") {
      login(email || `${role}@mektep.kz`, password || "123456", role);
      router.push(role === "student" ? "/" : "/teacher");
    } else {
      if (!name.trim()) {
        setErrorMsg("Аты-жөніңізді енгізіңіз");
        return;
      }
      register(name, email || `${role}@mektep.kz`, password || "123456", role, classCode);
      router.push(role === "student" ? "/" : "/teacher");
    }
  };

  const handleDemoLogin = (demoRole: "student" | "teacher" | "admin") => {
    login(`${demoRole}@mektep.kz`, "123456", demoRole);
    router.push(demoRole === "student" ? "/" : "/teacher");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md card p-8 md:p-10 rounded-3xl border shadow-2xl space-y-6 text-left">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg mx-auto">
            QM
          </div>
          <h2 className="text-2xl font-black text-[var(--fg)]">
            {mode === "login" ? t.auth.loginTitle : t.auth.registerTitle}
          </h2>
          <p className="text-xs text-[var(--muted-fg)]">
            {mode === "login" ? t.auth.loginSubtitle : t.auth.registerSubtitle}
          </p>
        </div>

        {/* Mode Toggle (Login vs Register) */}
        <div className="flex rounded-2xl bg-[var(--card-subtle)] p-1 border border-[var(--border-color)]">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === "login"
                ? "bg-purple-600 text-white shadow-md"
                : "text-[var(--muted-fg)] hover:text-[var(--fg)]"
            }`}
          >
            {t.auth.loginBtn}
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === "register"
                ? "bg-purple-600 text-white shadow-md"
                : "text-[var(--muted-fg)] hover:text-[var(--fg)]"
            }`}
          >
            {t.auth.registerBtn}
          </button>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`py-2 px-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
              role === "student"
                ? "bg-purple-500/15 border-purple-500 text-purple-400"
                : "border-[var(--border-color)] text-[var(--muted-fg)]"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Оқушы</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`py-2 px-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
              role === "teacher"
                ? "bg-blue-500/15 border-blue-500 text-blue-400"
                : "border-[var(--border-color)] text-[var(--muted-fg)]"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Мұғалім</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`py-2 px-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
              role === "admin"
                ? "bg-emerald-500/15 border-emerald-500 text-emerald-400"
                : "border-[var(--border-color)] text-[var(--muted-fg)]"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Әкімші</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-bold text-[var(--muted-fg)] mb-1 uppercase tracking-wider">
                {t.auth.name}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Мысалы: Әлихан Нұрланұлы"
                className="w-full text-xs font-semibold"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[var(--muted-fg)] mb-1 uppercase tracking-wider">
              {t.auth.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@mektep.kz"
              className="w-full text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--muted-fg)] mb-1 uppercase tracking-wider">
              {t.auth.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-xs"
            />
          </div>

          {role === "student" && (
            <div>
              <label className="block text-xs font-bold text-[var(--muted-fg)] mb-1 uppercase tracking-wider">
                {t.auth.classCode}
              </label>
              <input
                type="text"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                placeholder={t.auth.classCodePlaceholder}
                className="w-full text-xs uppercase font-bold tracking-wider"
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full py-3 rounded-xl text-xs md:text-sm font-bold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
          >
            <span>{mode === "login" ? t.auth.loginBtn : t.auth.registerBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Logins */}
        <div className="pt-4 border-t border-[var(--border-color)] space-y-2.5">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--muted-fg)] text-center">
            Жылдам сынақ (1-Click Demo)
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("student")}
              className="py-2 px-2.5 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)] text-[11px] font-bold text-purple-400 hover:border-purple-500 transition-colors truncate"
            >
              🎓 Оқушы
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("teacher")}
              className="py-2 px-2.5 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)] text-[11px] font-bold text-blue-400 hover:border-blue-500 transition-colors truncate"
            >
              👩‍🏫 Мұғалім
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="py-2 px-2.5 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)] text-[11px] font-bold text-emerald-400 hover:border-emerald-500 transition-colors truncate"
            >
              ⚡ Админ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
