import { useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";

const CATEGORIES = [
  "All",
  "Design",
  "Development",
  "Management",
  "Marketing",
];

interface CourseFiltersProps {
  onSearch: (q: string) => void;
  onCategory: (cat: string) => void;
  activeCategory: string;
}

export const CourseFilters = ({
  onSearch,
  onCategory,
  activeCategory,
}: CourseFiltersProps) => {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {/* Search */}
      <div className="flex-1 flex items-center gap-2 rounded-full  bg-white dark:bg-[#1D242A] px-4 py-2.5">
        <FiSearch size={15} className="text-gray-400 dark:text-slate-500 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search for courses"
          className="flex-1 bg-transparent text-sm text-gray-700 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none border-none"
        />
      </div>

      {/* Category dropdown */}
      <div className="relative">
        <select
          value={activeCategory}
          onChange={(e) => onCategory(e.target.value)}
          className="appearance-none rounded-full   bg-white dark:bg-[#1D242A] px-4 py-2.5 pr-8 text-sm text-gray-700 dark:text-slate-200 outline-none cursor-pointer"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "Categories" : c}
            </option>
          ))}
        </select>
        <FiChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400 pointer-events-none"
        />
      </div>
    </div>
  );
};
