import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/store/app-context";
import { AppLayoutWrapper } from "@/components/layout/app-layout-wrapper";
import { AiChatWidget } from "@/components/ui/ai-chat-widget";
import { SplashScreen } from "@/components/ui/splash-screen";
import { OnboardingModal } from "@/components/ui/onboarding-modal";

const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QAZMARKET — Қазақ тіліндегі маркетинг зертханасы | 10-сынып",
  description: "10-сынып оқушыларына арналған қазақ тілі + маркетинг + цифрлық сауаттылық интерактивті білім беру веб-платформасы. «Қазақша ойла. Креативті жаса. Нарықта таныт!»",
  keywords: ["маркетинг", "қазақ тілі", "10-сынып", "копирайтинг", "бренд", "жарнама", "QAZMARKET", "білім", "Хромтау гимназиясы"],
  authors: [{ name: "Сарсенова Ақкүміс Піржанқызы, №6 Хромтау гимназиясы" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a1d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk" className={`${manrope.variable} h-full antialiased`} data-theme="light">
      <body
        className="min-h-full flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-300"
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          fontFamily: "var(--font-manrope), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <AppProvider>
          <AppLayoutWrapper>{children}</AppLayoutWrapper>

          {/* AI Marketing Assistant Widget */}
          <AiChatWidget />

          {/* Initial Splash Screen Animation */}
          <SplashScreen />

          {/* Guided Onboarding for New Students */}
          <OnboardingModal />
        </AppProvider>
      </body>
    </html>
  );
}
