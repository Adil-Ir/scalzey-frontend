import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import type { View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { YearlyView } from "./components/YearlyView";
import { DailyView } from "./components/DailyView";
import { type CalendarEvent, toRbcEvent } from "./data";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

type AppView = "day" | "week" | "month" | "year";

function CalendarEventComponent({ event, title }: { event: { start?: Date }; title?: string }) {
  const timeStr = event?.start ? format(event.start, "hh:mm a") : "";
  return (
    <div className="flex flex-col leading-tight">
      <span className="font-semibold truncate">{title}</span>
      {timeStr && <span className="text-[11px] opacity-90">{timeStr}</span>}
    </div>
  );
}

const VIEW_TABS: { key: AppView; label: string }[] = [
  { key: "day", label: "Daily" },
  { key: "week", label: "Weekly" },
  { key: "month", label: "Monthly" },
  { key: "year", label: "Yearly" },
];

export const CalendarPage = () => {
  const [view, setView] = useState<AppView>("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEvents([]);
  }, [currentDate, view]);

  const rbcEvents = events.map(toRbcEvent);

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-120px)]">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-base font-semibold text-gray-900 dark:text-white">Calendar</span>
        <div className="flex items-center gap-2">
          {VIEW_TABS.map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
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
        <div className="flex-1" />
      </div>

      {view === "year" ? (
        <YearlyView currentDate={currentDate} onDateChange={setCurrentDate} />
      ) : view === "day" ? (
        <div className="flex-1 min-h-0 flex flex-col">
          <DailyView events={events} currentDate={currentDate} onDateChange={setCurrentDate} />
        </div>
      ) : (
        <div className="flex-1 overflow-hidden" style={{ borderRadius: "26.53px" }}>
          <Calendar
            localizer={localizer}
            events={rbcEvents}
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
            components={{ event: CalendarEventComponent }}
            formats={{
              timeGutterFormat: (date, _culture, loc) => loc!.format(date, "h aa", _culture),
              dayFormat: (date) => format(date, "EEE"),
              dayHeaderFormat: (date) => format(date, "EEE"),
              dayRangeHeaderFormat: ({ start, end }, _culture, loc) =>
                `${loc!.format(start, "MMM d", _culture)} – ${loc!.format(end, "d", _culture)}`,
            }}
          />
        </div>
      )}
    </div>
  );
};
