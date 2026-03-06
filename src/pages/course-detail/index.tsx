import { useParams, useNavigate } from "react-router-dom";
import { CourseHero } from "./components/CourseHero";
import { CourseInfoCards } from "./components/CourseInfoCards";
import { CourseContentSection } from "./components/CourseContentSection";
import { COURSE_DETAILS } from "./data";

export const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = COURSE_DETAILS[Number(id)];

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 py-24">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">Course not found</p>
        <button
          onClick={() => navigate("/courses/explore")}
          className="px-6 py-2.5 rounded-full bg-[#44BCFF] text-white text-sm font-medium hover:bg-[#2eaef5] transition"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="flex dark:bg-[#1D242A] bg-white rounded-[26px] flex-col gap-8 p-7">
      <CourseHero course={course} />
      <CourseInfoCards course={course} />
      <CourseContentSection course={course} />
    </div>
  );
};
