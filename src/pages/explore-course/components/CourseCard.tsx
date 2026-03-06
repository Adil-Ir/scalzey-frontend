import { FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export interface Course {
  id: number;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  instructor: string;
  instructorColor: string;
  members: string;
  rating: number;
  modules: number;
  lessons: number;
  quizzes: number;
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

export const CourseCard = ({ course }: { course: Course }) => {
  const navigate = useNavigate();
  return (
    <div
      className="h-full flex flex-col gap-3 bg-white dark:bg-[#1D242A]"
      style={{ borderRadius: "26.53px", padding: "26px" }}
    >
      {/* Category pill */}
      <span
        className={`self-start text-[11px] font-medium px-3 py-1 rounded-full border ${course.tagColor}`}
      >
        {course.tag}
      </span>

      {/* Title */}
      <h3 className="text-[15px] font-semibold leading-snug text-gray-900 dark:text-white">
        {course.title}
      </h3>

      {/* Description */}
      <p className="flex-1 text-[12px] leading-relaxed text-gray-500 dark:text-[#FFFFFFBF]">
        {course.description}
      </p>

      {/* Instructor + members row */}
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
          <span className="text-[12px] font-medium text-gray-500 dark:text-slate-400">
            {course.members}
          </span>
          <MemberAvatars color={course.instructorColor} />
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-100 dark:border-white/10" />

      {/* Rating + Get Course */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <FiStar size={15} className="text-yellow-400 fill-yellow-400" />
          <span className="text-[13px] font-semibold text-gray-900 dark:text-white">
            {course.rating.toFixed(1)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => navigate(`/courses/detail/${course.id}`)}
          className="px-5 py-2 rounded-full bg-[#44BCFF] text-white text-[12px] font-medium hover:bg-[#2eaef5] transition"
        >
          Get Course
        </button>
      </div>
    </div>
  );
};
