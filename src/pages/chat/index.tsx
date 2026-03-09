import { useState } from "react";
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

  const contact = slug && slug !== "chats"
    ? CONTACTS.find((c) => c.slug === slug) ?? CONTACTS[0]
    : CONTACTS[0];
  const messages = messagesByContact[contact.slug] ?? [];

  const handleSend = (text: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      text,
      senderId: "me",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessagesByContact((prev) => ({
      ...prev,
      [contact.slug]: [...(prev[contact.slug] ?? []), newMsg],
    }));
  };

  const handleAttachFiles = (files: File[]) => {
    if (files.length === 0) return;
    handleSend(`📎 ${files.map((f) => f.name).join(", ")}`);
  };

  return (
    <div
      className="flex -m-4 md:-m-6 xl:-m-10 overflow-hidden"
      style={{ height: "calc(100vh - 64px)" }}
    >
      {/* Contacts sidebar — wider, no border under heading */}
      <div className="w-[320px] shrink-0 flex flex-col border-r border-gray-200 dark:border-[#2D3D46] bg-white dark:bg-[#0F161A]">
        <div className="px-4 py-4">
          <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white">Chat</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ContactList contacts={CONTACTS} />
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0F161A]">
        <ChatHeader
          contact={contact}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <MessageFeed
          messages={messages}
          searchQuery={searchQuery}
        />
        <MessageInput onSend={handleSend} onAttachFiles={handleAttachFiles} />
      </div>
    </div>
  );
};
