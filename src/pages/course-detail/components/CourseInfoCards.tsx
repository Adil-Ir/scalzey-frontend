import { FiCheck } from "react-icons/fi";
import { MdOutlineMenuBook } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import type { CourseDetailData } from "../data";

export const CourseInfoCards = ({ course }: { course: CourseDetailData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
    {/* ── Details card ── */}
    <div
      className="bg-white dark:bg-[#1D242A] p-6 flex flex-col gap-4"
      style={{ borderRadius: "26.53px", border: "1px solid #2D3D46" }}
    >
      <div className="flex items-center gap-2">
        <MdOutlineMenuBook size={16} className="text-gray-400 dark:text-slate-400" />
        <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Details</h3>
      </div>

      <p className="text-[13px] font-bold text-gray-900 dark:text-white">
        {course.details.subtitle}
      </p>

      <div className="text-[13px] leading-relaxed text-gray-500 dark:text-[#FFFFFFBF] whitespace-pre-line">
        {course.details.body}
      </div>

      <ul className="flex flex-col gap-2 pl-1">
        {course.details.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-[13px] text-gray-500 dark:text-[#FFFFFFBF]">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-slate-500 shrink-0" />
            {b}
          </li>
        ))}
      </ul>
    </div>

    {/* ── What you'll learn card ── */}
    <div
      className="bg-white dark:bg-[#1D242A] p-6 flex flex-col gap-4"
      style={{ borderRadius: "26.53px", border: "1px solid #2D3D46" }}
    >
      <div className="flex items-center gap-2">
        <HiOutlineLightBulb size={16} className="text-gray-400 dark:text-slate-400" />
        <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">What you'll learn</h3>
      </div>

      <ul className="flex flex-col gap-4">
        {course.whatYoullLearn.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <FiCheck size={15} className="text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-[13px] leading-relaxed text-gray-500 dark:text-[#FFFFFFBF]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
