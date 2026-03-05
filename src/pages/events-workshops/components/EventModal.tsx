import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX, FiClock, FiCalendar } from "react-icons/fi";
import { BsPeopleFill } from "react-icons/bs";

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

interface EventModalProps {
  event: EventItem;
  onClose: () => void;
}

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

export const EventModal = ({ event: ev, onClose }: EventModalProps) => {
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-md bg-white dark:bg-[#1D242A] shadow-2xl overflow-hidden"
          style={{ borderRadius: "26.53px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 dark:border-white/10">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              Event
            </span>
            <button
              onClick={onClose}
              className="h-7 w-7 rounded-full flex items-center justify-center text-gray-400 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              <FiX size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 flex flex-col gap-4">
            {/* Virtual Event badge */}
            <span className="self-start text-[11px] font-semibold px-3 py-1 rounded-full border border-[#44BCFF]/50 text-[#44BCFF] bg-[#44BCFF]/10">
              {ev.type}
            </span>

            {/* Title */}
            <h2 className="text-[17px] font-bold text-gray-900 dark:text-white leading-snug">
              {ev.title}
            </h2>

            {/* Members + days */}
            <div className="flex items-center gap-6 text-[12px] text-gray-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <BsPeopleFill size={13} className="text-gray-400 dark:text-slate-500" />
                {ev.members}
              </span>
              <span className="flex items-center gap-1.5">
                <FiClock size={13} className="text-gray-400 dark:text-slate-500" />
                {ev.daysLeft}
              </span>
            </div>

            {/* Divider */}
            <hr className="border-gray-100 dark:border-white/10" />

            {/* Instructor + participants */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${ev.imageBg} flex items-center justify-center text-white text-[11px] font-bold shrink-0`}>
                  D
                </div>
                <span className="text-[13px] font-medium text-gray-700 dark:text-[#FFFFFFBF]">
                  Dwoskey
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BsPeopleFill size={13} className="text-gray-400 dark:text-slate-500" />
                <span className="text-[12px] text-gray-500 dark:text-slate-400">
                  {ev.participants} participants
                </span>
                <MemberAvatars colors={ev.participantColors} />
              </div>
            </div>
          </div>

          {/* Footer */}
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
              Join Virtual Event
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};
