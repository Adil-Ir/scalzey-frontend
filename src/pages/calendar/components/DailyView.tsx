import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  CALENDAR_EVENTS, HOURS, DAY_NAMES_FULL,
  formatHourLabel, isSameDay, addDays, getDayLabel,
} from "../data";

const HOUR_SLOTS = 23; /* 1 AM to 11 PM */
const TIME_COLUMN_WIDTH = 76; /* px — was 56, +20 */

interface Props {
  currentDate: Date;
  onDateChange: (d: Date) => void;
}

export const DailyView = ({ currentDate, onDateChange }: Props) => {
  const today = new Date();
  const dayEvents = CALENDAR_EVENTS.filter((e) => isSameDay(e.date, currentDate));

  const dayName = DAY_NAMES_FULL[currentDate.getDay()];
  const dayNum = currentDate.getDate();
  const dayLabel = getDayLabel(currentDate);

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Header: Wednesday 18 | Ramdan 2026 */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onDateChange(addDays(currentDate, -1))}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-400 transition"
            aria-label="Previous day"
          >
            <FiChevronLeft size={16} />
          </button>
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            {dayName} {dayNum}
          </span>
          <button
            onClick={() => onDateChange(addDays(currentDate, 1))}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-400 transition"
            aria-label="Next day"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
        <span className="border border-[#44BCFF] text-[#44BCFF] text-[13px] font-medium px-5 py-2 rounded-full">
          {dayLabel}
        </span>
      </div>

      {/* Time grid — no scroll */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="relative h-full flex flex-col">
          {/* Hour rows — equal height, no scroll */}
          {HOURS.map((h) => (
            <div
              key={h}
              className="flex items-stretch flex-1 min-h-10 border-b border-gray-200 dark:border-white/6"
            >
              <span
                className="shrink-0 pl-4 pr-2 flex items-center text-[12px] text-gray-500 dark:text-slate-400"
                style={{ width: TIME_COLUMN_WIDTH }}
              >
                {formatHourLabel(h)}
              </span>
              <div className="flex-1 min-w-0 border-l border-gray-200 dark:border-white/6" />
            </div>
          ))}

          {/* Events — positioned by % of visible hour slots (1–23) */}
          {dayEvents.map((ev) => {
            const startSlot = ev.startHour - 1 + ev.startMin / 60;
            const startPct = (startSlot / HOUR_SLOTS) * 100;
            const heightPct = (ev.durationMin / 60 / HOUR_SLOTS) * 100;
            return (
              <div
                key={ev.id}
                className={`absolute right-4 rounded-lg border-l-4 px-3 py-1.5 ${ev.borderColor} ${ev.bgColor}`}
                style={{ left: TIME_COLUMN_WIDTH, top: `${startPct}%`, height: `${Math.max(heightPct, 4)}%` }}
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
              className="absolute right-0 flex items-center gap-1 z-10"
              style={{
                left: TIME_COLUMN_WIDTH,
                top: `${(Math.max(0, (today.getHours() - 1) + today.getMinutes() / 60) / HOUR_SLOTS) * 100}%`,
              }}
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
