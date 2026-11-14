"use client";

import { useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import {
  Megaphone,
  Copy,
  Check,
  Save,
  Instagram,
  Send,
  Heart,
  MessageCircle,
  Bookmark,
  Eye,
  Share2,
  Sparkles,
} from "lucide-react";

export default function JarnamePage() {
  const { lang, progress, updateProgress, addXp } = useApp();
  const t = getT(lang);

  const [platform, setPlatform] = useState<"instagram" | "telegram">("instagram");
  const [brandName, setBrandName] = useState<string>("Tumar Wear");
  const [headline, setHeadline] = useState<string>("Ұлттық рух — заманауи стильде!");
  const [bodyText, setBodyText] = useState<string>(
    "Біздің төл қазақстандық сапалы киімдер топтамасы жарық көрді! 100% табиғи мақтадан тігілген худилер сізге ерекше сенімділік пен жылу сыйлайды. Қазақы ою мен заманауи сән үйлесімі — сенің еркін болмысың!"
  );
  const [ctaText, setCtaText] = useState<string>("Дәл қазір тапсырыс беріп, 15% жеңілдікке ие болыңыз!");
  const [hashtags, setHashtags] = useState<string>("#TumarWear #ҚазақшаКиім #ҰлттықБренд #ҚазақстанЖастары");
  const [gradientIndex, setGradientIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const gradients = [
    "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)",
    "linear-gradient(135deg, #0284c7 0%, #10b981 100%)",
    "linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)",
    "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
  ];

  const fullPostText = `${headline}\n\n${bodyText}\n\n👉 ${ctaText}\n\n${hashtags}`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(fullPostText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleSaveToPortfolio = () => {
    const newAd = {
      id: crypto.randomUUID(),
      platform,
      headline,
      body: bodyText,
      callToAction: ctaText,
      imageUrl: gradients[gradientIndex],
      brandName,
      date: new Date().toISOString(),
    };

    updateProgress({
      savedAds: [newAd, ...progress.savedAds],
    });

    addXp(150);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: "var(--border-color)" }}>
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-2"
            style={{
              background: "color-mix(in srgb, var(--primary) 15%, transparent)",
              color: "var(--primary)",
            }}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>06-бөлім • {t.nav.jarname}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {t.jarname.title}
          </h1>
          <p className="text-xs md:text-sm mt-1" style={{ color: "var(--muted-fg)" }}>
            {t.jarname.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl border bg-[var(--card)]" style={{ borderColor: "var(--border-color)" }}>
            Жасалған жарнамалар: {progress.savedAds.length}
          </span>
        </div>
      </div>

      {/* Main Grid: Editor on Left, Live Mockup on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Column */}
        <div className="card p-6 md:p-8 rounded-3xl border space-y-4" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          {/* Platform switch tabs */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold" style={{ color: "var(--fg)" }}>
              {t.jarname.platformSelect}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPlatform("instagram")}
                className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  platform === "instagram"
                    ? "border-pink-500 bg-pink-500/10 text-pink-600 ring-2 ring-pink-500/20"
                    : "bg-[var(--muted)] text-[var(--muted-fg)]"
                }`}
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram Post</span>
              </button>

              <button
                onClick={() => setPlatform("telegram")}
                className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  platform === "telegram"
                    ? "border-sky-500 bg-sky-500/10 text-sky-600 ring-2 ring-sky-500/20"
                    : "bg-[var(--muted)] text-[var(--muted-fg)]"
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Telegram Channel</span>
              </button>
            </div>
          </div>

          {/* Brand Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold" style={{ color: "var(--fg)" }}>
              Бренд атауы
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="input text-xs"
            />
          </div>

          {/* Headline */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold" style={{ color: "var(--fg)" }}>
              {t.jarname.headlineLabel}
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Мысалы: Ұлттық рух — заманауи стильде!"
              className="input text-xs"
            />
          </div>

          {/* Body */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold" style={{ color: "var(--fg)" }}>
              {t.jarname.bodyLabel}
            </label>
            <textarea
              rows={4}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              className="textarea text-xs"
            />
          </div>

          {/* Call to action */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold" style={{ color: "var(--fg)" }}>
              {t.jarname.ctaLabel}
            </label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="Мысалы: Дәл қазір тапсырыс беріңіз!"
              className="input text-xs"
            />
          </div>

          {/* Hashtags */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold" style={{ color: "var(--fg)" }}>
              {t.jarname.hashtagsLabel}
            </label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="input text-xs font-mono"
            />
          </div>

          {/* Visual Showcase Gradient */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-bold" style={{ color: "var(--fg)" }}>
              {t.jarname.imageStyleLabel}
            </label>
            <div className="flex gap-2">
              {gradients.map((g, idx) => (
                <button
                  key={idx}
                  onClick={() => setGradientIndex(idx)}
                  className={`w-9 h-9 rounded-xl transition-transform ${
                    gradientIndex === idx ? "ring-4 ring-[var(--primary)] scale-110" : "hover:scale-105"
                  }`}
                  style={{ background: g }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Mockup Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--fg)" }}>
              <Eye className="w-4 h-4 text-[var(--primary)]" />
              <span>{t.jarname.preview}</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded capitalize bg-[var(--muted)]" style={{ color: "var(--muted-fg)" }}>
              {platform} Mockup
            </span>
          </div>

          {/* INSTAGRAM MOCKUP */}
          {platform === "instagram" && (
            <div className="rounded-3xl border shadow-xl overflow-hidden bg-white text-black max-w-md mx-auto">
              {/* Instagram Top Bar */}
              <div className="flex items-center justify-between p-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
                    style={{ background: gradients[gradientIndex] }}
                  >
                    {brandName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-none">{brandName.toLowerCase().replace(/\s+/g, "_")}</p>
                    <p className="text-[10px] text-gray-500">Алматы, Қазақстан</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-400">•••</span>
              </div>

              {/* Instagram Media Showcase */}
              <div
                className="w-full aspect-square flex flex-col items-center justify-center p-8 text-center text-white relative shadow-inner"
                style={{ background: gradients[gradientIndex] }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center font-black text-2xl mb-3 shadow-md">
                  {brandName.slice(0, 2).toUpperCase()}
                </div>
                <h4 className="text-xl font-black drop-shadow mb-1">{headline}</h4>
                <p className="text-xs font-semibold text-white/90 drop-shadow line-clamp-2">{ctaText}</p>
                <span className="absolute bottom-3 right-3 text-[10px] bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-md">
                  1/1
                </span>
              </div>

              {/* Instagram Action Icons */}
              <div className="p-3.5 space-y-2">
                <div className="flex items-center justify-between text-gray-800">
                  <div className="flex items-center gap-4">
                    <Heart className="w-5 h-5 hover:text-red-500 cursor-pointer transition-colors" />
                    <MessageCircle className="w-5 h-5 hover:text-blue-500 cursor-pointer transition-colors" />
                    <Share2 className="w-5 h-5 hover:text-green-500 cursor-pointer transition-colors" />
                  </div>
                  <Bookmark className="w-5 h-5 hover:text-gray-900 cursor-pointer" />
                </div>

                <p className="text-xs font-bold text-gray-900">1,248 лайк</p>

                {/* Caption */}
                <div className="text-xs leading-relaxed text-gray-800 space-y-1">
                  <p>
                    <span className="font-bold mr-1.5">{brandName.toLowerCase().replace(/\s+/g, "_")}</span>
                    {headline}
                  </p>
                  <p className="text-gray-700">{bodyText}</p>
                  <p className="font-semibold text-blue-600">👉 {ctaText}</p>
                  <p className="text-blue-500 text-[11px]">{hashtags}</p>
                </div>

                <p className="text-[10px] text-gray-400 uppercase pt-1">2 сағат бұрын</p>
              </div>
            </div>
          )}

          {/* TELEGRAM MOCKUP */}
          {platform === "telegram" && (
            <div className="rounded-3xl border shadow-xl p-4 bg-[#0e1621] text-white max-w-md mx-auto space-y-3 font-sans">
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-800">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                  style={{ background: gradients[gradientIndex] }}
                >
                  {brandName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold">{brandName} | Ресми арна</p>
                  <p className="text-[10px] text-gray-400">12 400 оқырман</p>
                </div>
              </div>

              {/* Message Bubble */}
              <div className="p-3.5 rounded-2xl bg-[#182533] space-y-2.5 border border-gray-800">
                {/* Image */}
                <div
                  className="w-full h-40 rounded-xl flex items-center justify-center text-center p-4 font-extrabold text-base shadow-md"
                  style={{ background: gradients[gradientIndex] }}
                >
                  {headline}
                </div>

                {/* Text */}
                <div className="text-xs space-y-2 leading-relaxed">
                  <p className="font-bold text-sm text-sky-400">📢 {headline}</p>
                  <p className="text-gray-200">{bodyText}</p>
                  <div className="p-2 rounded-xl bg-[#243447] text-sky-300 font-semibold text-center">
                    👉 {ctaText}
                  </div>
                  <p className="text-[11px] text-sky-400/80">{hashtags}</p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                  <span>14:30</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> 2.8k
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleCopyText}
              className="btn btn-secondary flex-1 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[var(--success)]" />
                  <span>{t.jarname.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[var(--primary)]" />
                  <span>{t.jarname.copyText}</span>
                </>
              )}
            </button>

            <button
              onClick={handleSaveToPortfolio}
              className="btn btn-primary flex-1 py-3 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-md"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Портфолиоға сақталды!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{t.jarname.saveToPortfolio} (+150 XP)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
