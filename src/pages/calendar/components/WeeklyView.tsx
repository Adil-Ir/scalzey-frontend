import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  CALENDAR_EVENTS, HOURS, DAY_NAMES_SHORT, MONTH_NAMES,
  formatHourLabel, isSameDay, getWeekStart, addDays,
} from "../data";

const HOUR_H = 64;

interface Props {
  currentDate: Date;
  onDateChange: (d: Date) => void;
}

export const WeeklyView = ({ currentDate, onDateChange }: Props) => {
  const today     = new Date();
  const weekStart = getWeekStart(currentDate);
  const weekDays  = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const monthLabel = `${MONTH_NAMES[weekStart.getMonth()]} ${weekStart.getFullYear()}`;

  return (
    <div
      className="bg-white dark:bg-[#1D242A] flex flex-col overflow-hidden h-[calc(100vh-200px)]"
      style={{ borderRadius: "26.53px" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onDateChange(addDays(currentDate, -7))}
            className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-400 transition"
          >
            <FiChevronLeft size={14} />
          </button>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{monthLabel}</span>
          <button
            onClick={() => onDateChange(addDays(currentDate, 7))}
            className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-400 transition"
          >
            <FiChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Day header row */}
      <div className="grid border-b border-gray-100 dark:border-white/10" style={{ gridTemplateColumns: "64px repeat(7, 1fr)" }}>
        <div /> {/* time label spacer */}
        {weekDays.map((day, i) => {
          const isToday = isSameDay(day, today);
          return (
            <div key={i} className="py-3 text-center border-l border-gray-100 dark:border-white/10">
              <p className={`text-[11px] font-medium ${isToday ? "text-[#44BCFF]" : "text-gray-400 dark:text-slate-500"}`}>
                {DAY_NAMES_SHORT[i === 6 ? 0 : i + 1]}
              </p>
              <p className={`text-sm font-semibold mt-0.5 ${isToday ? "text-[#44BCFF]" : "text-gray-800 dark:text-white"}`}>
                {day.getDate()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="relative" style={{ minHeight: `${HOURS.length * HOUR_H}px` }}>
          {/* Hour rows */}
          {HOURS.map((h) => (
            <div
              key={h}
              className="grid border-b border-gray-100 dark:border-white/5"
              style={{ height: `${HOUR_H}px`, gridTemplateColumns: "64px repeat(7, 1fr)" }}
            >
              <span className="px-3 text-[11px] text-gray-400 dark:text-slate-500 -translate-y-2 shrink-0">
                {formatHourLabel(h)}
              </span>
              {weekDays.map((_, ci) => (
                <div key={ci} className="border-l border-gray-100 dark:border-white/5" />
              ))}
            </div>
          ))}

          {/* Events */}
          {weekDays.map((day, colIdx) => {
            const colEvents = CALENDAR_EVENTS.filter((e) => isSameDay(e.date, day));
            return colEvents.map((ev) => {
              const top    = (ev.startHour - 1) * HOUR_H + (ev.startMin / 60) * HOUR_H;
              const height = Math.max((ev.durationMin / 60) * HOUR_H, 30);
              // colIdx 0=Mon(index1 in CSS grid), starts at col 2
              const leftPct  = `calc(64px + ${colIdx} * (100% - 64px) / 7 + 2px)`;
              const widthPct = `calc((100% - 64px) / 7 - 4px)`;
              return (
                <div
                  key={ev.id}
                  className={`absolute rounded-lg border-l-4 px-2 py-1 ${ev.borderColor} ${ev.bgColor}`}
                  style={{ top, height, left: leftPct, width: widthPct }}
                >
                  <p className={`text-[11px] font-semibold leading-tight ${ev.textColor}`}>{ev.title}</p>
                  <p className="text-[10px] text-gray-400 dark:text-slate-500">
                    {`${String(ev.startHour).padStart(2,"0")}:${String(ev.startMin).padStart(2,"0")} ${ev.startHour < 12 ? "AM" : "PM"}`}
                  </p>
                </div>
              );
            });
          })}

          {/* Today current-time line */}
          {weekDays.some((d) => isSameDay(d, today)) && (() => {
            const todayIdx = weekDays.findIndex((d) => isSameDay(d, today));
            const lineTop  = (today.getHours() - 1) * HOUR_H + (today.getMinutes() / 60) * HOUR_H;
            const left = `calc(64px + ${todayIdx} * (100% - 64px) / 7)`;
            const width = `calc((100% - 64px) / 7)`;
            return (
              <div className="absolute flex items-center z-10" style={{ top: lineTop, left, width }}>
                <div className="h-2 w-2 rounded-full bg-[#44BCFF] shrink-0" />
                <div className="flex-1 border-t-2 border-[#44BCFF]" />
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
