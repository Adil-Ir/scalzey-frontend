import { NavLink } from "react-router-dom";
import type { Contact } from "../data";

interface ContactListProps {
  contacts: Contact[];
}

export const Avatar = ({ contact }: { contact: Contact }) => (
  <span
    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white text-[13px] font-semibold ${contact.color}`}
  >
    {contact.name[0]}
  </span>
);

export const ContactList = ({ contacts }: ContactListProps) => (
  <div className="flex flex-col">
    {contacts.map((c) => (
      <NavLink
        key={c.id}
        to={`/messages/${c.slug}`}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 transition ${
            isActive
              ? "bg-[#44BCFF]/15 text-[#44BCFF]"
              : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/5"
          }`
        }
      >
        <Avatar contact={c} />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium truncate">{c.name}</p>
          <p className="text-[11px] text-gray-400 dark:text-slate-500 truncate">{c.email}</p>
        </div>
      </NavLink>
    ))}
  </div>
);
