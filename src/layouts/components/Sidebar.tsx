import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import {
  HiOutlineHome, HiOutlineViewGrid, HiOutlineTemplate,
  HiOutlineCalendar, HiOutlineSearch, HiOutlineRefresh,
  HiOutlineClipboardList, HiOutlineChatAlt2, HiOutlineSpeakerphone,
  HiOutlineUserGroup, HiOutlineGlobeAlt,
} from "react-icons/hi";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
  badge?: ReactNode;
}

interface NavSection {
  heading: string;
  items: NavItem[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_SECTIONS: NavSection[] = [
  {
    heading: "General",
    items: [
      { to: "/",                   label: "Home",               icon: <HiOutlineHome size={18} /> },
      { to: "/dashboard",          label: "Dashboard",          icon: <HiOutlineViewGrid size={18} /> },
      { to: "/events-workshops",   label: "Events & Workshops", icon: <HiOutlineTemplate size={18} /> },
      { to: "/calendar",           label: "Calendar",           icon: <HiOutlineCalendar size={18} /> },
    ],
  },
  {
    heading: "Courses",
    items: [
      { to: "/courses/explore",    label: "Explore",  icon: <HiOutlineSearch size={18} /> },
      { to: "/courses/enrolled",   label: "Enrolled", icon: <HiOutlineRefresh size={18} /> },
      { to: "/courses/results",    label: "Results",  icon: <HiOutlineClipboardList size={18} /> },
    ],
  },
  {
    heading: "Community",
    items: [
      {
        to: "/community/explore",
        label: "Explore",
        icon: <HiOutlineGlobeAlt size={18} />,
        badge: <span className="text-[11px] text-slate-500">234+</span>,
      },
      { to: "/community/geki-learn",       label: "Geki Learn",      icon: <HiOutlineUserGroup size={18} /> },
      { to: "/community/product-visuals",  label: "Product Visuals", icon: <HiOutlineUserGroup size={18} /> },
      { to: "/community/dev-crown",        label: "Dev Crown",       icon: <HiOutlineUserGroup size={18} /> },
    ],
  },
  {
    heading: "Direct Messages (3)",
    items: [
      { to: "/messages/chats",            label: "Chats",          icon: <HiOutlineChatAlt2 size={18} /> },
      {
        to: "/messages/savannah-nguyen",
        label: "Savannah Nguyen",
        icon: <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-[#FFFFFFBF] text-[10px] font-semibold">S</span>,
      },
      {
        to: "/messages/jenny-wilson",
        label: "Jenny Wilson",
        icon: <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-[#FFFFFFBF] text-[10px] font-semibold">J</span>,
      },
      {
        to: "/messages/guy-hawkins",
        label: "Guy Hawkins",
        icon: <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-[#FFFFFFBF] text-[10px] font-semibold">G</span>,
      },
    ],
  },
  {
    heading: "Update & Announcements",
    items: [
      { to: "/updates", label: "Updates", icon: <HiOutlineSpeakerphone size={18} /> },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar = ({ collapsed }: SidebarProps) => {
  const linkClass = (isActive: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors font-sora text-[14px] font-normal leading-[20.144px] ${
      collapsed ? "justify-center px-2" : ""
    } ${
      isActive
        ? "text-[#44BCFF] [&_svg]:text-[#44BCFF] [&_span]:text-[#44BCFF]"
        : "text-gray-500 hover:text-gray-900 dark:text-[rgba(255,255,255,0.75)] dark:hover:text-white"
    }`;

  return (
    <aside
      className={`hidden md:flex flex-col border-r py-6 transition-all duration-300 min-h-screen bg-white border-gray-200 dark:bg-[#0F161A] dark:border-[#2D3D46] shrink-0 z-50 ${
        collapsed ? "w-18 px-2 items-center" : "w-60.5 px-5"
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center mb-8 ${collapsed ? "justify-center" : "justify-between"}`}>
        <div className="inline-flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-sky-400/90 flex items-center justify-center text-slate-950 font-bold text-sm shrink-0">
            CO
          </div>
            {!collapsed && (
              <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">techy</span>
            )}
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 space-y-6 overflow-y-auto overflow-x-hidden w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {NAV_SECTIONS.map((section, i) => (
          <div key={section.heading}>
            {i > 0 && <hr className="border-gray-200 dark:border-[#2D3D46] mb-4" />}
            <section className="space-y-1">
              {!collapsed && (
                <p className="uppercase text-[10px] px-3 mb-2 text-gray-400 dark:text-slate-500">
                  {section.heading}
                </p>
              )}
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={item.label}
                  className={({ isActive }) => linkClass(isActive)}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {!collapsed && (
                    <span className="flex-1 flex items-center justify-between">
                      {item.label}
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </section>
          </div>
        ))}
      </div>
    </aside>
  );
};
