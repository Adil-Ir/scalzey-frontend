import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { FiCheck } from "react-icons/fi";
import { MdOutlineGridView, MdOutlineMenuBook, MdOutlineQuiz } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";

interface ActiveCourse {
  id: number;
  status: string;
  statusColor: string;
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

const ACTIVE_COURSES: ActiveCourse[] = [
  {
    id: 1,
    status: "In progress",
    statusColor: "bg-emerald-400/20 text-emerald-400",
    progress: 70,
    title: "Advances User Experience",
    workshop: "Workshop: Ux Best Practices",
    modules: 6,
    lessons: 12,
    quizzes: 1,
    instructor: "Dwoskey",
    instructorColor: "bg-pink-500",
    members: "300+",
    checks: ["3 Modules", "3 Readings", "2 Quizzes"],
  },
  {
    id: 2,
    status: "In progress",
    statusColor: "bg-emerald-400/20 text-emerald-400",
    progress: 75,
    title: "Advance Java",
    workshop: "Workshop: Ux Best Practices",
    modules: 6,
    lessons: 12,
    quizzes: 1,
    instructor: "Dwoskey",
    instructorColor: "bg-purple-500",
    members: "300+",
    checks: ["3 Modules", "3 Readings", "2 Quizzes"],
  },
  {
    id: 3,
    status: "In progress",
    statusColor: "bg-emerald-400/20 text-emerald-400",
    progress: 75,
    title: "Project Management",
    workshop: "Workshop: Ux Best Practices",
    modules: 6,
    lessons: 12,
    quizzes: 1,
    instructor: "Dwoskey",
    instructorColor: "bg-orange-500",
    members: "300+",
    checks: ["3 Modules", "3 Readings", "2 Quizzes"],
  },
  {
    id: 4,
    status: "In progress",
    statusColor: "bg-sky-400/20 text-sky-400",
    progress: 45,
    title: "Product Design Fundamentals",
    workshop: "Workshop: Design Systems",
    modules: 8,
    lessons: 16,
    quizzes: 2,
    instructor: "Dwoskey",
    instructorColor: "bg-cyan-500",
    members: "200+",
    checks: ["5 Modules", "4 Readings", "3 Quizzes"],
  },
];

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
      <circle cx="20" cy="20" r={r} fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-100 dark:text-white/10" />
      <circle cx="20" cy="20" r={r} fill="none" stroke="#44BCFF" strokeWidth="3"
        strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
    </svg>
  );
};

export const ActiveCourses = () => {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
        Active Courses
      </h2>

      <Swiper
        className="equal-swiper"
        spaceBetween={16}
        slidesPerView={1.05}
        breakpoints={{
          640:  { slidesPerView: 1.5 },
          768:  { slidesPerView: 2.1 },
          1024: { slidesPerView: 2.6 },
          1280: { slidesPerView: 3.1 },
        }}
        style={{ padding: "4px 2px" }}
      >
        {ACTIVE_COURSES.map((course) => (
          <SwiperSlide key={course.id}>
            <div
              className="h-full flex flex-col gap-3 bg-white dark:bg-[#1D242A]"
              style={{ borderRadius: "26.53px", padding: "22px" }}
            >
              {/* Status + progress ring */}
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-medium px-3 py-1 rounded-full ${course.statusColor}`}>
                  {course.status}
                </span>
                <div className="relative flex items-center justify-center">
                  <ProgressRing percent={course.progress} />
                  <span className="absolute text-[9px] font-bold text-gray-700 dark:text-white rotate-90">
                    {course.progress}%
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[15px] font-semibold leading-snug text-gray-900 dark:text-white">
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
              <div className="flex items-center gap-3 text-[11px] text-gray-500 dark:text-slate-400">
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
              <div className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-[#141E22] px-3 py-2">
                <div className="flex items-center gap-2">
                  <HiOutlineInformationCircle size={14} className="text-gray-400 dark:text-slate-500 shrink-0" />
                  <span className="text-[11px] text-gray-500 dark:text-slate-400">
                    you have a quiz remaining
                  </span>
                </div>
                <button type="button" className="text-gray-400 dark:text-slate-500 hover:opacity-80 transition">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>
              </div>

              {/* Checkmarks */}
              <div className="flex items-center gap-3 flex-wrap">
                {course.checks.map((c, i) => (
                  <span key={i} className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-slate-400">
                    <FiCheck size={12} className="text-emerald-400 shrink-0" />
                    {c}
                  </span>
                ))}
              </div>

              {/* Join button */}
              <button
                type="button"
                className="mt-auto w-full py-2.5 rounded-full bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] transition"
              >
                Join the class
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
