import type { ChannelMessage } from "../data";

interface PollBubbleProps {
  message: ChannelMessage;
  onVote?: (messageId: string, optionIndex: number) => void;
}

export const PollBubble = ({ message, onVote }: PollBubbleProps) => {
  const poll = message.poll!;

  return (
    <div
      className="flex flex-col gap-4 rounded-2xl px-5 py-4 max-w-md bg-white dark:bg-[#1D242A]"
    >
      <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{poll.question}</p>
      <div className="flex flex-col gap-3 border dark:border-[#2D3D46] p-4 rounded-xl">
        {poll.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onVote?.(message.id, i)}
            className="w-full text-left"
          >
            <div
              className="relative w-full rounded-xl overflow-hidden bg-gray-200 dark:bg-[#1D242A]"
              style={{ height: "40px" }}
            >
              <div
                className="absolute inset-0 flex items-center justify-between px-3 z-10"
              >
                <span className="text-[13px] font-medium text-gray-900 dark:text-white truncate pr-2">
                  {opt.label}
                </span>
                <span className="text-[13px] font-semibold text-gray-900 dark:text-white shrink-0">
                  {opt.percent}%
                </span>
              </div>
              <div
                className="absolute inset-y-0 left-0 rounded-xl bg-[#44BCFF] transition-all"
                style={{ width: `${opt.percent}%` }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
