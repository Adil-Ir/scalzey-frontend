import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBell, FiChevronDown, FiUser, FiHelpCircle, FiLogOut, FiMenu, FiSun, FiMoon,
} from "react-icons/fi";
import { useUserProfile } from "../../context/UserProfileContext";
import { useTheme } from "../../context/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}

interface TopbarProps {
  pageTitle: string;
  onToggleSidebar: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Topbar = ({ pageTitle, onToggleSidebar }: TopbarProps) => {
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownItems: DropdownItem[] = [
    {
      label: "Profile",
      icon: <FiUser size={14} />,
      onClick: () => { setDropdownOpen(false); navigate("/profile"); },
    },
    {
      label: "Help Center",
      icon: <FiHelpCircle size={14} />,
      onClick: () => setDropdownOpen(false),
    },
    {
      label: "Logout",
      icon: <FiLogOut size={14} />,
      danger: true,
      onClick: () => { setDropdownOpen(false); navigate("/login"); },
    },
  ];

  return (
    <header className="h-16 border-b flex items-center justify-between px-4 md:px-6 shrink-0 border-gray-200 bg-white dark:border-[#2D3D46] dark:bg-[#0F161A]">

      {/* Left — sidebar toggle + page title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          title="Toggle sidebar"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg transition bg-gray-100 text-gray-500 hover:text-gray-900 dark:bg-[#1A252B] dark:text-slate-300 dark:hover:text-white"
        >
          <FiMenu size={16} />
        </button>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {pageTitle}
        </span>
      </div>

      {/* Right — Theme toggle, Notification badge, Bell, User dropdown */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full transition bg-gray-100 text-gray-500 hover:text-gray-900 dark:bg-[#1A252B] dark:text-slate-300 dark:hover:text-white"
        >
          {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {/* Notification badge — red circle with count */}
        <button
          type="button"
          title="Notifications"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-full transition bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
        >
          <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white ring-2 ring-white dark:ring-[#0F161A]">
            1
          </span>
          <FiBell size={18} />
        </button>

        {/* User profile + dropdown trigger */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-3 rounded-lg pl-1 pr-2 py-1.5 transition hover:bg-gray-100 dark:hover:bg-white/5"
          >
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt="Profile"
                className="h-9 w-9 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                {profile.name ? profile.name.slice(0, 2).toUpperCase() : "U"}
              </div>
            )}
            <div className="hidden sm:flex flex-col items-start text-left leading-tight min-w-0">
              <span className="text-[13px] font-medium text-gray-900 dark:text-white truncate max-w-[140px]">
                {profile.name}
              </span>
              <span className="text-[11px] text-gray-500 dark:text-slate-400 truncate max-w-[140px]">
                {profile.email}
              </span>
            </div>
            <FiChevronDown
              size={16}
              className={`shrink-0 text-gray-500 dark:text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-xl shadow-xl py-1.5 z-50 border bg-white dark:bg-[#1D242A] border-gray-200 dark:border-[#2D3D46]">
              {dropdownItems.map((item) => (
                <div key={item.label}>
                  {item.danger && (
                    <hr className="border-gray-200 dark:border-[#2D3D46] my-1" />
                  )}
                  <button
                    type="button"
                    onClick={item.onClick}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-gray-50 dark:hover:bg-white/5 ${
                      item.danger
                        ? "text-red-500 dark:text-red-400"
                        : "text-gray-700 dark:text-slate-200"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
