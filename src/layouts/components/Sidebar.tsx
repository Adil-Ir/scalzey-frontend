import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import {
  HiOutlineHome, HiOutlineViewGrid, HiOutlineTemplate,
  HiOutlineCalendar, HiOutlineSearch, HiOutlineRefresh,
  HiOutlineClipboardList, HiOutlineChatAlt2, HiOutlineSpeakerphone,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { COMMUNITIES } from "../../pages/explore-community/data";
import logo from "../../assets/logo.png";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  to: string;
  label: string;
  icon?: ReactNode;
  badge?: ReactNode;
}

interface NavSection {
  heading: string;
  items: NavItem[];
}

// ─── Avatar stack badge for community items ───────────────────────────────────

const CommunityBadge = ({ colors, members }: { colors: string[]; members: string }) => (
  <div className="flex items-center gap-1 shrink-0">
    <div className="flex -space-x-1">
      {colors.slice(0, 3).map((c, i) => (
        <span
          key={i}
          className={`inline-block h-4 w-4 rounded-full border border-white dark:border-[#0F161A] ${c}`}
        />
      ))}
    </div>
    <span className="text-[10px] text-slate-400 dark:text-slate-500">{members}</span>
  </div>
);

// ─── Static nav sections ──────────────────────────────────────────────────────

const STATIC_SECTIONS: NavSection[] = [
  {
    heading: "General",
    items: [
      { to: "/home",               label: "Home",               icon: <HiOutlineHome size={18} /> },
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
];

const MESSAGES_SECTION: NavSection = {
  heading: "Direct Messages (3)",
  items: [
    { to: "/messages/chats", label: "Chats", icon: <HiOutlineChatAlt2 size={18} /> },
    {
      to: "/messages/savannah-nguyen",
      label: "Savannah Nguyen",
      icon: <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white text-[10px] font-semibold">S</span>,
    },
    {
      to: "/messages/jenny-wilson",
      label: "Jenny Wilson",
      icon: <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-white text-[10px] font-semibold">J</span>,
    },
    {
      to: "/messages/guy-hawkins",
      label: "Guy Hawkins",
      icon: <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-semibold">G</span>,
    },
  ],
};

const UPDATES_SECTION: NavSection = {
  heading: "Update & Announcements",
  items: [
    { to: "/updates", label: "Updates", icon: <HiOutlineSpeakerphone size={18} /> },
  ],
};

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
        <img
          src={logo}
          alt="Cotechy"
          className="shrink-0 object-contain"
          style={{
            width: collapsed ? "40px" : "113.051px",
            height: collapsed ? "10.15px" : "28.672px",
          }}
        />
      </div>

      {/* Nav */}
      <div className="flex-1 space-y-6 overflow-y-auto overflow-x-hidden w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        {/* Static sections: General + Courses */}
        {STATIC_SECTIONS.map((section, i) => (
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
                  end={item.to === "/"}
                  title={item.label}
                  className={({ isActive }) => linkClass(isActive)}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {!collapsed && <span className="flex-1">{item.label}</span>}
                </NavLink>
              ))}
            </section>
          </div>
        ))}

        {/* Community section — dynamic */}
        <div>
          <hr className="border-gray-200 dark:border-[#2D3D46] mb-4" />
          <section className="space-y-1">
            {!collapsed && (
              <p className="uppercase text-[10px] px-3 mb-2 text-gray-400 dark:text-slate-500">
                Community
              </p>
            )}

            {/* Explore link */}
            <NavLink
              to="/community/explore"
              title="Explore"
              className={({ isActive }) => linkClass(isActive)}
            >
              <span className="shrink-0"><HiOutlineGlobeAlt size={18} /></span>
              {!collapsed && (
                <span className="flex-1 flex items-center justify-between">
                  Explore
                  <span className="text-[11px] text-slate-500">234+</span>
                </span>
              )}
            </NavLink>

            {/* Dynamic community items — no icon, avatar stack badge */}
            {COMMUNITIES.map((community) => (
              <NavLink
                key={community.id}
                to={`/community/${community.slug}`}
                title={community.name}
                className={({ isActive }) => linkClass(isActive)}
              >
                {collapsed ? (
                  /* Collapsed: show first avatar as icon */
                  <span
                    className={`shrink-0 inline-flex h-5 w-5 rounded-full items-center justify-center text-white text-[9px] font-bold ${community.avatarColors[0]}`}
                  />
                ) : (
                  <span className="flex-1 flex items-center justify-between min-w-0">
                    <span className="truncate">{community.name}</span>
                    <CommunityBadge
                      colors={community.avatarColors}
                      members={community.members}
                    />
                  </span>
                )}
              </NavLink>
            ))}
          </section>
        </div>

        {/* Direct Messages */}
        <div>
          <hr className="border-gray-200 dark:border-[#2D3D46] mb-4" />
          <section className="space-y-1">
            {!collapsed && (
              <p className="uppercase text-[10px] px-3 mb-2 text-gray-400 dark:text-slate-500">
                {MESSAGES_SECTION.heading}
              </p>
            )}
            {MESSAGES_SECTION.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                title={item.label}
                className={({ isActive }) => linkClass(isActive)}
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && <span className="flex-1">{item.label}</span>}
              </NavLink>
            ))}
          </section>
        </div>

        {/* Updates */}
        <div>
          <hr className="border-gray-200 dark:border-[#2D3D46] mb-4" />
          <section className="space-y-1">
            {!collapsed && (
              <p className="uppercase text-[10px] px-3 mb-2 text-gray-400 dark:text-slate-500">
                {UPDATES_SECTION.heading}
              </p>
            )}
            {UPDATES_SECTION.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                title={item.label}
                className={({ isActive }) => linkClass(isActive)}
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && <span className="flex-1">{item.label}</span>}
              </NavLink>
            ))}
          </section>
        </div>

      </div>
    </aside>
  );
};
