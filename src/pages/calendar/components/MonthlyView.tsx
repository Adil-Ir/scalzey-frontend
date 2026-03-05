import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CALENDAR_EVENTS, MONTH_NAMES, isSameDay } from "../data";

// Week starts Monday
const DAY_LABELS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

interface Props {
  currentDate: Date;
  onDateChange: (d: Date) => void;
}

function getMonthCells(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  // Convert so Monday=0, ..., Sunday=6
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array(startOffset).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  // pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export const MonthlyView = ({ currentDate, onDateChange }: Props) => {
  const today = new Date();
  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const cells = getMonthCells(year, month);

  const prevMonth = () => onDateChange(new Date(year, month - 1, 1));
  const nextMonth = () => onDateChange(new Date(year, month + 1, 1));

  return (
    <div
      className="bg-white dark:bg-[#1D242A] flex flex-col overflow-hidden h-[calc(100vh-200px)]"
      style={{ borderRadius: "26.53px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-3">
          <button onClick={prevMonth}
            className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-400 transition">
            <FiChevronLeft size={14} />
          </button>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {MONTH_NAMES[month]} {year}
          </span>
          <button onClick={nextMonth}
            className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-400 transition">
            <FiChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 border-b border-gray-100 dark:border-white/10">
        {DAY_LABELS.map((d) => (
          <div key={d} className="py-2 text-center text-[12px] font-medium text-gray-400 dark:text-slate-500">
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ alignContent: "start" }}>
        {cells.map((cell, i) => {
          if (!cell) return (
            <div key={i} className="border-b border-r border-gray-100 dark:border-white/5 min-h-[90px]" />
          );

          const isToday    = isSameDay(cell, today);
          const dayEvents  = CALENDAR_EVENTS.filter((e) => isSameDay(e.date, cell));
          const isLastInRow = (i + 1) % 7 === 0;

          return (
            <div
              key={i}
              className={`border-b border-gray-100 dark:border-white/5 min-h-[90px] p-1.5 flex flex-col gap-1 ${!isLastInRow ? "border-r" : ""}`}
            >
              {/* Date number */}
              <span
                className={`self-end text-[12px] font-semibold w-6 h-6 flex items-center justify-center rounded-full ${
                  isToday
                    ? "bg-[#44BCFF] text-white"
                    : "text-gray-700 dark:text-slate-300"
                }`}
              >
                {String(cell.getDate()).padStart(2, "0")}
              </span>

              {/* Events */}
              {dayEvents.slice(0, 3).map((ev) => (
                <div
                  key={ev.id}
                  className={`rounded text-[10px] px-1.5 py-0.5 border-l-2 leading-tight truncate ${ev.borderColor} ${ev.bgColor} ${ev.textColor}`}
                >
                  {ev.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <span className="text-[10px] text-gray-400 dark:text-slate-500 px-1">
                  +{dayEvents.length - 3} more
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
