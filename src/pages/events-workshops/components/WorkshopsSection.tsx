import { useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { PiUsers } from "react-icons/pi";

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
    daysLeft: "12 days ",
    instructor: "Dwoskey",
    instructorColor: "bg-pink-500",
    participants: "245+ ",
  },
  {
    id: 2,
    courseName: "Advance Java",
    title: "Core Java Syntax",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suscipit sapien convallis neque sagittis malesuada mi erat natoque malesuada.",
    members: "245+",
    daysLeft: "12 days ",
    instructor: "Dwoskey",
    instructorColor: "bg-purple-500",
    participants: "245+ ",
  },
  {
    id: 3,
    courseName: "Project Management",
    title: "Agile Approaches",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suscipit sapien convallis neque sagittis malesuada mi erat natoque malesuada.",
    members: "245+",
    daysLeft: "12 days ",
    instructor: "Dwoskey",
    instructorColor: "bg-orange-500",
    participants: "245+ ",
  },
];

export const WorkshopsSection = () => {
  const [selected, setSelected] = useState<Workshop | null>(null);

  return (
    <>
      <div>
        <h2 className="text-lg font-semibold text-[#0F161A] dark:text-white mb-5">
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
              <div className="flex items-center gap-2 border border-[#FF9B44] rounded-full px-3 py-3 self-start w-full justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M12 15H4C3.73478 15 3.48043 14.8946 3.29289 14.7071C3.10536 14.5196 3 14.2652 3 14V2C3 1.73478 3.10536 1.48043 3.29289 1.29289C3.48043 1.10536 3.73478 1 4 1H12C12.2652 1 12.5196 1.10536 12.7071 1.29289C12.8946 1.48043 13 1.73478 13 2V10.309L10.5 9.059L8 10.309V2H4V14H12V12H13V14C12.9996 14.2651 12.8941 14.5192 12.7067 14.7067C12.5192 14.8941 12.2651 14.9996 12 15ZM10.5 7.941L12 8.691V2H9V8.691L10.5 7.941Z"
                    fill="#FF9B44"
                  />
                </svg>
                <span className="text-[12px]  text-[#FF9B44] truncate">
                  {ws.courseName}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[18px] font-semibold text-[#0F161A] dark:text-white leading-snug">
                {ws.title}
              </h3>

              {/* Description */}
              <div className="flex gap-2">
                <HiOutlineInformationCircle
                  size={16}
                  className="shrink-0 mt-0.5 text-[#99A2A8BF] dark:text-white"
                />
                <p className="text-[12px] leading-relaxed text-[#99A2A8BF] dark:text-[#99A2A8]">
                  {ws.description}
                </p>
              </div>

              {/* Members + days */}
              <div className="grid grid-cols-2 items-center gap-4 text-[14px] text-gray-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <PiUsers
                    size={18}
                    className="text-[#0F161ABF] dark:text-white"
                  />
                  <span className="dark:text-white text-gray-500">{ws.members}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <FiClock
                    size={13}
                    className="text-[#0F161ABF] dark:text-white"
                  />
                  <span className="dark:text-white text-[#0F161ABF]">{ws.daysLeft} <span className="dark:text-[#99A2A8] text-[#0F161ABF]">remaining</span></span>
                </span>
              </div>

              {/* Divider */}
              <hr className="border-gray-100 dark:border-[#2D3D46]" />

              {/* Instructor row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-7 w-7 rounded-full items-center justify-center text-white text-[11px] font-bold ${ws.instructorColor}`}
                  >
                    {ws.instructor[0]}
                  </span>
                  <span className="text-[13px] text-gray-700 dark:text-white">
                    {ws.instructor}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PiUsers
                    size={18}
                    className="text-[#0F161ABF] dark:text-white"
                  />
                  <span className="text-[13px] text-[#0F161ABF] dark:text-white">
                    {ws.participants} <span className="dark:text-[#99A2A8] text-[#0F161ABF]">remaining</span>
                  </span>
                </div>
              </div>
               <hr className="border-gray-100 mb-2 dark:border-[#2D3D46]" />

              {/* Enroll button — opens modal */}
              <button
                type="button"
                onClick={() => setSelected(ws)}
                className="w-full py-3 rounded-full bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] transition"
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
