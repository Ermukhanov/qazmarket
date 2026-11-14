"use client";

import { useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import {
  Search,
  Globe,
  Sparkles,
  CheckCircle2,
  XCircle,
  BookmarkPlus,
  Smartphone,
  Monitor,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export default function SeoPage() {
  const { lang, saveSeoProject } = useApp();
  const t = getT(lang);

  const [brandName, setBrandName] = useState("Qazaq Republic");
  const [pageTitle, setPageTitle] = useState("Qazaq Republic — Қазақша киімдер мен ұлттық стиль бренді");
  const [metaDesc, setMetaDesc] = useState(
    "Қазақстанның заманауи ұлттық бренді: худи, футболка, свитшоттар мен аксессуарлар. Алматы мен Астанаға жылдам жеткізу, 100% сапа кепілдігі."
  );
  const [slug, setSlug] = useState("qazaq-republic-kiimder");
  const [keywords, setKeywords] = useState("қазақша киім, ұлттық бренд, худи, алматы");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [engine, setEngine] = useState<"google" | "yandex">("google");
  const [saved, setSaved] = useState(false);

  // SEO Analysis Criteria
  const titleLen = pageTitle.trim().length;
  const isTitleGood = titleLen >= 45 && titleLen <= 65;

  const descLen = metaDesc.trim().length;
  const isDescGood = descLen >= 120 && descLen <= 165;

  const isSlugGood = /^[a-z0-9-]+$/.test(slug.trim()) && slug.trim().length > 3;

  const keywordList = keywords
    .split(",")
    .map((k) => k.trim().toLowerCase())
    .filter((k) => k.length > 0);

  const keywordsInTitle = keywordList.some((k) => pageTitle.toLowerCase().includes(k));
  const keywordsInDesc = keywordList.some((k) => metaDesc.toLowerCase().includes(k));

  const hasKazakh = /[әіңғүұқөһ]/i.test(pageTitle + metaDesc);

  let passed = 0;
  if (isTitleGood) passed++;
  if (isDescGood) passed++;
  if (isSlugGood) passed++;
  if (keywordsInTitle && keywordsInDesc) passed++;
  if (hasKazakh) passed++;

  const seoScore = Math.round((passed / 5) * 100);

  const handleSave = () => {
    saveSeoProject({
      brandName,
      pageTitle,
      metaDescription: metaDesc,
      urlSlug: slug,
      keywords: keywordList,
      score: seoScore,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/15 text-sky-400 border border-sky-500/20 mb-2">
          <Search className="w-3.5 h-3.5" />
          <span>05. SEO шеберханасы</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]">
          {t.seo.title}
        </h1>
        <p className="text-xs md:text-sm text-[var(--muted-fg)] mt-1">
          {t.seo.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form & Criteria (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="card p-6 rounded-2xl border space-y-4">
            <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              <span>Мета-тегтер мен кілтсөздер конструкторы</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[var(--muted-fg)] mb-1 uppercase tracking-wider">
                  Бренд атауы
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full font-semibold"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-[var(--muted-fg)] uppercase tracking-wider">
                    {t.seo.pageTitle}
                  </label>
                  <span className={`text-[11px] font-bold ${isTitleGood ? "text-emerald-400" : "text-amber-400"}`}>
                    {titleLen} / 60 таңба
                  </span>
                </div>
                <input
                  type="text"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  className="w-full font-semibold"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-[var(--muted-fg)] uppercase tracking-wider">
                    {t.seo.metaDescription}
                  </label>
                  <span className={`text-[11px] font-bold ${isDescGood ? "text-emerald-400" : "text-amber-400"}`}>
                    {descLen} / 160 таңба
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  className="w-full leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[var(--muted-fg)] mb-1 uppercase tracking-wider">
                    {t.seo.urlSlug}
                  </label>
                  <div className="flex items-center bg-[var(--card-subtle)] border border-[var(--border-color)] rounded-xl px-2.5">
                    <span className="text-[var(--muted-fg)] text-[11px]">site.kz/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full bg-transparent border-0 px-1 py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[var(--muted-fg)] mb-1 uppercase tracking-wider">
                    {t.seo.keywords}
                  </label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full"
                    placeholder="қазақша, өнім, сауда"
                  />
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
              <div className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>SEO рейтингі: {seoScore}%</span>
              </div>

              <button
                onClick={handleSave}
                disabled={saved}
                className="btn btn-primary text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-2"
              >
                <BookmarkPlus className="w-4 h-4" />
                <span>{saved ? t.seo.savedSuccess : t.seo.saveBtn} (+55 XP)</span>
              </button>
            </div>
          </div>

          {/* Automated Analysis Checklist */}
          <div className="card p-6 rounded-2xl border space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
              {t.seo.analysisTitle} (5 көрсеткіш)
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5">
                {isTitleGood ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="text-[var(--fg)]">
                  Title ұзындығы: <strong>{titleLen}</strong> таңба (Оңтайлысы: 45–65 таңба)
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {isDescGood ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="text-[var(--fg)]">
                  Description ұзындығы: <strong>{descLen}</strong> таңба (Оңтайлысы: 120–165 таңба)
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {isSlugGood ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="text-[var(--fg)]">
                  URL сілтеме форматы: кіші әріптер және сызықшалар (ЧПУ / SEF URL)
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {keywordsInTitle && keywordsInDesc ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="text-[var(--fg)]">
                  Кілтсөздер тақырып пен сипаттамада қамтылған
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {hasKazakh ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="text-[var(--fg)]">
                  Қазақ тілінің төл әріптері бойынша сұранысқа сәйкес
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right SERP Mockup (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="card p-6 rounded-2xl border space-y-4 shadow-xl">
            {/* SERP Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--fg)]">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>{t.seo.serpPreviewTitle}</span>
              </div>

              <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--muted)]">
                <button
                  onClick={() => setDevice("desktop")}
                  className={`p-1.5 rounded-lg transition-colors ${device === "desktop" ? "bg-[var(--card)] text-sky-400 shadow-sm" : "text-[var(--muted-fg)]"}`}
                  title="Компьютер экраны"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDevice("mobile")}
                  className={`p-1.5 rounded-lg transition-colors ${device === "mobile" ? "bg-[var(--card)] text-sky-400 shadow-sm" : "text-[var(--muted-fg)]"}`}
                  title="Мобильді экран"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Google / Yandex Search Box Mockup */}
            <div className="p-3 rounded-xl bg-[var(--muted)]/40 border border-[var(--border-color)] flex items-center gap-2.5 text-xs text-[var(--muted-fg)]">
              <Search className="w-4 h-4 text-slate-400" />
              <span className="truncate">{keywordList[0] || "қазақша бренд"} сатып алу</span>
            </div>

            {/* SERP Snippet Preview */}
            <div className={`p-4 rounded-xl border border-[var(--border-color)] space-y-2 bg-white text-slate-900 dark:bg-[#121024] dark:text-slate-100 ${device === "mobile" ? "max-w-[320px] mx-auto text-left" : ""}`}>
              {/* Site URL & Breadcrumb */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 truncate">
                <div className="w-4 h-4 rounded-full bg-sky-500/20 text-sky-500 flex items-center justify-center font-bold text-[9px]">
                  QM
                </div>
                <div className="truncate">
                  <span>https://qazmarket.kz/</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{slug}</span>
                </div>
              </div>

              {/* Title (Blue Clickable Link) */}
              <h4 className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer leading-snug">
                {pageTitle || "Беттің тақырыбы осында шығады"}
              </h4>

              {/* Meta Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {metaDesc || "Беттің сипаттамасы (meta description) осында көрсетіледі..."}
              </p>

              {/* Search Extensions */}
              <div className="pt-2 flex flex-wrap gap-2 text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                <span className="hover:underline cursor-pointer flex items-center gap-0.5">
                  Бағалар мен каталог <ExternalLink className="w-2.5 h-2.5" />
                </span>
                <span className="hover:underline cursor-pointer flex items-center gap-0.5">
                  Біз туралы <ExternalLink className="w-2.5 h-2.5" />
                </span>
                <span className="hover:underline cursor-pointer flex items-center gap-0.5">
                  Байланыс <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
