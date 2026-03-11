import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CONTACTS, MOCK_MESSAGES, type ChatMessage } from "./data";
import { ContactList } from "./components/ContactList";
import { ChatHeader } from "./components/ChatHeader";
import { MessageFeed } from "./components/MessageFeed";
import { MessageInput } from "./components/MessageInput";

export const ChatPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [messagesByContact, setMessagesByContact] = useState<Record<string, ChatMessage[]>>(MOCK_MESSAGES);
  const [unreadByContact, setUnreadByContact] = useState<Record<string, number>>({
    "savannah-nguyen": 3,
    "jenny-wilson": 7,
    "guy-hawkins": 0,
  });

  const contact = slug && slug !== "chats"
    ? CONTACTS.find((c) => c.slug === slug) ?? CONTACTS[0]
    : CONTACTS[0];
  const messages = messagesByContact[contact.slug] ?? [];

  useEffect(() => {
    if (contact?.slug) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: mark as read when viewing
      setUnreadByContact((prev) => ({ ...prev, [contact.slug]: 0 }));
    }
  }, [contact?.slug]);

  const handleSend = (text: string, files?: File[]) => {
    const imageUrls = files
      ?.filter((f) => f.type.startsWith("image/"))
      .map((f) => URL.createObjectURL(f));
    const allUrls = imageUrls ?? [];
    const hasContent = text.trim() || allUrls.length > 0;
    if (!hasContent) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      text: text.trim() || undefined,
      imageUrl: allUrls[0],
      imageUrls: allUrls.length > 1 ? allUrls : undefined,
      senderId: "me",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toISOString().split("T")[0],
    };
    setMessagesByContact((prev) => ({
      ...prev,
      [contact.slug]: [...(prev[contact.slug] ?? []), newMsg],
    }));
  };

  return (
    <div
      className="flex -m-4 md:-m-6 xl:-m-10 overflow-hidden"
      style={{ height: "calc(100vh - 64px)" }}
    >
      {/* Contacts sidebar — hidden on mobile when viewing chat, full on mobile when no chat */}
      <div
        className={`${
          slug && slug !== "chats"
            ? "hidden md:flex"
            : "flex"
        } w-full md:w-[210px] lg:w-[270px] shrink-0 flex-col border-r border-gray-200 dark:border-[#2D3D46] bg-white dark:bg-[#0F161A]`}
      >
        <div className="px-4 py-4">
          <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white">Chat</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ContactList
            contacts={CONTACTS}
            unreadByContact={unreadByContact}
          />
        </div>
      </div>

      {/* Main chat area */}
      <div
        className={`${
          slug && slug !== "chats"
            ? "flex"
            : "hidden md:flex"
        } flex-1 flex flex-col min-w-0 bg-[#F6F8F9] dark:bg-[#0F161A]`}
      >
        <ChatHeader
          contact={contact}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <MessageFeed
          messages={messages}
          searchQuery={searchQuery}
          contacts={CONTACTS}
        />
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
};
