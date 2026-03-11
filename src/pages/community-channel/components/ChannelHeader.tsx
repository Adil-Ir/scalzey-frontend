import { FiSearch, FiMenu } from "react-icons/fi";
import type { CommunityChannelConfig } from "../data";

interface ChannelHeaderProps {
  config: CommunityChannelConfig;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onChannelsClick?: () => void;
}

export const ChannelHeader = ({
  config,
  searchQuery,
  onSearchChange,
  onChannelsClick,
}: ChannelHeaderProps) => (
  <div className="h-16 flex items-center px-4 md:px-6 gap-4 border-b border-gray-200 dark:border-[#2D3D46] shrink-0 bg-white dark:bg-[#0F161A]">
    {/* Left — community name */}
    <div className="flex items-center gap-2 shrink-0 min-w-0">
      <button
        type="button"
        onClick={onChannelsClick}
        className="md:hidden h-8 w-8 flex items-center justify-center rounded-lg text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/10 -ml-1 shrink-0"
        aria-label="Open channels"
      >
        <FiMenu size={20} />
      </button>
      <h1 className="text-[16px] md:text-[18px] font-semibold text-gray-900 dark:text-white truncate">{config.displayName}</h1>
    </div>

    {/* Center — search bar */}
    <div className="flex-1 flex justify-center min-w-0">
      <div className="flex items-center gap-2 rounded-[26.53px] bg-[#F6F8F9] dark:bg-[#1D242A] px-3 md:px-5 py-2.5 md:py-3 w-full max-w-full sm:max-w-[480px] border-0 min-w-0">
        <FiSearch size={14} className="text-gray-400 dark:text-slate-500 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search in channel"
          className="flex-1 min-w-0 bg-transparent text-[12px] text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none border-none"
        />
      </div>
    </div>

    {/* Right — user profile avatars with status */}
    <div className="flex -space-x-2 shrink-0">
      {config.avatarColors.map((c, i) => {
        const isOnline = config.avatarOnlineStatus?.[i] ?? i < 2;
        return (
          <span key={i} className="relative inline-flex">
            <span
              className={`inline-block h-8 w-8 rounded-full border-2 border-white dark:border-[#0F161A] ${c}`}
              title={isOnline ? "Online" : "Offline"}
            />
            <span
              className={`absolute bottom-0 right-0 z-10 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-[#0F161A] bg-green-500 shadow-sm ${
                !isOnline ? "opacity-0" : ""
              }`}
            />
          </span>
        );
      })}
    </div>
  </div>
);
