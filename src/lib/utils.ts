import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("kk-KZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function randomShuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function calculateLevel(xp: number): {
  level: number;
  currentXp: number;
  nextLevelXp: number;
  title: string;
} {
  const thresholds = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000, 5000];
  let level = 1;
  for (let i = 1; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) level = i + 1;
    else break;
  }

  const titles = [
    "Бастаушы оқушы",
    "Ізденуші маркетолог",
    "Креатив шебері",
    "Бренд стратегі",
    "SMM шебері",
    "Маркетинг сарапшысы",
    "Маркетинг гуруы",
  ];
  const title = titles[Math.min(level - 1, titles.length - 1)];

  const currentThreshold = thresholds[Math.min(level - 1, thresholds.length - 1)] || 0;
  const nextThreshold = thresholds[Math.min(level, thresholds.length - 1)] || thresholds[thresholds.length - 1] + 1000;
  return {
    level,
    currentXp: xp - currentThreshold,
    nextLevelXp: nextThreshold - currentThreshold,
    title,
  };
}

export function hasKazakhLetters(text: string): boolean {
  const kazSpecific = /[ӘәІіҢңҒғҮүҰұҚқӨөҺһ]/;
  return kazSpecific.test(text);
}

export function hasOnlyRussianLetters(text: string): boolean {
  const rusOnly = /^[А-Яа-яЁё\s\d\p{P}]+$/u;
  return rusOnly.test(text) && !hasKazakhLetters(text);
}

export function checkSloganQuality(text: string, brandName: string): {
  lengthOk: boolean;
  lengthValid: boolean;
  hasKazakh: boolean;
  hasKazakhSpecific: boolean;
  noRussianOnly: boolean;
  hasBrand: boolean;
  brandIncluded: boolean;
  hasRhythmOrCall: boolean;
  hasCallToAction: boolean;
  score: number;
  wordCount: number;
  passedCount: number;
  feedback: string;
} {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lengthValid = wordCount >= 3 && wordCount <= 7;
  const lengthOk = lengthValid;

  const hasKazakhSpecific = hasKazakhLetters(text);
  const hasKazakh = hasKazakhSpecific;

  const noRussianOnly = !hasOnlyRussianLetters(text);

  const brandIncluded = brandName.trim().length > 0 && text.toLowerCase().includes(brandName.trim().toLowerCase());
  const hasBrand = brandIncluded;

  const callWords = ["таңда", "ал", "сатып", "бас", "қосыл", "тіркел", "көр", "оқы", "үйрен", "жаса", "аш", "сезін", "ұмтыл"];
  const hasCallToAction = callWords.some((w) => text.toLowerCase().includes(w)) || text.includes("!");
  const hasRhythmOrCall = hasCallToAction;

  let passedCount = 0;
  if (lengthValid) passedCount++;
  if (hasKazakhSpecific) passedCount++;
  if (noRussianOnly) passedCount++;
  if (brandIncluded) passedCount++;
  if (hasCallToAction) passedCount++;

  const score = passedCount * 20;

  let feedback = "Керемет! Ұран барлық 5 критерийге толық сәйкес келеді.";
  if (passedCount < 5) {
    if (!lengthValid) feedback = "Ұран тым қысқа немесе тым ұзын. Оңтайлысы — 3 пен 6 сөз аралығы.";
    else if (!hasKazakhSpecific) feedback = "Қазақ тілінің төл әріптерін (ә, і, ң, ғ, ү, ұ, қ, ө, һ) қамтуға тырысыңыз.";
    else if (!brandIncluded) feedback = `Ұранның ішінде «${brandName}» брендінің атауын міндетті түрде жазыңыз.`;
    else if (!hasCallToAction) feedback = "Мәтінге екпінді ритм, леп белгісі немесе әрекетке шақыру сөзін қосыңыз.";
  }

  return {
    lengthOk,
    lengthValid,
    hasKazakh,
    hasKazakhSpecific,
    noRussianOnly,
    hasBrand,
    brandIncluded,
    hasRhythmOrCall,
    hasCallToAction,
    score,
    wordCount,
    passedCount,
    feedback,
  };
}
