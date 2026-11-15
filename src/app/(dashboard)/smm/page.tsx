"use client";

import { useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import {
  Share2,
  Instagram,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  Copy,
  Check,
  BookmarkPlus,
  Sparkles,
  Smartphone,
  Hash,
  Video,
  Facebook,
} from "lucide-react";

export default function SMMPage() {
  const { lang, savePost } = useApp();
  const t = getT(lang);

  const [platform, setPlatform] = useState<"instagram" | "story" | "tiktok" | "facebook">("instagram");
  const [brandName, setBrandName] = useState("Balmuzdaq");
  const [headline, setHeadline] = useState("Балғын қазақ балмұздағы — нағыз табиғи дәм!");
  const [bodyText, setBodyText] = useState(
    "Жаздың аптап ыстығында шөліңізді басатын 100% отандық балмұздақ! Таза табиғи сүт пен құлпынайдан жасалған. Бүгін барлық сауда нүктелерінен сұраңыз!"
  );
  const [hashtags, setHashtags] = useState("#Balmuzdaq #ОтандықӨнім #ҚазақшаБизнес #ДәмдіБалмұздақ");
  const [cta, setCta] = useState("Қазір дүкеннен алып, балғын дәмді сезін! 🍦");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(148);
  const [isLiked, setIsLiked] = useState(false);

  const fullPostText = `${headline}

${bodyText}

👉 ${cta}

${hashtags}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPostText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    savePost({
      platform,
      brandName,
      headline,
      body: bodyText,
      hashtags,
      callToAction: cta,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const hashtagPresets = [
    "#ҚазақТілі",
    "#ОтандықӨнім",
    "#ЖастарБизнесі",
    "#QazaqStyle",
    "#МектепМаркетинг",
    "#DigitalQazaq",
  ];

  const addHashtag = (tag: string) => {
    if (!hashtags.includes(tag)) {
      setHashtags(hashtags ? `${hashtags} ${tag}` : tag);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-violet-500/15 text-violet-400 border border-violet-500/20 mb-2">
          <Share2 className="w-3.5 h-3.5" />
          <span>04. SMM орталығы</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]">
          {t.smm.title}
        </h1>
        <p className="text-xs md:text-sm text-[var(--muted-fg)] mt-1">
          {t.smm.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="card p-6 rounded-2xl border space-y-5">
            <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Пост параметрлері</span>
            </h3>

            {/* Platform Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-2">
                {t.smm.platform}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "instagram", name: "Instagram Post", icon: Instagram, color: "text-pink-500" },
                  { id: "story", name: "Instagram Story", icon: Smartphone, color: "text-purple-500" },
                  { id: "tiktok", name: "TikTok сценарий", icon: Video, color: "text-cyan-400" },
                  { id: "facebook", name: "Facebook Post", icon: Facebook, color: "text-blue-500" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setPlatform(item.id as typeof platform)}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                        platform === item.id
                          ? "bg-purple-500/15 border-purple-500/50 text-[var(--fg)] shadow-sm"
                          : "border-[var(--border-color)] text-[var(--muted-fg)] hover:bg-[var(--muted)] hover:text-[var(--fg)]"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${item.color}`} />
                      <span className="truncate">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">
                  Бренд атауы
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">
                  {t.smm.headline}
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">
                  {t.smm.body}
                </label>
                <textarea
                  rows={4}
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  className="w-full text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">
                  {t.smm.callToAction}
                </label>
                <input
                  type="text"
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  className="w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1 flex items-center justify-between">
                  <span>{t.smm.hashtags}</span>
                  <span className="text-[10px] text-purple-400 font-normal">Хэштегтерді басып қосуға болады</span>
                </label>
                <input
                  type="text"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  className="w-full text-xs"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {hashtagPresets.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addHashtag(tag)}
                      className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[var(--muted)] text-purple-400 hover:bg-purple-500/20 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between gap-3">
              <button
                onClick={handleCopy}
                className="btn btn-secondary text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.smm.textCopied : t.smm.copyText}</span>
              </button>

              <button
                onClick={handleSave}
                disabled={saved}
                className="btn btn-primary text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-2"
              >
                <BookmarkPlus className="w-4 h-4" />
                <span>{saved ? t.smm.savedSuccess : t.smm.saveBtn} (+50 XP)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Phone Mockup (5 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-24">
          <div className="w-full max-w-[340px] rounded-[36px] p-3.5 bg-slate-900 border-4 border-slate-700 shadow-2xl space-y-3 text-white">
            {/* Phone Speaker & Camera Notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto" />

            {/* App Header */}
            <div className="flex items-center justify-between px-2 pt-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-xs text-white">
                    {brandName.slice(0, 1)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1">
                    {brandName.toLowerCase().replace(/\\s+/g, "_")}
                    <span className="w-3 h-3 rounded-full bg-blue-500 text-[8px] flex items-center justify-center">
                      ✓
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">Демеушілік жарнама</div>
                </div>
              </div>
              <span className="text-slate-400 text-xs">•••</span>
            </div>

            {/* Post Image Container */}
            <div className="w-full h-56 rounded-2xl bg-gradient-to-br from-purple-700 via-indigo-800 to-slate-900 p-5 flex flex-col justify-between border border-slate-700/50 shadow-inner">
              <div className="inline-block self-start px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-md text-[10px] font-bold text-purple-300">
                #QAZMARKET
              </div>
              <div className="space-y-1.5">
                <div className="text-lg font-black leading-tight drop-shadow-md">
                  {headline}
                </div>
                <div className="text-xs text-purple-200 font-medium">
                  {brandName} • Отандық өнім
                </div>
              </div>
              <div className="text-[10px] text-slate-300 italic">
                {cta}
              </div>
            </div>

            {/* Interaction Bar */}
            <div className="px-2 pt-1 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={handleLike} className="flex items-center gap-1 transition-transform active:scale-125">
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-rose-500 text-rose-500" : "text-white"}`} />
                </button>
                <MessageCircle className="w-5 h-5 text-white" />
                <Send className="w-5 h-5 text-white" />
              </div>
              <Bookmark className="w-5 h-5 text-white" />
            </div>

            {/* Post Content */}
            <div className="px-2 pb-2 space-y-1.5 text-xs text-left">
              <div className="font-bold text-[11px] text-slate-200">
                {likes} ұнату белгісі
              </div>
              <div className="leading-snug text-slate-300 line-clamp-3">
                <strong className="text-white mr-1.5">{brandName.toLowerCase().replace(/\\s+/g, "_")}</strong>
                {bodyText}
              </div>
              <div className="text-blue-400 text-[11px] font-medium truncate">
                {hashtags}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
