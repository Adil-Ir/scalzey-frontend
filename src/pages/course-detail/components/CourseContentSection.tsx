import { useState } from "react";
import { FiArrowUpRight, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdOutlineGridView, MdOutlineMenuBook, MdOutlineQuiz, MdOutlineTableChart } from "react-icons/md";
import type { CourseDetailData } from "../data";

const INITIAL_VISIBLE = 2;

export const CourseContentSection = ({ course }: { course: CourseDetailData }) => {
  const [expanded, setExpanded] = useState(false);
  const visibleModules = expanded ? course.modules : course.modules.slice(0, INITIAL_VISIBLE);

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-stretch">

      {/* ── Course Content card (large) ── */}
      <div
        className="flex-1 bg-white dark:bg-[#1D242A] p-6 flex flex-col gap-4"
        style={{ borderRadius: "26.53px", border: "1px solid #2D3D46" }}
      >
        <div className="flex items-center gap-2">
          <MdOutlineTableChart size={16} className="text-gray-400 dark:text-slate-400" />
          <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Course Content</h3>
        </div>

        <div className="flex flex-col gap-3">
          {visibleModules.map((mod) => (
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
                    {mod.quizzes} Quizz
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More / See Less */}
        {course.modules.length > INITIAL_VISIBLE && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center justify-center gap-1.5 text-[#44BCFF] text-[13px] font-medium hover:opacity-80 transition mt-1"
          >
            {expanded ? (
              <>See Less <FiChevronUp size={15} /></>
            ) : (
              <>See More <FiChevronDown size={15} /></>
            )}
          </button>
        )}
      </div>

      {/* ── Certificate card (small) ── */}
      <div
        className="w-full lg:w-[280px] shrink-0 bg-white dark:bg-[#1D242A] p-6 flex flex-col gap-4"
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
          className="flex-1 flex flex-col items-center justify-center gap-3 rounded-2xl bg-gray-50 dark:bg-[#141E22] py-8 px-4"
          style={{ border: "1px solid #2D3D46" }}
        >
          {/* Medal graphic */}
          <div className="relative flex items-center justify-center">
            {/* Ribbon */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-4 h-6 rounded-b-full bg-blue-400 opacity-80" />
              <div className="w-4 h-6 rounded-b-full bg-orange-400 opacity-80" />
            </div>

            {/* Outer ring */}
            <div className="h-[70px] w-[70px] rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-yellow-500 flex items-center justify-center shadow-lg mt-4">
              {/* Inner circle */}
              <div className="h-[52px] w-[52px] rounded-full bg-white/20 flex items-center justify-center">
                {/* Certificate icon */}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="4" y="4" width="20" height="16" rx="2" fill="white" fillOpacity="0.9" />
                  <rect x="7" y="8" width="10" height="1.5" rx="0.75" fill="#f97316" />
                  <rect x="7" y="11" width="14" height="1" rx="0.5" fill="#f97316" fillOpacity="0.6" />
                  <rect x="7" y="13.5" width="11" height="1" rx="0.5" fill="#f97316" fillOpacity="0.6" />
                  <circle cx="19" cy="21" r="5" fill="#facc15" />
                  <path d="M16.5 21l1.5 1.5 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Star sparks */}
            {[
              { top: "-6px", right: "-6px" },
              { top: "50%", right: "-10px" },
              { bottom: "0", left: "-6px" },
            ].map((pos, i) => (
              <svg key={i} width="10" height="10" viewBox="0 0 10 10" className="absolute" style={pos}>
                <polygon points="5,0 6,4 10,4 7,6 8,10 5,7.5 2,10 3,6 0,4 4,4" fill="#facc15" />
              </svg>
            ))}
          </div>

          <div className="text-center mt-2">
            <p className="text-[13px] font-semibold text-gray-800 dark:text-white leading-snug">
              Certified Cyber<br />Security Professional
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
