import { useState, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import type { View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addDays, addWeeks, addMonths, subDays, subWeeks, subMonths } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { YearlyView } from "./components/YearlyView";
import { CALENDAR_EVENTS, MONTH_NAMES } from "./data";

/* ── localizer ── */
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

/* ── events formatted for RBC ── */
const RBC_EVENTS = CALENDAR_EVENTS.map((ev) => ({
  id:    ev.id,
  title: ev.title,
  start: new Date(ev.date.getFullYear(), ev.date.getMonth(), ev.date.getDate(), ev.startHour, ev.startMin),
  end:   new Date(ev.date.getFullYear(), ev.date.getMonth(), ev.date.getDate(), ev.startHour, ev.startMin + ev.durationMin),
  meta:  { bg: ev.bgColor.replace(/^bg-\[|]$/g, ""), border: ev.borderColor.replace(/^border-\[|]$/g, ""), text: ev.textColor },
  type:  ev.title.toLowerCase().includes("workshop") ? "workshop" : "virtual",
}));

type AppView = "day" | "week" | "month" | "year";

const VIEW_TABS: { key: AppView; rbc: View | null; label: string }[] = [
  { key: "day",   rbc: "day",   label: "Daily"   },
  { key: "week",  rbc: "week",  label: "Weekly"  },
  { key: "month", rbc: "month", label: "Monthly" },
  { key: "year",  rbc: null,    label: "Yearly"  },
];

/* ── navigate one step forward/back for the current view ── */
function navigate(date: Date, view: AppView, dir: 1 | -1): Date {
  switch (view) {
    case "day":   return dir === 1 ? addDays(date, 1)    : subDays(date, 1);
    case "week":  return dir === 1 ? addWeeks(date, 1)   : subWeeks(date, 1);
    case "month": return dir === 1 ? addMonths(date, 1)  : subMonths(date, 1);
    case "year":  return new Date(date.getFullYear() + dir, date.getMonth(), 1);
  }
}

/* ── header label ── */
function headerLabel(date: Date, view: AppView): string {
  const m = MONTH_NAMES[date.getMonth()];
  const y = date.getFullYear();
  switch (view) {
    case "day":   return `${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][date.getDay()]} ${date.getDate()}, ${m} ${y}`;
    case "week":  return `${m} ${y}`;
    case "month": return `${m} ${y}`;
    case "year":  return `${y}`;
  }
}

export const CalendarPage = () => {
  const [view, setView]               = useState<AppView>("week");
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNavigate = useCallback((dir: 1 | -1) => {
    setCurrentDate((d) => navigate(d, view, dir));
  }, [view]);

  const handleTabChange = (v: AppView) => {
    setView(v);
  };

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-120px)]">

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-base font-semibold text-gray-900 dark:text-white">Calendar</span>

        {/* view tabs */}
        <div className="flex items-center gap-2">
          {VIEW_TABS.map((v) => (
            <button
              key={v.key}
              onClick={() => handleTabChange(v.key)}
              className={`px-4 py-1.5 rounded-full text-sm border transition ${
                view === v.key
                  ? "border-[#44BCFF] text-[#44BCFF] bg-[#44BCFF]/5"
                  : "border-gray-200 dark:border-white/15 text-gray-500 dark:text-slate-400 hover:border-[#44BCFF]/50 hover:text-[#44BCFF]"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* spacer */}
        <div className="flex-1" />

        {/* navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavigate(-1)}
            className="h-8 w-8 rounded-full flex items-center justify-center border border-gray-200 dark:border-white/15 text-gray-500 dark:text-slate-400 hover:border-[#44BCFF]/60 hover:text-[#44BCFF] transition"
          >
            <FiChevronLeft size={15} />
          </button>
          <span className="text-sm font-semibold text-gray-700 dark:text-white min-w-[140px] text-center">
            {headerLabel(currentDate, view)}
          </span>
          <button
            onClick={() => handleNavigate(1)}
            className="h-8 w-8 rounded-full flex items-center justify-center border border-gray-200 dark:border-white/15 text-gray-500 dark:text-slate-400 hover:border-[#44BCFF]/60 hover:text-[#44BCFF] transition"
          >
            <FiChevronRight size={15} />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1.5 rounded-full text-xs border border-gray-200 dark:border-white/15 text-gray-500 dark:text-slate-400 hover:border-[#44BCFF]/60 hover:text-[#44BCFF] transition"
          >
            Today
          </button>
        </div>
      </div>

      {/* ── Calendar body ── */}
      {view === "year" ? (
        <YearlyView currentDate={currentDate} onDateChange={setCurrentDate} />
      ) : (
        <div
          className="flex-1 overflow-hidden bg-white dark:bg-[#1D242A]"
          style={{ borderRadius: "26.53px" }}
        >
          <Calendar
            localizer={localizer}
            events={RBC_EVENTS}
            view={view as View}
            onView={(v) => setView(v as AppView)}
            date={currentDate}
            onNavigate={setCurrentDate}
            toolbar={false}
            style={{ height: "100%", padding: "16px" }}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.type === "virtual"
                  ? "rgba(68,188,255,0.12)"
                  : "rgba(251,146,60,0.12)",
                borderLeft: `4px solid ${event.type === "virtual" ? "#44BCFF" : "#fb923c"}`,
                borderTop: "none",
                borderRight: "none",
                borderBottom: "none",
                borderRadius: "6px",
                color: event.type === "virtual" ? "#44BCFF" : "#fb923c",
                fontSize: "12px",
                fontWeight: "600",
              },
            })}
            dayPropGetter={(date) => {
              const today = new Date();
              const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
              return isToday ? { className: "rbc-today" } : {};
            }}
            formats={{
              timeGutterFormat: (date, _culture, loc) =>
                loc!.format(date, "h aa", _culture),
              dayHeaderFormat: (date, _culture, loc) =>
                loc!.format(date, "EEE dd", _culture),
              dayRangeHeaderFormat: ({ start, end }, _culture, loc) =>
                `${loc!.format(start, "MMM d", _culture)} – ${loc!.format(end, "d", _culture)}`,
            }}
          />
        </div>
      )}
    </div>
  );
};
