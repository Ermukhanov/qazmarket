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
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { lang, setUser, login, register } = useApp();
  const t = getT(lang);

  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [classCode, setClassCode] = useState<string>("10A-MARKET");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (mode === "login") {
      const ok = login(email, password);
      if (ok) {
        router.push(role === "teacher" ? "/teacher" : "/");
      } else {
        // Fallback for easy login
        setUser({
          id: crypto.randomUUID(),
          name: email.split("@")[0] || "Оқушы",
          email: email || "student@mektep.kz",
          role,
          classCode: classCode || "10A-MARKET",
          createdAt: new Date().toISOString(),
        });
        router.push(role === "teacher" ? "/teacher" : "/");
      }
    } else {
      if (!name.trim()) {
        setErrorMsg("Аты-жөніңізді енгізіңіз");
        return;
      }
      register(name, email, password, role, classCode);
      router.push(role === "teacher" ? "/teacher" : "/");
    }
  };

  const handleQuickStudentLogin = () => {
    setUser({
      id: "std-demo",
      name: "Айсұлтан Мұратұлы",
      email: "aisultan@mektep.kz",
      role: "student",
      classCode: "10A-MARKET",
      createdAt: new Date().toISOString(),
    });
    router.push("/");
  };

  const handleQuickTeacherLogin = () => {
    setUser({
      id: "tch-demo",
      name: "Гүлнар Амангелдіқызы",
      email: "teacher@mektep.kz",
      role: "teacher",
      classCode: "10A-MARKET",
      createdAt: new Date().toISOString(),
    });
    router.push("/teacher");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6 px-4">
      <div
        className="card max-w-md w-full p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6"
        style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
      >
        {/* Logo and title */}
        <div className="text-center space-y-2">
          <div
            className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center font-black text-xl text-white shadow-md"
            style={{ background: "var(--gradient-primary)" }}
          >
            QM
          </div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color: "var(--fg)" }}>
            {mode === "login" ? t.auth.loginTitle : t.auth.registerTitle}
          </h1>
          <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
            {mode === "login" ? t.auth.loginSubtitle : t.auth.registerSubtitle}
          </p>
        </div>

        {/* Mode switcher (Login / Register) */}
        <div className="flex p-1 rounded-2xl bg-[var(--muted)]">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === "login" ? "bg-[var(--card)] shadow-sm text-[var(--primary)]" : "text-[var(--muted-fg)]"
            }`}
          >
            {t.auth.loginBtn}
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === "register" ? "bg-[var(--card)] shadow-sm text-[var(--primary)]" : "text-[var(--muted-fg)]"
            }`}
          >
            {t.auth.registerBtn}
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-[var(--danger)]/10 text-[var(--danger)] text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--fg)]">{t.auth.role}:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  role === "student"
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "bg-[var(--muted)] text-[var(--muted-fg)]"
                }`}
              >
                <User className="w-4 h-4" />
                <span>{t.auth.student}</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  role === "teacher"
                    ? "border-[var(--secondary)] bg-[var(--secondary)]/10 text-[var(--secondary)]"
                    : "bg-[var(--muted)] text-[var(--muted-fg)]"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>{t.auth.teacher}</span>
              </button>
            </div>
          </div>

          {/* Name (if register) */}
          {mode === "register" && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--fg)]">{t.auth.name}</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3.5 text-[var(--muted-fg)]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Мысалы: Айсұлтан Мұратұлы"
                  className="input pl-9 text-xs"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--fg)]">{t.auth.email}</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3.5 text-[var(--muted-fg)]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@mektep.kz"
                className="input pl-9 text-xs"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--fg)]">{t.auth.password}</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3.5 text-[var(--muted-fg)]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input pl-9 text-xs"
              />
            </div>
          </div>

          {/* Class code */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--fg)]">{t.auth.classCode}</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-3.5 text-[var(--muted-fg)]" />
              <input
                type="text"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                placeholder={t.auth.classCodePlaceholder}
                className="input pl-9 text-xs font-mono font-bold"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full py-3 rounded-xl text-xs font-bold text-white shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <span>{mode === "login" ? t.auth.loginBtn : t.auth.registerBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Logins for fast testing */}
        <div className="pt-4 border-t space-y-2" style={{ borderColor: "var(--border-color)" }}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] block text-center">
            Жылдам сынақ кіру (Демо-аккаунттар):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleQuickStudentLogin}
              className="p-2.5 rounded-xl border text-xs font-bold hover:bg-[var(--muted)] transition-colors flex items-center justify-center gap-1.5 text-[var(--primary)]"
              style={{ borderColor: "var(--border-color)" }}
            >
              <User className="w-3.5 h-3.5" />
              <span>Оқушы кіру</span>
            </button>

            <button
              onClick={handleQuickTeacherLogin}
              className="p-2.5 rounded-xl border text-xs font-bold hover:bg-[var(--muted)] transition-colors flex items-center justify-center gap-1.5 text-[var(--secondary)]"
              style={{ borderColor: "var(--border-color)" }}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Мұғалім кіру</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
