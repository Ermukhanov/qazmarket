import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/store/app-context";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { AiChatWidget } from "@/components/ui/ai-chat-widget";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
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
    <html lang="kk" className={`${manrope.variable} h-full antialiased`} data-theme="dark">
      <body
        className="min-h-full flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-300"
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          fontFamily: "var(--font-manrope), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <AppProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Desktop Left Sidebar (280px) */}
            <Sidebar />

            {/* Main content wrapper */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
              <Header />
              <main
                className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8 pb-28 md:pb-10 transition-colors duration-200"
                id="main-content"
              >
                {children}
              </main>

              {/* Mobile Bottom Navigation (5 items) */}
              <BottomNav />
            </div>
          </div>

          {/* AI Marketing Assistant Widget */}
          <AiChatWidget />
        </AppProvider>
      </body>
    </html>
  );
}
