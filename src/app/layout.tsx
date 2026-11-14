import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/store/app-context";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QAZMARKET — Қазақ тіліндегі маркетинг зертханасы | 10-сынып",
  description: "10-сынып оқушыларына арналған қазақ тілі + маркетинг + цифрлық сауаттылық интерактивті білім беру веб-платформасы. «Қазақша ойла. Креативті жаса. Нарықта таныт!»",
  keywords: ["маркетинг", "қазақ тілі", "10-сынып", "копирайтинг", "бренд", "жарнама", "QAZMARKET", "білім"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans" style={{ background: "var(--bg)", color: "var(--fg)" }}>
        <AppProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Desktop Left Sidebar */}
            <Sidebar />

            {/* Main content wrapper */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
              <Header />
              <main
                className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8 pb-24 md:pb-8"
                id="main-content"
              >
                {children}
              </main>
              {/* Mobile Bottom Bar */}
              <BottomNav />
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
