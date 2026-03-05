import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { EnrolledCourseCard } from "./components/EnrolledCourseCard";
import { WorkshopCard } from "./components/WorkshopCard";
import type { EnrolledCourse } from "./components/EnrolledCourseCard";
import type { Workshop } from "./components/WorkshopCard";

type FilterTab = "All" | "In Progress" | "Completed";

// TODO: replace with API data
const ENROLLED_COURSES: EnrolledCourse[] = [
  {
    id: 1,
    status: "In progress",
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
    progress: 85,
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
];

// TODO: replace with API data
const WORKSHOPS: Workshop[] = [
  {
    id: 1,
    courseName: "Advances User Experience",
    title: "Ux Best Practices",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suscipit sapien convallis neque sagittis malesuada mi erat natoque malesuada.",
    members: "245+",
    daysLeft: "12 days remaining",
    instructor: "Dwoskey",
    instructorColor: "bg-pink-500",
    participants: "245+ participants",
  },
  {
    id: 2,
    courseName: "Advance Java",
    title: "Core Java Syntax",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suscipit sapien convallis neque sagittis malesuada mi erat natoque malesuada.",
    members: "245+",
    daysLeft: "12 days remaining",
    instructor: "Dwoskey",
    instructorColor: "bg-purple-500",
    participants: "245+ participants",
  },
  {
    id: 3,
    courseName: "Project Management",
    title: "Agile Approaches",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suscipit sapien convallis neque sagittis malesuada mi erat natoque malesuada.",
    members: "245+",
    daysLeft: "12 days remaining",
    instructor: "Dwoskey",
    instructorColor: "bg-orange-500",
    participants: "245+ participants",
  },
];

const TABS: FilterTab[] = ["All", "In Progress", "Completed"];

export const EnrolledCoursesPage = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [query, setQuery] = useState("");

  const filteredCourses = ENROLLED_COURSES.filter((c) => {
    const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase());
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "In Progress" && c.status === "In progress") ||
      (activeTab === "Completed" && c.status === "Completed");
    return matchesQuery && matchesTab;
  });

  return (
    <div className="space-y-10">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-xl font-semibold text-[#0F161A] dark:text-white shrink-0">
            Enrolled Courses{" "}
            <span className="text-[#44BCFF]">{filteredCourses.length}</span>
          </h1>

          {/* Filter tabs */}
          <div className="flex items-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-[12px] font-medium border transition ${
                  activeTab === tab
                    ? "bg-[#44BCFF] border-[#44BCFF] text-white"
                    : "bg-transparent border-gray-200 dark:border-white/15 text-gray-500 dark:text-slate-400 hover:border-[#44BCFF] hover:text-[#44BCFF]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1D242A] px-4 py-2.5 w-full sm:w-72">
          <FiSearch size={15} className="text-gray-400 dark:text-slate-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for communities"
            className="flex-1 bg-transparent text-sm text-gray-700 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none border-none"
          />
        </div>
      </div>

      {/* Enrolled courses grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <EnrolledCourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 text-gray-400 dark:text-slate-500 text-sm">
          No enrolled courses found.
        </div>
      )}

      {/* Workshops section */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-[#0F161A] dark:text-white">
          Workshops
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {WORKSHOPS.map((ws) => (
            <WorkshopCard key={ws.id} workshop={ws} />
          ))}
        </div>
      </div>
    </div>
  );
};
