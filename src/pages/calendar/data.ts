/** Calendar event — matches API shape. Use toRbcEvent() for react-big-calendar. */
export interface CalendarEvent {
  id: number | string;
  title: string;
  date: Date;
  startHour: number;
  startMin: number;
  durationMin: number;
  type?: "virtual" | "workshop";
}

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const DAY_NAMES_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const HOURS = Array.from({ length: 23 }, (_, i) => i + 1);

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

/** Day label for header. Replace with API for holidays/special days. */
export function getDayLabel(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

export function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/** Convert API/CalendarEvent to react-big-calendar format */
export function toRbcEvent(ev: CalendarEvent) {
  const d = ev.date;
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), ev.startHour, ev.startMin);
  const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), ev.startHour, ev.startMin + ev.durationMin);
  const type = ev.type ?? (ev.title.toLowerCase().includes("workshop") ? "workshop" : "virtual");
  return {
    id: ev.id,
    title: ev.title,
    start,
    end,
    type,
  };
}
