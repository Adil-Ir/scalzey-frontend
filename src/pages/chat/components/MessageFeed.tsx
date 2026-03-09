import type { ChatMessage } from "../data";

interface MessageFeedProps {
  messages: ChatMessage[];
  contactId?: string;
  searchQuery: string;
}

export const MessageFeed = ({ messages, searchQuery }: MessageFeedProps) => {
  const filtered = searchQuery.trim()
    ? messages.filter((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white dark:bg-[#0F161A]">
      {filtered.map((m) => (
        <div
          key={m.id}
          className={`flex ${m.senderId === "me" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-[13px] ${
              m.senderId === "me"
                ? "bg-[#44BCFF] text-white rounded-br-md"
                : "bg-gray-100 dark:bg-[#1D242A] text-gray-800 dark:text-slate-200 rounded-bl-md border border-gray-200 dark:border-[#2D3D46]"
            }`}
          >
            {m.text.startsWith("http") ? (
              <a
                href={m.text}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#44BCFF] hover:underline break-all"
              >
                {m.text}
              </a>
            ) : (
              m.text
            )}
          </div>
        </div>
      ))}
      {filtered.length === 0 && searchQuery && (
        <p className="text-center text-sm text-gray-500 dark:text-slate-500 py-8">
          No messages found for &quot;{searchQuery}&quot;
        </p>
      )}
    </div>
  );
};
