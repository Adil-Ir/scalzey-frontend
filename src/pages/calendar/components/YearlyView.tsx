import { MONTH_NAMES, isSameDay } from "../data";

// Yearly view: Sunday-first mini calendars
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

interface Props {
  currentDate: Date;
  onDateChange: (d: Date) => void;
}

function getMiniCells(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const MiniMonth = ({
  year,
  month,
  today,
  onSelect,
}: {
  year: number;
  month: number;
  today: Date;
  onSelect: (d: Date) => void;
}) => {
  const cells = getMiniCells(year, month);
  return (
    <div
      className="bg-gray-50 dark:bg-[#1D242A] p-4"
      style={{ borderRadius: "20px" }}
    >
      <p className="text-[15px]  font-semibold text-gray-900 dark:text-white mb-5">
        {MONTH_NAMES[month]}
      </p>
      {/* Day labels */}
      <div className="grid grid-cols-7 mb-3">
        {DAY_LABELS.map((d, i) => (
          <div
            key={i}
            className="text-center text-[15px] text-gray-400 dark:text-[#FFFFFF80] py-0.5"
          >
            {d}
          </div>
        ))}
      </div>
      {/* Date grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const cellDate = new Date(year, month, d);
          const isToday = isSameDay(cellDate, today);
          return (
            <button
              key={i}
              onClick={() => onSelect(cellDate)}
              className={`h-6 w-6 mx-auto flex items-center justify-center text-[13px] rounded-full transition font-medium ${
                isToday
                  ? "bg-[#44BCFF] text-white"
                  : "text-gray-700 dark:text-[#99A2A8] hover:bg-gray-200 dark:hover:bg-white/10"
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
  const year = currentDate.getFullYear();

  return (
    <div
      className=" flex flex-col overflow-hidden "
      style={{ borderRadius: "26.53px" }}
    >
      {/* Header */}

      {/* 12 month grid */}
      <div
        className="flex-1 p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ alignContent: "start" }}
      >
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
