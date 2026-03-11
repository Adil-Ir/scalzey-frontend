import { useState } from "react";
import { CourseSection } from "./components/CourseSection";
import { CourseFilters } from "./components/CourseFilters";
import type { Course } from "./components/CourseCard";

// TODO: replace with API data
const ALL_COURSES: Course[] = [
  {
    id: 1,
    tag: "Design",
    tagColor: "border-[#3CC982] text-[#3CC982]",
    title: "Advances User Experience",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    instructor: "Dwoskey",
    instructorColor: "bg-pink-500",
    members: "300+",
    rating: 4.2,
    modules: 6,
    lessons: 12,
    quizzes: 1,
  },
  {
    id: 2,
    tag: "Development",
    tagColor: "border-sky-400 text-sky-400",
    title: "Advance Java",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    instructor: "Dwoskey",
    instructorColor: "bg-purple-500",
    members: "300+",
    rating: 4.2,
    modules: 8,
    lessons: 16,
    quizzes: 2,
  },
  {
    id: 3,
    tag: "Management",
    tagColor: "border-rose-400 text-rose-400",
    title: "Project Management",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    instructor: "Dwoskey",
    instructorColor: "bg-orange-500",
    members: "300+",
    rating: 4.2,
    modules: 5,
    lessons: 10,
    quizzes: 1,
  },
  {
    id: 4,
    tag: "Design",
    tagColor: "border-[#3CC982] text-[#3CC982]",
    title: "Advances User Experience",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    instructor: "Dwoskey",
    instructorColor: "bg-cyan-500",
    members: "300+",
    rating: 4.2,
    modules: 6,
    lessons: 12,
    quizzes: 1,
  },
  {
    id: 5,
    tag: "Development",
    tagColor: "border-sky-400 text-sky-400",
    title: "Advance Java",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    instructor: "Dwoskey",
    instructorColor: "bg-violet-500",
    members: "300+",
    rating: 4.2,
    modules: 8,
    lessons: 16,
    quizzes: 2,
  },
  {
    id: 6,
    tag: "Management",
    tagColor: "border-rose-400 text-rose-400",
    title: "Project Management",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    instructor: "Dwoskey",
    instructorColor: "bg-amber-500",
    members: "300+",
    rating: 4.2,
    modules: 5,
    lessons: 10,
    quizzes: 1,
  },
  {
    id: 7,
    tag: "Design",
    tagColor: "border-[#3CC982] text-[#3CC982]",
    title: "Advances User Experience",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    instructor: "Dwoskey",
    instructorColor: "bg-pink-500",
    members: "300+",
    rating: 4.2,
    modules: 6,
    lessons: 12,
    quizzes: 1,
  },
  {
    id: 8,
    tag: "Development",
    tagColor: "border-sky-400 text-sky-400",
    title: "Advance Java",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    instructor: "Dwoskey",
    instructorColor: "bg-purple-500",
    members: "300+",
    rating: 4.2,
    modules: 8,
    lessons: 16,
    quizzes: 2,
  },
  {
    id: 9,
    tag: "Management",
    tagColor: "border-rose-400 text-rose-400",
    title: "Project Management",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    instructor: "Dwoskey",
    instructorColor: "bg-orange-500",
    members: "300+",
    rating: 4.2,
    modules: 5,
    lessons: 10,
    quizzes: 1,
  },
];

export const ExploreCourses = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = ALL_COURSES.filter((c) => {
    const matchesQuery =
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.tag.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      category === "All" || c.tag === category;
    return matchesQuery && matchesCategory;
  });

  const relevantCourses = filtered.slice(0, 3);
  const communityCourses = filtered.slice(3, 6);
  const exploreCourses = filtered.slice(6, 9);

  return (
    <div className="space-y-10">
      {/* Page header + filters */}
      <div className="  grid  md:grid-cols-2 grid-cols-1 md:items-center justify-between gap-4">
        <h1 className="text-xl  font-semibold text-[#0F161A] dark:text-white shrink-0">
          Courses
        </h1>
        <CourseFilters
          onSearch={setQuery}
          onCategory={setCategory}
          activeCategory={category}
        />
      </div>

      {/* Sections */}
      {relevantCourses.length > 0 && (
        <CourseSection title="Relevant Courses" courses={relevantCourses} />
      )}

      {communityCourses.length > 0 && (
        <CourseSection title="Community Required Courses" courses={communityCourses} />
      )}

      {exploreCourses.length > 0 && (
        <CourseSection title="Explore Courses" courses={exploreCourses} />
      )}

      {filtered.length === 0 && (
        <div className="flex items-center justify-center h-48 text-gray-400 dark:text-slate-500 text-sm">
          No courses found for &quot;{query}&quot;.
        </div>
      )}
    </div>
  );
};
