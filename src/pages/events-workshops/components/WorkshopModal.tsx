import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX, FiClock, FiCalendar } from "react-icons/fi";
import { BsPeopleFill } from "react-icons/bs";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { MdOutlineMenuBook } from "react-icons/md";

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

interface WorkshopModalProps {
  workshop: Workshop;
  onClose: () => void;
}

export const WorkshopModal = ({ workshop: ws, onClose }: WorkshopModalProps) => {
  /* close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <>
      {/* Backdrop — covers full viewport but sits BELOW the sidebar */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-md bg-white dark:bg-[#1D242A] shadow-2xl"
          style={{ borderRadius: "26.53px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center gap-2">
              <MdOutlineMenuBook size={16} className="text-gray-400 dark:text-slate-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Workshop
              </span>
            </div>
            <button
              onClick={onClose}
              className="h-7 w-7 rounded-full flex items-center justify-center text-gray-400 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              <FiX size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 flex flex-col gap-4">
            {/* Title */}
            <h2 className="text-[18px] font-bold text-gray-900 dark:text-white leading-snug">
              {ws.title}
            </h2>

            {/* Description */}
            <div className="flex gap-2">
              <HiOutlineInformationCircle
                size={16}
                className="shrink-0 mt-0.5 text-gray-400 dark:text-slate-500"
              />
              <p className="text-[13px] leading-relaxed text-gray-500 dark:text-[#FFFFFFBF]">
                {ws.description}
              </p>
            </div>

            {/* Members + days */}
            <div className="flex items-center gap-6 text-[12px] text-gray-500 dark:text-slate-400">
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
                  className={`inline-flex h-8 w-8 rounded-full items-center justify-center text-white text-[12px] font-bold ${ws.instructorColor}`}
                >
                  {ws.instructor[0]}
                </span>
                <span className="text-[13px] font-medium text-gray-700 dark:text-[#FFFFFFBF]">
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
          </div>

          {/* Footer buttons */}
          <div className="flex items-center gap-3 px-6 pb-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-gray-200 dark:border-white/15 text-gray-600 dark:text-slate-300 text-[13px] font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition"
            >
              <FiCalendar size={14} />
              Add to calendar
            </button>
            <button
              type="button"
              className="flex-1 py-2.5 rounded-full bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] transition"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};
