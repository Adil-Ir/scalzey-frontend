import type { Contact } from "../data";
import { Avatar } from "./ContactList";

interface ChatHeaderProps {
  contact: Contact;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const ChatHeader = ({ contact, searchQuery, onSearchChange }: ChatHeaderProps) => (
  <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-[#2D3D46] shrink-0 bg-white dark:bg-[#0F161A]">
    <div className="flex items-center gap-3">
      <Avatar contact={contact} />
      <div className="leading-tight">
        <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{contact.name}</p>
        <p className="text-[11px] text-gray-400 dark:text-slate-500">{contact.email}</p>
      </div>
    </div>
    <div className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-[#1D242A] px-4 py-2 w-56">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search in conversation"
        className="flex-1 bg-transparent text-[12px] text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none border-none"
      />
    </div>
  </div>
);
