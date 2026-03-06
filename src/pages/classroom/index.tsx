import { useParams, useNavigate } from "react-router-dom";
import { FiPlay } from "react-icons/fi";
import { DashboardCalendar } from "../dashboard/components/DashboardCalendar";
import { ClassroomProgress } from "./components/ClassroomProgress";
import { ClassroomCourseContent } from "./components/ClassroomCourseContent";
import { CLASSROOM_DATA } from "./data";

export const ClassroomPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = CLASSROOM_DATA[Number(id)];

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 py-24">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">Classroom not found</p>
        <button
          onClick={() => navigate("/courses/enrolled")}
          className="px-6 py-2.5 rounded-full bg-[#44BCFF] text-white text-sm font-medium hover:bg-[#2eaef5] transition"
        >
          Back to Enrolled Courses
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">

      {/* ── SECTION 1: Hero — title (large) + video (small) ── */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* Left — instructor + large title + description */}
        <div className="flex-1 min-w-0 flex flex-col gap-4 pt-2">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex h-7 w-7 rounded-full items-center justify-center text-white text-[11px] font-bold shrink-0 ${course.instructorColor}`}
            >
              {course.instructor[0]}
            </span>
            <span className="text-[13px] text-gray-500 dark:text-slate-400">{course.instructor}</span>
          </div>

          <h1 className="text-[32px] sm:text-[40px] font-bold text-gray-900 dark:text-white leading-tight">
            {course.title}
          </h1>

          <p className="text-[13px] leading-relaxed text-gray-500 dark:text-[#FFFFFFBF] max-w-lg">
            {course.currentLesson.description}
          </p>
        </div>

        {/* Right — video thumbnail (smaller, fixed width) */}
        <div className="w-full lg:w-[340px] shrink-0">
          <div
            className={`relative w-full bg-gradient-to-br ${course.currentLesson.gradientBg} overflow-hidden`}
            style={{ borderRadius: "18px", aspectRatio: "4/3" }}
          >
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
              >
                <FiPlay size={22} className="text-gray-900 ml-1" />
              </button>
            </div>

            {/* Bottom overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 px-4 py-3"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 100%)" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`inline-flex h-5 w-5 rounded-full items-center justify-center text-white text-[9px] font-bold shrink-0 ${course.instructorColor}`}
                >
                  {course.instructor[0]}
                </span>
                <span className="text-[11px] font-medium text-white/90">{course.instructor}</span>
              </div>
              <p className="text-[11px] text-white/80 leading-snug line-clamp-2">
                {course.currentLesson.caption ?? course.currentLesson.title}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: Calendar + Progress (left) | Course Content (right) ── */}
      <div className="flex flex-col xl:flex-row gap-5 items-start">

        {/* Left column — Calendar + Progress */}
        <div className="w-full xl:w-[300px] shrink-0 flex flex-col gap-5">
          <DashboardCalendar />
          <ClassroomProgress items={course.progressItems} />
        </div>

        {/* Right column — Course Content */}
        <div className="flex-1 min-w-0">
          <ClassroomCourseContent course={course} />
        </div>

      </div>
    </div>
  );
};
