"use client";

import { useState } from "react";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { mockStudents, StudentRecord } from "@/data/mock-students";
import {
  Users,
  Download,
  Search,
  Filter,
  Award,
  CheckCircle2,
  TrendingUp,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

export default function TeacherPage() {
  const { lang, user } = useApp();
  const t = getT(lang);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("барлығы");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  const classCode = user?.classCode || "10A-MARKET";

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(classCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {}
  };

  const handleExportExcel = () => {
    let csvContent = "\uFEFF"; // UTF-8 BOM for Excel
    csvContent += "Аты-жөні,Электронды пошта,Сынып коды,Ұпай (XP),Деңгей,Серия (күн),Тақырыптар,Тест орташа балы,Ұрандар,Брендтер,Жарнамалар,Бейдждер,Соңғы белсенділік,Статус\n";

    mockStudents.forEach((s) => {
      csvContent += `"${s.name}","${s.email}","${s.classCode}",${s.xp},${s.level},${s.streak},${s.completedTopicsCount},${s.testScoreAvg}%,${s.slogansCount},${s.brandsCount},${s.adsCount},${s.badgesCount},"${s.lastActive}","${s.status}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `QAZMARKET_Нәтижелер_${classCode}_2026.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredStudents = mockStudents.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "барлығы" || s.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const avgXp = Math.round(mockStudents.reduce((acc, s) => acc + s.xp, 0) / mockStudents.length);
  const avgTest = Math.round(mockStudents.reduce((acc, s) => acc + s.testScoreAvg, 0) / mockStudents.length);

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
            <Users className="w-3.5 h-3.5" />
            <span>Мұғалім басқару панелі</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "var(--fg)" }}>
            {t.teacherDashboard.title}
          </h1>
          <p className="text-xs md:text-sm mt-1" style={{ color: "var(--muted-fg)" }}>
            {t.teacherDashboard.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Class Code Card */}
          <div className="flex items-center gap-2 p-1.5 pl-3 rounded-xl border bg-[var(--card)]" style={{ borderColor: "var(--border-color)" }}>
            <span className="text-xs font-bold text-[var(--muted-fg)]">{t.teacherDashboard.classCodeLabel}</span>
            <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-[var(--primary)] text-white">
              {classCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="p-1.5 rounded-lg hover:bg-[var(--muted)]"
              title="Кодты көшіру"
            >
              {copiedCode ? (
                <Check className="w-3.5 h-3.5 text-[var(--success)]" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[var(--muted-fg)]" />
              )}
            </button>
          </div>

          <button
            onClick={handleExportExcel}
            className="btn btn-primary text-xs flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>{t.teacherDashboard.exportExcel}</span>
          </button>
        </div>
      </div>

      {/* Class Statistics Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          <span className="text-xs font-medium" style={{ color: "var(--muted-fg)" }}>
            {t.teacherDashboard.totalStudents}
          </span>
          <div className="text-2xl sm:text-3xl font-black mt-1" style={{ color: "var(--fg)" }}>
            {mockStudents.length} оқушы
          </div>
          <p className="text-[11px] text-[var(--success)] mt-1 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Барлығы белсенді
          </p>
        </div>

        <div className="card p-5 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          <span className="text-xs font-medium" style={{ color: "var(--muted-fg)" }}>
            Сыныптың орташа балы
          </span>
          <div className="text-2xl sm:text-3xl font-black mt-1 text-[var(--primary)]">
            {avgTest}%
          </div>
          <p className="text-[11px] text-[var(--muted-fg)] mt-1">
            Тесттер бойынша нәтиже
          </p>
        </div>

        <div className="card p-5 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          <span className="text-xs font-medium" style={{ color: "var(--muted-fg)" }}>
            Орташа жинаған XP
          </span>
          <div className="text-2xl sm:text-3xl font-black mt-1 text-[var(--secondary)]">
            {avgXp} XP
          </div>
          <p className="text-[11px] text-[var(--success)] mt-1 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Өсім +18%
          </p>
        </div>

        <div className="card p-5 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
          <span className="text-xs font-medium" style={{ color: "var(--muted-fg)" }}>
            Жасалған жобалар
          </span>
          <div className="text-2xl sm:text-3xl font-black mt-1 text-[var(--warning)]">
            48 жоба
          </div>
          <p className="text-[11px] text-[var(--muted-fg)] mt-1">
            Брендтер, постерлер, ұрандар
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--muted-fg)]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Оқушының атын іздеу..."
            className="input pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {["барлығы", "үздік", "жақсы", "орташа"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                filterStatus === st
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "bg-[var(--muted)] text-[var(--muted-fg)] hover:text-[var(--fg)]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Students Data Table */}
      <div className="card rounded-3xl border overflow-hidden shadow-sm" style={{ background: "var(--card)", borderColor: "var(--border-color)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--muted)] border-b" style={{ borderColor: "var(--border-color)" }}>
                <th className="p-4 font-bold uppercase tracking-wider">{t.teacherDashboard.studentCol}</th>
                <th className="p-4 font-bold uppercase tracking-wider">{t.teacherDashboard.pointsCol}</th>
                <th className="p-4 font-bold uppercase tracking-wider">{t.teacherDashboard.levelCol}</th>
                <th className="p-4 font-bold uppercase tracking-wider">{t.teacherDashboard.testsCol}</th>
                <th className="p-4 font-bold uppercase tracking-wider">{t.teacherDashboard.portfolioCol}</th>
                <th className="p-4 font-bold uppercase tracking-wider">{t.teacherDashboard.lastActiveCol}</th>
                <th className="p-4 font-bold uppercase tracking-wider text-right">Әрекет</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--border-color)" }}>
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-[var(--muted)]/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0"
                        style={{ background: "var(--gradient-primary)" }}
                      >
                        {s.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: "var(--fg)" }}>
                          {s.name}
                        </p>
                        <p className="text-[10px]" style={{ color: "var(--muted-fg)" }}>
                          {s.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-black text-sm text-[var(--primary)]">
                    {s.xp} XP
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[var(--muted)] text-[var(--fg)]">
                      {s.level}-деңгей
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-[var(--success)]">
                      {s.testScoreAvg}%
                    </span>
                  </td>
                  <td className="p-4 font-medium" style={{ color: "var(--fg)" }}>
                    {s.brandsCount} бренд • {s.adsCount} жарнама
                  </td>
                  <td className="p-4 text-[11px]" style={{ color: "var(--muted-fg)" }}>
                    {s.lastActive}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="px-3 py-1.5 rounded-xl border text-xs font-semibold hover:bg-[var(--muted)] transition-colors"
                      style={{ borderColor: "var(--border-color)", color: "var(--primary)" }}
                    >
                      Көру
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="overlay animate-in fade-in" onClick={() => setSelectedStudent(null)}>
          <div
            className="dialog max-w-lg space-y-4"
            style={{ background: "var(--card)", color: "var(--fg)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {selectedStudent.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold">{selectedStudent.name}</h3>
                  <p className="text-xs text-[var(--muted-fg)]">{selectedStudent.email}</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase bg-[var(--muted)] text-[var(--primary)]">
                {selectedStudent.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[var(--muted)]">
                <span className="text-[10px] text-[var(--muted-fg)] block">Жалпы ұпай (XP):</span>
                <span className="text-base font-bold text-[var(--primary)]">{selectedStudent.xp} XP</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--muted)]">
                <span className="text-[10px] text-[var(--muted-fg)] block">Деңгейі:</span>
                <span className="text-base font-bold">{selectedStudent.level}-деңгей</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--muted)]">
                <span className="text-[10px] text-[var(--muted-fg)] block">Күндер сериясы:</span>
                <span className="text-base font-bold text-[var(--warning)]">{selectedStudent.streak} күн</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--muted)]">
                <span className="text-[10px] text-[var(--muted-fg)] block">Тест орташа балы:</span>
                <span className="text-base font-bold text-[var(--success)]">{selectedStudent.testScoreAvg}%</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border space-y-1.5 text-xs" style={{ borderColor: "var(--border-color)" }}>
              <span className="font-bold text-[var(--primary)] block">Портфолио көлемі:</span>
              <p>• Жасалған брендтер: {selectedStudent.brandsCount}</p>
              <p>• Дайындалған жарнамалар: {selectedStudent.adsCount}</p>
              <p>• Жазылған ұрандар: {selectedStudent.slogansCount}</p>
              <p>• Аяқталған тақырыптар: {selectedStudent.completedTopicsCount} / 5</p>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="btn btn-secondary w-full py-2.5 rounded-xl text-xs font-semibold"
            >
              Жабу
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
