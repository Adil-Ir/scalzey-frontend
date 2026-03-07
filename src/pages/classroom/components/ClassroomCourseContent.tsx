import { FiArrowUpRight, FiMoreVertical } from "react-icons/fi";
import { MdOutlineGridView, MdOutlineMenuBook, MdOutlineQuiz, MdOutlineTableChart } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import type { ClassroomCourse } from "../data";

const MODULE_BADGE_COLORS = [
  "bg-[#44BCFF]",
  "bg-purple-600",
  "bg-[#5C6B2A]",
  "bg-indigo-900",
  "bg-[#6B3A2A]",
  "bg-gray-600",
];

export const ClassroomCourseContent = ({ course }: { course: ClassroomCourse }) => {
  const navigate = useNavigate();
  const { id: courseId } = useParams<{ id: string }>();

  return (
  <div
    className="bg-white dark:bg-[#1D242A] flex flex-col"
    style={{ borderRadius: "26.53px", border: "1px solid #2D3D46" }}
  >
    {/* Header */}
    <div className="flex items-center gap-2 px-6 pt-6 pb-4 border-b border-[#2D3D46]">
      <MdOutlineTableChart size={17} className="text-gray-400 dark:text-slate-400 shrink-0" />
      <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white">Course Content</h3>
    </div>

    {/* Module rows */}
    <div className="flex flex-col divide-y divide-[#2D3D46]">
      {course.modules.map((mod, idx) => (
        <div
          key={mod.id}
          className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition"
        >
          {/* Number badge */}
          <span
            className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white text-[13px] font-bold ${MODULE_BADGE_COLORS[idx] ?? "bg-gray-500"}`}
          >
            {mod.id}
          </span>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-gray-900 dark:text-white leading-snug truncate">
              {mod.title}
            </p>
            <div className="flex items-center gap-4 mt-1.5 text-[11px] text-gray-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <MdOutlineGridView size={12} />
                {mod.chapters} Chapter
              </span>
              <span className="flex items-center gap-1.5">
                <MdOutlineMenuBook size={12} />
                {mod.totalLessons} Lessons
              </span>
              <span className="flex items-center gap-1.5">
                <MdOutlineQuiz size={12} />
                {mod.totalQuizzes} Quizz
              </span>
            </div>
          </div>

          {/* Open lesson button — on every module row */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/classroom/${courseId}/module/${mod.id}/lesson/${mod.lessons[0]?.id ?? 1}`
                )
              }
              className="h-8 w-8 rounded-full bg-[#44BCFF] flex items-center justify-center hover:bg-[#2eaef5] transition"
              title="Open lessons"
            >
              <FiArrowUpRight size={15} className="text-white" />
            </button>
            <button
              type="button"
              className="h-8 w-8 rounded-full flex items-center justify-center text-gray-400 dark:text-slate-500 hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              <FiMoreVertical size={15} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};
