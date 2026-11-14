"use client";

import { useState, useRef } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import {
  Sparkles,
  Download,
  Save,
  Check,
  Palette,
  Eye,
  Layers,
  Award,
  RefreshCw,
  Share2,
} from "lucide-react";

export default function BrandStudioPage() {
  const { lang, progress, updateProgress, addXp } = useApp();
  const t = getT(lang);
  const cardRef = useRef<HTMLDivElement>(null);

  const [brandName, setBrandName] = useState<string>("Tumar Wear");
  const [product, setProduct] = useState<string>("Заманауи ұлттық нақыштағы жастар киімі (худи, свитшоттар)");
  const [targetAudience, setTargetAudience] = useState<string>("15-25 жастағы креативті оқушылар мен жастар");
  const [slogan, setSlogan] = useState<string>("Tumar Wear — ұлттық рухтың жаңа тынысы!");
  const [values, setValues] = useState<string>("Сапа, Ұлттық болмыс, Еркіндік");
  const [primaryColor, setPrimaryColor] = useState<string>("#7c3aed");
  const [secondaryColor, setSecondaryColor] = useState<string>("#3b82f6");
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const presetTemplates = [
    {
      name: "Tumar Wear",
      product: "Ұлттық нақыштағы заманауи киімдер",
      audience: "Жасөспірімдер мен студенттер",
      slogan: "Tumar Wear — ұлттық рухтың жаңа тынысы!",
      values: "Сапа, Ұлттық болмыс, Еркіндік",
      primary: "#7c3aed",
      secondary: "#3b82f6",
    },
    {
      name: "Ақбұлақ",
      product: "100% табиғи ауыл сүті, қаймақ, құрт",
      audience: "Қалалық отбасылар мен аналар",
      slogan: "Ақбұлақ — атамекеннің балғын сүті, әр үйдің ақ батасы!",
      values: "Табиғилық, Тазалық, Денсаулық",
      primary: "#0284c7",
      secondary: "#10b981",
    },
    {
      name: "Ziyatker",
      product: "ҰБТ-ға дайындайтын EdTech платформасы",
      audience: "9-11 сынып талапкерлері",
      slogan: "Ziyatker-мен бірге білім шыңына сеніммен жет!",
      values: "Инновация, Білім, Сенім",
      primary: "#ea580c",
      secondary: "#f59e0b",
    },
    {
      name: "EcoQazaq",
      product: "Жүгері крахмалынан жасалған эко-қаптамалар",
      audience: "Кофеханалар, мейрамханалар мен супермаркеттер",
      slogan: "Табиғатты аяла, таза болашақты бірге жаса!",
      values: "Экология, Жауапкершілік, Болашақ",
      primary: "#059669",
      secondary: "#14b8a6",
    },
  ];

  const handleApplyPreset = (p: typeof presetTemplates[0]) => {
    setBrandName(p.name);
    setProduct(p.product);
    setTargetAudience(p.audience);
    setSlogan(p.slogan);
    setValues(p.values);
    setPrimaryColor(p.primary);
    setSecondaryColor(p.secondary);
  };

  const handleSaveToPortfolio = () => {
    if (!brandName.trim()) return;

    const brandCard = {
      id: crypto.randomUUID(),
      name: brandName.trim(),
      product: product.trim(),
      targetAudience: targetAudience.trim(),
      slogan: slogan.trim(),
      primaryColor,
      secondaryColor,
      date: new Date().toISOString(),
    };

    updateProgress({
      savedBrands: [brandCard, ...progress.savedBrands],
    });

    addXp(150);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportImage = async () => {
    try {
      setIsExporting(true);
      const html2canvas = (await import("html2canvas")).default;
      if (cardRef.current) {
        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: null,
        });
        const link = document.createElement("a");
        link.download = `${brandName.toLowerCase().replace(/\s+/g, "-")}-brand-card.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
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
            <Sparkles className="w-3.5 h-3.5" />
            <span>05-бөлім • {t.nav.brand}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {t.brand.title}
          </h1>
          <p className="text-xs md:text-sm mt-1" style={{ color: "var(--muted-fg)" }}>
            {t.brand.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl border bg-[var(--card)]" style={{ borderColor: "var(--border-color)" }}>
            Жасалған брендтер: {progress.savedBrands.length}
          </span>
        </div>
      </div>

      {/* Preset Inspirations */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
          Дайын үлгілерден шабыт алыңыз:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {presetTemplates.map((p) => (
            <button
              key={p.name}
              onClick={() => handleApplyPreset(p)}
              className="p-3 rounded-2xl border text-left text-xs transition-all hover:scale-[1.02] flex items-center justify-between"
              style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})` }}
                />
                <span className="font-bold truncate" style={{ color: "var(--fg)" }}>
                  {p.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Constructor Form */}
        <div className="card p-6 md:p-8 rounded-3xl border space-y-4" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          <h3 className="text-base font-bold flex items-center gap-2 border-b pb-3" style={{ color: "var(--fg)", borderColor: "var(--border-color)" }}>
            <Palette className="w-4 h-4 text-[var(--primary)]" />
            <span>Бренд параметрлері</span>
          </h3>

          {/* Brand Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold" style={{ color: "var(--fg)" }}>
              {t.brand.brandNameLabel}
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Мысалы: Tumar Wear"
              className="input text-xs"
            />
          </div>

          {/* Product Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold" style={{ color: "var(--fg)" }}>
              {t.brand.productLabel}
            </label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Мысалы: Сүт және айран өнімдері"
              className="input text-xs"
            />
          </div>

          {/* Target Audience */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold" style={{ color: "var(--fg)" }}>
              {t.brand.targetAudienceLabel}
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Мысалы: Жас аналар, қала тұрғындары"
              className="input text-xs"
            />
          </div>

          {/* Slogan */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold" style={{ color: "var(--fg)" }}>
              {t.brand.sloganLabel}
            </label>
            <input
              type="text"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              placeholder="Мысалы: Қазақша ойла. Креативті жаса!"
              className="input text-xs"
            />
          </div>

          {/* Values */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold" style={{ color: "var(--fg)" }}>
              {t.brand.valuesLabel}
            </label>
            <input
              type="text"
              value={values}
              onChange={(e) => setValues(e.target.value)}
              placeholder="Мысалы: Сапа, Сенімділік, Ұлттық мұра"
              className="input text-xs"
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold" style={{ color: "var(--fg)" }}>
                {t.brand.primaryColor}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0"
                />
                <span className="text-xs font-mono font-semibold">{primaryColor}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold" style={{ color: "var(--fg)" }}>
                {t.brand.secondaryColor}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0"
                />
                <span className="text-xs font-mono font-semibold">{secondaryColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Card Preview & Export */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--fg)" }}>
              <Eye className="w-4 h-4 text-[var(--primary)]" />
              <span>{t.brand.previewHeader}</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--muted)]" style={{ color: "var(--muted-fg)" }}>
              Live Mockup
            </span>
          </div>

          {/* Renderable Brand Card (Export target) */}
          <div
            ref={cardRef}
            className="rounded-3xl p-8 border shadow-xl relative overflow-hidden transition-all text-white space-y-6"
            style={{
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            {/* Top row: Brand Avatar & Badge */}
            <div className="flex items-center justify-between relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center font-extrabold text-2xl tracking-wider shadow-md">
                {brandName.slice(0, 2).toUpperCase()}
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/20">
                  Қазақстандық Бренд
                </span>
                <p className="text-[10px] text-white/80 mt-1">QAZMARKET Лабораториясы</p>
              </div>
            </div>

            {/* Brand Name & Slogan */}
            <div className="relative z-10 space-y-1">
              <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-sm">
                {brandName || "Бренд атауы"}
              </h2>
              <p className="text-sm font-semibold text-white/90 italic">
                «{slogan || "Сіздің ұраныңыз осында пайда болады"}»
              </p>
            </div>

            {/* Product & Audience */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 text-xs">
              <div>
                <span className="text-[10px] text-white/70 block uppercase font-bold">Өнім/Қызмет:</span>
                <span className="font-medium text-white/95">{product || "Өнім сипаттамасы"}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/70 block uppercase font-bold">Мақсатты аудитория:</span>
                <span className="font-medium text-white/95">{targetAudience || "Аудитория сипаттамасы"}</span>
              </div>
            </div>

            {/* Values badges */}
            <div className="relative z-10 flex flex-wrap gap-2 pt-1">
              {values.split(",").map((v, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-white/20 backdrop-blur-md border border-white/20 text-white"
                >
                  ✓ {v.trim()}
                </span>
              ))}
            </div>

            {/* Decorative background circle */}
            <div className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          </div>

          {/* Export & Save Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleExportImage}
              disabled={isExporting}
              className="btn btn-secondary flex-1 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border shadow-sm"
            >
              <Download className="w-4 h-4 text-[var(--primary)]" />
              <span>{isExporting ? "Экспортталуда..." : t.brand.exportImage}</span>
            </button>

            <button
              onClick={handleSaveToPortfolio}
              className="btn btn-primary flex-1 py-3 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-md"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t.brand.savedAlert}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{t.brand.saveToPortfolio} (+150 XP)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
