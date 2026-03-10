import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { HiOutlineBriefcase, HiOutlineCode, HiOutlinePencil, HiOutlineChartBar } from "react-icons/hi";

interface AddRoleModalProps {
  onClose: () => void;
  selectedRoles: string[];
  onAddRole: (role: string) => void;
  onRemoveRole: (role: string) => void;
}

const AVAILABLE_ROLES = [
  { id: "developer", label: "Developer", icon: HiOutlineCode },
  { id: "designer", label: "Designer", icon: HiOutlinePencil },
  { id: "product-manager", label: "Product Manager", icon: HiOutlineChartBar },
  { id: "lead", label: "Team Lead", icon: HiOutlineBriefcase },
];

export const AddRoleModal = ({
  onClose,
  selectedRoles,
  onAddRole,
  onRemoveRole,
}: AddRoleModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const modalContent = (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative z-50 w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden bg-[#1D242A] border border-[#2D3D46]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#2D3D46]">
          <h2 className="text-[18px] font-semibold text-white">Add Role</h2>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-white/10 text-slate-400 hover:bg-white/20 transition"
            aria-label="Close"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-3">
          {AVAILABLE_ROLES.map((role) => {
            const isSelected = selectedRoles.includes(role.id);
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className="flex items-center justify-between gap-4 py-3 rounded-xl bg-white/5 border border-[#2D3D46] px-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center bg-[#44BCFF]/20 text-[#44BCFF]">
                    <Icon size={20} />
                  </span>
                  <span className="text-[14px] font-medium text-white">{role.label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => (isSelected ? onRemoveRole(role.id) : onAddRole(role.id))}
                  className="shrink-0 flex items-center justify-center w-[51.564px] h-9 rounded-lg bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] transition"
                >
                  {isSelected ? "Added" : "Add"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const mainEl = document.getElementById("dashboard-main");
  if (!mainEl) return null;
  return createPortal(modalContent, mainEl);
};
