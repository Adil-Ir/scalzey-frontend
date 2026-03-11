import { useEffect, useRef } from "react";
import type { ChannelMessage } from "../data";
import { formatDateLabel } from "../data";
import { PollBubble } from "./PollBubble";

interface ChannelMessageFeedProps {
  messages: ChannelMessage[];
  searchQuery: string;
  onVote?: (messageId: string, optionIndex: number) => void;
  onAddClick?: () => void;
}

const highlightHashtags = (text: string) => {
  const parts = text.split(/(#\w+)/g);
  return parts.map((part, i) =>
    part.startsWith("#") ? (
      <span key={i} className="font-semibold text-[#44BCFF]">{part}</span>
    ) : (
      part
    )
  );
};

function groupMessages(messages: ChannelMessage[]): { date: string; items: ChannelMessage[] }[] {
  const byDate: Record<string, ChannelMessage[]> = {};
  for (const m of messages) {
    if (!byDate[m.date]) byDate[m.date] = [];
    byDate[m.date].push(m);
  }
  return Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, items]) => ({ date, items }));
}

export const ChannelMessageFeed = ({
  messages,
  searchQuery,
  onVote,
  onAddClick,
}: ChannelMessageFeedProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filtered = searchQuery.trim()
    ? messages.filter((m) => {
        if (m.type === "poll") return m.poll?.question.toLowerCase().includes(searchQuery.toLowerCase());
        return m.text?.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : messages;

  const grouped = groupMessages(filtered);
  const seenDates = new Set<string>();

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-1 bg-[#F6F8F9] dark:bg-[#0F161A]">
      {grouped.map(({ date, items }) => (
        <div key={date}>
          {!seenDates.has(date) && (
            <>
              {seenDates.size > 0 && (
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-gray-200 dark:bg-[#2D3D46]" />
                  <span className="text-[11px] text-gray-500 dark:text-slate-500 font-medium">
                    {formatDateLabel(date)}
                  </span>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-[#2D3D46]" />
                </div>
              )}
              {seenDates.add(date)}
            </>
          )}

          {items.map((msg) => (
            <div key={msg.id} className="flex gap-3 mb-5">
              <span className={`relative h-8 w-8 rounded-full flex items-center justify-center text-white text-[13px] font-semibold ${msg.senderColor} inline-flex shrink-0`}>
                <span
                  className={`text-[9px]`}
                >
                  {msg.senderName[0]}
                </span>
                <span
                  className={`absolute bottom-0 right-0 z-10 h-3 w-3 rounded-full border-2 border-white dark:border-[#0F161A] bg-green-500 shadow-sm ${
                    msg.senderIsOnline === false ? "opacity-0" : ""
                  }`}
                  title={msg.senderIsOnline ? "Online" : "Offline"}
                />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[13px] font-semibold text-gray-900 dark:text-white">{msg.senderName}</span>
                  <span className="text-[11px] text-gray-500 dark:text-slate-500">{msg.time}</span>
                  {msg.senderName === "Annette Black" && (
                    <button
                      type="button"
                      onClick={onAddClick}
                      className="text-[11px] text-[#44BCFF] hover:underline"
                    >
                      +Add
                    </button>
                  )}
                </div>

                {msg.type === "text" && (
                  <div className="space-y-2">
                    {(msg.imageUrl || (msg.imageUrls && msg.imageUrls.length > 0)) && (
                      <div className="flex flex-wrap gap-1.5 max-w-full sm:max-w-[400px]">
                        {msg.imageUrls && msg.imageUrls.length > 0 ? (
                          msg.imageUrls.map((url, i) => (
                            <img
                              key={i}
                              src={url}
                              alt=""
                              className="max-h-64 rounded-lg object-cover border border-gray-200 dark:border-[#2D3D46]"
                            />
                          ))
                        ) : msg.imageUrl ? (
                          <img
                            src={msg.imageUrl}
                            alt=""
                            className="max-h-64 rounded-lg object-cover border border-gray-200 dark:border-[#2D3D46]"
                          />
                        ) : null}
                      </div>
                    )}
                    {msg.text && (
                      <div
                        className={`inline-block px-4 py-2.5 rounded-[12px] text-[13px] leading-relaxed max-w-[85%] sm:max-w-[75%] ${
                          msg.senderName === "Annette Black"
                            ? "bg-white text-[#0F161A] dark:bg-[#1D242A] dark:text-white"
                            : "bg-white text-[#0F161A] dark:bg-[#1D242A] dark:text-slate-200"
                        }`}
                      >
                        {msg.text.startsWith("http") ? (
                          <a
                            href={msg.text}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#44BCFF] hover:underline break-all"
                          >
                            {msg.text}
                          </a>
                        ) : (
                          highlightHashtags(msg.text)
                        )}
                      </div>
                    )}
                  </div>
                )}

                {msg.type === "poll" && msg.poll && (
                  <PollBubble message={msg} onVote={onVote} />
                )}
              </div>
            </div>
          ))}
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
};
