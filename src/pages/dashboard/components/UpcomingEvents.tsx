import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineInformationCircle } from "react-icons/hi";

interface EventItem {
  id: number;
  day: string;
  month: string;
  year: string;
  dayName: string;
  label: string;
  course: string;
}

const EVENTS: EventItem[] = [
  {
    id: 1,
    day: "07",
    month: "February 2026",
    year: "2026",
    dayName: "Monday",
    label: "Today",
    course: "Advances User Experience",
  },
  {
    id: 2,
    day: "09",
    month: "February 2026",
    year: "2026",
    dayName: "Monday",
    label: "In 2 days",
    course: "Advances User Experience",
  },
  {
    id: 3,
    day: "14",
    month: "February 2026",
    year: "2026",
    dayName: "Monday",
    label: "Next Week",
    course: "Advances User Experience",
  },
];

export const UpcomingEvents = () => {
  return (
    <div
      className="bg-white dark:bg-[#1D242A] h-full flex flex-col"
      style={{ borderRadius: "26.53px", padding: "24px" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <HiOutlineInformationCircle size={18} className="text-gray-600 dark:text-white shrink-0" />
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Upcoming events &amp; Workshops
        </h3>
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-slate-500 mb-3">
        Events
      </p>

      <div className="flex flex-col gap-3 flex-1">
        {EVENTS.map((ev) => (
          <div
            key={ev.id}
            className="flex items-center gap-3 rounded-2xl bg-[#2D3D46] px-3 py-2.5"
          >
            {/* Day number */}
            <span className="text-2xl font-bold text-white w-9 shrink-0">
              {ev.day}
            </span>

            {/* Date info */}
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-white/60 leading-tight">
                {ev.month}
              </p>
              <p className="text-[11px] font-medium text-white/80">
                {ev.dayName}
              </p>
              <p className="text-[11px] text-white/60">{ev.label}</p>
            </div>

            {/* Course icon + name */}
            <div className="flex items-center gap-1.5 shrink-0">
              <HiOutlineInformationCircle size={13} className="text-white/60" />
              <span className="text-[11px] text-white max-w-[90px] truncate">
                {ev.course}
              </span>
            </div>

            {/* Arrow */}
            <button
              type="button"
              className="shrink-0 h-6 w-6 rounded-full flex items-center justify-center border border-white/30 text-white hover:opacity-80 transition"
            >
              <FiArrowUpRight size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
