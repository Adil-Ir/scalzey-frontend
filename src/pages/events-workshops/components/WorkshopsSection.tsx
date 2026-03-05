import { useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlineMenuBook } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { WorkshopModal } from "./WorkshopModal";

interface Workshop {
  id: number;
  courseName: string;
  title: string;
  description: string;
  members: string;
  daysLeft: string;
  instructor: string;
  instructorColor: string;
  participants: string;
}

const WORKSHOPS: Workshop[] = [
  {
    id: 1,
    courseName: "Advances User Experience",
    title: "Ux Best Practices",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suscipit sapien convallis neque sagittis malesuada mi erat natoque malesuada.",
    members: "245+",
    daysLeft: "12 days remaining",
    instructor: "Dwoskey",
    instructorColor: "bg-pink-500",
    participants: "245+ participants",
  },
  {
    id: 2,
    courseName: "Advance Java",
    title: "Core Java Syntax",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suscipit sapien convallis neque sagittis malesuada mi erat natoque malesuada.",
    members: "245+",
    daysLeft: "12 days remaining",
    instructor: "Dwoskey",
    instructorColor: "bg-purple-500",
    participants: "245+ participants",
  },
  {
    id: 3,
    courseName: "Project Management",
    title: "Agile Approaches",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suscipit sapien convallis neque sagittis malesuada mi erat natoque malesuada.",
    members: "245+",
    daysLeft: "12 days remaining",
    instructor: "Dwoskey",
    instructorColor: "bg-orange-500",
    participants: "245+ participants",
  },
];

export const WorkshopsSection = () => {
  const [selected, setSelected] = useState<Workshop | null>(null);

  return (
    <>
      <div>
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Workshops
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WORKSHOPS.map((ws) => (
            <div
              key={ws.id}
              className="flex flex-col gap-4 bg-white dark:bg-[#1D242A]"
              style={{ borderRadius: "26.53px", padding: "22px" }}
            >
              {/* Course name pill */}
              <div className="flex items-center gap-2 border border-orange-400/60 rounded-full px-3 py-1.5 self-start w-full justify-center">
                <MdOutlineMenuBook size={14} className="text-orange-400 shrink-0" />
                <span className="text-[12px] font-medium text-orange-400 truncate">
                  {ws.courseName}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[17px] font-bold text-gray-900 dark:text-white leading-snug">
                {ws.title}
              </h3>

              {/* Description */}
              <div className="flex gap-2">
                <HiOutlineInformationCircle
                  size={16}
                  className="shrink-0 mt-0.5 text-gray-400 dark:text-slate-500"
                />
                <p className="text-[12px] leading-relaxed text-gray-500 dark:text-[#FFFFFFBF]">
                  {ws.description}
                </p>
              </div>

              {/* Members + days */}
              <div className="flex items-center gap-4 text-[12px] text-gray-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <BsPeopleFill size={13} className="text-gray-400 dark:text-slate-500" />
                  {ws.members}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiClock size={13} className="text-gray-400 dark:text-slate-500" />
                  {ws.daysLeft}
                </span>
              </div>

              {/* Divider */}
              <hr className="border-gray-100 dark:border-white/10" />

              {/* Instructor row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-7 w-7 rounded-full items-center justify-center text-white text-[11px] font-bold ${ws.instructorColor}`}
                  >
                    {ws.instructor[0]}
                  </span>
                  <span className="text-[13px] text-gray-700 dark:text-[#FFFFFFBF]">
                    {ws.instructor}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BsPeopleFill size={13} className="text-gray-400 dark:text-slate-500" />
                  <span className="text-[12px] text-gray-500 dark:text-slate-400">
                    {ws.participants}
                  </span>
                </div>
              </div>

              {/* Enroll button — opens modal */}
              <button
                type="button"
                onClick={() => setSelected(ws)}
                className="w-full py-2.5 rounded-full bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] transition"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal portal */}
      {selected && (
        <WorkshopModal workshop={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};
