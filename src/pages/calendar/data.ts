export interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  startHour: number;
  startMin: number;
  durationMin: number;
  borderColor: string;
  bgColor: string;
  textColor: string;
}

// Today = March 5, 2026 (Thursday)
export const CALENDAR_EVENTS: CalendarEvent[] = [
  // This week (Mar 2–8)
  {
    id: 1, title: "Virtual event",
    date: new Date(2026, 2, 5), startHour: 9, startMin: 30, durationMin: 60,
    borderColor: "border-[#44BCFF]", bgColor: "bg-[#44BCFF]/10", textColor: "text-[#44BCFF]",
  },
  {
    id: 2, title: "Workshop",
    date: new Date(2026, 2, 5), startHour: 14, startMin: 0, durationMin: 90,
    borderColor: "border-orange-400", bgColor: "bg-orange-400/10", textColor: "text-orange-400",
  },
  {
    id: 3, title: "Virtual event",
    date: new Date(2026, 2, 4), startHour: 11, startMin: 0, durationMin: 60,
    borderColor: "border-[#44BCFF]", bgColor: "bg-[#44BCFF]/10", textColor: "text-[#44BCFF]",
  },
  // Monthly events (Mar 2026)
  {
    id: 4,     title: "Virtual event",
    date: new Date(2026, 2, 1), startHour: 10, startMin: 0, durationMin: 60,
    borderColor: "border-[#44BCFF]", bgColor: "bg-[#44BCFF]/10", textColor: "text-[#44BCFF]",
  },
  {
    id: 5,     title: "Virtual event",
    date: new Date(2026, 2, 6), startHour: 10, startMin: 0, durationMin: 60,
    borderColor: "border-[#44BCFF]", bgColor: "bg-[#44BCFF]/10", textColor: "text-[#44BCFF]",
  },
  {
    id: 6, title: "Workshop",
    date: new Date(2026, 2, 6), startHour: 15, startMin: 0, durationMin: 60,
    borderColor: "border-orange-400", bgColor: "bg-orange-400/10", textColor: "text-orange-400",
  },
  {
    id: 7,     title: "Virtual event",
    date: new Date(2026, 2, 11), startHour: 10, startMin: 0, durationMin: 60,
    borderColor: "border-[#44BCFF]", bgColor: "bg-[#44BCFF]/10", textColor: "text-[#44BCFF]",
  },
  {
    id: 8, title: "Workshop",
    date: new Date(2026, 2, 11), startHour: 15, startMin: 0, durationMin: 60,
    borderColor: "border-orange-400", bgColor: "bg-orange-400/10", textColor: "text-orange-400",
  },
  {
    id: 9,     title: "Virtual event",
    date: new Date(2026, 2, 19), startHour: 10, startMin: 0, durationMin: 60,
    borderColor: "border-[#44BCFF]", bgColor: "bg-[#44BCFF]/10", textColor: "text-[#44BCFF]",
  },
  {
    id: 10, title: "Workshop",
    date: new Date(2026, 2, 19), startHour: 15, startMin: 0, durationMin: 60,
    borderColor: "border-orange-400", bgColor: "bg-orange-400/10", textColor: "text-orange-400",
  },
];

export const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export const DAY_NAMES_SHORT = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
export const DAY_NAMES_FULL  = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export const HOURS = Array.from({ length: 23 }, (_, i) => i + 1); // 1–23

export function formatHourLabel(h: number): string {
  if (h < 12) return `${h} AM`;
  if (h === 12) return "12 PM";
  return `${h - 12} PM`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

/** Returns Monday of the week containing `date` */
export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
