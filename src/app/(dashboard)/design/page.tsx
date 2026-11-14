"use client";

import { useState } from "react";
import { useApp } from "@/store/app-context";
import {
  Palette,
  Type,
  Layout,
  CheckCircle2,
  Sparkles,
  Layers,
  Component,
  ArrowRight,
  Copy,
  Check,
  Search,
  Sun,
  Moon,
  Star,
  Flame,
  Award,
  BookOpen,
  Share2,
} from "lucide-react";

interface ColorToken {
  name: string;
  hex: string;
  text?: string;
  border?: boolean;
  gradient?: string;
}

interface ColorGroup {
  group: string;
  colors: ColorToken[];
}

export default function DesignSystemPage() {
  const { theme, setTheme } = useApp();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyHex = (hex: string, label: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  const colorPalettes: ColorGroup[] = [
    {
      group: "Негізгі фондық түстер (Dark / Light Dashboards)",
      colors: [
        { name: "Dark Deep BG", hex: "#0F1226", text: "text-white", border: true },
        { name: "Dark Card Surface", hex: "#171A36", text: "text-white", border: true },
        { name: "Dark Card Hover", hex: "#1E2248", text: "text-white", border: true },
        { name: "Light Soft BG", hex: "#F6F7FB", text: "text-slate-900", border: true },
        { name: "Light Card White", hex: "#FFFFFF", text: "text-slate-900", border: true },
        { name: "Border Dark", hex: "#262A52", text: "text-white", border: true },
      ],
    },
    {
      group: "Ашық акценттік карточкалар (Screenshot 2 Reference)",
      colors: [
        { name: "Gradient Orange", hex: "#F97316", gradient: "from-amber-500 to-orange-600", text: "text-white" },
        { name: "Gradient Blue", hex: "#2563EB", gradient: "from-blue-600 to-indigo-600", text: "text-white" },
        { name: "Gradient Emerald", hex: "#10B981", gradient: "from-emerald-500 to-teal-600", text: "text-white" },
        { name: "Gradient Purple", hex: "#7C3AED", gradient: "from-purple-600 to-violet-700", text: "text-white" },
      ],
    },
    {
      group: "Статус және семантикалық индикаторлар",
      colors: [
        { name: "Success Emerald", hex: "#10B981", text: "text-white" },
        { name: "Warning Amber", hex: "#F59E0B", text: "text-slate-900" },
        { name: "Error Rose", hex: "#F43F5E", text: "text-white" },
        { name: "Info Sky", hex: "#0EA5E9", text: "text-white" },
      ],
    },
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-400 border border-purple-500/20 mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>UI/UX Дизайн жүйесі (Design Tokens)</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--fg)]">
            QAZMARKET Design System
          </h1>
          <p className="text-sm text-[var(--muted-fg)] mt-1">
            №2 Референс макетіне (Dark Dashboard + Vibrant Cards) сәйкес құрастырылған компоненттер жиынтығы
          </p>
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="btn btn-secondary text-xs px-4 py-2.5 rounded-xl border flex items-center gap-2 font-bold"
        >
          {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
          <span>Теманы ауыстыру: {theme === "dark" ? "Күндізгі" : "Түнгі"}</span>
        </button>
      </div>

      {/* Section 1: Color Tokens */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-bold text-[var(--fg)]">1. Түстер палитрасы (Color Tokens)</h2>
        </div>

        <div className="space-y-6">
          {colorPalettes.map((group, gIdx) => (
            <div key={gIdx} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
                {group.group}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {group.colors.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyHex(c.hex, c.name)}
                    className="p-3 rounded-2xl border border-[var(--border-color)] text-left hover:scale-[1.02] transition-transform space-y-2 group bg-[var(--card)]"
                  >
                    <div
                      className={`h-16 w-full rounded-xl flex items-center justify-center font-bold text-xs ${
                        c.gradient ? `bg-gradient-to-br ${c.gradient}` : ""
                      } ${c.text}`}
                      style={!c.gradient ? { backgroundColor: c.hex } : undefined}
                    >
                      {copiedToken === c.name ? (
                        <Check className="w-5 h-5 animate-in zoom-in" />
                      ) : (
                        <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[var(--fg)] truncate">{c.name}</div>
                      <div className="text-[11px] font-mono text-[var(--muted-fg)]">{c.hex}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Typography & Cyrillic Support */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold text-[var(--fg)]">2. Типографика және қазақ әліпбиі</h2>
        </div>

        <div className="card p-6 rounded-3xl border space-y-6">
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs">
            <span className="font-bold text-purple-400 block mb-1">
              Қазақ тілінің 9 төл әрпімен (Ә, І, Ң, Ғ, Ү, Ұ, Қ, Ө, Һ) үйлесімділік:
            </span>
            <p className="text-base font-bold text-[var(--fg)]">
              «Қазақша ойла. Креативті жаса. Нарықта таныт!» — Әлемдік деңгейдегі маркетингтік білім.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border-b border-[var(--border-color)] pb-3">
              <span className="text-[11px] font-mono text-[var(--muted-fg)]">H1 Display / 32px Bold</span>
              <h1 className="text-3xl font-extrabold text-[var(--fg)]">
                Идеяңды брендке айналдыр!
              </h1>
            </div>
            <div className="border-b border-[var(--border-color)] pb-3">
              <span className="text-[11px] font-mono text-[var(--muted-fg)]">H2 Section Title / 24px Bold</span>
              <h2 className="text-2xl font-bold text-[var(--fg)]">
                02. Жарнама студиясы — сапалы ұрандар конструкторы
              </h2>
            </div>
            <div className="border-b border-[var(--border-color)] pb-3">
              <span className="text-[11px] font-mono text-[var(--muted-fg)]">H3 Card Title / 18px SemiBold</span>
              <h3 className="text-lg font-semibold text-[var(--fg)]">
                Маркетингтік функционалдық сауаттылық және 4P кешені
              </h3>
            </div>
            <div className="border-b border-[var(--border-color)] pb-3">
              <span className="text-[11px] font-mono text-[var(--muted-fg)]">Body Regular / 14px</span>
              <p className="text-sm text-[var(--fg)] leading-relaxed">
                Қазақ тіліндегі жарнамалық мәтіндерде сөздердің дұрыс таңдалуы, буын мен ырғақтың үйлесімі, нақты әрекетке шақыру (Call to Action) маңызды рөл атқарады.
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono text-[var(--muted-fg)]">Caption / 12px Muted</span>
              <p className="text-xs text-[var(--muted-fg)]">
                Авторлық бағдарлама негізінде Хромтау гимназиясының 10-сыныбына арналған.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Component Showcase */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Component className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-[var(--fg)]">3. UI Компоненттері (Buttons, Cards, Inputs)</h2>
        </div>

        {/* 4 Vibrant Reference Cards */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
            Стильді карточкалар (Top-Right Reference үлгісі)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg space-y-2">
              <div className="flex items-center justify-between text-xs font-bold opacity-90 uppercase">
                <span>ҚМЖ Сабақтары</span>
                <Flame className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black">17 Сабақ</div>
              <p className="text-xs opacity-90">№ 130 бұйрық бойынша</p>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg space-y-2">
              <div className="flex items-center justify-between text-xs font-bold opacity-90 uppercase">
                <span>Оқушылар</span>
                <Award className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black">16 Оқушы</div>
              <p className="text-xs opacity-90">Сынып белсенділігі 100%</p>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg space-y-2">
              <div className="flex items-center justify-between text-xs font-bold opacity-90 uppercase">
                <span>Орташа көрсеткіш</span>
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black">88.5%</div>
              <p className="text-xs opacity-90">Тапсырмалар сапасы</p>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-600 to-violet-700 text-white shadow-lg space-y-2">
              <div className="flex items-center justify-between text-xs font-bold opacity-90 uppercase">
                <span>Сынып коды</span>
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black">10A-MARKET</div>
              <p className="text-xs opacity-90">Жылдам тіркелу коды</p>
            </div>
          </div>
        </div>

        {/* Buttons and Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="card p-6 rounded-3xl border space-y-4">
            <h3 className="text-sm font-bold text-[var(--fg)]">Батырмалар (Buttons)</h3>
            <div className="flex flex-wrap items-center gap-3">
              <button className="btn btn-primary text-xs px-4 py-2.5 rounded-xl font-bold">
                Негізгі батырма
              </button>
              <button className="btn btn-secondary text-xs px-4 py-2.5 rounded-xl font-bold border">
                Қосымша батырма
              </button>
              <button className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
                Сәтті батырма
              </button>
              <button className="px-4 py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white transition-colors">
                Қауіпті батырма
              </button>
            </div>
          </div>

          <div className="card p-6 rounded-3xl border space-y-4">
            <h3 className="text-sm font-bold text-[var(--fg)]">Бейдждер мен индикаторлар (Badges)</h3>
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge bg-blue-500/15 text-blue-400 text-xs font-bold">01 Білім алаңы</span>
              <span className="badge bg-emerald-500/15 text-emerald-400 text-xs font-bold">Тексерілді ✓</span>
              <span className="badge bg-amber-500/15 text-amber-400 text-xs font-bold">Черновик</span>
              <span className="badge bg-purple-500/15 text-purple-400 text-xs font-bold">+50 XP</span>
              <span className="badge bg-rose-500/15 text-rose-400 text-xs font-bold">Шектеулі</span>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="card p-6 rounded-3xl border space-y-4">
          <h3 className="text-sm font-bold text-[var(--fg)]">Енгізу өрістері (Input Controls)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--muted-fg)]" />
              <input
                type="text"
                placeholder="Іздеу өрісі..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl"
              />
            </div>
            <div>
              <select className="w-full text-xs py-2 rounded-xl">
                <option>Таңдау опциясы 1</option>
                <option>Таңдау опциясы 2</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Кәдімгі мәтіндік өріс..."
                className="w-full text-xs py-2 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
