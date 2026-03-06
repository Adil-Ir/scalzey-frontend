import { FiArrowUpRight } from "react-icons/fi";
import { MdOutlineQuiz } from "react-icons/md";
import { HiOutlineBookOpen } from "react-icons/hi";
import { VideoThumbnail } from "./VideoThumbnail";

interface GuideItem {
  label: string;
}

interface ResultData {
  grade: number;
  status: "Pass" | "Fail";
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  guides: GuideItem[];
}

export interface CourseResult {
  id: number;
  instructor: string;
  instructorColor: string;
  title: string;
  description: string;
  result: ResultData;
  video: {
    caption: string;
    gradientBg: string;
  };
}

export const ResultCard = ({ course }: { course: CourseResult }) => {
  const { result } = course;
  const isPassed = result.status === "Pass";

  return (
    <div
      className="bg-white dark:bg-[#1D242A] overflow-hidden"
      style={{ borderRadius: "26.53px" }}
    >
      {/* ── TOP GRID: heading/description | video ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">

        {/* Left — instructor + title + description */}
        <div className="flex flex-col gap-3">
          {/* Instructor */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex h-7 w-7 rounded-full items-center justify-center text-white text-[11px] font-bold shrink-0 ${course.instructorColor}`}
            >
              {course.instructor[0]}
            </span>
            <span className="text-[14px] text-gray-500 dark:text-[#FFFFFFBF] max-w-153">
              {course.instructor}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-[22px] sm:text-[33px] font-semibold text-gray-900 dark:text-white leading-tight">
            {course.title}
          </h2>

          {/* Description */}
          <p className="text-[13px] leading-relaxed text-gray-500 dark:text-[#FFFFFFBF]">
            {course.description}
          </p>
        </div>

        {/* Right — video thumbnail */}
        <div className="flex justify-end">
          <div className="aspect-video rounded-xl overflow-hidden w-2/3">
          <VideoThumbnail
            instructorName={course.instructor}
            instructorColor={course.instructorColor}
            caption={course.video.caption}
            gradientBg={course.video.gradientBg}
          />
        </div>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="border-t border-[#2D3D46]" />

      {/* ── BOTTOM FULL-WIDTH SECTION ── */}
      <div className="p-6 flex flex-col gap-5">

        {/* Results row */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MdOutlineQuiz size={15} className="text-gray-400 dark:text-slate-500" />
            <span className="text-[13px] font-semibold text-gray-700 dark:text-slate-200">
              Results
            </span>
          </div>

          {/* Grade | Questions | Retake — inner card */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 dark:bg-[#141E22] px-5 py-4"
            style={{ borderRadius: "16px", border: "1px solid #2D3D46" }}
          >
            {/* Grade */}
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-[15px] font-bold text-gray-900 dark:text-white">
                Your grade:{" "}
                <span className={isPassed ? "text-emerald-400" : "text-red-400"}>
                  {result.grade.toFixed(2)}%
                </span>
              </p>
              <p className="text-[12px] text-gray-500 dark:text-slate-400">
                Status:{" "}
                <span className={isPassed ? "text-emerald-400 font-medium" : "text-red-400 font-medium"}>
                  {result.status}
                </span>
                &nbsp;&nbsp;Score: {result.score}
              </p>
            </div>

            {/* Questions */}
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-[15px] font-bold text-gray-900 dark:text-white">
                Questions
              </p>
              <p className="text-[12px] text-gray-500 dark:text-slate-400">
                Total: {result.totalQuestions}&nbsp;&nbsp;Correct Answer: {result.correctAnswers}
              </p>
            </div>

            {/* Retake */}
            <div className="flex items-center justify-start sm:justify-end">
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-2.5 rounded-full bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] transition"
              >
                Retake Quizz
              </button>
            </div>
          </div>
        </div>

        {/* Guide row */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <HiOutlineBookOpen size={15} className="text-gray-400 dark:text-slate-500" />
            <span className="text-[13px] font-semibold text-gray-700 dark:text-slate-200">
              Guide
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {result.guides.map((g, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 bg-gray-50 dark:bg-[#141E22] px-4 py-3 rounded-xl"
                style={{ border: "1px solid #2D3D46" }}
              >
                <p className="text-[12px] text-gray-500 dark:text-slate-400 min-w-0 truncate">
                  Check:{" "}
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {g.label}
                  </span>
                </p>
                <button
                  type="button"
                  className="shrink-0 h-6 w-6 rounded-full flex items-center justify-center border border-[#2D3D46] text-gray-400 dark:text-slate-400 hover:opacity-80 transition"
                >
                  <FiArrowUpRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
