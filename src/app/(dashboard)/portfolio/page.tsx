"use client";

import { useRef, useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { calculateLevel, formatDate } from "@/lib/utils";
import {
  FolderHeart,
  Download,
  Printer,
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  Calendar,
  PenTool,
  Megaphone,
  Briefcase,
  Star,
  User,
  ShieldCheck,
} from "lucide-react";

export default function PortfolioPage() {
  const { lang, progress, user } = useApp();
  const t = getT(lang);
  const printRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const { level, currentXp, nextLevelXp } = calculateLevel(progress.xp);

  const badges = [
    { id: "first_100", title: "Алғашқы қадам", desc: "100 XP жинаған", icon: "🌱", earned: progress.xp >= 100 },
    { id: "xp_500", title: "Жас маркетолог", desc: "500 XP жинаған", icon: "🎯", earned: progress.xp >= 500 },
    { id: "xp_1000", title: "Креатив шебері", desc: "1000 XP жинаған", icon: "💎", earned: progress.xp >= 1000 },
    { id: "streak_3", title: "Тұрақты ізденіс", desc: "3 күн қатарынан", icon: "🔥", earned: progress.streak >= 3 },
    { id: "streak_7", title: "Темір тәртіп", desc: "7 күн қатарынан", icon: "⚡", earned: progress.streak >= 7 },
    { id: "brand_creator", title: "Бренд дизайнері", desc: "Бренд жасаған", icon: "✨", earned: progress.savedBrands.length > 0 },
    { id: "copywriter_pro", title: "Сөз зергері", desc: "Ұран жазған", icon: "✍️", earned: progress.savedSlogans.length > 0 },
    { id: "quiz_champ", title: "Тест чемпионы", desc: "Тесттен өткен", icon: "🏆", earned: progress.testScores.length > 0 },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = async () => {
    try {
      setIsExporting(true);
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      if (printRef.current) {
        const canvas = await html2canvas(printRef.current, {
          scale: 1.5,
          useCORS: true,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.9);
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`qazmarket-portfolio-${user?.name || "student"}.pdf`);
      }
    } catch (e) {
      console.error(e);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top action controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b no-print" style={{ borderColor: "var(--border-color)" }}>
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-2"
            style={{
              background: "color-mix(in srgb, var(--primary) 15%, transparent)",
              color: "var(--primary)",
            }}
          >
            <FolderHeart className="w-3.5 h-3.5" />
            <span>08-бөлім • {t.nav.portfolio}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {t.portfolio.title}
          </h1>
          <p className="text-xs md:text-sm mt-1" style={{ color: "var(--muted-fg)" }}>
            {t.portfolio.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="btn btn-secondary text-xs flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold"
          >
            <Printer className="w-4 h-4 text-[var(--primary)]" />
            <span>{t.portfolio.printPortfolio}</span>
          </button>

          <button
            onClick={handleExportPdf}
            disabled={isExporting}
            className="btn btn-primary text-xs flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? "Дайындалуда..." : t.portfolio.exportPdf}</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE PORTFOLIO CONTAINER */}
      <div
        ref={printRef}
        className="space-y-8 p-6 md:p-10 rounded-3xl border shadow-sm print:border-none print:shadow-none print:p-0"
        style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
      >
        {/* Profile Card / Header in Portfolio */}
        <div
          className="p-6 md:p-8 rounded-3xl border text-white relative overflow-hidden shadow-lg"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #06b6d4 100%)",
            borderColor: "rgba(255,255,255,0.2)",
          }}
        >
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl font-black shadow-md">
                {(user?.name || "Оқушы").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black">{user?.name || "Айсұлтан Мұратұлы"}</h2>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/20 backdrop-blur-md">
                    {user?.classCode || "10A-сынып"}
                  </span>
                </div>
                <p className="text-xs text-white/80 mt-1">
                  QAZMARKET «Қазақ тіліндегі маркетинг зертханасы» авторлық бағдарламасы
                </p>
                <p className="text-xs text-white/90 font-semibold mt-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>Мәртебесі: {level}-деңгейлі жас маркетолог • {progress.xp} XP</span>
                </p>
              </div>
            </div>

            {/* Quick stats badges */}
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-black/20 backdrop-blur-md border border-white/10">
                <span className="text-[10px] text-white/70 block">Күндер сериясы</span>
                <span className="text-lg font-black text-amber-300">{progress.streak} күн</span>
              </div>
              <div className="p-3 rounded-xl bg-black/20 backdrop-blur-md border border-white/10">
                <span className="text-[10px] text-white/70 block">Брендтер</span>
                <span className="text-lg font-black">{progress.savedBrands.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: BADGES COLLECTION */}
        <div className="space-y-3">
          <h3 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--fg)" }}>
            <Award className="w-5 h-5 text-[var(--warning)]" />
            <span>Иеленген бейдждер мен жетістіктер</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                  b.earned ? "bg-[var(--card)]" : "opacity-40 bg-[var(--muted)]"
                }`}
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="text-2xl">{b.icon}</div>
                <div>
                  <h4 className="text-xs font-bold" style={{ color: "var(--fg)" }}>
                    {b.title}
                  </h4>
                  <p className="text-[10px]" style={{ color: "var(--muted-fg)" }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: CREATED BRANDS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--fg)" }}>
              <Sparkles className="w-5 h-5 text-[var(--primary)]" />
              <span>Әзірленген төл брендтер ({progress.savedBrands.length})</span>
            </h3>
          </div>

          {progress.savedBrands.length === 0 ? (
            <div className="p-8 rounded-2xl border text-center space-y-2" style={{ background: "var(--muted)", borderColor: "var(--border-color)" }}>
              <p className="text-xs text-[var(--muted-fg)]">
                Әзірге сақталған бренд жоқ. «Бренд студиясы» бөлімінде алғашқы брендіңізді жасаңыз!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {progress.savedBrands.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl border text-white space-y-3 relative overflow-hidden shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${b.primaryColor}, ${b.secondaryColor})`,
                    borderColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-extrabold text-sm">
                      {b.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md font-bold">
                      {b.date ? formatDate(b.date) : "2026 ж."}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-black">{b.name}</h4>
                    <p className="text-xs font-semibold text-white/90 italic">«{b.slogan}»</p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/20 backdrop-blur-md text-xs space-y-1">
                    <p>
                      <span className="text-white/70 font-semibold">Өнім: </span>
                      <span>{b.product}</span>
                    </p>
                    <p>
                      <span className="text-white/70 font-semibold">Аудитория: </span>
                      <span>{b.targetAudience}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 3: CREATED ADS */}
        <div className="space-y-4">
          <h3 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--fg)" }}>
            <Megaphone className="w-5 h-5 text-[var(--secondary)]" />
            <span>Әлеуметтік желі жарнамалары ({progress.savedAds.length})</span>
          </h3>

          {progress.savedAds.length === 0 ? (
            <div className="p-8 rounded-2xl border text-center space-y-2" style={{ background: "var(--muted)", borderColor: "var(--border-color)" }}>
              <p className="text-xs text-[var(--muted-fg)]">
                Әзірге сақталған жарнама жоқ. «Жарнама жобасы» бөлімінде Instagram/Telegram постын құрастырыңыз!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {progress.savedAds.map((ad) => (
                <div
                  key={ad.id}
                  className="p-5 rounded-2xl border space-y-2.5"
                  style={{ background: "var(--muted)", borderColor: "var(--border-color)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold capitalize text-[var(--primary)]">
                      {ad.platform} посты • {ad.brandName}
                    </span>
                    <span className="text-[10px] text-[var(--muted-fg)]">
                      {ad.date ? formatDate(ad.date) : "2026 ж."}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold" style={{ color: "var(--fg)" }}>
                    {ad.headline}
                  </h4>

                  <p className="text-xs text-[var(--muted-fg)] line-clamp-3">
                    {ad.body}
                  </p>

                  <div className="p-2.5 rounded-xl bg-[var(--card)] text-xs font-semibold text-[var(--primary)] border" style={{ borderColor: "var(--border-color)" }}>
                    👉 {ad.callToAction}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 4: SLOGANS & COPY */}
        <div className="space-y-4">
          <h3 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--fg)" }}>
            <PenTool className="w-5 h-5 text-[var(--primary)]" />
            <span>Жазылған ұрандар мен авторлық мәтіндер ({progress.savedSlogans.length})</span>
          </h3>

          {progress.savedSlogans.length === 0 ? (
            <div className="p-8 rounded-2xl border text-center space-y-2" style={{ background: "var(--muted)", borderColor: "var(--border-color)" }}>
              <p className="text-xs text-[var(--muted-fg)]">
                Әзірге ұран жазылмады. «Копирайтер» шеберханасында сынақтан өтіңіз!
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {progress.savedSlogans.map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded-2xl border flex items-center justify-between gap-4"
                  style={{ background: "var(--muted)", borderColor: "var(--border-color)" }}
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase text-[var(--primary)] block">
                      {s.brandName}
                    </span>
                    <p className="text-xs font-bold text-[var(--fg)] mt-0.5">
                      «{s.text}»
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-[var(--success)] block">
                      {s.score}% сапа
                    </span>
                    <span className="text-[10px] text-[var(--muted-fg)]">
                      {s.date ? formatDate(s.date) : "Бүгін"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 5: TEST RESULTS SUMMARY */}
        <div className="space-y-4">
          <h3 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--fg)" }}>
            <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
            <span>Тестілеу нәтижелері ({progress.testScores.length})</span>
          </h3>

          {progress.testScores.length === 0 ? (
            <div className="p-8 rounded-2xl border text-center space-y-2" style={{ background: "var(--muted)", borderColor: "var(--border-color)" }}>
              <p className="text-xs text-[var(--muted-fg)]">
                Әзірге тест тапсырылмаған. «Тест банкі» бөлімінде біліміңізді сынаңыз!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {progress.testScores.map((ts, idx) => (
                <div
                  key={ts.testId || idx}
                  className="p-3.5 rounded-2xl border text-center"
                  style={{ background: "var(--muted)", borderColor: "var(--border-color)" }}
                >
                  <span className="text-[10px] text-[var(--muted-fg)] block">№{idx + 1} сынақ</span>
                  <span className="text-lg font-black text-[var(--primary)]">
                    {ts.score} / {ts.total}
                  </span>
                  <span className="text-[10px] font-bold text-[var(--success)] block mt-0.5">
                    {Math.round((ts.score / Math.max(1, ts.total)) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Portfolio Footer Stamp */}
        <div className="pt-6 border-t text-center text-xs space-y-1" style={{ borderColor: "var(--border-color)", color: "var(--muted-fg)" }}>
          <p className="font-bold">QAZMARKET — Қазақ тіліндегі маркетинг зертханасы</p>
          <p className="text-[10px]">«Қазақша ойла. Креативті жаса. Нарықта таныт!»</p>
        </div>
      </div>
    </div>
  );
}
