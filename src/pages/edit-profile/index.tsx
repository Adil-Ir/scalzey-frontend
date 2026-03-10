import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { HiOutlineBriefcase, HiOutlineCode, HiOutlinePencil, HiOutlineChartBar } from "react-icons/hi";
import { AddRoleModal } from "./components/AddRoleModal";

const ROLE_LABELS: Record<string, string> = {
  developer: "Developer",
  designer: "Designer",
  "product-manager": "Product Manager",
  lead: "Team Lead",
};

const ROLE_ICONS: Record<string, React.ElementType> = {
  developer: HiOutlineCode,
  designer: HiOutlinePencil,
  "product-manager": HiOutlineChartBar,
  lead: HiOutlineBriefcase,
};

export const EditProfilePage = () => {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleAddRole = (role: string) => {
    if (!selectedRoles.includes(role)) {
      setSelectedRoles((prev) => [...prev, role]);
    }
  };

  const handleRemoveRole = (role: string) => {
    setSelectedRoles((prev) => prev.filter((r) => r !== role));
  };

  return (
    <div className="rounded-2xl bg-[#1D242A] border border-[#2D3D46] overflow-hidden">
      {/* Profile header */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-[#44BCFF]/20 flex items-center justify-center">
            <span className="text-2xl font-semibold text-[#44BCFF]">U</span>
          </div>
          <div>
            <h1 className="text-[20px] font-semibold text-[#FFFFFF]">Username</h1>
            <p className="text-[13px] text-[#868E96]">Edit your profile details</p>
          </div>
        </div>

        {/* Role section */}
        <div className="space-y-3">
          <h2 className="text-[14px] font-medium text-[#FFFFFF]">Role</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowRoleModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#44BCFF] bg-[#44BCFF]/10 text-[#44BCFF] hover:bg-[#44BCFF]/20 transition"
            >
              <FiPlus size={16} />
              <span className="text-[13px] font-medium">Add Role</span>
            </button>
            {selectedRoles.map((roleId) => {
              const Icon = ROLE_ICONS[roleId];
              return (
                <span
                  key={roleId}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#44BCFF]/20 text-[#44BCFF] border border-[#44BCFF]/30"
                >
                  {Icon && <Icon size={16} />}
                  <span className="text-[13px] font-medium">{ROLE_LABELS[roleId] ?? roleId}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {showRoleModal && (
        <AddRoleModal
          onClose={() => setShowRoleModal(false)}
          selectedRoles={selectedRoles}
          onAddRole={handleAddRole}
          onRemoveRole={handleRemoveRole}
        />
      )}
    </div>
  );
};
