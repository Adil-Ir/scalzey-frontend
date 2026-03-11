import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import type { Community } from "../data";

const getPortalRoot = () =>
  document.getElementById("dashboard-main") ?? document.body;

interface JoinModalProps {
  community: Community;
  onClose: () => void;
  onJoin: (community: Community) => void;
}

const MiniAvatars = ({ colors }: { colors: string[] }) => (
  <div className="flex -space-x-1.5">
    {colors.map((color, i) => (
      <span
        key={i}
        className={`inline-block h-6 w-6 rounded-full border-2 border-[#1D242A] ${color}`}
      />
    ))}
  </div>
);

export const JoinModal = ({ community, onClose, onJoin }: JoinModalProps) => {
  const content = (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop — only covers main content column */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal card */}
      <div
        className="relative z-10 w-full max-w-sm mx-4 bg-white dark:bg-[#1D242A] shadow-2xl"
        style={{ borderRadius: "26.53px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 h-7 w-7 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-white/20 transition"
        >
          <FiX size={14} />
        </button>

        {/* Body */}
        <div className="px-8 pt-10 pb-8 flex flex-col items-center text-center gap-4">
          {/* Private badge */}
          {community.isPrivate && (
            <span className="text-[11px] text-gray-400 dark:text-slate-500 border border-gray-200 dark:border-white/15 px-3 py-1 rounded-full">
              Private Community
            </span>
          )}

          {/* Community name */}
          <h2
            className="text-[22px] font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            {community.name}
          </h2>

          {/* Members */}
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-500 dark:text-slate-400">
              {community.members}
            </span>
            <MiniAvatars colors={community.avatarColors} />
          </div>

          {/* Description */}
          <p className="text-[13px] leading-relaxed text-gray-500 dark:text-[#FFFFFFBF] max-w-xs">
            {community.description}
          </p>

          {/* Divider */}
          <hr className="w-full border-gray-100 dark:border-white/10" />

          {/* Actions */}
          <div className="flex gap-3 w-full">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full border border-gray-200 dark:border-white/15 text-[13px] text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-white/5 transition"
            >
              Back to Communities
            </button>
            <button
              type="button"
              onClick={() => {
                onJoin(community);
                onClose();
              }}
              className="flex-1 py-2.5 rounded-full bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] transition"
            >
              Request Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const root = getPortalRoot();
  return createPortal(content, root);
};
