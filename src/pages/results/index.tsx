import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { ResultCard } from "./components/ResultCard";
import type { CourseResult } from "./components/ResultCard";

const RESULTS: CourseResult[] = [
  {
    id: 1,
    instructor: "Dwoskey",
    instructorColor: "bg-pink-500",
    title: "Microsoft Cybersecurity Analyst Professional Certificate",
    description:
      "Launch your career as a cybersecurity analyst. Build job-ready skills – and must-have AI skills – for an in-demand career. Earn a credential from Microsoft. No prior experience required.",
    result: {
      grade: 33.33,
      status: "Fail",
      score: 1,
      totalQuestions: 10,
      correctAnswers: 1,
      guides: [
        { label: "Business systems applications" },
        { label: "Business systems applications" },
        { label: "Business systems applications" },
      ],
    },
    video: {
      caption: "Introduction to Mentor - What you will learn in the course",
      gradientBg: "from-slate-700 via-slate-800 to-gray-900",
    },
  },
  {
    id: 2,
    instructor: "Dwoskey",
    instructorColor: "bg-purple-500",
    title: "Microsoft Cybersecurity Analyst Professional Certificate",
    description:
      "Launch your career as a cybersecurity analyst. Build job-ready skills – and must-have AI skills – for an in-demand career. Earn a credential from Microsoft. No prior experience required.",
    result: {
      grade: 80.0,
      status: "Pass",
      score: 8,
      totalQuestions: 10,
      correctAnswers: 8,
      guides: [
        { label: "Business systems applications" },
        { label: "Network security fundamentals" },
        { label: "Cloud security essentials" },
      ],
    },
    video: {
      caption: "Module 2 - Cybersecurity Threat Landscape Overview",
      gradientBg: "from-indigo-800 via-purple-800 to-slate-900",
    },
  },
  {
    id: 3,
    instructor: "Dwoskey",
    instructorColor: "bg-orange-500",
    title: "Google Data Analytics Professional Certificate",
    description:
      "Get professional training designed by Google and be on the fast-track to a competitively paid job. There are 483,000 U.S. job openings in data analytics with a median entry-level salary of $92,000.",
    result: {
      grade: 55.5,
      status: "Fail",
      score: 5,
      totalQuestions: 9,
      correctAnswers: 5,
      guides: [
        { label: "Data cleaning with spreadsheets" },
        { label: "SQL for data analysis" },
        { label: "Tableau visualizations" },
      ],
    },
    video: {
      caption: "Introduction to Data Analytics - Core Concepts",
      gradientBg: "from-teal-800 via-cyan-800 to-slate-900",
    },
  },
];

export const CoursesResultsPage = () => {
  const [search, setSearch] = useState("");

  const filtered = RESULTS.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Course Results
        </h1>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Result cards */}
      <div className="flex flex-col gap-5">
        {filtered.length > 0 ? (
          filtered.map((course) => (
            <ResultCard key={course.id} course={course} />
          ))
        ) : (
          <div className="text-center py-16 text-gray-400 dark:text-slate-500">
            No results found for "{search}"
          </div>
        )}
      </div>
    </div>
  );
};
