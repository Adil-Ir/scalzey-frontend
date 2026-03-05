import { useState } from "react";
import Calendar from "react-calendar";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineInformationCircle } from "react-icons/hi";

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export const DashboardCalendar = () => {
  const today = new Date();
  const [value, setValue] = useState<Date>(today);
  const [activeStartDate, setActiveStartDate] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [viewMode, setViewMode] = useState<"monthly" | "weekly">("monthly");

  const prevMonth = () =>
    setActiveStartDate(
      new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() - 1, 1),
    );
  const nextMonth = () =>
    setActiveStartDate(
      new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 1),
    );

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const startOfWeek = (d: Date) => {
    const date = new Date(d);
    const day = date.getDay();
    date.setDate(date.getDate() - day);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const isSameWeek = (a: Date, b: Date) =>
    startOfWeek(a).getTime() === startOfWeek(b).getTime();

  return (
    <div className="bg-white dark:bg-[#1D242A] h-full flex flex-col rounded-[26.53px] p-6">
      <div className="flex justify-between items-start mb-4">
        {/* Card header */}
        <div className="flex gap-2">
          <HiOutlineInformationCircle className="shrink-0" size={24} />
          <h3 className="xl:text-lg text-base text-[#0F161A] leading-tight dark:text-white">
            Calendar
          </h3>
        </div>

        {/* Month navigation + view mode */}
        <div className="flex items-center gap-3">
          <select
            value={viewMode}
            onChange={(e) =>
              setViewMode(e.target.value === "weekly" ? "weekly" : "monthly")
            }
            className="text-xs bg-transparent border border-gray-200 dark:border-white/10 rounded-full px-2 py-1 text-gray-600 dark:text-slate-300 outline-none cursor-pointer"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
          <button
            onClick={prevMonth}
            className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-slate-300 transition"
          >
            <FiChevronLeft size={13} />
          </button>
          <button
            onClick={nextMonth}
            className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-slate-300 transition"
          >
            <FiChevronRight size={13} />
          </button>
        </div>
      </div>

      <Calendar
        onChange={(next) => setValue(next as Date)}
        value={value}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) setActiveStartDate(activeStartDate);
        }}
        view="month"
        showNeighboringMonth={false}
        prevLabel={null}
        nextLabel={null}
        navigationLabel={undefined}
        formatShortWeekday={(_, date) => DAY_LABELS[date.getDay()]}
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";

          const isTodayTile = isSameDay(date, today);
          const isSelectedTile = isSameDay(date, value);
          const inSelectedWeek =
            viewMode === "weekly" && isSameWeek(date, value);

          let base =
            "dashboard-calendar-tile h-7 w-7 text-[12px] rounded-full flex  font-medium ";

          if (isTodayTile) base += "bg-[#44BCFF] text-white ";
          else if (isSelectedTile)
            base += "border-2 border-[#44BCFF] text-[#44BCFF] ";
          else base += "text-gray-700 dark:text-[#99A2A8] ";

          if (viewMode === "weekly" && !inSelectedWeek) {
            base += "opacity-40 ";
          }

          return base;
        }}
        className="dashboard-calendar mt-5 w-full"
      />
    </div>
  );
};
