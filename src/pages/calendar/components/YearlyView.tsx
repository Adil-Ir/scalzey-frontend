import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MONTH_NAMES, isSameDay } from "../data";

// Yearly view: Sunday-first mini calendars
const DAY_LABELS = ["S","M","T","W","T","F","S"];

interface Props {
  currentDate: Date;
  onDateChange: (d: Date) => void;
}

function getMiniCells(year: number, month: number): (number | null)[] {
  const firstDay  = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const MiniMonth = ({
  year, month, today, onSelect,
}: {
  year: number; month: number; today: Date; onSelect: (d: Date) => void;
}) => {
  const cells = getMiniCells(year, month);
  return (
    <div
      className="bg-gray-50 dark:bg-[#141E22] p-4"
      style={{ borderRadius: "20px" }}
    >
      <p className="text-[13px] font-semibold text-gray-900 dark:text-white mb-3">
        {MONTH_NAMES[month]}
      </p>
      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d, i) => (
          <div key={i} className="text-center text-[10px] text-gray-400 dark:text-slate-500 py-0.5">
            {d}
          </div>
        ))}
      </div>
      {/* Date grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const cellDate = new Date(year, month, d);
          const isToday  = isSameDay(cellDate, today);
          return (
            <button
              key={i}
              onClick={() => onSelect(cellDate)}
              className={`h-6 w-6 mx-auto flex items-center justify-center text-[11px] rounded-full transition font-medium ${
                isToday
                  ? "bg-[#44BCFF] text-white"
                  : "text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-white/10"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const YearlyView = ({ currentDate, onDateChange }: Props) => {
  const today = new Date();
  const year  = currentDate.getFullYear();

  return (
    <div
      className="bg-white dark:bg-[#1D242A] flex flex-col overflow-hidden h-[calc(100vh-200px)]"
      style={{ borderRadius: "26.53px" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-white/10">
        <button
          onClick={() => onDateChange(new Date(year - 1, currentDate.getMonth(), 1))}
          className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-400 transition"
        >
          <FiChevronLeft size={14} />
        </button>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{year}</span>
        <button
          onClick={() => onDateChange(new Date(year + 1, currentDate.getMonth(), 1))}
          className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-400 transition"
        >
          <FiChevronRight size={14} />
        </button>
      </div>

      {/* 12 month grid */}
      <div className="flex-1 p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ alignContent: "start" }}>
        {Array.from({ length: 12 }, (_, m) => (
          <MiniMonth
            key={m}
            year={year}
            month={m}
            today={today}
            onSelect={(d) => onDateChange(d)}
          />
        ))}
      </div>
    </div>
  );
};
