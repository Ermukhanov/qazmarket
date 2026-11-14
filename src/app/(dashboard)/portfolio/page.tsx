"use client";

import { useRef, useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { calculateLevel, formatDate } from "@/lib/utils";
import {
  FolderKanban,
  Download,
  Printer,
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  Calendar,
  PenTool,
  Share2,
  Search,
  FileText,
  User,
  ShieldCheck,
  Trophy,
} from "lucide-react";

export default function PortfolioPage() {
  const { lang, progress, user } = useApp();
  const t = getT(lang);
  const printRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const levelInfo = calculateLevel(progress.xp);

  const badges = [
    { id: "first_100", title: "Алғашқы қадам", desc: "100 XP жинаған", icon: "🌱", earned: progress.xp >= 100 },
    { id: "xp_500", title: "Жас маркетолог", desc: "500 XP жинаған", icon: "🎯", earned: progress.xp >= 500 },
    { id: "streak_3", title: "Үздіксіз серпін", desc: "3 күн қатарынан", icon: "🔥", earned: progress.streak >= 3 },
    { id: "brand_creator", title: "Бренд дизайнері", desc: "Бренд жасаған", icon: "✨", earned: progress.savedBrands?.length > 0 },
    { id: "slogan_maker", title: "Сөз зергері", desc: "Ұран жазған", icon: "✍️", earned: progress.savedSlogans?.length > 0 },
    { id: "smm_pro", title: "SMM жұлдызы", desc: "Пост жариялаған", icon: "📱", earned: progress.savedPosts?.length > 0 },
    { id: "seo_master", title: "SEO шебері", desc: "Іздеуді оңтайландырған", icon: "🔍", earned: progress.savedSeoProjects?.length > 0 },
    { id: "quiz_champ", title: "Тест үздігі", desc: "Тесттен өткен", icon: "🏆", earned: progress.testScores?.length > 0 },
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
          scale: 2,
          useCORS: true,
          logging: false,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`qazmarket-portfolio-${user?.name || "student"}.pdf`);
      }
    } catch (e) {
      console.error("PDF export error:", e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6 no-print">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>07. Жоба портфолиосы</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]">
            {t.portfolio.title}
          </h1>
          <p className="text-xs md:text-sm text-[var(--muted-fg)] mt-1">
            {t.portfolio.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="btn btn-secondary text-xs flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold"
          >
            <Printer className="w-4 h-4" />
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

      {/* Printable Portfolio Content Canvas */}
      <div ref={printRef} className="space-y-8 p-1 sm:p-2 bg-transparent">
        {/* Student Profile Card */}
        <div className="card p-6 md:p-8 rounded-3xl border bg-gradient-to-r from-purple-900/10 via-[var(--card)] to-blue-900/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                {user?.name ? user.name.charAt(0) : "Ә"}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--fg)]">
                    {user?.name || "Әлихан Нұрланұлы"}
                  </h2>
                  <span className="badge bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs">
                    {user?.classCode || "10A-MARKET"}
                  </span>
                </div>
                <p className="text-xs text-[var(--muted-fg)]">
                  {user?.school || "«№6 Хромтау гимназиясы» КММ"} • 10-сынып
                </p>
                <p className="text-[11px] text-purple-400 font-bold">
                  «Маркетингтегі қазақ тілі» авторлық бағдарламасы
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-[var(--border-color)] pt-4 sm:pt-0 sm:pl-6">
              <div className="text-center">
                <div className="text-2xl font-black text-purple-400">{progress.xp}</div>
                <div className="text-[10px] uppercase font-bold text-[var(--muted-fg)]">Жалпы XP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-blue-400">{levelInfo.level}</div>
                <div className="text-[10px] uppercase font-bold text-[var(--muted-fg)]">Деңгей</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-amber-400">{progress.streak}</div>
                <div className="text-[10px] uppercase font-bold text-[var(--muted-fg)]">Күн сериясы</div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="card p-6 md:p-8 rounded-3xl border space-y-4">
          <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>{t.portfolio.badgesTitle}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-3.5 rounded-2xl border text-center space-y-1 transition-all ${
                  b.earned
                    ? "bg-purple-500/10 border-purple-500/30 text-[var(--fg)]"
                    : "bg-[var(--card-subtle)] border-[var(--border-color)] opacity-40 grayscale"
                }`}
              >
                <div className="text-2xl">{b.icon}</div>
                <div className="text-xs font-bold truncate">{b.title}</div>
                <div className="text-[10px] text-[var(--muted-fg)] line-clamp-1">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Brands Section */}
        <div className="card p-6 md:p-8 rounded-3xl border space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
            <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <span>{t.portfolio.brandsTitle}</span>
            </h3>
            <span className="text-xs font-bold text-pink-400">{progress.savedBrands?.length || 0} бренд</span>
          </div>

          {progress.savedBrands && progress.savedBrands.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {progress.savedBrands.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-subtle)] space-y-2 text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-[var(--fg)]">{b.name}</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full border" style={{ background: b.primaryColor }} />
                      <div className="w-4 h-4 rounded-full border" style={{ background: b.secondaryColor }} />
                    </div>
                  </div>
                  <div className="text-xs text-[var(--muted-fg)] line-clamp-1">
                    Өнім: <span className="text-[var(--fg)] font-medium">{b.product}</span>
                  </div>
                  <div className="text-xs italic text-purple-300 bg-purple-500/10 p-2.5 rounded-xl">
                    «{b.slogan}»
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-[var(--card-subtle)] border border-dashed border-[var(--border-color)] text-xs text-[var(--muted-fg)]">
              {t.portfolio.emptyBrands}
            </div>
          )}
        </div>

        {/* Slogans Section */}
        <div className="card p-6 md:p-8 rounded-3xl border space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
            <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
              <PenTool className="w-5 h-5 text-purple-400" />
              <span>{t.portfolio.slogansTitle}</span>
            </h3>
            <span className="text-xs font-bold text-purple-400">{progress.savedSlogans?.length || 0} ұран</span>
          </div>

          {progress.savedSlogans && progress.savedSlogans.length > 0 ? (
            <div className="space-y-2.5">
              {progress.savedSlogans.map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--card-subtle)] flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-purple-400 mr-2">{s.brandName}:</span>
                    <span className="font-medium text-[var(--fg)]">«{s.text}»</span>
                  </div>
                  <span className="badge bg-purple-500/20 text-purple-300 text-xs shrink-0 ml-3">
                    {s.score}% рейтинг
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-[var(--card-subtle)] border border-dashed border-[var(--border-color)] text-xs text-[var(--muted-fg)]">
              {t.portfolio.emptySlogans}
            </div>
          )}
        </div>

        {/* SMM Posts Section */}
        <div className="card p-6 md:p-8 rounded-3xl border space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
            <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
              <Share2 className="w-5 h-5 text-violet-400" />
              <span>{t.portfolio.smmPostsTitle}</span>
            </h3>
            <span className="text-xs font-bold text-violet-400">{progress.savedPosts?.length || 0} пост</span>
          </div>

          {progress.savedPosts && progress.savedPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {progress.savedPosts.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-subtle)] space-y-2 text-xs text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-400 uppercase text-[10px]">{p.platform}</span>
                    <span className="text-[10px] text-[var(--muted-fg)]">{p.date}</span>
                  </div>
                  <div className="font-bold text-[var(--fg)]">{p.headline}</div>
                  <p className="text-[var(--muted-fg)] line-clamp-2">{p.body}</p>
                  <div className="text-blue-400 text-[10px] truncate">{p.hashtags}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-[var(--card-subtle)] border border-dashed border-[var(--border-color)] text-xs text-[var(--muted-fg)]">
              {t.portfolio.emptyPosts}
            </div>
          )}
        </div>

        {/* SEO Projects Section */}
        {progress.savedSeoProjects && progress.savedSeoProjects.length > 0 && (
          <div className="card p-6 md:p-8 rounded-3xl border space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
              <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
                <Search className="w-5 h-5 text-sky-400" />
                <span>{t.portfolio.seoProjectsTitle}</span>
              </h3>
              <span className="text-xs font-bold text-sky-400">{progress.savedSeoProjects.length} жоба</span>
            </div>

            <div className="space-y-3">
              {progress.savedSeoProjects.map((seo) => (
                <div
                  key={seo.id}
                  className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--card-subtle)] text-xs space-y-1.5 text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-400">{seo.pageTitle}</span>
                    <span className="badge bg-sky-500/20 text-sky-300 font-bold">{seo.score}% SEO</span>
                  </div>
                  <p className="text-[var(--muted-fg)] line-clamp-2">{seo.metaDescription}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
