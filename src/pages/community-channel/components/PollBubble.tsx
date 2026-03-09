import type { ChannelMessage } from "../data";

interface PollBubbleProps {
  message: ChannelMessage;
  onVote?: (messageId: string, optionIndex: number) => void;
}

export const PollBubble = ({ message, onVote }: PollBubbleProps) => {
  const poll = message.poll!;

  return (
    <div
      className="flex flex-col gap-4 rounded-2xl px-5 py-4 max-w-md bg-gray-100 dark:bg-[rgba(45,61,70,0.5)] border border-gray-200 dark:border-[#2D3D46]"
    >
      <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{poll.question}</p>
      <div className="flex flex-col gap-3">
        {poll.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onVote?.(message.id, i)}
            className="w-full flex items-center gap-3"
          >
            <span className="text-[13px] font-semibold text-gray-900 dark:text-white shrink-0 w-10">
              {opt.percent}%
            </span>
            <div
              className="flex-1 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden"
              style={{ height: "30px" }}
            >
              <div
                className="h-full rounded-full bg-[#44BCFF] transition-all"
                style={{ width: `${opt.percent}%` }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
