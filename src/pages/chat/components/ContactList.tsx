import { NavLink } from "react-router-dom";
import type { Contact } from "../data";

interface ContactListProps {
  contacts: Contact[];
  unreadByContact?: Record<string, number>;
}

interface AvatarProps {
  contact: Contact;
  showStatus?: boolean;
}

export const Avatar = ({ contact, showStatus = false }: AvatarProps) => (
  <span className="relative inline-flex shrink-0">
    <span
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-white text-[13px] font-semibold ${contact.color}`}
    >
      {contact.name[0]}
    </span>
    {showStatus && (
      <span
        className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-[#0F161A] ${
          contact.isOnline ? "bg-green-500" : "bg-gray-400"
        }`}
      />
    )}
  </span>
);

export const ContactList = ({ contacts, unreadByContact = {} }: ContactListProps) => (
  <div className="flex flex-col">
    {contacts.map((c) => {
      const unread = unreadByContact[c.slug] ?? 0;
      return (
        <NavLink
          key={c.id}
          to={`/messages/${c.slug}`}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 mx-2 rounded-full transition ${
              isActive
                ? "bg-[#44BCFF0D] text-[#44BCFF]"
                : "text-gray-700 dark:text-slate-300"
            }`
          }
        >
          <Avatar contact={c} showStatus />
          <p className="text-[13px] font-medium truncate min-w-0 flex-1">{c.name}</p>
          {unread > 0 && (
            <span className="shrink-0 min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full bg-[#44BCFF] text-white text-[11px] font-semibold">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </NavLink>
      );
    })}
  </div>
);
