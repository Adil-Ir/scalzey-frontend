import { FiEdit3 } from "react-icons/fi";
import { HiOutlineStar } from "react-icons/hi";
import { FaHandPaper } from "react-icons/fa";
import { useUserProfile } from "../../../context/UserProfileContext";

interface ProfileHeaderProps {
  isPublicView: boolean;
  onPublicViewChange: (value: boolean) => void;
  onEditClick: () => void;
  progress: number;
  isOwnProfile: boolean;
}

export const ProfileHeader = ({
  isPublicView,
  onPublicViewChange,
  onEditClick,
  progress,
  isOwnProfile,
}: ProfileHeaderProps) => {
  const { profile } = useUserProfile();

  return (
    <div className="pb-4 md:pb-6 border-b border-gray-200 dark:border-[#2D3D46]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        {/* Left: Username + stars on one line, New Member below */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[18px] sm:text-[20px] font-semibold text-gray-900 dark:text-white truncate">
              {profile.name}
            </h1>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[26px] border border-[#2D3D46] bg-transparent text-white text-[11px] font-medium shrink-0">
              <HiOutlineStar size={12} className="text-amber-400" />
              254
            </span>
          </div>
          <div className="mt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[26px] border border-[#2D3D46] bg-transparent text-white text-[11px] font-medium">
              <FaHandPaper size={11} className="shrink-0 text-amber-400" />
              New Member
            </span>
          </div>
        </div>

        {/* Right: Public View, Edit, Progress */}
        {isOwnProfile && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 dark:border-[#2D3D46] bg-transparent shrink-0">
              <span className="text-[13px] text-gray-600 dark:text-slate-400 whitespace-nowrap">
                Public View
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={isPublicView}
                onClick={() => onPublicViewChange(!isPublicView)}
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                  isPublicView
                    ? "bg-[#44BCFF]"
                    : "bg-gray-300 dark:bg-[#2D3D46]"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    isPublicView ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={onEditClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-[#2D3D46] text-[13px] font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-white/5 transition shrink-0"
            >
              <FiEdit3 size={14} />
              Edit
            </button>

            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-gray-200 dark:text-[#2D3D46]"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#FF9B44"
                  strokeWidth="3"
                  strokeDasharray={`${progress}, 100`}
                  strokeLinecap="round"
                  className="transition-[stroke-dasharray] duration-300"
                />
              </svg>
              <span className="absolute text-[9px] font-semibold text-gray-700 dark:text-slate-200">
                {progress}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
