import { FiSearch, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import type { Contact } from "../data";
import { Avatar } from "./ContactList";

interface ChatHeaderProps {
  contact: Contact;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const ChatHeader = ({ contact, searchQuery, onSearchChange }: ChatHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="h-16 flex items-center px-4 md:px-6 gap-2 md:gap-4 border-b border-gray-200 dark:border-[#2D3D46] shrink-0 bg-white dark:bg-[#0F161A]">
      <div className="flex items-center gap-2 md:gap-3 shrink-0 min-w-0">
        <button
          type="button"
          onClick={() => navigate("/messages/chats")}
          className="md:hidden h-8 w-8 flex items-center justify-center rounded-lg text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/10 -ml-1"
          aria-label="Back to chats"
        >
          <FiArrowLeft size={20} />
        </button>
        <Avatar contact={contact} showStatus />
        <p className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">{contact.name}</p>
      </div>
      <div className="flex-1 flex justify-center min-w-0">
        <div className="flex items-center gap-2 rounded-[26.53px] bg-[#F6F8F9] dark:bg-[#1D242A] px-3 md:px-5 py-2.5 md:py-3 w-full max-w-full sm:max-w-[480px] border-0 min-w-0">
          <FiSearch size={14} className="text-gray-400 dark:text-slate-500 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search in conversation"
            className="flex-1 min-w-0 bg-transparent text-[12px] text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none border-none"
          />
        </div>
      </div>
    </div>
  );
};
