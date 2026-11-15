"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { mockStudents, StudentRecord } from "@/data/mock-students";
import {
  Users,
  Download,
  Search,
  Award,
  CheckCircle2,
  TrendingUp,
  Copy,
  Check,
  Sparkles,
  FileText,
  PlusCircle,
  Settings,
  Bot,
  GraduationCap,
  BookMarked,
  Layers,
  X,
  Eye,
  CheckCircle,
  Clock,
  Filter,
  Trash2,
} from "lucide-react";
import NotFound from "@/app/not-found";

interface MockSubmission {
  id: string;
  studentName: string;
  lessonNumber: number;
  lessonTitle: string;
  taskTitle: string;
  studentAnswer: string;
  descriptorsAchieved: number;
  totalDescriptors: number;
  reflection: string;
  date: string;
  status: "Тексерілді" | "Жаңа";
  score: number;
}

const defaultSubmissions: MockSubmission[] = [
  {
    id: "sub-1",
    studentName: "Айзере Серікқызы",
    lessonNumber: 1,
    lessonTitle: "Қазақ тіліндегі маркетингтің негізгі принциптері",
    taskTitle: "1-тапсырма: Маркетинг принциптерін анықтау және қазақша баламаларын талдау",
    studentAnswer:
      "Отандық бал өндіруші «Бал-Қаймақ» бренді үшін 4P моделі:\n1. Өнім: Таза табиғи Алтай тау балы, шыны құтыда.\n2. Баға: 3200 теңге, орта тапқа лайықты әділ баға.\n3. Орын: Алматы және Астана қалаларындағы эко-дүкендер мен Kaspi дүкені.\n4. Жылжыту: Instagram және TikTok желісінде қазақша сапалы видеолар арқылы таныту.\nҰран: «Бал-Қаймақ — табиғаттың бал шырыны, денсаулықтың кепілі!»",
    descriptorsAchieved: 3,
    totalDescriptors: 3,
    reflection: "Жасыл (Сабақ өте түсінікті, барлық дескрипторларды толық орындадым)",
    date: "2026-11-14 14:30",
    status: "Тексерілді",
    score: 10,
  },
  {
    id: "sub-2",
    studentName: "Нұрислам Ерланұлы",
    lessonNumber: 3,
    lessonTitle: "Қазақ тіліндегі жарнамалық мәтіннің құрылымы мен мазмұны",
    taskTitle: "1-тапсырма: Жарнама мәтінін 5 критерий бойынша құрастыру",
    studentAnswer:
      "«Qazaq Style» киім брендіне арналған жарнама мәтіні:\nБасты тақырып: Ұлттық нақыш — заманауи сән үлгісінде!\nНегізгі мәтін: 100% таза мақтадан тігілген, күнделікті киюге өте ыңғайлы худилер мен жейделер. Өзіңе сенімді бол, ұлттық стильді мақтан тұт!\nCTA: Дәл қазір тапсырыс бер де, 15% жеңілдікке ие бол!",
    descriptorsAchieved: 3,
    totalDescriptors: 3,
    reflection: "Жасыл (Критерийлерді нақты сақтадым)",
    date: "2026-11-14 15:10",
    status: "Жаңа",
    score: 9,
  },
  {
    id: "sub-3",
    studentName: "Дильназ Бақытқызы",
    lessonNumber: 8,
    lessonTitle: "Брендинг негіздері және қазақ тілі",
    taskTitle: "1-тапсырма: Жеке бренд тұжырымдамасы мен неймингін әзірлеу",
    studentAnswer:
      "Бренд атауы: «Тұмар Тәттілері». Өнім: қазақтың дәстүрлі талқан, жент, құрт өнімдерін заманауи бельгиялық шоколадпен үйлестіру. Мақсатты аудитория: салауатты өмір салтын ұстанатын жастар мен туристер.",
    descriptorsAchieved: 2,
    totalDescriptors: 3,
    reflection: "Сары (Нейминг оңай болды, бірақ мақсатты аудиторияны талдауда көмек керек болды)",
    date: "2026-11-14 16:00",
    status: "Жаңа",
    score: 8,
  },
];

export default function TeacherPage() {
  const { lang, user, adminSettings, updateAdminSettings, progress } = useApp();
  const t = getT(lang);

  const isAuthorized = user && (user.role === "teacher" || user.role === "admin");

  if (!isAuthorized) {
    return <NotFound />;
  }

  const [activeTab, setActiveTab] = useState<"students" | "submissions" | "cms" | "settings">("students");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<MockSubmission | null>(null);

  // CMS state
  const [cmsItems, setCmsItems] = useState([
    { id: "1", type: "Тест сұрағы", title: "Жарнамадағы 5 критерийдің маңызы", status: "Жарияланды", date: "2026-11-14" },
    { id: "2", type: "Термин", title: "Brand Identity — Бренд бірегейлігі", status: "Жарияланды", date: "2026-11-12" },
    { id: "3", type: "ҚМЖ жоспары", title: "№ 130 бұйрық бойынша 12-сабақ", status: "Черновик", date: "2026-11-10" },
    { id: "4", type: "Жұмыс парағы", title: "№14 Жұмыс парағы: Тұтынушыны тарту арналары", status: "Жарияланды", date: "2026-11-08" },
  ]);
  const [cmsFilter, setCmsFilter] = useState<"Барлығы" | "Жарияланды" | "Черновик">("Барлығы");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Тест сұрағы");
  const [newStatus, setNewStatus] = useState("Жарияланды");

  // Submissions list combining mock + real submissions from user
  const realSubmissions: MockSubmission[] = (progress.lessonSubmissions || []).flatMap((sub, i) =>
    sub.taskAnswers.map((ans, j) => ({
      id: `real-${sub.lessonId}-${i}-${j}`,
      studentName: user.name || "Ағымдағы оқушы",
      lessonNumber: sub.lessonNumber,
      lessonTitle: sub.lessonTitle,
      taskTitle: ans.taskTitle,
      studentAnswer: ans.answerText,
      descriptorsAchieved: ans.achievedDescriptors.length,
      totalDescriptors: 3,
      reflection: `${sub.reflection.rating || "Жасыл"} (${sub.reflection.text})`,
      date: sub.submittedAt,
      status: "Жаңа" as const,
      score: ans.score || 10,
    }))
  );

  const [allSubmissions, setAllSubmissions] = useState<MockSubmission[]>([
    ...realSubmissions,
    ...defaultSubmissions,
  ]);

  const [studentsList, setStudentsList] = useState<StudentRecord[]>(mockStudents);

  useEffect(() => {
    fetch("/api/teacher/students")
      .then((r) => r.json())
      .then((data) => {
        if (data.students && Array.isArray(data.students)) {
          setStudentsList(data.students);
        }
      })
      .catch((err) => console.warn("Failed to load students:", err));
  }, []);

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

    studentsList.forEach((s) => {
      csvContent += `"${s.name}","${s.email}","${s.classCode}",${s.points},${s.level},${s.streak},${s.completedTopicsCount},${s.testScoreAvg}%,${s.slogansCount},${s.brandsCount},${s.adsCount},${s.badgesCount},"${s.lastActive}","${s.status}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `QAZMARKET_Нәтижелер_${classCode}_2026.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAddCmsItem = () => {
    if (!newTitle.trim()) return;
    setCmsItems([
      {
        id: String(Date.now()),
        type: newType,
        title: newTitle.trim(),
        status: newStatus,
        date: new Date().toISOString().split("T")[0],
      },
      ...cmsItems,
    ]);
    setNewTitle("");
    setShowAddModal(false);
  };

  const handleDeleteCmsItem = (id: string) => {
    setCmsItems(cmsItems.filter((c) => c.id !== id));
  };

  const filteredStudents = studentsList.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCmsItems = cmsItems.filter((c) => {
    if (cmsFilter === "Барлығы") return true;
    return c.status === cmsFilter;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/20 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Мұғалім және әкімшілік басқару панелі</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]">
            {t.teacher.title}
          </h1>
          <p className="text-xs md:text-sm text-[var(--muted-fg)] mt-1">
            {t.teacher.subtitle} (№6 Хромтау гимназиясы, 10-сынып)
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center p-1 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)]">
          <button
            onClick={() => setActiveTab("students")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "students" ? "bg-blue-600 text-white shadow-md" : "text-[var(--muted-fg)] hover:text-[var(--fg)]"
            }`}
          >
            Сынып тізімі
          </button>
          <button
            onClick={() => setActiveTab("submissions")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "submissions" ? "bg-blue-600 text-white shadow-md" : "text-[var(--muted-fg)] hover:text-[var(--fg)]"
            }`}
          >
            <span>Тапсырмалар</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500 text-white font-extrabold">
              {allSubmissions.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("cms")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "cms" ? "bg-blue-600 text-white shadow-md" : "text-[var(--muted-fg)] hover:text-[var(--fg)]"
            }`}
          >
            Контент (CMS)
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "settings" ? "bg-blue-600 text-white shadow-md" : "text-[var(--muted-fg)] hover:text-[var(--fg)]"
            }`}
          >
            Баптаулар
          </button>
        </div>
      </div>

      {/* ===== 4 VIBRANT COLOR CARDS (Style of Top-Right Reference) ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Orange - Lesson Plans */}
        <Link
          href="/lesson-plans"
          className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg space-y-3 hover:opacity-95 transition-transform hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider opacity-90">ҚМЖ Қоры</span>
            <FileText className="w-6 h-6 opacity-90" />
          </div>
          <div className="text-3xl font-black">17 Сабақ</div>
          <div className="text-xs opacity-90">№ 130 бұйрық үлгісінде дайын →</div>
        </Link>

        {/* Card 2: Blue - Students */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider opacity-90">Сынып тізімі</span>
            <Users className="w-6 h-6 opacity-90" />
          </div>
          <div className="text-3xl font-black">{studentsList.length} Оқушы</div>
          <div className="text-xs opacity-90">10-сынып белсенді тіркелген</div>
        </div>

        {/* Card 3: Emerald - Average Score */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider opacity-90">Орташа үлгерім</span>
            <TrendingUp className="w-6 h-6 opacity-90" />
          </div>
          <div className="text-3xl font-black">88.5%</div>
          <div className="text-xs opacity-90">Тесттер мен тапсырмалар нәтижесі</div>
        </div>

        {/* Card 4: Purple - Class Access Code */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-600 to-violet-700 text-white shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider opacity-90">Сынып коды</span>
            <Sparkles className="w-6 h-6 opacity-90" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black tracking-wider">{classCode}</span>
            <button
              onClick={handleCopyCode}
              className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
              title="Кодты көшіру"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="text-xs opacity-90">Оқушылар осы кодпен тіркеледі</div>
        </div>
      </div>

      {/* ===== TAB 1: STUDENTS ROSTER ===== */}
      {activeTab === "students" && (
        <div className="card p-6 md:p-8 rounded-3xl border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span>{t.teacher.studentsTableTitle}</span>
              </h3>
              <p className="text-xs text-[var(--muted-fg)]">
                Оқушылардың рейтингі мен орындалған жұмыстары
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative w-full sm:w-56">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--muted-fg)]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Оқушыны іздеу..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl"
                />
              </div>

              {/* Export Excel Button */}
              <button
                onClick={handleExportExcel}
                className="btn btn-secondary text-xs px-4 py-2.5 rounded-xl border font-bold flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>{t.teacher.exportExcel}</span>
              </button>
            </div>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto rounded-2xl border border-[var(--border-color)]">
            <table className="w-full text-xs text-left">
              <thead className="bg-[var(--card-subtle)] border-b border-[var(--border-color)] text-[var(--muted-fg)] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">№</th>
                  <th className="py-3 px-4">{t.teacher.nameCol}</th>
                  <th className="py-3 px-4">{t.teacher.pointsCol}</th>
                  <th className="py-3 px-4">{t.teacher.levelCol}</th>
                  <th className="py-3 px-4">Тапсырмалар</th>
                  <th className="py-3 px-4">Тест балы</th>
                  <th className="py-3 px-4 text-right">{t.teacher.actionsCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {filteredStudents.map((st, i) => (
                  <tr key={st.id} className="hover:bg-[var(--muted)]/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-[var(--muted-fg)]">{i + 1}</td>
                    <td className="py-3 px-4 font-semibold text-[var(--fg)]">
                      <div>{st.name}</div>
                      <div className="text-[10px] text-[var(--muted-fg)] font-normal">{st.email}</div>
                    </td>
                    <td className="py-3 px-4 font-bold text-purple-400">{st.points} XP</td>
                    <td className="py-3 px-4">
                      <span className="badge bg-blue-500/15 text-blue-400 text-[10px]">
                        {st.level}-деңгей
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{st.completedTasks} жұмыс</td>
                    <td className="py-3 px-4 font-bold text-emerald-400">{st.testScoreAvg}%</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedStudent(st)}
                        className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 font-bold text-[11px] transition-colors"
                      >
                        Карточка
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== TAB 2: SUBMISSIONS INSPECTION (17 Lessons Tasks) ===== */}
      {activeTab === "submissions" && (
        <div className="card p-6 md:p-8 rounded-3xl border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Оқушылардың сабақ тапсырмалары (17 сабақ бойынша)</span>
              </h3>
              <p className="text-xs text-[var(--muted-fg)] mt-0.5">
                Оқушылардың дескрипторларды орындауы, шығармашылық жауаптары және рефлексиялары
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/20">
              Барлығы: {allSubmissions.length} жұмыс
            </span>
          </div>

          <div className="space-y-4">
            {allSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="p-5 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] space-y-3 text-xs hover:border-blue-500/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-color)] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--fg)] text-sm">{sub.studentName}</span>
                    <span className="badge bg-blue-500/15 text-blue-400 text-[10px]">
                      №{sub.lessonNumber} сабақ
                    </span>
                    <span
                      className={`badge text-[10px] font-bold ${
                        sub.status === "Тексерілді"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-amber-500/15 text-amber-400"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-[var(--muted-fg)]">
                    <span>{sub.date}</span>
                    <span className="font-bold text-purple-400">Баға: {sub.score}/10</span>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-blue-400 mb-1">{sub.taskTitle}</div>
                  <p className="text-[var(--fg)] leading-relaxed whitespace-pre-line bg-[var(--card)] p-3 rounded-xl border border-[var(--border-color)]">
                    {sub.studentAnswer}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Дескриптор: {sub.descriptorsAchieved}/{sub.totalDescriptors} орындалды
                    </span>
                    <span className="text-[var(--muted-fg)]">
                      Рефлексия: <span className="text-[var(--fg)] font-medium">{sub.reflection}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedSubmission(sub)}
                    className="btn btn-secondary text-[11px] px-3 py-1.5 rounded-lg border flex items-center gap-1.5 font-bold"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    <span>Толық қарау</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== TAB 3: CONTENT CMS (Draft / Published) ===== */}
      {activeTab === "cms" && (
        <div className="card p-6 md:p-8 rounded-3xl border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <span>Оқу материалдарын басқару (CMS)</span>
              </h3>
              <p className="text-xs text-[var(--muted-fg)] mt-0.5">
                Кодты өзгертпей-ақ жаңа тест сұрақтарын, терминдер мен кейстерді қосу
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Filter */}
              <div className="flex items-center p-1 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)] text-xs">
                {(["Барлығы", "Жарияланды", "Черновик"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setCmsFilter(f)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      cmsFilter === f ? "bg-purple-600 text-white shadow-sm" : "text-[var(--muted-fg)]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Жаңа контент қосу</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredCmsItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] flex items-center justify-between text-xs hover:border-[var(--border-color)]"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="badge bg-purple-500/15 text-purple-400 text-[10px]">{item.type}</span>
                    <span className="font-bold text-[var(--fg)]">{item.title}</span>
                  </div>
                  <div className="text-[10px] text-[var(--muted-fg)]">Күні: {item.date}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`badge text-[10px] font-bold ${
                      item.status === "Жарияланды"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-amber-500/15 text-amber-400"
                    }`}
                  >
                    {item.status}
                  </span>
                  <button
                    onClick={() =>
                      setCmsItems(
                        cmsItems.map((c) =>
                          c.id === item.id
                            ? { ...c, status: c.status === "Жарияланды" ? "Черновик" : "Жарияланды" }
                            : c
                        )
                      )
                    }
                    className="text-xs text-blue-400 hover:underline font-semibold"
                  >
                    Ауыстыру
                  </button>
                  <button
                    onClick={() => handleDeleteCmsItem(item.id)}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Өшіру"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== TAB 4: AI CHAT SETTINGS ===== */}
      {activeTab === "settings" && (
        <div className="card p-6 md:p-8 rounded-3xl border space-y-6">
          <div>
            <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <span>ИИ-чатботы мен платформа баптаулары</span>
            </h3>
            <p className="text-xs text-[var(--muted-fg)] mt-0.5">
              QazBot виртуалды кеңесшісінің күнделікті шектеулері мен параметрлері
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] space-y-4 max-w-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-[var(--fg)]">ИИ-чатботты қосу</div>
                <div className="text-xs text-[var(--muted-fg)]">Оқушыларға маркетинг бойынша көмекші көрсету</div>
              </div>
              <input
                type="checkbox"
                checked={adminSettings.aiChatEnabled}
                onChange={(e) => updateAdminSettings({ aiChatEnabled: e.target.checked })}
                className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
              />
            </div>

            <div className="pt-3 border-t border-[var(--border-color)]">
              <label className="block text-xs font-bold text-[var(--fg)] mb-1">
                Бір оқушыға күндізгі хабарлама лимиті
              </label>
              <select
                value={adminSettings.aiDailyLimit}
                onChange={(e) => updateAdminSettings({ aiDailyLimit: Number(e.target.value) })}
                className="w-full text-xs"
              >
                <option value={15}>15 хабарлама / күн (Үнемді)</option>
                <option value={25}>25 хабарлама / күн (Ұсынылатын)</option>
                <option value={35}>35 хабарлама / күн (Кеңейтілген)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="card p-6 md:p-8 rounded-3xl border w-full max-w-lg space-y-5 bg-[var(--card)] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--fg)]">{selectedStudent.name}</h4>
                  <span className="text-[11px] text-[var(--muted-fg)]">{selectedStudent.email}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-lg text-[var(--muted-fg)] hover:text-[var(--fg)] bg-[var(--muted)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)]">
                <div className="text-[var(--muted-fg)]">Жалпы XP:</div>
                <div className="text-base font-extrabold text-purple-400">{selectedStudent.points} XP</div>
              </div>
              <div className="p-3 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)]">
                <div className="text-[var(--muted-fg)]">Тест үлгерімі:</div>
                <div className="text-base font-extrabold text-emerald-400">{selectedStudent.testScoreAvg}%</div>
              </div>
              <div className="p-3 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)]">
                <div className="text-[var(--muted-fg)]">Орындалған жұмыс:</div>
                <div className="text-base font-extrabold text-blue-400">{selectedStudent.completedTasks}</div>
              </div>
              <div className="p-3 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)]">
                <div className="text-[var(--muted-fg)]">Күн сериясы:</div>
                <div className="text-base font-extrabold text-amber-400">{selectedStudent.streak} күн</div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedStudent(null)}
                className="btn btn-secondary text-xs px-5 py-2 rounded-xl"
              >
                Жабу
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="card p-6 md:p-8 rounded-3xl border w-full max-w-xl space-y-4 bg-[var(--card)] shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
              <div>
                <span className="badge bg-blue-500/15 text-blue-400 text-xs font-bold mb-1">
                  №{selectedSubmission.lessonNumber} сабақ
                </span>
                <h4 className="text-base font-bold text-[var(--fg)]">{selectedSubmission.studentName}</h4>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-1.5 rounded-lg text-[var(--muted-fg)] hover:text-[var(--fg)] bg-[var(--muted)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-[var(--muted-fg)] block mb-1">Тапсырма тақырыбы:</span>
                <p className="font-semibold text-[var(--fg)]">{selectedSubmission.taskTitle}</p>
              </div>

              <div>
                <span className="font-bold text-[var(--muted-fg)] block mb-1">Оқушының жауабы:</span>
                <div className="p-4 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)] text-[var(--fg)] whitespace-pre-line leading-relaxed">
                  {selectedSubmission.studentAnswer}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                  Дескриптор: {selectedSubmission.descriptorsAchieved}/{selectedSubmission.totalDescriptors} орындалды
                </div>
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold">
                  Балл: {selectedSubmission.score}/10
                </div>
              </div>

              <div>
                <span className="font-bold text-[var(--muted-fg)] block mb-1">Рефлексия (ҚБ):</span>
                <p className="p-3 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)] text-[var(--fg)]">
                  {selectedSubmission.reflection}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-color)] flex justify-end">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="btn btn-secondary text-xs px-5 py-2 rounded-xl"
              >
                Жабу
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Content Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="card p-6 md:p-8 rounded-3xl border w-full max-w-md space-y-4 bg-[var(--card)] shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
              <h4 className="text-sm font-bold text-[var(--fg)]">Жаңа оқу материалын қосу</h4>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded text-[var(--muted-fg)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[var(--muted-fg)] mb-1">Түрі</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full text-xs"
                >
                  <option value="Тест сұрағы">Тест сұрағы</option>
                  <option value="Термин">Термин</option>
                  <option value="ҚМЖ жоспары">ҚМЖ жоспары</option>
                  <option value="Жұмыс парағы">Жұмыс парағы</option>
                  <option value="Кейс">Маркетингтік кейс</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[var(--muted-fg)] mb-1">Тақырыбы немесе сұрақ мәтіні</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Мәтінді енгізіңіз..."
                  className="w-full text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--muted-fg)] mb-1">Статус</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full text-xs"
                >
                  <option value="Жарияланды">Жарияланды</option>
                  <option value="Черновик">Черновик</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="btn btn-secondary text-xs px-4 py-2 rounded-xl"
              >
                Бас тарту
              </button>
              <button
                onClick={handleAddCmsItem}
                className="btn btn-primary text-xs px-5 py-2 rounded-xl font-bold"
              >
                Қосу
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
