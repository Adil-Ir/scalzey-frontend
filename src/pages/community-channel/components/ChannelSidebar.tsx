import type { CommunityChannelConfig } from "../data";

interface ChannelSidebarProps {
  config: CommunityChannelConfig;
  selectedChannelId: string;
  onSelectChannel: (id: string) => void;
}

export const ChannelSidebar = ({
  config,
  selectedChannelId,
  onSelectChannel,
}: ChannelSidebarProps) => (
  <div className="flex flex-col h-full">
    <div className="px-4 py-4 shrink-0">
      <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white">Channels</h2>
    </div>
    <div className="flex-1 overflow-y-auto py-4">
      {config.sections.map((section) => (
        <div key={section.heading} className="mb-6">
          <h3 className="px-4 text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-slate-500 mb-2">
            {section.heading}
          </h3>
          <div className="space-y-0.5">
            {section.channels.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => onSelectChannel(ch.id)}
                className={`w-full text-left px-4 py-2 text-[13px] transition ${
                  selectedChannelId === ch.id
                    ? "bg-[#44BCFF]/15 text-[#44BCFF] font-medium"
                    : "text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                {ch.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
