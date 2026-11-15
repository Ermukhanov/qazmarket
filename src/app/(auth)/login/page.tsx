"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/store/app-context";
import {
  GraduationCap,
  ArrowRight,
  AlertCircle,
  ArrowLeft,
  User,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang, login, register } = useApp();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [classCode, setClassCode] = useState<string>("10A-MARKET");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "register") setMode("register");
    const roleParam = searchParams.get("role");
    if (roleParam === "teacher" || roleParam === "student") {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim() || "123456";

    if (!cleanEmail) {
      setErrorMsg(lang === "ru" ? "Введите email или логин" : "Email немесе логин енгізіңіз");
      setIsLoading(false);
      return;
    }

    try {
      if (mode === "login") {
        const success = await login(cleanEmail, cleanPassword, role);
        if (success) {
          window.location.href = role === "teacher" ? "/teacher" : "/bilim";
          return;
        } else {
          setErrorMsg(lang === "ru" ? "Кіру қатесі. Қайта байқап көріңіз." : "Кіру қатесі орын алды. Қайта көріңіз.");
        }
      } else {
        const cleanName = name.trim() || cleanEmail.split("@")[0];
        const success = await register(cleanName, cleanEmail, cleanPassword, role, classCode);
        if (success) {
          window.location.href = role === "teacher" ? "/teacher" : "/bilim";
          return;
        } else {
          setErrorMsg(lang === "ru" ? "Тіркелу қатесі орын алды." : "Тіркелу қатесі орын алды.");
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || (lang === "ru" ? "Ошибка сети" : "Желі қатесі"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 md:p-10 rounded-3xl border border-slate-200 bg-white shadow-xl space-y-6 text-left">
      {/* Return link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1E5BF0] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{lang === "ru" ? "Вернуться на главную" : "Басты бетке оралу"}</span>
        </Link>
      </div>

      {/* Header with Royal Blue Graduation Cap */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-[#1E5BF0] flex items-center justify-center text-white shadow-lg shadow-blue-500/25 mx-auto">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          {mode === "login"
            ? (lang === "ru" ? "Вход в аккаунт" : "Платформаға кіру")
            : (lang === "ru" ? "Создать аккаунт" : "Жаңа аккаунт ашу")}
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          {mode === "login"
            ? (lang === "ru" ? "Добро пожаловать в образовательную платформу QAZMARKET" : "«Маркетингтегі қазақ тілі» зертханасына қош келдіңіз")
            : (lang === "ru" ? "Начни свой путь к знаниям и большим возможностям" : "Жеке маркетингтік портфолиоңызды бүгіннен бастаңыз")}
        </p>
      </div>

      {/* Mode Switch (Войти / Регистрация) */}
      <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === "login"
              ? "bg-[#1E5BF0] text-white shadow-md shadow-blue-500/20"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {lang === "ru" ? "Войти" : "Кіру"}
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === "register"
              ? "bg-[#1E5BF0] text-white shadow-md shadow-blue-500/20"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {lang === "ru" ? "Регистрация" : "Тіркелу"}
        </button>
      </div>

      {/* Role Selector (Student / Teacher ONLY - Admin hidden) */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setRole("student")}
          className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            role === "student"
              ? "bg-blue-50 border-[#1E5BF0] text-[#1E5BF0]"
              : "border-slate-200 text-slate-500 hover:border-slate-300"
          }`}
        >
          <User className="w-4 h-4" />
          <span>{lang === "ru" ? "Ученик" : "Оқушы"}</span>
        </button>
        <button
          type="button"
          onClick={() => setRole("teacher")}
          className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            role === "teacher"
              ? "bg-blue-50 border-[#1E5BF0] text-[#1E5BF0]"
              : "border-slate-200 text-slate-500 hover:border-slate-300"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>{lang === "ru" ? "Учитель" : "Мұғалім"}</span>
        </button>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
              {lang === "ru" ? "Имя и фамилия" : "Аты-жөніңіз"}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === "ru" ? "Например: Алихан Нурланов" : "Мысалы: Әлихан Нұрланұлы"}
              className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E5BF0] focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
            {lang === "ru" ? "Email или логин" : "Email немесе логин"}
          </label>
          <input
            type="text"
            inputMode="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={lang === "ru" ? "Например: aidar или student@mail.kz" : "Мысалы: aidar немесе student@mail.kz"}
            className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E5BF0] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
            {lang === "ru" ? "Пароль" : "Құпия сөз"}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="•••••••• (мысалы: 123456)"
            className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E5BF0] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-2xl bg-[#1E5BF0] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>
            {isLoading
              ? (lang === "ru" ? "Загрузка..." : "Жүктелуде...")
              : mode === "login"
                ? (lang === "ru" ? "Войти в систему" : "Платформаға кіру")
                : (lang === "ru" ? "Зарегистрироваться" : "Тіркелу және бастау")}
          </span>
          {!isLoading && <ArrowRight className="w-4 h-4" />}
        </button>

        <div className="pt-2 text-center">
          <Link
            href="/bilim"
            className="text-xs font-bold text-slate-500 hover:text-[#1E5BF0] transition-colors underline decoration-dotted"
          >
            {lang === "ru" ? "Изучать материалы без входа →" : "Тіркелусіз білім алуды бастау →"}
          </Link>
        </div>
      </form>
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
