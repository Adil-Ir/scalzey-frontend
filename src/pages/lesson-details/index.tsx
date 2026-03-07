/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import {
  MdOutlineAssignment,
  MdOutlineMenuBook,
  MdOutlineQuiz,
} from "react-icons/md";
import { LessonSidebar } from "./components/LessonSidebar";
import { LessonContent } from "./components/LessonContent";
import { MODULE_DETAILS, getAllLessons } from "./data";
import type { LessonItem } from "./data";

const COURSE_GRADIENTS: Record<string, string> = {
  "1": "from-pink-900 via-rose-800 to-slate-900",
  "2": "from-purple-900 via-indigo-800 to-slate-900",
  "3": "from-orange-900 via-amber-800 to-slate-900",
};

export const LessonDetailsPage = () => {
  const { courseId, moduleId, lessonId } = useParams<{
    courseId: string;
    moduleId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();

  const moduleKey = `${courseId}_${moduleId}`;
  const moduleData = MODULE_DETAILS[moduleKey];

  const [completedIds, setCompletedIds] = useState<Set<number>>(() => {
    if (!moduleData) return new Set();
    const ids = new Set<number>();
    moduleData.chapterList.forEach((ch) =>
      ch.lessons.forEach((l) => {
        if (l.completed) ids.add(l.id);
      })
    );
    return ids;
  });

  const activeLessonId = Number(lessonId) || 1;

  useEffect(() => {
    if (!moduleData) return;
    const ids = new Set<number>();
    moduleData.chapterList.forEach((ch) =>
      ch.lessons.forEach((l) => {
        if (l.completed) ids.add(l.id);
      })
    );
    setCompletedIds(ids);
  }, [moduleKey]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!moduleData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          Module not found
        </p>
        <button
          type="button"
          onClick={() => navigate("/courses/enrolled")}
          className="px-6 py-2.5 rounded-full bg-[#44BCFF] text-white text-sm font-medium hover:bg-[#2eaef5] transition"
        >
          Back to Enrolled Courses
        </button>
      </div>
    );
  }

  const allLessons = getAllLessons(moduleData);
  const currentLesson: LessonItem =
    allLessons.find((l) => l.id === activeLessonId) ?? allLessons[0];
  const currentIdx = allLessons.findIndex((l) => l.id === currentLesson.id);
  const nextLesson = allLessons[currentIdx + 1] ?? null;

  const handleLessonClick = (lesson: LessonItem) =>
    navigate(`/classroom/${courseId}/module/${moduleId}/lesson/${lesson.id}`);

  const handleMarkComplete = () =>
    setCompletedIds((prev) => new Set([...prev, currentLesson.id]));

  const handleNextLesson = () => {
    if (nextLesson)
      navigate(
        `/classroom/${courseId}/module/${moduleId}/lesson/${nextLesson.id}`
      );
  };

  const gradientBg = COURSE_GRADIENTS[courseId ?? "1"];

  return (
    <div className="flex flex-col gap-4 min-h-full">
      {/* ── Module header — spans full width above both panels ── */}
      <div className="flex flex-col gap-2">
        {/* Back link */}
        <button
          type="button"
          onClick={() => navigate(`/classroom/${courseId}`)}
          className="flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white transition"
        >
          <FiChevronLeft size={15} />
          <span className="text-[12px] font-medium">Module {moduleData.moduleNumber}</span>
        </button>

        {/* Title row */}
        <div className="flex items-start gap-3">
          <span className="shrink-0 h-9 w-9 rounded-full bg-[#44BCFF] flex items-center justify-center text-white text-[15px] font-bold mt-0.5">
            {moduleData.moduleNumber}
          </span>
          <div className="min-w-0">
            <h1 className="text-[18px] font-bold text-gray-900 dark:text-white leading-snug">
              {moduleData.title}
            </h1>
            <div className="flex items-center gap-4 mt-1.5 flex-wrap">
              <span className="flex items-center gap-1.5 text-[12px] text-gray-400 dark:text-slate-500">
                <MdOutlineAssignment size={13} />
                {moduleData.totalChapters} Chapter
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-gray-400 dark:text-slate-500">
                <MdOutlineMenuBook size={13} />
                {moduleData.totalLessons} Lessons
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-gray-400 dark:text-slate-500">
                <MdOutlineQuiz size={13} />
                {moduleData.totalQuizzes} Quizz
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex flex-col lg:flex-row gap-4 flex-1">
        {/* Left: lesson navigator */}
        <div
          className="w-full lg:w-[200px] xl:w-[220px] shrink-0 lg:sticky lg:top-0 lg:self-start"
          style={{ maxHeight: "calc(100vh - 11rem)" }}
        >
          <LessonSidebar
            moduleData={moduleData}
            activeLessonId={currentLesson.id}
            completedIds={completedIds}
            onLessonClick={handleLessonClick}
          />
        </div>

        {/* Right: content viewer */}
        <div
          className="flex-1 min-w-0 lg:sticky lg:top-0 lg:self-start"
          style={{ maxHeight: "calc(100vh - 11rem)" }}
        >
          <LessonContent
            lesson={currentLesson}
            isCompleted={completedIds.has(currentLesson.id)}
            hasNext={!!nextLesson}
            gradientBg={gradientBg}
            onMarkComplete={handleMarkComplete}
            onNextLesson={handleNextLesson}
          />
        </div>
      </div>
    </div>
  );
};
