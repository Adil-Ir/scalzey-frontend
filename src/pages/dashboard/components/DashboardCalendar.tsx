import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineInformationCircle } from "react-icons/hi";

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export const DashboardCalendar = () => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selected, setSelected] = useState<number>(today.getDate());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isToday = (d: number) =>
    d === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div
      className="bg-white dark:bg-[#1D242A] h-full flex flex-col"
      style={{ borderRadius: "26.53px", padding: "24px" }}
    >
      {/* Card header */}
      <div className="flex items-center gap-2 mb-5">
        <HiOutlineInformationCircle size={18} className="text-gray-600 dark:text-white shrink-0" />
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Calender</h3>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-800 dark:text-white">
          {MONTHS[month]}
        </span>
        <div className="flex items-center gap-1">
          <select className="text-xs bg-transparent border border-gray-200 dark:border-white/10 rounded-full px-2 py-1 text-gray-600 dark:text-slate-300 outline-none cursor-pointer">
            <option>Monthly</option>
            <option>Weekly</option>
          </select>
          <button
            onClick={prevMonth}
            className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-300 transition"
          >
            <FiChevronLeft size={13} />
          </button>
          <button
            onClick={nextMonth}
            className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-300 transition"
          >
            <FiChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d, i) => (
          <div
            key={i}
            className="text-center text-[11px] font-medium text-gray-400 dark:text-slate-500 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-y-1 flex-1">
        {cells.map((d, i) => (
          <div key={i} className="flex items-center justify-center">
            {d !== null && (
              <button
                onClick={() => setSelected(d)}
                className={`h-7 w-7 text-[12px] rounded-full flex items-center justify-center transition font-medium ${
                  isToday(d)
                    ? "bg-[#44BCFF] text-white"
                    : selected === d
                    ? "border-2 border-[#44BCFF] text-[#44BCFF]"
                    : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/10"
                }`}
              >
                {d}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
