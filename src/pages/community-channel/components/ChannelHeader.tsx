import type { CommunityChannelConfig } from "../data";

interface ChannelHeaderProps {
  config: CommunityChannelConfig;
}

export const ChannelHeader = ({ config }: ChannelHeaderProps) => (
  <div className="h-16 flex items-center justify-between px-6 shrink-0 bg-white dark:bg-[#0F161A]">
    <h1 className="text-[18px] font-semibold text-gray-900 dark:text-white">{config.displayName}</h1>
    <div className="flex -space-x-2">
      {config.avatarColors.map((c, i) => (
        <span
          key={i}
          className={`inline-block h-8 w-8 rounded-full border-2 border-white dark:border-[#0F161A] ${c}`}
        />
      ))}
    </div>
  </div>
);
