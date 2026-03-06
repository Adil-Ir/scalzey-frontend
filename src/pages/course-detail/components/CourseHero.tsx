import type { CourseDetailData } from "../data";
import { VideoThumbnail } from "../../results/components/VideoThumbnail";

export const CourseHero = ({ course }: { course: CourseDetailData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2  items-start">
    {/* Left — info */}
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex h-8 w-8 rounded-full items-center justify-center text-white text-[12px] font-bold shrink-0 ${course.instructorColor}`}
        >
          {course.instructor[0]}
        </span>
        <span className="text-[13px] text-gray-500 dark:text-slate-400">
          {course.instructor}
        </span>
      </div>

      <h2 className="text-[22px]  xl:text-[30px] font-semibold text-gray-900 dark:text-white leading-tight">
        {course.title}
      </h2>

      {/* Description */}
      <p className="text-[13px] leading-relaxed text-gray-500 dark:text-[#FFFFFFBF]">
        {course.description}
      </p>

      <button
        type="button"
        className="self-start px-7 py-2.5 rounded-full bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] transition"
      >
        Enroll Today
      </button>
    </div>

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
);
