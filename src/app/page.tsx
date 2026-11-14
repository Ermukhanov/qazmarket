"use client";

import { useApp } from "@/store/app-context";
import { LandingView } from "@/components/sections/landing-view";
import { StudentDashboard } from "@/components/sections/student-dashboard";
import TeacherPage from "./(dashboard)/teacher/page";

export default function HomePage() {
  const { user } = useApp();

  if (!user) {
    return <LandingView />;
  }

  if (user.role === "teacher" || user.role === "admin") {
    return <TeacherPage />;
  }

  return <StudentDashboard />;
}
