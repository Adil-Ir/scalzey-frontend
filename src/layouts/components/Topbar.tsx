import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBell, FiMessageSquare, FiChevronDown,
  FiUser, FiHelpCircle, FiLogOut, FiMenu,
  FiSun, FiMoon,
} from "react-icons/fi";
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
      onClick: () => setDropdownOpen(false),
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

  const iconBtn =
    "inline-flex h-9 w-9 items-center justify-center rounded-full transition " +
    "bg-gray-100 text-gray-500 hover:text-gray-900 " +
    "dark:bg-[#1A252B] dark:text-slate-300 dark:hover:text-white";

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

      {/* Right */}
      <div className="flex items-center gap-2">

        {/* Dark / Light toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className={iconBtn}
        >
          {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
        </button>

        {/* Chat with red badge */}
        <button type="button" className={`relative ${iconBtn}`}>
          <FiMessageSquare size={17} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-1 ring-white dark:ring-[#0F161A]" />
        </button>

        {/* Bell */}
        <button type="button" className={iconBtn}>
          <FiBell size={17} />
        </button>

        {/* User profile + dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 rounded-full pl-1 pr-3 py-1 transition hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
              SG
            </div>
            <div className="hidden md:flex flex-col items-start leading-tight">
              <span className="text-[13px] font-medium text-gray-900 dark:text-white">
                Setalia Green
              </span>
              <span className="text-[11px] text-gray-400 dark:text-slate-400">
                mstellag@gamil.com
              </span>
            </div>
            <FiChevronDown
              size={14}
              className={`text-gray-400 dark:text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-xl py-1 z-50 border bg-white border-gray-200 dark:bg-[#0F161A] dark:border-[#2D3D46]">
              {dropdownItems.map((item) => (
                <div key={item.label}>
                  {item.danger && (
                    <hr className="border-gray-200 dark:border-slate-700 my-1" />
                  )}
                  <button
                    type="button"
                    onClick={item.onClick}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-gray-50 dark:hover:bg-slate-800 ${
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
