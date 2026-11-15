"use client";

import { useApp } from "@/store/app-context";
import { LandingView } from "@/components/sections/landing-view";
import { StudentDashboard } from "@/components/sections/student-dashboard";
import TeacherPage from "./(dashboard)/teacher/page";
import { GraduationCap } from "lucide-react";

function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-16 h-16 rounded-2xl bg-[#1E5BF0] flex items-center justify-center text-white shadow-xl shadow-blue-500/30 animate-pulse">
        <GraduationCap className="w-9 h-9" />
      </div>
      <p className="mt-4 text-sm font-bold text-slate-500 animate-pulse">
        QAZMARKET жүктелуде...
      </p>
    </div>
  );
}

export default function HomePage() {
  const { user, isLoaded } = useApp();

  // Wait for localStorage to be read before deciding what to show
  if (!isLoaded) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LandingView />;
  }

  if (user.role === "teacher" || user.role === "admin") {
    return <TeacherPage />;
  }

  return <StudentDashboard />;
}
