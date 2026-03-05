import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBell, FiMessageSquare, FiChevronDown,
  FiUser, FiHelpCircle, FiLogOut, FiMenu,
} from "react-icons/fi";

// ─── Dropdown items ────────────────────────────────────────────────────────────

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
      icon: <FiUser size={14} className="text-slate-400" />,
      onClick: () => setDropdownOpen(false),
    },
    {
      label: "Help Center",
      icon: <FiHelpCircle size={14} className="text-slate-400" />,
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
    <header className="h-16 border-b border-[#2D3D46] flex items-center justify-between px-4 md:px-6 bg-[#0F161A] shrink-0">

      {/* Left — sidebar toggle + page title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A252B] text-slate-300 hover:text-white transition"
          title="Toggle sidebar"
        >
          <FiMenu size={16} />
        </button>
        <span className="text-sm font-semibold text-white">{pageTitle}</span>
      </div>

      {/* Right — chat + bell + user dropdown */}
      <div className="flex items-center gap-3">

        {/* Chat icon with red badge */}
        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1A252B] text-slate-300 hover:text-white transition"
        >
          <FiMessageSquare size={17} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-1 ring-[#050816]" />
        </button>

        {/* Bell icon */}
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1A252B] text-slate-300 hover:text-white transition"
        >
          <FiBell size={17} />
        </button>

        {/* User profile + dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 rounded-full pl-1 pr-3 py-1 hover:bg-slate-800 transition"
          >
            <div className="h-8 w-8 rounded-full bg-linear-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
              SG
            </div>
            <div className="hidden md:flex flex-col items-start leading-tight">
              <span className="text-[13px] font-medium text-white">Setalia Green</span>
              <span className="text-[11px] text-slate-400">mstellag@gamil.com</span>
            </div>
            <FiChevronDown
              size={14}
              className={`text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#0F161A] border border-[#1A252B] shadow-xl py-1 z-50">
              {dropdownItems.map((item) => (
                <div key={item.label}>
                  {item.danger && <hr className="border-slate-700 my-1" />}
                  <button
                    type="button"
                    onClick={item.onClick}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-800 transition ${
                      item.danger ? "text-red-400" : "text-slate-200"
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
