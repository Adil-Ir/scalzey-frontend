import { CourseCard } from "./CourseCard";
import type { Course } from "./CourseCard";

interface CourseSectionProps {
  title: string;
  courses: Course[];
}

export const CourseSection = ({ title, courses }: CourseSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-[#0F161A] dark:text-white">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
