import { useState } from "react";
import { PiUsers } from "react-icons/pi";
import { FiClock } from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi";
import { EventModal } from "./EventModal";

interface EventItem {
  id: number;
  title: string;
  type: string;
  members: string;
  daysLeft: string;
  participants: string;
  participantColors: string[];
  imageBg: string;
}

const EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Motivational techniques that are necessary for you to improve your thinking",
    type: "Virtual Event",
    members: "245+",
    daysLeft: "12 days ",
    participants: "300+",
    participantColors: ["bg-pink-400", "bg-yellow-400", "bg-sky-400"],
    imageBg: "from-indigo-900 via-purple-900 to-pink-900",
  },
  {
    id: 2,
    title: "Motivational techniques that are necessary for you to improve your thinking",
    type: "Virtual Event",
    members: "245+",
    daysLeft: "12 days ",
    participants: "300+",
    participantColors: ["bg-orange-400", "bg-emerald-400", "bg-sky-400"],
    imageBg: "from-rose-900 via-red-800 to-orange-900",
  },
  {
    id: 3,
    title: "Motivational techniques that are necessary for you to improve your thinking",
    type: "Virtual Event",
    members: "245+",
    daysLeft: "12 days ",
    participants: "300+",
    participantColors: ["bg-violet-400", "bg-pink-400", "bg-cyan-400"],
    imageBg: "from-blue-900 via-indigo-900 to-violet-900",
  },
  {
    id: 4,
    title: "Motivational techniques that are necessary for you to improve your thinking",
    type: "Virtual Event",
    members: "245+",
    daysLeft: "12 days ",
    participants: "300+",
    participantColors: ["bg-pink-400", "bg-yellow-400", "bg-sky-400"],
    imageBg: "from-slate-900 via-gray-900 to-zinc-800",
  },
  {
    id: 5,
    title: "Motivational techniques that are necessary for you to improve your thinking",
    type: "Virtual Event",
    members: "245+",
    daysLeft: "12 days ",
    participants: "300+",
    participantColors: ["bg-teal-400", "bg-emerald-400", "bg-lime-400"],
    imageBg: "from-teal-900 via-cyan-900 to-sky-900",
  },
  {
    id: 6,
    title: "Motivational techniques that are necessary for you to improve your thinking",
    type: "Virtual Event",
    members: "245+",
    daysLeft: "12 days ",
    participants: "300+",
    participantColors: ["bg-amber-400", "bg-orange-400", "bg-red-400"],
    imageBg: "from-amber-900 via-yellow-900 to-orange-900",
  },
];

const MemberAvatars = ({ colors }: { colors: string[] }) => (
  <div className="flex -space-x-1.5">
    {colors.map((c, i) => (
      <span
        key={i}
        className={`inline-block h-5 w-5 rounded-full border-2 border-white dark:border-[#1D242A] ${c}`}
      />
    ))}
  </div>
);

export const EventsSection = () => {
  const [selected, setSelected] = useState<EventItem | null>(null);

  return (
    <>
      <div>
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EVENTS.map((ev) => (
            <div 
              key={ev.id}
              className="flex flex-col bg-white dark:bg-[#1D242A] overflow-hidden"
              style={{ borderRadius: "26.53px" }}
            >
              {/* Image area */}
              <div
                className={`relative aspect-[369/250.528] w-full bg-linear-to-br ${ev.imageBg} flex items-end p-4 overflow-hidden`}
              >
                {/* Calendar icon button */}
                <button
                  type="button"
                  className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 dark:bg-white flex items-center justify-center shadow-sm hover:opacity-90 transition"
                >
                  <HiOutlineCalendar size={18} className="text-[#0F161A]" />
                </button>

                {/* Badge + title + meta */}
                <div className="space-y-2 ">
                  <span className="inline-block text-[10px] font-semibold px-3 py-1.5 rounded-full bg-[#44BCFF]/10 text-[#44BCFF] border border-[#44BCFF]/40">
                    {ev.type}
                  </span>
                  <h3 className="lg:text-lg my-2.5 text-base font-semibold text-white leading-snug line-clamp-2">
                    {ev.title}
                  </h3>
                  <div className="flex items-center gap-4 xl:gap-20 text-[13px] text-white">
                    <span className="flex items-center gap-1">
                      <PiUsers size={18} />
                      {ev.members}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock size={18} />
                      {ev.daysLeft} <span className="dark:text-[#99A2A8] text-gray-400">remaining</span>
                    
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="flex items-center justify-between p-5 gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-gray-500 dark:text-white">
                    {ev.participants}
                  </span>
                  <MemberAvatars colors={ev.participantColors} />
                </div>
                {/* Opens modal */}
                <button
                  type="button"
                  onClick={() => setSelected(ev)}
                  className="px-6 py-3 rounded-full bg-[#44BCFF] text-white text-[12px] font-medium hover:bg-[#2eaef5] transition whitespace-nowrap"
                >
                  Join Virtual Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event modal portal */}
      {selected && (
        <EventModal event={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};
