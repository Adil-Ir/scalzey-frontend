import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface PrivacyDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const OPTIONS = ["Public", "Private"];

export const PrivacyDropdown = ({ value, onChange }: PrivacyDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-[#2D3D46] bg-transparent px-4 py-2.5 text-[13px] text-gray-900 dark:text-white outline-none focus:border-[#44BCFF]"
      >
        {value}
        <FiChevronDown size={14} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 bottom-full mb-2 py-1 rounded-xl min-w-[120px] bg-white dark:bg-[#1D242A] border border-gray-200 dark:border-[#2D3D46] shadow-lg z-10">
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-[13px] first:rounded-t-xl last:rounded-b-xl hover:bg-gray-50 dark:hover:bg-white/5 ${
                value === opt ? "text-[#44BCFF] font-medium" : "text-gray-900 dark:text-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
