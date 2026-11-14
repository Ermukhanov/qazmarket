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

export function calculateLevel(xp: number): { level: number; currentXp: number; nextLevelXp: number } {
  const thresholds = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000, 5000];
  let level = 1;
  for (let i = 1; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) level = i + 1;
    else break;
  }
  const currentThreshold = thresholds[Math.min(level - 1, thresholds.length - 1)] || 0;
  const nextThreshold = thresholds[Math.min(level, thresholds.length - 1)] || thresholds[thresholds.length - 1] + 1000;
  return {
    level,
    currentXp: xp - currentThreshold,
    nextLevelXp: nextThreshold - currentThreshold,
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
  hasKazakh: boolean;
  noRussianOnly: boolean;
  hasBrand: boolean;
  hasRhythmOrCall: boolean;
  score: number;
} {
  const lengthOk = text.length >= 10 && text.length <= 100;
  const hasKazakh = hasKazakhLetters(text);
  const noRussianOnly = !hasOnlyRussianLetters(text);
  const hasBrand = text.toLowerCase().includes(brandName.toLowerCase());
  const callWords = ["таңда", "ал", "сатып", "бас", "қосыл", "тіркел", "көр", "оқы", "үйрен", "жаса", "аш"];
  const hasRhythmOrCall = callWords.some(w => text.toLowerCase().includes(w)) || text.includes("!");
  
  let score = 0;
  if (lengthOk) score += 20;
  if (hasKazakh) score += 25;
  if (noRussianOnly) score += 20;
  if (hasBrand) score += 15;
  if (hasRhythmOrCall) score += 20;

  return { lengthOk, hasKazakh, noRussianOnly, hasBrand, hasRhythmOrCall, score };
}
