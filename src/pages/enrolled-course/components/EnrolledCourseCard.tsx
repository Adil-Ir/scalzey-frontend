import { BsPeopleFill } from "react-icons/bs";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import {
  HiOutlineInformationCircle,
} from "react-icons/hi";
import {
  MdOutlineGridView,
  MdOutlineMenuBook,
  MdOutlineQuiz,
} from "react-icons/md";

export interface EnrolledCourse {
  id: number;
  status: string;
  progress: number;
  title: string;
  workshop: string;
  modules: number;
  lessons: number;
  quizzes: number;
  instructor: string;
  instructorColor: string;
  members: string;
  checks: string[];
}

const MemberAvatars = ({ color }: { color: string }) => (
  <div className="flex -space-x-1.5">
    {[color, "bg-yellow-400", "bg-sky-400"].map((c, i) => (
      <span
        key={i}
        className={`inline-block h-5 w-5 rounded-full border-2 border-white dark:border-[#1D242A] ${c}`}
      />
    ))}
  </div>
);

const ProgressRing = ({ percent }: { percent: number }) => {
  const r = 16;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width="40" height="40" className="-rotate-90">
      <circle
        cx="20" cy="20" r={r}
        fill="none" stroke="currentColor" strokeWidth="3"
        className="text-gray-100 dark:text-white/10"
      />
      <circle
        cx="20" cy="20" r={r}
        fill="none" stroke="#3CC982" strokeWidth="3"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const EnrolledCourseCard = ({ course }: { course: EnrolledCourse }) => {
  return (
    <div
      className="h-full flex flex-col gap-3 bg-white dark:bg-[#1D242A]"
      style={{ borderRadius: "26.53px", padding: "22px" }}
    >
      {/* Status + progress ring */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[#FF9B44] px-3 py-1 rounded-full border border-[#FF9B44]">
          {course.status}
        </span>
        <div className="relative flex items-center justify-center">
          <ProgressRing percent={course.progress} />
          <span className="absolute text-[9px] font-bold text-gray-700 dark:text-white">
            {course.progress}%
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold leading-snug text-[#0F161A] dark:text-white">
        {course.title}
      </h3>

      {/* Workshop */}
      <div className="flex items-center gap-1.5">
        <BsPeopleFill size={12} className="text-gray-400 dark:text-slate-500 shrink-0" />
        <span className="text-[11px] text-gray-400 dark:text-slate-500 truncate">
          {course.workshop}
        </span>
      </div>

      {/* Module / Lessons / Quiz */}
      <div className="flex w-full justify-between items-center gap-3 text-[11px] text-gray-500 dark:text-[#99A2A8]">
        <span className="flex items-center gap-1">
          <MdOutlineGridView size={13} />
          {course.modules} Module
        </span>
        <span className="flex items-center gap-1">
          <MdOutlineMenuBook size={13} />
          {course.lessons} Lessons
        </span>
        <span className="flex items-center gap-1">
          <MdOutlineQuiz size={13} />
          {course.quizzes} Quizz
        </span>
      </div>

      {/* Instructor + members */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex h-7 w-7 rounded-full items-center justify-center text-white text-[11px] font-bold ${course.instructorColor}`}
          >
            {course.instructor[0]}
          </span>
          <span className="text-[12px] text-gray-600 dark:text-[#FFFFFFBF]">
            {course.instructor}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] text-gray-400 dark:text-slate-400">
            {course.members}
          </span>
          <MemberAvatars color={course.instructorColor} />
        </div>
      </div>

      {/* Quiz alert */}
      <div className="rounded-xl bg-gray-50 dark:bg-[#44BCFF14] px-3.5 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiOutlineInformationCircle
              size={20}
              className="text-gray-400 dark:text-white shrink-0"
            />
            <span className="text-[12px] text-gray-500 dark:text-white">
              you have a quiz remaining
            </span>
          </div>
          <button
            type="button"
            style={{ borderRadius: "50%" }}
            className="shrink-0 inline-flex h-8 w-8 items-center justify-center hover:border border-[#0F161A33] dark:border-[#ffffff33] text-[#0F161ABF] dark:text-white hover:border-current transition"
          >
            <FiArrowUpRight size={21} />
          </button>
        </div>

        {/* Checkmarks */}
        <div className="flex items-center gap-3 mt-3.5 flex-wrap">
          {course.checks.map((c, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-[12px] text-gray-500 dark:text-white"
            >
              <FiCheck size={16} className="text-[#3CC982] shrink-0" />
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Join button */}
      <button
        type="button"
        className="mt-auto w-full py-2.5 rounded-full bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] transition"
      >
        Join the class
      </button>
    </div>
  );
};
