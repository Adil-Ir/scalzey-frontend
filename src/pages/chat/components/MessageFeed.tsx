import { FaHandPaper } from "react-icons/fa";
import type { ChatMessage, Contact } from "../data";
import { formatDateLabel } from "../data";
import { Avatar } from "./ContactList";

interface MessageFeedProps {
  messages: ChatMessage[];
  contactId?: string;
  searchQuery: string;
  contacts: Contact[];
}

export const MessageFeed = ({ messages, searchQuery, contacts }: MessageFeedProps) => {
  const filtered = searchQuery.trim()
    ? messages.filter((m) => m.text?.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  const getSenderContact = (senderId: string) =>
    contacts.find((c) => c.id === senderId);

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4 bg-[#F6F8F9] dark:bg-[#0F161A]">
      {filtered.map((m) => {
        const senderContact = m.senderId !== "me" ? getSenderContact(m.senderId) : null;
        return (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.senderId === "me" ? "justify-end" : "justify-start"}`}
          >
            {m.senderId !== "me" && senderContact && (
              <Avatar contact={senderContact} showStatus />
            )}
            <div className={`max-w-[85%] sm:max-w-[75%] space-y-1.5 ${m.senderId === "me" ? "order-first" : ""}`}>
              {m.senderId !== "me" && senderContact && (
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[11px]" style={{ color: "#868E96" }}>
                    {m.time}
                  </span>
                  {m.date && (
                    <span className="text-[11px]" style={{ color: "#868E96" }}>
                      {formatDateLabel(m.date)}
                    </span>
                  )}
                  <span
                    className="inline-flex items-center gap-1"
                    title={senderContact.isFriend ? "Friend" : "Not a friend"}
                  >
                    <FaHandPaper size={12} className="shrink-0 text-amber-600" />
                    <span className="text-[10px]" style={{ color: "#868E96" }}>
                      {senderContact.isFriend ? "Friend" : "Not a friend"}
                    </span>
                  </span>
                </div>
              )}
              {(m.imageUrl || (m.imageUrls && m.imageUrls.length > 0)) && (
                <div className="flex flex-wrap gap-1.5">
                  {m.imageUrls && m.imageUrls.length > 0 ? (
                    m.imageUrls.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt=""
                        className="max-h-64 rounded-lg object-cover border border-gray-200 dark:border-[#2D3D46]"
                      />
                    ))
                  ) : m.imageUrl ? (
                    <img
                      src={m.imageUrl}
                      alt=""
                      className="max-h-64 rounded-lg object-cover border border-gray-200 dark:border-[#2D3D46]"
                    />
                  ) : null}
                </div>
              )}
              {m.text && (
                <div
                  className={`inline-block text-[13px] px-4 py-2 rounded-[12px] ${
                    m.senderId === "me"
                      ? "bg-white text-[#0F161A] dark:bg-[#2C5A79] dark:text-white"
                      : "bg-white text-[#0F161A] dark:bg-[#1D242A] dark:text-slate-200"
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
              )}
            </div>
            {m.senderId === "me" && (
              <span className="self-end text-[11px]" style={{ color: "#868E96" }}>
                {m.time}
              </span>
            )}
          </div>
        );
      })}
      {filtered.length === 0 && searchQuery && (
        <p className="text-center text-sm text-gray-500 dark:text-slate-500 py-8">
          No messages found for &quot;{searchQuery}&quot;
        </p>
      )}
    </div>
  );
};
