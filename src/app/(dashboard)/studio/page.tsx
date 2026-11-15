"use client";

import { useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { checkSloganQuality } from "@/lib/utils";
import { copywriterTasks } from "@/data/copywriter-tasks";
import {
  PenTool,
  CheckCircle2,
  XCircle,
  Sparkles,
  BookmarkPlus,
  RefreshCw,
  Copy,
  Check,
  FileText,
  Clock,
  Phone,
  Target,
  Megaphone,
} from "lucide-react";

export default function StudioPage() {
  const { lang, saveSlogan, saveAdText } = useApp();
  const t = getT(lang);

  const [activeTab, setActiveTab] = useState<"slogan" | "adText">("slogan");

  // Tab 1: Slogan state
  const [brandName, setBrandName] = useState("Qazaq Republic");
  const [slogan, setSlogan] = useState("Qazaq Republic — дала рухының заманауи көрінісі!");
  const [selectedTask, setSelectedTask] = useState(copywriterTasks[0]);
  const [sloganSaved, setSloganSaved] = useState(false);

  // Tab 2: 6-Element Ad Text state
  const [adBrand, setAdBrand] = useState("Balmuzdaq");
  const [adHeadline, setAdHeadline] = useState("Ыстық күнде — нағыз табиғи қазақ балмұздағы!");
  const [adAudience, setAdAudience] = useState("Балалар, жастар және балғын тәттіні сүйетін барлық отбасы");
  const [adBenefits, setAdBenefits] = useState("100% таза қазақстандық сүт, ешқандай бояғышсыз, табиғи құлпынай мен бал дәмі.");
  const [adCta, setAdCta] = useState("Бүгін дәмін татып, жазғы балғындықты сезініңіз!");
  const [adDeadline, setAdDeadline] = useState("Тек осы аптаның соңына дейін — 2-еуін алсаңыз, 3-шісі сыйлыққа!");
  const [adContacts, setAdContacts] = useState("Барлық супермаркеттерде немесе @balmuzdaq.kz парақшасында");
  const [adSaved, setAdSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const quality = checkSloganQuality(slogan, brandName);

  const handleSelectPreset = (task: typeof copywriterTasks[0]) => {
    setSelectedTask(task);
    setBrandName(task.brandName);
    setSlogan(task.exampleGood || (task as any).goodExample || "");
    setSloganSaved(false);
  };

  const handleSaveSlogan = () => {
    if (!slogan.trim()) return;
    saveSlogan(slogan, brandName, quality.score);
    setSloganSaved(true);
    setTimeout(() => setSloganSaved(false), 3000);
  };

  const handleSaveAdText = () => {
    if (!adHeadline.trim()) return;
    saveAdText({
      headline: adHeadline,
      brandName: adBrand,
      targetAudience: adAudience,
      benefits: adBenefits,
      callToAction: adCta,
      deadline: adDeadline,
      contacts: adContacts,
    });
    setAdSaved(true);
    setTimeout(() => setAdSaved(false), 3000);
  };

  const fullAdText = `${adHeadline}

🎯 Мақсатты аудитория: ${adAudience}
✨ Негізгі артықшылықтары: ${adBenefits}
⏳ Науқан мерзімі: ${adDeadline}
👉 Әрекетке шақыру: ${adCta}
📞 Байланыс: ${adContacts}

#QazMarket #ҚазақшаЖарнама #${adBrand.replace(/\\s+/g, "")}`;

  const handleCopyAd = () => {
    navigator.clipboard.writeText(fullAdText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-400 border border-purple-500/20 mb-2">
            <PenTool className="w-3.5 h-3.5" />
            <span>02. Жарнама студиясы</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]">
            {t.studio.title}
          </h1>
          <p className="text-xs md:text-sm text-[var(--muted-fg)] mt-1">
            {t.studio.subtitle}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)]">
          <button
            onClick={() => setActiveTab("slogan")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "slogan"
                ? "bg-purple-600 text-white shadow-md"
                : "text-[var(--muted-fg)] hover:text-[var(--fg)]"
            }`}
          >
            {t.studio.tabSlogan}
          </button>
          <button
            onClick={() => setActiveTab("adText")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "adText"
                ? "bg-purple-600 text-white shadow-md"
                : "text-[var(--muted-fg)] hover:text-[var(--fg)]"
            }`}
          >
            {t.studio.tabAdText}
          </button>
        </div>
      </div>

      {/* ===== TAB 1: SLOGAN CHECKER (5 CRITERIA) ===== */}
      {activeTab === "slogan" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="card p-6 rounded-2xl border space-y-5">
              <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Ұран құрастыру шеберханасы</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--muted-fg)] mb-1.5 uppercase tracking-wider">
                    {t.studio.brandName}
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder={t.studio.brandNamePlaceholder}
                    className="w-full text-sm font-semibold"
                  />
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                    <label className="block text-xs font-bold text-[var(--muted-fg)] uppercase tracking-wider">
                      {t.studio.sloganInput}
                    </label>

                    {/* Quick Kazakh Alphabet Bar */}
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="text-[10px] text-[var(--muted-fg)] mr-1 font-semibold">Төл әріптер:</span>
                      {["ә", "і", "ң", "ғ", "ү", "ұ", "қ", "ө", "һ"].map((char) => (
                        <button
                          key={char}
                          type="button"
                          onClick={() => setSlogan(slogan + char)}
                          className="w-6 h-6 rounded-md border border-[var(--border-color)] bg-[var(--card)] hover:bg-purple-600 hover:text-white text-xs font-bold text-[var(--fg)] transition-all shadow-xs active:scale-95 flex items-center justify-center"
                          title={`«${char}» әрпін қосу`}
                        >
                          {char}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    placeholder={t.studio.sloganPlaceholder}
                    className="w-full text-sm font-medium leading-relaxed"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border-color)]">
                <button
                  onClick={() => setSlogan(selectedTask.exampleGood || (selectedTask as any).goodExample || "")}
                  className="btn btn-secondary text-xs px-3 py-2 rounded-xl flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Үлгіні қою</span>
                </button>

                <button
                  onClick={handleSaveSlogan}
                  disabled={sloganSaved || !slogan.trim()}
                  className="btn btn-primary text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-2"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>{sloganSaved ? t.studio.savedSuccess : t.studio.saveBtn}</span>
                </button>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="card p-6 rounded-2xl border space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
                12 Дайын отандық тапсырма үлгілері
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {copywriterTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => handleSelectPreset(task)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedTask.id === task.id
                        ? "bg-purple-500/15 border-purple-500/40 text-[var(--fg)]"
                        : "border-[var(--border-color)] text-[var(--muted-fg)] hover:text-[var(--fg)] hover:bg-[var(--muted)]"
                    }`}
                  >
                    <div className="text-xs font-bold text-purple-400">{task.brandName}</div>
                    <div className="text-[11px] truncate mt-0.5">{task.product}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Live Quality Validator (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card p-6 rounded-2xl border space-y-6">
              {/* Score Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
                    {t.studio.qualityScore}
                  </h4>
                  <div className="text-3xl font-black text-purple-400 mt-1">
                    {quality.score}%
                  </div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black text-xl">
                  {quality.passedCount} / 5
                </div>
              </div>

              {/* 5 Criteria Checklist */}
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  {quality.lengthValid ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-xs font-bold text-[var(--fg)]">{t.studio.criteriaLength}</div>
                    <div className="text-[11px] text-[var(--muted-fg)]">{quality.wordCount} сөз табылды (талап: 3–6 сөз)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {quality.hasKazakhSpecific ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-xs font-bold text-[var(--fg)]">{t.studio.criteriaKazakhLetters}</div>
                    <div className="text-[11px] text-[var(--muted-fg)]">Төл әріптер (ә, і, ң, ғ, ү, ұ, қ, ө, һ)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {quality.noRussianOnly ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-xs font-bold text-[var(--fg)]">{t.studio.criteriaNoRussianLetters}</div>
                    <div className="text-[11px] text-[var(--muted-fg)]">Орысша ғана әріптер жоқ (ё, ъ, ь, э, щ, ц)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {quality.brandIncluded ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-xs font-bold text-[var(--fg)]">{t.studio.criteriaBrandIncluded}</div>
                    <div className="text-[11px] text-[var(--muted-fg)]">«{brandName}» атауы мәтінде бар</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {quality.hasCallToAction ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-xs font-bold text-[var(--fg)]">{t.studio.criteriaCallToAction}</div>
                    <div className="text-[11px] text-[var(--muted-fg)]">Ритм, серпін, ұйқас немесе әрекетке шақыру</div>
                  </div>
                </div>
              </div>

              {/* Expert Feedback */}
              <div className="p-4 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)]">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block mb-1">
                  Сарапшының бағасы
                </span>
                <p className="text-xs text-[var(--fg)] leading-relaxed">
                  {quality.feedback}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== TAB 2: 6-ELEMENT AD TEXT CONSTRUCTOR ===== */}
      {activeTab === "adText" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="card p-6 rounded-2xl border space-y-4">
              <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <span>Жарнамалық мәтіннің 6 міндетті элементі</span>
              </h3>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[var(--muted-fg)] mb-1">
                    Бренд атауы
                  </label>
                  <input
                    type="text"
                    value={adBrand}
                    onChange={(e) => setAdBrand(e.target.value)}
                    className="w-full text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--muted-fg)] mb-1 flex items-center gap-1.5">
                    <Megaphone className="w-3.5 h-3.5 text-purple-400" />
                    <span>{t.studio.headline}</span>
                  </label>
                  <input
                    type="text"
                    value={adHeadline}
                    onChange={(e) => setAdHeadline(e.target.value)}
                    className="w-full text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--muted-fg)] mb-1 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-blue-400" />
                    <span>{t.studio.targetAudience}</span>
                  </label>
                  <input
                    type="text"
                    value={adAudience}
                    onChange={(e) => setAdAudience(e.target.value)}
                    className="w-full text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--muted-fg)] mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.studio.benefits}</span>
                  </label>
                  <textarea
                    rows={2}
                    value={adBenefits}
                    onChange={(e) => setAdBenefits(e.target.value)}
                    className="w-full text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[var(--muted-fg)] mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-rose-400" />
                      <span>{t.studio.deadline}</span>
                    </label>
                    <input
                      type="text"
                      value={adDeadline}
                      onChange={(e) => setAdDeadline(e.target.value)}
                      className="w-full text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--muted-fg)] mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.studio.callToAction}</span>
                    </label>
                    <input
                      type="text"
                      value={adCta}
                      onChange={(e) => setAdCta(e.target.value)}
                      className="w-full text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--muted-fg)] mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-sky-400" />
                    <span>{t.studio.contacts}</span>
                  </label>
                  <input
                    type="text"
                    value={adContacts}
                    onChange={(e) => setAdContacts(e.target.value)}
                    className="w-full text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-end gap-3">
                <button
                  onClick={handleSaveAdText}
                  disabled={adSaved}
                  className="btn btn-primary text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-2"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>{adSaved ? t.studio.savedSuccess : t.studio.saveBtn}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Live Preview Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="card p-6 rounded-2xl border space-y-4 bg-gradient-to-br from-[var(--card)] to-[var(--card-subtle)] shadow-xl sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black text-xs">
                    {adBrand.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--fg)]">{adBrand}</h4>
                    <span className="text-[10px] text-purple-400 font-semibold">Жарнама карточкасы</span>
                  </div>
                </div>

                <button
                  onClick={handleCopyAd}
                  className="btn btn-secondary text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                  title="Мәтінді толық көшіру"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Көшірілді" : "Көшіру"}</span>
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="text-sm font-extrabold text-[var(--fg)]">
                  {adHeadline}
                </div>

                <div className="p-3 rounded-xl bg-[var(--muted)]/50 space-y-2 text-[11px]">
                  <div>
                    <span className="font-bold text-blue-400">🎯 Аудитория: </span>
                    <span className="text-[var(--fg)]">{adAudience}</span>
                  </div>
                  <div>
                    <span className="font-bold text-amber-400">✨ Құндылығы: </span>
                    <span className="text-[var(--fg)]">{adBenefits}</span>
                  </div>
                  <div>
                    <span className="font-bold text-rose-400">⏳ Науқан: </span>
                    <span className="text-[var(--fg)]">{adDeadline}</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-400">👉 Әрекет: </span>
                    <span className="text-[var(--fg)] font-semibold">{adCta}</span>
                  </div>
                  <div>
                    <span className="font-bold text-sky-400">📞 Байланыс: </span>
                    <span className="text-[var(--fg)]">{adContacts}</span>
                  </div>
                </div>

                <div className="text-[10px] text-purple-400 font-semibold">
                  #QazMarket #ҚазақшаЖарнама #{adBrand.replace(/\\s+/g, "")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
