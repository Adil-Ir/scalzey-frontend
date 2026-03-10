import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

interface SelectRolesModalProps {
  onClose: () => void;
  onSave: (role: string, seniority: string) => void;
}

const CATEGORIES = ["Customer Support", "Design", "Engineering", "Product", "Marketing"];
const ROLES_BY_CATEGORY: Record<string, string[]> = {
  "Customer Support": ["Customer Support Representatives", "Virtual Assistants", "CX Managers", "Community Managers"],
  Design: ["UX Designer", "UI Designer", "Product Designer", "Design Lead"],
  Engineering: ["Frontend Developer", "Backend Developer", "Full Stack", "DevOps"],
  Product: ["Product Manager", "Product Owner", "Business Analyst"],
  Marketing: ["Content Writer", "SEO Specialist", "Growth Marketer"],
};

const SENIORITY_LEVELS = ["Beginner", "Intermediate", "Expert"];

export const SelectRolesModal = ({ onClose, onSave }: SelectRolesModalProps) => {
  const [category, setCategory] = useState("Customer Support");
  const [selectedRole, setSelectedRole] = useState("Customer Support Representatives");
  const [seniority, setSeniority] = useState("Beginner");

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const roles = ROLES_BY_CATEGORY[category] ?? ROLES_BY_CATEGORY["Customer Support"];

  const handleSave = () => {
    const roleToSave = selectedRole || roles[0];
    if (roleToSave) onSave(roleToSave, seniority);
    onClose();
  };

  const modalContent = (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative z-50 w-full max-w-lg mx-4 rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-[#1D242A] border border-gray-200 dark:border-[#2D3D46]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200 dark:border-[#2D3D46]">
          <h2 className="text-[18px] font-semibold text-gray-900 dark:text-white">Select Roles</h2>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-white/20 transition"
            aria-label="Close"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div>
            <h3 className="text-[13px] font-medium text-gray-900 dark:text-white mb-2">Select Category</h3>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                const newRoles = ROLES_BY_CATEGORY[e.target.value];
                setSelectedRole(newRoles?.[0] ?? "");
              }}
              className="w-full rounded-xl border border-gray-200 dark:border-[#2D3D46] bg-transparent px-4 py-3 text-[14px] text-gray-900 dark:text-white outline-none focus:border-[#44BCFF]"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-white dark:bg-[#1D242A]">{c}</option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-[13px] font-medium text-gray-900 dark:text-white mb-2">Select Roles</h3>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`px-4 py-2.5 rounded-full text-[13px] font-medium border transition ${
                    selectedRole === role
                      ? "bg-[#44BCFF] text-white border-[#44BCFF]"
                      : "bg-transparent text-gray-600 dark:text-slate-300 border-gray-200 dark:border-[#2D3D46] hover:border-[#44BCFF]/50"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[13px] font-medium text-gray-900 dark:text-white mb-2">Seniority Level</h3>
            <div className="flex gap-2">
              {SENIORITY_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSeniority(level)}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-[13px] font-medium border transition ${
                    seniority === level
                      ? "bg-[#44BCFF] text-white border-[#44BCFF]"
                      : "bg-transparent text-gray-600 dark:text-slate-300 border-gray-200 dark:border-[#2D3D46] hover:border-[#44BCFF]/50"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3 rounded-xl bg-[#44BCFF] text-white text-[14px] font-semibold hover:bg-[#2eaef5] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

  const mainEl = document.getElementById("dashboard-main");
  if (!mainEl) return null;
  return createPortal(modalContent, mainEl);
};
