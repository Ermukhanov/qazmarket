"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Sparkles } from "lucide-react";

export function SplashScreen() {
  const [show, setShow] = useState<boolean>(true);
  const [fading, setFading] = useState<boolean>(false);

  useEffect(() => {
    // Check if splash was already shown in this session
    const seen = sessionStorage.getItem("qazmarket_splash_seen");
    if (seen) {
      setShow(false);
      return;
    }

    const timer1 = setTimeout(() => {
      setFading(true);
    }, 1100);

    const timer2 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("qazmarket_splash_seen", "true");
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-400 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(135deg, #F0F4FC 0%, #FFFFFF 50%, #E8F0FE 100%)",
      }}
    >
      <div className="flex flex-col items-center space-y-5 text-center px-6 animate-in zoom-in-95 duration-300">
        {/* Brand Icon (Mortarboard like screenshot) */}
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#1E5BF0] to-[#3B82F6] flex items-center justify-center text-white shadow-xl shadow-blue-500/25">
            <GraduationCap className="w-11 h-11" />
          </div>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-900 shadow-sm">
            ★
          </span>
        </div>

        {/* Title & Slogan */}
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <span>QAZMARKET</span>
          </h1>
          <p className="text-xs sm:text-sm font-bold text-[#1E5BF0] tracking-wide">
            Қазақ тіліндегі маркетинг зертханасы
          </p>
          <p className="text-[11px] text-slate-500 max-w-xs">
            «Қазақша ойла. Креативті жаса. Нарықта таныт!»
          </p>
        </div>

        {/* Animated Loading Bar */}
        <div className="w-48 h-1.5 rounded-full bg-blue-100 overflow-hidden relative mt-2">
          <div className="h-full bg-gradient-to-r from-[#1E5BF0] to-[#3B82F6] rounded-full animate-[progress_1.2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
