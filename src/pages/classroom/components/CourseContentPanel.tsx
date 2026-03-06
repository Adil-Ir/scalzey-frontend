import { useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiPlay,
  FiBookOpen,
  FiHelpCircle,
} from "react-icons/fi";
import type { ClassroomCourse, Lesson } from "../data";

const lessonIcon = (type: Lesson["type"]) => {
  if (type === "reading") return <FiBookOpen size={12} />;
  if (type === "quiz") return <FiHelpCircle size={12} />;
  return <FiPlay size={12} />;
};

export const CourseContentPanel = ({ course }: { course: ClassroomCourse }) => {
  const [openModules, setOpenModules] = useState<number[]>([1, 2]);

  const toggleModule = (id: number) =>
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );

  return (
    <div
      className="flex flex-col bg-white dark:bg-[#1D242A] overflow-hidden"
      style={{ borderRadius: "20px", border: "1px solid #2D3D46" }}
    >
      {/* Panel header */}
      <div className="px-5 py-4 border-b border-[#2D3D46]">
        <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">
          Course Content
        </h3>
        <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-0.5">
          {course.completedLessons}/{course.totalLessons} lessons completed
        </p>
        {/* Overall progress bar */}
        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#44BCFF] transition-all"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      {/* Modules list — scrollable */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {course.modules.map((mod) => {
          const isOpen = openModules.includes(mod.id);
          const completedCount = mod.lessons.filter((l) => l.completed).length;

          return (
            <div key={mod.id} className="border-b border-[#2D3D46] last:border-b-0">
              {/* Module header */}
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-white/5 transition text-left"
              >
                <div>
                  <p className="text-[13px] font-medium text-gray-900 dark:text-white">
                    {mod.title}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-0.5">
                    {completedCount}/{mod.lessons.length} completed
                  </p>
                </div>
                {isOpen ? (
                  <FiChevronUp size={15} className="text-gray-400 dark:text-slate-500 shrink-0" />
                ) : (
                  <FiChevronDown size={15} className="text-gray-400 dark:text-slate-500 shrink-0" />
                )}
              </button>

              {/* Lessons */}
              {isOpen && (
                <div className="pb-2">
                  {mod.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      type="button"
                      className={`w-full flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 transition text-left ${
                        !lesson.completed && lesson.title === course.currentLesson.title.split("—")[1]?.trim()
                          ? "bg-[#44BCFF]/10"
                          : ""
                      }`}
                    >
                      {/* Complete indicator */}
                      <span
                        className={`shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-[10px] border transition ${
                          lesson.completed
                            ? "bg-[#3CC982] border-[#3CC982] text-white"
                            : "border-gray-300 dark:border-white/20 text-gray-300 dark:text-slate-600"
                        }`}
                      >
                        {lesson.completed ? <FiCheck size={10} /> : lessonIcon(lesson.type)}
                      </span>

                      {/* Lesson info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-[12px] leading-snug truncate ${
                            lesson.completed
                              ? "text-gray-400 dark:text-slate-500 line-through"
                              : "text-gray-700 dark:text-slate-200"
                          }`}
                        >
                          {lesson.title}
                        </p>
                      </div>

                      {/* Duration */}
                      <span className="text-[11px] text-gray-400 dark:text-slate-500 shrink-0">
                        {lesson.duration}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
