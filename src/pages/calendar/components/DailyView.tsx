import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  CALENDAR_EVENTS, HOURS, MONTH_NAMES, DAY_NAMES_FULL,
  formatHourLabel, isSameDay, addDays,
} from "../data";

const HOUR_H = 64; // px per hour slot

interface Props {
  currentDate: Date;
  onDateChange: (d: Date) => void;
}

export const DailyView = ({ currentDate, onDateChange }: Props) => {
  const today = new Date();
  const dayEvents = CALENDAR_EVENTS.filter((e) => isSameDay(e.date, currentDate));

  const dayName  = DAY_NAMES_FULL[currentDate.getDay()];
  const dayNum   = currentDate.getDate();
  const monthYear = `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  return (
    <div
      className="bg-white dark:bg-[#1D242A] flex flex-col overflow-hidden h-[calc(100vh-200px)]"
      style={{ borderRadius: "26.53px" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onDateChange(addDays(currentDate, -1))}
            className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-400 transition"
          >
            <FiChevronLeft size={14} />
          </button>
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            {dayName} {dayNum}
          </span>
          <button
            onClick={() => onDateChange(addDays(currentDate, 1))}
            className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-400 transition"
          >
            <FiChevronRight size={14} />
          </button>
        </div>
        <span className="border border-[#44BCFF] text-[#44BCFF] text-xs px-4 py-1 rounded-full">
          {monthYear}
        </span>
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="relative" style={{ minHeight: `${HOURS.length * HOUR_H}px` }}>
          {/* Hour rows */}
          {HOURS.map((h) => (
            <div
              key={h}
              className="flex items-start border-b border-gray-100 dark:border-white/5"
              style={{ height: `${HOUR_H}px` }}
            >
              <span className="w-16 shrink-0 px-4 text-[11px] text-gray-400 dark:text-slate-500 -translate-y-2">
                {formatHourLabel(h)}
              </span>
              <div className="flex-1 border-l border-gray-100 dark:border-white/5" />
            </div>
          ))}

          {/* Events */}
          {dayEvents.map((ev) => {
            const top = (ev.startHour - 1) * HOUR_H + (ev.startMin / 60) * HOUR_H;
            const height = Math.max((ev.durationMin / 60) * HOUR_H, 32);
            return (
              <div
                key={ev.id}
                className={`absolute left-16 right-4 rounded-lg border-l-4 px-3 py-1.5 ${ev.borderColor} ${ev.bgColor}`}
                style={{ top, height }}
              >
                <p className={`text-[12px] font-semibold ${ev.textColor}`}>{ev.title}</p>
                <p className="text-[11px] text-gray-400 dark:text-slate-500">
                  {`${String(ev.startHour).padStart(2,"0")}:${String(ev.startMin).padStart(2,"0")} ${ev.startHour < 12 ? "AM" : "PM"}`}
                </p>
              </div>
            );
          })}

          {/* Today line */}
          {isSameDay(currentDate, today) && (
            <div
              className="absolute left-16 right-0 flex items-center gap-1 z-10"
              style={{ top: (today.getHours() - 1) * HOUR_H + (today.getMinutes() / 60) * HOUR_H }}
            >
              <div className="h-2.5 w-2.5 rounded-full bg-[#44BCFF] shrink-0" />
              <div className="flex-1 border-t-2 border-[#44BCFF]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
