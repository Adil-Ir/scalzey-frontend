import { FiArrowUpRight } from "react-icons/fi";
import { MdOutlineGridView, MdOutlineMenuBook, MdOutlineQuiz, MdOutlineTableChart } from "react-icons/md";
import type { CourseDetailData } from "../data";

export const CourseContentSection = ({ course }: { course: CourseDetailData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
    {/* ── Course Content card ── */}
    <div
      className="bg-white dark:bg-[#1D242A] p-6 flex flex-col gap-4"
      style={{ borderRadius: "26.53px", border: "1px solid #2D3D46" }}
    >
      <div className="flex items-center gap-2">
        <MdOutlineTableChart size={16} className="text-gray-400 dark:text-slate-400" />
        <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Course Content</h3>
      </div>

      <div className="flex flex-col gap-3">
        {course.modules.map((mod) => (
          <div
            key={mod.id}
            className="flex items-start gap-3 bg-gray-50 dark:bg-[#141E22] rounded-2xl px-4 py-3"
            style={{ border: "1px solid #2D3D46" }}
          >
            {/* Number badge */}
            <span className="shrink-0 h-7 w-7 rounded-full bg-[#44BCFF] text-white text-[12px] font-bold flex items-center justify-center">
              {mod.id}
            </span>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-gray-900 dark:text-white leading-snug truncate">
                {mod.title}
              </p>
              <div className="flex items-center gap-4 mt-1.5 text-[11px] text-gray-400 dark:text-slate-500">
                <span className="flex items-center gap-1">
                  <MdOutlineGridView size={12} />
                  {mod.modules} Module
                </span>
                <span className="flex items-center gap-1">
                  <MdOutlineMenuBook size={12} />
                  {mod.lessons} Lessons
                </span>
                <span className="flex items-center gap-1">
                  <MdOutlineQuiz size={12} />
                  {mod.quizzes} Quiz
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ── Certificate card ── */}
    <div
      className="bg-white dark:bg-[#1D242A] p-6 flex flex-col gap-4"
      style={{ borderRadius: "26.53px", border: "1px solid #2D3D46" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MdOutlineTableChart size={16} className="text-gray-400 dark:text-slate-400" />
          <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Certificate</h3>
        </div>
        <button
          type="button"
          className="h-7 w-7 rounded-full flex items-center justify-center border border-[#2D3D46] text-gray-400 dark:text-slate-400 hover:opacity-80 transition"
        >
          <FiArrowUpRight size={14} />
        </button>
      </div>

      {/* Certificate visual */}
      <div
        className="flex-1 min-h-45 flex items-center justify-center rounded-2xl bg-linear-to-br from-yellow-50 to-orange-50 dark:from-[#141E22] dark:to-[#1a2830]"
        style={{ border: "1px solid #2D3D46" }}
      >
        <div className="text-center px-6 py-8">
          {/* Mock certificate */}
          <div className="mx-auto w-20 h-20 mb-4 relative">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="2" />
                <path d="M12 20l6 6 10-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {/* Stars around */}
            {[0, 72, 144, 216, 288].map((angle) => (
              <div
                key={angle}
                className="absolute w-2 h-2"
                style={{
                  top: `${50 - 55 * Math.cos((angle * Math.PI) / 180)}%`,
                  left: `${50 + 55 * Math.sin((angle * Math.PI) / 180)}%`,
                  transform: "translate(-50%,-50%)",
                }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <polygon points="4,0 5,3 8,3 5.5,5 6.5,8 4,6 1.5,8 2.5,5 0,3 3,3" fill="#f59e0b" />
                </svg>
              </div>
            ))}
          </div>
          <p className="text-[12px] font-semibold text-gray-700 dark:text-white">
            Professional Certificate
          </p>
          <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-1">
            Earn upon completion
          </p>
        </div>
      </div>
    </div>
  </div>
);
