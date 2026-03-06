import { HiOutlineSearch } from "react-icons/hi";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="flex items-center gap-2.5 rounded-full b bg-white dark:bg-[#1D242A] px-4 py-2.5 w-full sm:w-72">
    <HiOutlineSearch size={15} className="text-gray-400 dark:text-[#868E96] shrink-0" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by course name"
      className="flex-1 bg-transparent text-sm text-gray-700 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none border-none"
    />
  </div>
);
