"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import {
  GraduationCap,
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Shield,
  ArrowLeft,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang, login, register } = useApp();
  const t = getT(lang);

  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [classCode, setClassCode] = useState<string>("10A-MARKET");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "register") setMode("register");
    const roleParam = searchParams.get("role");
    if (roleParam === "teacher" || roleParam === "admin" || roleParam === "student") {
      setRole(roleParam);
    }
  }, [searchParams]);

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
    <div className="w-full max-w-md p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161B38] shadow-xl space-y-6 text-left">
      {/* Return link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1E5BF0] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Басты бетке оралу</span>
        </Link>
      </div>

      {/* Header with Royal Blue Graduation Cap */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-[#1E5BF0] flex items-center justify-center text-white shadow-lg shadow-blue-500/25 mx-auto">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          {mode === "login" ? "Платформаға кіру" : "Жаңа аккаунт ашу"}
        </h2>
        <p className="text-xs text-slate-500">
          {mode === "login"
            ? "«Маркетингтегі қазақ тілі» зертханасына қош келдіңіз"
            : "Жеке маркетингтік портфолиоңызды бүгіннен бастаңыз"}
        </p>
      </div>

      {/* Mode Switch (Кіру / Тіркелу) */}
      <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800/60 p-1 border border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === "login"
              ? "bg-[#1E5BF0] text-white shadow-md shadow-blue-500/20"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          Кіру (Войти)
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === "register"
              ? "bg-[#1E5BF0] text-white shadow-md shadow-blue-500/20"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          Тіркелу (Регистрация)
        </button>
      </div>

      {/* Role Selector */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setRole("student")}
          className={`py-2 px-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
            role === "student"
              ? "bg-blue-50 dark:bg-blue-950/60 border-[#1E5BF0] text-[#1E5BF0]"
              : "border-slate-200 dark:border-slate-700 text-slate-500"
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
              ? "bg-blue-50 dark:bg-blue-950/60 border-[#1E5BF0] text-[#1E5BF0]"
              : "border-slate-200 dark:border-slate-700 text-slate-500"
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
              ? "bg-blue-50 dark:bg-blue-950/60 border-[#1E5BF0] text-[#1E5BF0]"
              : "border-slate-200 dark:border-slate-700 text-slate-500"
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Әкімші</span>
        </button>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wider">
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
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wider">
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
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wider">
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

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-[#1E5BF0] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <span>{mode === "login" ? "Платформаға кіру" : "Тіркелу және бастау"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* 1-Click Fast Demo Accounts */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
        <div className="text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider">
          Тестілеу үшін 1-шертумен кіру:
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin("student")}
            className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#1E5BF0] hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all flex items-center justify-center gap-1.5"
          >
            <span>👤 Оқушы</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin("teacher")}
            className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#1E5BF0] hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all flex items-center justify-center gap-1.5"
          >
            <span>👩‍🏫 Мұғалім</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-xs text-slate-400">Жүктелуде...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
