import { HiOutlineSearch } from "react-icons/hi";
import { LatestAnnouncement } from "./components/LatestAnnouncement";
import { EnrolledCommunities } from "./components/EnrolledCommunities";
import { ExploreCommunities } from "./components/ExploreCommunities";
import { RelevantCourses } from "./components/RelevantCourses";

export const HomePage = () => {
  return (
    <div className="space-y-8">
      {/* Welcome + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          👋 Welcome back, Jhon
        </h1>
        <div className="flex items-center gap-2 rounded-full border px-4 py-2.5 w-full sm:w-72 bg-white dark:bg-[#141E22] border-gray-200 dark:border-white/10">
          <HiOutlineSearch size={16} className="text-gray-400 dark:text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search for courses, communities"
            className="flex-1 bg-transparent text-sm text-gray-700 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none border-none"
          />
        </div>
      </div>

      {/* Sections */}
      <LatestAnnouncement />
      <EnrolledCommunities />
      <ExploreCommunities />
      <RelevantCourses />
    </div>
  );
};
