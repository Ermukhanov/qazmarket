"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useApp } from "@/store/app-context";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";

export function AppLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user } = useApp();

  // Standalone public pages (Full-screen, NO sidebar, NO dashboard header)
  const isStandalone =
    pathname === "/landing" ||
    pathname === "/login" ||
    (pathname === "/" && !user);

  if (isStandalone) {
    return (
      <main className="min-h-screen w-full overflow-y-auto bg-[var(--bg)] text-[var(--fg)] p-3 sm:p-6 md:p-8">
        {children}
      </main>
    );
  }

  // Dashboard layout for authenticated users and inner tools
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Left Sidebar (280px) */}
      <Sidebar />

      {/* Main content wrapper */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main
          className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 pb-28 md:pb-10 transition-colors duration-200"
          id="main-content"
        >
          {children}
        </main>

        {/* Mobile Bottom Navigation (5 items) */}
        <BottomNav />
      </div>
    </div>
  );
}
