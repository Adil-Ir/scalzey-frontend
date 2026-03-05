import { useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { FiClock, FiX } from "react-icons/fi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { MdOutlineMenuBook } from "react-icons/md";

export interface Workshop {
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

const EnrollModal = ({
  workshop,
  onClose,
}: {
  workshop: Workshop;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div
      className="relative w-full max-w-md bg-white dark:bg-[#1D242A] p-8 shadow-2xl"
      style={{ borderRadius: "26.53px" }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition"
      >
        <FiX size={20} />
      </button>

      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
        Enroll in Workshop
      </h2>
      <p className="text-[13px] text-gray-500 dark:text-slate-400 mb-6">
        You are about to enroll in{" "}
        <span className="font-semibold text-gray-700 dark:text-white">
          {workshop.title}
        </span>
        .
      </p>

      <div className="flex items-center gap-2 mb-6 text-[12px] text-gray-500 dark:text-slate-400">
        <BsPeopleFill size={13} />
        <span>{workshop.participants} participants</span>
        <span className="mx-1">·</span>
        <FiClock size={13} />
        <span>{workshop.daysLeft}</span>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 rounded-full border border-gray-200 dark:border-white/20 text-[13px] text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-white/5 transition"
        >
          Cancel
        </button>
        <button
          type="button"
          className="flex-1 py-2.5 rounded-full bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] transition"
        >
          Confirm Enroll
        </button>
      </div>
    </div>
  </div>
);

export const WorkshopCard = ({ workshop }: { workshop: Workshop }) => {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <div
        className="flex flex-col gap-4 bg-white dark:bg-[#1D242A]"
        style={{ borderRadius: "26.53px", padding: "22px" }}
      >
        {/* Course name pill */}
        <div className="flex items-center gap-2 border border-orange-400/60 rounded-full px-3 py-1.5 self-start w-full justify-center">
          <MdOutlineMenuBook size={14} className="text-orange-400 shrink-0" />
          <span className="text-[12px] font-medium text-orange-400 truncate">
            {workshop.courseName}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[17px] font-bold text-gray-900 dark:text-white leading-snug">
          {workshop.title}
        </h3>

        {/* Description */}
        <div className="flex gap-2">
          <HiOutlineInformationCircle
            size={16}
            className="shrink-0 mt-0.5 text-gray-400 dark:text-slate-500"
          />
          <p className="text-[12px] leading-relaxed text-gray-500 dark:text-[#FFFFFFBF]">
            {workshop.description}
          </p>
        </div>

        {/* Members + days */}
        <div className="flex items-center gap-4 text-[12px] text-gray-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <BsPeopleFill size={13} className="text-gray-400 dark:text-slate-500" />
            {workshop.members}
          </span>
          <span className="flex items-center gap-1.5">
            <FiClock size={13} className="text-gray-400 dark:text-slate-500" />
            {workshop.daysLeft}
          </span>
        </div>

        {/* Divider */}
        <hr className="border-gray-100 dark:border-white/10" />

        {/* Instructor row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex h-7 w-7 rounded-full items-center justify-center text-white text-[11px] font-bold ${workshop.instructorColor}`}
            >
              {workshop.instructor[0]}
            </span>
            <span className="text-[13px] text-gray-700 dark:text-[#FFFFFFBF]">
              {workshop.instructor}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BsPeopleFill size={13} className="text-gray-400 dark:text-slate-500" />
            <span className="text-[12px] text-gray-500 dark:text-slate-400">
              {workshop.participants}
            </span>
          </div>
        </div>

        {/* Enroll button */}
        <button
          type="button"
          onClick={() => setSelected(true)}
          className="w-full py-2.5 rounded-full bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] transition"
        >
          Enroll Now
        </button>
      </div>

      {selected && (
        <EnrollModal workshop={workshop} onClose={() => setSelected(false)} />
      )}
    </>
  );
};
