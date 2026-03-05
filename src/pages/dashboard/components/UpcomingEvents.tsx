import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineInformationCircle } from "react-icons/hi";
const PinIcon = () => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 14H1C0.734784 14 0.48043 13.8946 0.292893 13.7071C0.105357 13.5196 0 13.2652 0 13V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H9C9.26522 0 9.51957 0.105357 9.70711 0.292893C9.89464 0.48043 10 0.734784 10 1V9.309L7.5 8.059L5 9.309V1H1V13H9V11H10V13C9.9996 13.2651 9.89412 13.5192 9.70667 13.7067C9.51922 13.8941 9.26509 13.9996 9 14ZM7.5 6.941L9 7.691V1H6V7.691L7.5 6.941Z"
      fill="#FF9B44"
    />
  </svg>
);

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
      className="bg-white dark:bg-[#1D242A] h-full flex flex-col rounded-[26px] p-6"
     
    >
      {/* Header */}
      <div className="flex gap-3 mb-5 ">
       <HiOutlineInformationCircle className="shrink-0 " size={24} />
        <h3 className="xl:text-lg text-base text-[#0F161A] leading-tight dark:text-white">
          Upcoming events &amp; Workshops Events
        </h3>
      </div>

  

      <div className="flex flex-col gap-3 flex-1">
        {EVENTS.map((ev) => (
          <div
            key={ev.id}
            className="grid grid-cols-2 gap-5 rounded-2xl dark:bg-[#2D3D46] bg-[#44BCFF14] px-3 py-2.5"
          >
            {/* Day number */}
           <div className="flex items-center gap-3 border-r border-gray-600">
             <span className="xl:text-[31px] text-2xl  text-[#0F161A]  dark:text-white w-9 shrink-0">
              {ev.day}
            </span>

            {/* Date info */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-[#99A2A8] leading-tight">
                {ev.month}
              </p>
              <p className="text-[10px] font-medium text-[#99A2A8]">
                {ev.dayName}
              </p>
              <p className="text-[10px] text-[#44BCFF]">{ev.label}</p>
            </div>
           </div>

          <div className="flex gap-3 ">
              {/* Course icon + name */}
            <div className="flex items-center gap-2 shrink-0">
              <PinIcon  />
              <span className="text-[9px] dak:text-white text-[#0F161A] max-w-22.5 ">
                {ev.course}
              </span>
            </div>

            {/* Arrow */}
            <button
              type="button"
              className="shrink-0  dark:text-white text-[#0F161A] "
            >
              <FiArrowUpRight size={23} />
            </button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};
