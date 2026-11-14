"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/store/app-context";
import { getT } from "@/lib/i18n";
import { curriculumLessons, CurriculumLesson, CurriculumTask } from "@/data/curriculum-lessons";
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Award,
  Clock,
  Layers,
  Search,
  Eye,
  Check,
  RotateCcw,
  Send,
  ThumbsUp,
  Star,
  FileCheck,
  FolderKanban,
  AlertCircle,
  Lightbulb,
  Target,
} from "lucide-react";

export default function BilimPage() {
  const { lang, progress, addXp, saveLessonSubmission } = useApp();
  const t = getT(lang);

  // Active view: catalog or lesson player
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Filter & search in catalog
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");

  // Player state
  const [playerStep, setPlayerStep] = useState<"objectives" | "theory" | "tasks" | "reflection">("objectives");
  const [activeTaskIdx, setActiveTaskIdx] = useState<number>(0);
  const [taskAnswers, setTaskAnswers] = useState<Record<string, string>>({});
  const [submittedTasks, setSubmittedTasks] = useState<Record<string, boolean>>({});
  const [checkedDescriptors, setCheckedDescriptors] = useState<Record<string, string[]>>({});
  
  // Reflection state
  const [reflectionMethod, setReflectionMethod] = useState<string>("«Бағдаршам» әдісі");
  const [reflectionRating, setReflectionRating] = useState<string>("green");
  const [reflectionText, setReflectionText] = useState<string>("");
  const [lessonFinished, setLessonFinished] = useState<boolean>(false);

  const completedLessonIds = progress.completedLessons || [];

  // Active lesson object
  const activeLesson = curriculumLessons.find((l) => l.id === activeLessonId) || null;

  // Sync active lesson and task index with localStorage for AI Chatbot context awareness
  useEffect(() => {
    if (activeLessonId) {
      try {
        localStorage.setItem(
          "qazmarket_active_lesson",
          JSON.stringify({
            lessonId: activeLessonId,
            taskIndex: activeTaskIdx,
          })
        );
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        localStorage.removeItem("qazmarket_active_lesson");
      } catch (e) {
        console.error(e);
      }
    }
  }, [activeLessonId, activeTaskIdx]);

  // Filtered lessons for catalog
  const filteredLessons = curriculumLessons.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.hours.includes(searchQuery);

    const isDone = completedLessonIds.includes(l.id);
    if (filterStatus === "completed") return matchesSearch && isDone;
    if (filterStatus === "pending") return matchesSearch && !isDone;
    return matchesSearch;
  });

  const completionPercent = Math.round((completedLessonIds.length / curriculumLessons.length) * 100);

  // Handle open player
  const handleOpenLesson = (lesson: CurriculumLesson) => {
    setActiveLessonId(lesson.id);
    setPlayerStep("objectives");
    setActiveTaskIdx(0);
    setLessonFinished(completedLessonIds.includes(lesson.id));

    // Load any existing submission for this lesson
    const existingSub = progress.lessonSubmissions?.find((s) => s.lessonId === lesson.id);
    if (existingSub) {
      const answers: Record<string, string> = {};
      const submitted: Record<string, boolean> = {};
      const descriptors: Record<string, string[]> = {};
      existingSub.taskAnswers.forEach((ta) => {
        answers[ta.taskId] = ta.answerText;
        submitted[ta.taskId] = true;
        descriptors[ta.taskId] = ta.achievedDescriptors;
      });
      setTaskAnswers(answers);
      setSubmittedTasks(submitted);
      setCheckedDescriptors(descriptors);
      setReflectionText(existingSub.reflection.text || "");
      setReflectionRating(existingSub.reflection.rating || "green");
      setReflectionMethod(existingSub.reflection.method || lesson.stages[2].formativeAssessment);
    } else {
      setTaskAnswers({});
      setSubmittedTasks({});
      setCheckedDescriptors({});
      setReflectionText("");
      setReflectionRating("green");
      setReflectionMethod(lesson.stages[2].formativeAssessment);
    }
  };

  // Submit single task
  const handleSubmitTask = (taskId: string) => {
    const answer = taskAnswers[taskId] || "";
    if (!answer.trim()) return;

    setSubmittedTasks((prev) => ({ ...prev, [taskId]: true }));
    addXp(30, "Тапсырма жауабы тексеруге жіберілді");
  };

  // Toggle descriptor checklist
  const handleToggleDescriptor = (taskId: string, desc: string) => {
    setCheckedDescriptors((prev) => {
      const current = prev[taskId] || [];
      const updated = current.includes(desc)
        ? current.filter((d) => d !== desc)
        : [...current, desc];
      return { ...prev, [taskId]: updated };
    });
  };

  // Finish full lesson and save to portfolio & state
  const handleFinishLesson = () => {
    if (!activeLesson) return;

    const formattedTaskAnswers = activeLesson.tasks.map((task) => ({
      taskId: task.id,
      taskTitle: task.title,
      answerText: taskAnswers[task.id] || "Тапсырма ауызша/дәптерде орындалды",
      achievedDescriptors: checkedDescriptors[task.id] || task.descriptors,
      score: 10,
    }));

    saveLessonSubmission({
      lessonId: activeLesson.id,
      lessonNumber: activeLesson.number,
      lessonTitle: activeLesson.title,
      submittedAt: new Date().toISOString(),
      taskAnswers: formattedTaskAnswers,
      reflection: {
        method: reflectionMethod,
        text: reflectionText || "Сабақ мақсаттарына толық қол жеткіздім.",
        rating: reflectionRating,
      },
      xpEarned: 150,
    });

    setLessonFinished(true);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* ========================================================================= */}
      {/* 1. CATALOG VIEW (All 17 Lessons)                                          */}
      {/* ========================================================================= */}
      {!activeLesson && (
        <div className="space-y-8">
          {/* Header & Course Card */}
          <div className="card p-6 md:p-8 rounded-3xl border bg-gradient-to-br from-purple-900/15 via-[var(--card)] to-blue-900/15 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-400 border border-purple-500/20">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>01. Білім алаңы — Авторлық бағдарлама</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)] tracking-tight">
                  «Маркетингтегі қазақ тілі» курсы
                </h1>
                <p className="text-xs sm:text-sm text-[var(--muted-fg)] leading-relaxed">
                  10-сыныпқа арналған 17 сабақ (34 сағат). Әр сабақта толық теориялық конспект, нақты тапсырмалар, дескрипторлар жүйесі, үлгі жауаптар және қалыптастырушы бағалау (ҚБ) рефлексиясы қамтылған.
                </p>
              </div>

              {/* Course Progress Widget */}
              <div className="p-5 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] shrink-0 min-w-[240px] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[var(--muted-fg)]">Курс прогресі:</span>
                  <span className="text-purple-400">{completedLessonIds.length} / 17 сабақ</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[var(--muted)] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[var(--muted-fg)] font-semibold">
                  <span>{completionPercent}% меңгерілді</span>
                  <span>{progress.xp} XP жиналды</span>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-fg)]" />
                <input
                  type="text"
                  placeholder="Сабақ тақырыбы немесе мақсаты..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[var(--card-subtle)] border border-[var(--border-color)]"
                />
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    filterStatus === "all"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-[var(--card-subtle)] text-[var(--muted-fg)] hover:text-[var(--fg)]"
                  }`}
                >
                  Барлығы (17)
                </button>
                <button
                  onClick={() => setFilterStatus("completed")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    filterStatus === "completed"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-[var(--card-subtle)] text-[var(--muted-fg)] hover:text-[var(--fg)]"
                  }`}
                >
                  Аяқталғандар ({completedLessonIds.length})
                </button>
                <button
                  onClick={() => setFilterStatus("pending")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    filterStatus === "pending"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-[var(--card-subtle)] text-[var(--muted-fg)] hover:text-[var(--fg)]"
                  }`}
                >
                  Басталмағандар ({17 - completedLessonIds.length})
                </button>
              </div>
            </div>
          </div>

          {/* 17 Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => {
              const isCompleted = completedLessonIds.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  className={`card p-6 rounded-3xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 ${
                    isCompleted
                      ? "border-emerald-500/40 bg-gradient-to-b from-emerald-500/5 to-transparent"
                      : "hover:border-purple-500/50"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Badge, Hours, Status */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 font-black text-xs flex items-center justify-center">
                          {lesson.number < 10 ? `0${lesson.number}` : lesson.number}
                        </span>
                        <span className="text-[11px] font-bold text-[var(--muted-fg)]">
                          {lesson.hours}-сабақ (2 сағат)
                        </span>
                      </div>

                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          Аяқталды
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--muted)] text-[var(--muted-fg)]">
                          <Clock className="w-3 h-3" />
                          {lesson.tasksCount} тапсырма
                        </span>
                      )}
                    </div>

                    {/* Lesson Title */}
                    <h3 className="text-base font-bold text-[var(--fg)] leading-snug line-clamp-2">
                      {lesson.title}
                    </h3>

                    {/* Objective snippet */}
                    <p className="text-xs text-[var(--muted-fg)] leading-relaxed line-clamp-3">
                      {lesson.objective}
                    </p>
                  </div>

                  {/* Card Footer: Action Button */}
                  <div className="pt-5 mt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-purple-400">
                      +150 XP
                    </span>

                    <button
                      onClick={() => handleOpenLesson(lesson)}
                      className={`btn text-xs px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                        isCompleted
                          ? "btn-secondary text-[var(--fg)] hover:border-purple-500"
                          : "btn-primary shadow-md shadow-purple-600/20"
                      }`}
                    >
                      <span>{isCompleted ? "Қайталау" : "Сабақты бастау"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE LESSON PLAYER                                              */}
      {/* ========================================================================= */}
      {activeLesson && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Bar: Return to Catalog, Title, Progress */}
          <div className="card p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveLessonId(null)}
                className="btn btn-secondary text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Каталогқа оралу</span>
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-purple-400">
                    № {activeLesson.number} сабақ ({activeLesson.hours})
                  </span>
                  {completedLessonIds.includes(activeLesson.id) && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400">
                      Аяқталған
                    </span>
                  )}
                </div>
                <h2 className="text-sm md:text-base font-extrabold text-[var(--fg)] truncate">
                  {activeLesson.title}
                </h2>
              </div>
            </div>

            {/* 4 Player Steps Navigation */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setPlayerStep("objectives")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  playerStep === "objectives"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-[var(--card-subtle)] text-[var(--muted-fg)] hover:text-[var(--fg)]"
                }`}
              >
                1. Мақсат
              </button>
              <button
                onClick={() => setPlayerStep("theory")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  playerStep === "theory"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-[var(--card-subtle)] text-[var(--muted-fg)] hover:text-[var(--fg)]"
                }`}
              >
                2. Теория
              </button>
              <button
                onClick={() => setPlayerStep("tasks")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
                  playerStep === "tasks"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-[var(--card-subtle)] text-[var(--muted-fg)] hover:text-[var(--fg)]"
                }`}
              >
                <span>3. Тапсырмалар</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 text-white">
                  {activeLesson.tasksCount}
                </span>
              </button>
              <button
                onClick={() => setPlayerStep("reflection")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  playerStep === "reflection"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-[var(--card-subtle)] text-[var(--muted-fg)] hover:text-[var(--fg)]"
                }`}
              >
                4. Рефлексия (ҚБ)
              </button>
            </div>
          </div>

          {/* STEP 1: OBJECTIVES & PASSPORT */}
          {playerStep === "objectives" && (
            <div className="card p-6 md:p-8 rounded-3xl border space-y-6">
              <div className="space-y-2 border-b border-[var(--border-color)] pb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400">
                  Сабақтың паспорты мен мақсаттары
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[var(--fg)]">
                  {activeLesson.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    <Target className="w-4 h-4" />
                    Оқу бағдарламасына сәйкес мақсаты:
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--fg)] leading-relaxed font-semibold">
                    {activeLesson.objective}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Сабақтың мақсаты мен күтілетін нәтижесі:
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--fg)] leading-relaxed font-semibold">
                    {activeLesson.expectedOutcome}
                  </p>
                </div>
              </div>

              {/* 4 Competencies */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
                  Қалыптасатын құзыреттіліктер мен дағдылар:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeLesson.competencies.map((comp, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)] flex items-center gap-3 text-xs font-bold text-[var(--fg)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage 1 Teacher Note */}
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs leading-relaxed text-[var(--fg)]">
                <strong className="text-purple-400 block mb-1">
                  1-кезең: Ұйымдастыру және қызығушылықты ояту (10 минут)
                </strong>
                {activeLesson.stages[0].teacherActivity}
              </div>

              {/* Next Step Button */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setPlayerStep("theory")}
                  className="btn btn-primary px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2"
                >
                  <span>2. Теориялық конспектке өту</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: THEORY */}
          {playerStep === "theory" && (
            <div className="card p-6 md:p-8 rounded-3xl border space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400">
                    2. Теориялық негіздер
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--fg)] mt-1">
                    «{activeLesson.title}» бойынша теориялық конспект
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-[var(--fg)]">
                <div className="p-5 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] leading-relaxed whitespace-pre-line font-medium">
                  {activeLesson.theory}
                </div>
              </div>

              {/* Practical Guidance Callout */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/15 via-purple-900/15 to-transparent border border-blue-500/30 flex items-start gap-3.5">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-[var(--fg)]">Маркетологтың алтын ережесі:</div>
                  <div className="text-[var(--muted-fg)] leading-relaxed">
                    Қазақ тіліндегі жарнамалық мәтінді құру кезінде сөзбе-сөз аудармадан (калька) аулақ болыңыз. Ұлттық таным мен мәдени ерекшеліктерді ескере отырып, шынайы әрі жылы сезім ұялататын бейнелі тіркестерді қолданыңыз.
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setPlayerStep("objectives")}
                  className="btn btn-secondary text-xs px-4 py-2.5 rounded-xl font-bold"
                >
                  ← Мақсаттарға оралу
                </button>

                <button
                  onClick={() => setPlayerStep("tasks")}
                  className="btn btn-primary px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2"
                >
                  <span>3. Практикалық тапсырмаларға өту ({activeLesson.tasksCount})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PRACTICAL TASKS (1..N) */}
          {playerStep === "tasks" && (
            <div className="space-y-6">
              {/* Task Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {activeLesson.tasks.map((task, idx) => {
                  const isSubmitted = submittedTasks[task.id];
                  const isActive = activeTaskIdx === idx;
                  return (
                    <button
                      key={task.id}
                      onClick={() => setActiveTaskIdx(idx)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                        isActive
                          ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                          : isSubmitted
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-[var(--card)] text-[var(--muted-fg)] border border-[var(--border-color)] hover:text-[var(--fg)]"
                      }`}
                    >
                      {isSubmitted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{idx + 1}-тапсырма</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Task Card */}
              {activeLesson.tasks[activeTaskIdx] && (() => {
                const curTask = activeLesson.tasks[activeTaskIdx];
                const isSubmitted = submittedTasks[curTask.id];
                const achievedList = checkedDescriptors[curTask.id] || [];

                return (
                  <div className="card p-6 md:p-8 rounded-3xl border space-y-6">
                    {/* Task Title & Goal */}
                    <div className="space-y-2 pb-4 border-b border-[var(--border-color)]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-purple-400 uppercase tracking-wider">
                          Тапсырма {curTask.taskNumber} / {activeLesson.tasksCount}
                        </span>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400">
                          +{curTask.xpReward} XP
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[var(--fg)]">
                        {curTask.title}
                      </h3>
                      <div className="text-xs text-[var(--muted-fg)] font-semibold">
                        🎯 Мақсаты: {curTask.goal}
                      </div>
                    </div>

                    {/* Task Description / Scenario */}
                    <div className="p-4 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] text-xs sm:text-sm leading-relaxed text-[var(--fg)] font-medium">
                      {curTask.description}
                    </div>

                    {/* Descriptors Checklist (Visible as Checklist) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400">
                          Дескрипторлар (Критериалды чек-лист):
                        </span>
                        <span className="text-[11px] text-[var(--muted-fg)]">
                          {achievedList.length} / {curTask.descriptors.length} орындалды
                        </span>
                      </div>

                      <div className="space-y-2">
                        {curTask.descriptors.map((desc, dIdx) => {
                          const isChecked = achievedList.includes(desc);
                          return (
                            <div
                              key={dIdx}
                              onClick={() => handleToggleDescriptor(curTask.id, desc)}
                              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between gap-3 cursor-pointer transition-all ${
                                isChecked
                                  ? "bg-emerald-500/15 border-emerald-500/40 text-[var(--fg)]"
                                  : "border-[var(--border-color)] text-[var(--muted-fg)] hover:bg-[var(--muted)]"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                                    isChecked
                                      ? "bg-emerald-500 border-emerald-500 text-white"
                                      : "border-[var(--border-strong)]"
                                  }`}
                                >
                                  {isChecked && <Check className="w-3 h-3" />}
                                </div>
                                <span>{desc}</span>
                              </div>
                              <span className="text-[10px] text-emerald-400 font-bold shrink-0">
                                {isChecked ? "+10 XP" : "Критерий"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Student Input Field */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
                        Сіздің жауабыңыз немесе әзірлеген жобаңыз:
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Осы жерге қазақ тіліндегі тапсырма жауабын, мәтінді немесе жоба тезистерін жазыңыз..."
                        value={taskAnswers[curTask.id] || ""}
                        onChange={(e) => setTaskAnswers({ ...taskAnswers, [curTask.id]: e.target.value })}
                        className="w-full text-xs sm:text-sm font-medium leading-relaxed"
                      />
                    </div>

                    {/* Submit Action */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        onClick={() => handleSubmitTask(curTask.id)}
                        disabled={!taskAnswers[curTask.id]?.trim()}
                        className="btn btn-primary text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmitted ? "Жауапты жаңарту" : "Жауапты тексеруге жіберу (+30 XP)"}</span>
                      </button>

                      {activeTaskIdx < activeLesson.tasksCount - 1 ? (
                        <button
                          onClick={() => setActiveTaskIdx(activeTaskIdx + 1)}
                          className="btn btn-secondary text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5"
                        >
                          <span>Келесі тапсырма</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setPlayerStep("reflection")}
                          className="btn btn-secondary text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5 text-purple-400 border-purple-500/40"
                        >
                          <span>4. Рефлексияға өту</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Sample Answer from Author (Opens after submit) */}
                    {isSubmitted && (
                      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/20 to-blue-950/20 border border-emerald-500/30 space-y-3 animate-in fade-in duration-200">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Автордың үлгі жауабы (Салыстыру және өзін-өзі бағалау):</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--fg)] leading-relaxed whitespace-pre-line font-medium">
                          {curTask.sampleAnswer}
                        </p>
                        {curTask.example && (
                          <div className="text-xs text-[var(--muted-fg)] pt-2 border-t border-emerald-500/20 italic">
                            💡 Қосымша мысал: {curTask.example}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* STEP 4: REFLECTION & FORMATIVE ASSESSMENT */}
          {playerStep === "reflection" && (
            <div className="card p-6 md:p-8 rounded-3xl border space-y-6">
              <div className="space-y-2 border-b border-[var(--border-color)] pb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400">
                  4. Қорытынды кезең: Рефлексия және қалыптастырушы бағалау (ҚБ)
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[var(--fg)]">
                  Сабақты қорытындылау: {activeLesson.stages[2].formativeAssessment}
                </h3>
                <p className="text-xs text-[var(--muted-fg)] font-semibold">
                  {activeLesson.stages[2].teacherActivity}
                </p>
              </div>

              {/* Traffic Light Method (Бағдаршам) */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
                  Өз деңгейіңізді «Бағдаршам» бойынша белгілеңіз:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setReflectionRating("green")}
                    className={`p-4 rounded-2xl border text-xs font-bold text-left transition-all flex items-center gap-3 ${
                      reflectionRating === "green"
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-md"
                        : "border-[var(--border-color)] text-[var(--muted-fg)] hover:bg-[var(--muted)]"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <div className="font-extrabold">Жасыл түс</div>
                      <div className="text-[10px] opacity-80">Тақырыпты толық түсіндім, тапсырмаларды орындадым</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setReflectionRating("yellow")}
                    className={`p-4 rounded-2xl border text-xs font-bold text-left transition-all flex items-center gap-3 ${
                      reflectionRating === "yellow"
                        ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-md"
                        : "border-[var(--border-color)] text-[var(--muted-fg)] hover:bg-[var(--muted)]"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500 shrink-0" />
                    <div>
                      <div className="font-extrabold">Сары түс</div>
                      <div className="text-[10px] opacity-80">Негізгі бөлігі түсінікті, бірақ сұрақтарым бар</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setReflectionRating("red")}
                    className={`p-4 rounded-2xl border text-xs font-bold text-left transition-all flex items-center gap-3 ${
                      reflectionRating === "red"
                        ? "bg-red-500/20 border-red-500 text-red-400 shadow-md"
                        : "border-[var(--border-color)] text-[var(--muted-fg)] hover:bg-[var(--muted)]"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-red-500 shrink-0" />
                    <div>
                      <div className="font-extrabold">Қызыл түс</div>
                      <div className="text-[10px] opacity-80">Қиындықтар туындады, мұғалім көмегі қажет</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Reflection Comments */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">
                  Кері байланыс және рефлексиялық ой:
                </label>
                <textarea
                  rows={3}
                  placeholder="Бүгінгі сабақтан қандай жаңа маркетингтік білім алдыңыз? Не қиын болды? (Мысалы: «4P элементтерін қазақша талдау өте қызықты болды...»)"
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium leading-relaxed"
                />
              </div>

              {/* Finish Button / Finished Celebration */}
              <div className="pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setPlayerStep("tasks")}
                  className="btn btn-secondary text-xs px-4 py-2.5 rounded-xl font-bold self-start sm:self-auto"
                >
                  ← Тапсырмаларға оралу
                </button>

                <button
                  onClick={handleFinishLesson}
                  className="btn btn-primary px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold text-white flex items-center gap-2 shadow-xl shadow-purple-600/30"
                >
                  <Award className="w-4 h-4" />
                  <span>Сабақты аяқтау және портфолиоға сақтау (+150 XP)</span>
                </button>
              </div>

              {/* Completion Success Card */}
              {lessonFinished && (
                <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900/20 via-purple-900/20 to-blue-900/20 border border-emerald-500/40 space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <div>
                      <h4 className="text-base font-extrabold text-[var(--fg)]">
                        Құттықтаймыз! «{activeLesson.title}» сабағы толық аяқталды!
                      </h4>
                      <p className="text-xs text-[var(--muted-fg)]">
                        Сіздің жауаптарыңыз бен рефлексияңыз жеке сандық портфолиоңызға сақталды және мұғалім кабинетінде расталды.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href="/portfolio"
                      className="btn btn-secondary text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-2"
                    >
                      <FolderKanban className="w-4 h-4 text-emerald-400" />
                      <span>Портфолионы көру</span>
                    </Link>

                    {activeLesson.number < 17 && (
                      <button
                        onClick={() => {
                          const nextLesson = curriculumLessons[activeLesson.number];
                          if (nextLesson) handleOpenLesson(nextLesson);
                        }}
                        className="btn btn-primary text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md"
                      >
                        <span>Келесі {activeLesson.number + 1}-сабаққа көшу</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => setActiveLessonId(null)}
                      className="btn btn-secondary text-xs px-4 py-2.5 rounded-xl font-bold"
                    >
                      Каталогқа қайту
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
