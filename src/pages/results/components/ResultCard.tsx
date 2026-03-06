import { FiArrowUpRight } from "react-icons/fi";
import { VideoThumbnail } from "./VideoThumbnail";
import { BsCardText } from "react-icons/bs";
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

      <div>
        <div className="flex items-center gap-2 px-6">
          <BsCardText size={18} className="text-gray-400 dark:text-white" />
          <span className="text-[16px] font-semibold text-gray-700 dark:text-slate-200">
            Results
          </span>
        </div>

        <div className="p-6 ">
          <div className="px-10 py-8 border border-[#2D3D46] rounded-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-3  xl:gap-16 gap-6">
              {/* Grade */}
              <div className="flex flex-col gap-1 h-fit justify-center border-r border-[#2D3D46] pr-4">
                <p className="lg:text-[26px] text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                  Your grade:{" "}
                  <span
                    className={isPassed ? "text-emerald-400" : "text-red-400"}
                  >
                    {result.grade.toFixed(2)}%
                  </span>
                </p>
                <p className="text-[14px] text-gray-500 dark:text-white">
                  Status:{" "}
                  <span
                    className={
                      isPassed
                        ? "text-emerald-400 font-medium"
                        : "text-red-400 font-medium"
                    }
                  >
                    {result.status}
                  </span>
                  &nbsp;&nbsp;Score: {result.score}
                </p>
              </div>

              {/* Questions */}
              <div className="flex flex-col items-center gap-1 justify-center border-r border-[#2D3D46] pr-4">
               <div>
                 <p className="lg:text-[26px] text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                  Questions
                </p>
                <p className="text-[14px] text-gray-500 dark:text-white">
                  Total: {result.totalQuestions}&nbsp;&nbsp;Correct Answer:{" "}
                  {result.correctAnswers}
                </p>
               </div>
              </div>

              {/* Retake */}
              <div className="flex items-center justify-start sm:justify-end">
                <button
                  type="button"
                  className="w-full sm:w-auto px-16 py-3 cursor-pointer rounded-full bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] transition"
                >
                  Retake Quizz
                </button>
              </div>
            </div>
            {/* Guide row */}
            <div>
              <div className="flex items-center gap-2.5 mb-3 border-t border-[#2D3D46] pt-2 mt-5">
                <BsCardText
                  size={18}
                  className="text-gray-400 dark:text-white"
                />
                <span className="text-[16px] font-semibold text-gray-700 dark:text-slate-200">
                  Guide
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {result.guides.map((g, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 bg-gray-50 dark:bg-[#20303B] px-4 py-3 rounded-xl"
                  >
                    <p className="text-[12px] text-gray-400 dark:text-white min-w-0 ">
                      Check:{" "}
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {g.label}
                      </span>
                    </p>
                    <button
                      type="button"
                      className="shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-gray-400 dark:text-white"
                    >
                      <FiArrowUpRight size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
