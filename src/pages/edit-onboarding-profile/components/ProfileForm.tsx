import { useState } from "react";
import { FiPlus, FiMapPin, FiArrowLeft } from "react-icons/fi";
import { ProfileUpload } from "./ProfileUpload";
import { SelectRolesModal } from "./SelectRolesModal";
import { PrivacyDropdown } from "./PrivacyDropdown";
import { useUserProfile } from "../../../context/UserProfileContext";

interface ProfileFormProps {
  onSaved?: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const ProfileForm = ({ onSaved, showBackButton, onBack }: ProfileFormProps) => {
  const { profile, updateProfile } = useUserProfile();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roles, setRoles] = useState<string[]>(profile.roles ?? []);
  const [communitiesPrivacy, setCommunitiesPrivacy] = useState("Public");
  const [interestPrivacy, setInterestPrivacy] = useState("Public");
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [aboutMe, setAboutMe] = useState(profile.aboutMe ?? "");
  const [location, setLocation] = useState(profile.location ?? "");
  const [website, setWebsite] = useState(profile.website ?? "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile.avatarUrl ?? null);

  const handleSave = () => {
    updateProfile({ name, email, avatarUrl, phone, aboutMe, location, website, roles });
    onSaved?.();
    // TODO: Integrate API - e.g. await profileApi.update({ name, email, phone, aboutMe, avatar })
    // const formData = new FormData(); formData.append('avatar', file); ...
    // const res = await fetch('/api/profile', { method: 'PATCH', body: formData });
  };

  const handleAddRole = (role: string) => {
    if (!roles.includes(role)) {
      setRoles((prev) => [...prev, role]);
    }
  };

  const handleRemoveRole = (role: string) => {
    setRoles((prev) => prev.filter((r) => r !== role));
  };

  return (
    <div className="space-y-8">
      {/* Profile header: Upload + Username + Save */}
      {(showBackButton || onBack) && (
        <button
          type="button"
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-2 text-[13px] text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition"
        >
          <FiArrowLeft size={16} />
          Back to view
        </button>
      )}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <ProfileUpload value={avatarUrl} onChange={setAvatarUrl} />
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              className="w-full text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-gray-900 dark:text-white bg-transparent border-none outline-none placeholder-gray-400 dark:placeholder-[#868E96]"
            />
            <p className="text-[12px] sm:text-[13px] text-gray-500 dark:text-[#868E96] mt-0.5">Edit your profile details</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="shrink-0 w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#44BCFF] text-white text-[14px] font-medium hover:bg-[#2eaef5] transition"
        >
          Save
        </button>
      </div>

      {/* Contact Details */}
      <div>
        <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">Contact Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="min-w-0">
            <label className="block text-[12px] text-gray-500 dark:text-[#868E96] mb-1.5">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+923407712693"
              className="w-full rounded-full border border-gray-200 dark:border-[#2D3D46] bg-transparent px-4 py-3 text-[14px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#868E96] outline-none focus:border-[#44BCFF]"
            />
          </div>
          <div className="min-w-0">
            <label className="block text-[12px] text-gray-500 dark:text-[#868E96] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jhony@gmail.com"
              className="w-full rounded-full border border-gray-200 dark:border-[#2D3D46] bg-transparent px-4 py-3 text-[14px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#868E96] outline-none focus:border-[#44BCFF]"
            />
          </div>
          <div className="min-w-0">
            <label className="block text-[12px] text-gray-500 dark:text-[#868E96] mb-1.5">Location (Optional)</label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="ex. New York,"
                className="w-full rounded-full border border-gray-200 dark:border-[#2D3D46] bg-transparent px-4 py-3 pl-10 text-[14px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#868E96] outline-none focus:border-[#44BCFF]"
              />
              <FiMapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#868E96]" />
            </div>
          </div>
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <label className="block text-[12px] text-gray-500 dark:text-[#868E96] mb-1.5">Website</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="ex. www.google.com"
              className="w-full rounded-full border border-gray-200 dark:border-[#2D3D46] bg-transparent px-4 py-3 text-[14px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#868E96] outline-none focus:border-[#44BCFF]"
            />
          </div>
        </div>
      </div>

      {/* About me */}
      <div>
        <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">About me</h2>
        <textarea
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
          rows={5}
          className="w-full rounded-2xl border border-gray-200 dark:border-[#2D3D46] bg-transparent px-4 py-3 text-[14px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#868E96] outline-none focus:border-[#44BCFF] resize-none"
        />
      </div>

      {/* Roles */}
      <div>
        <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">Roles</h2>
        <div className="flex flex-wrap items-center gap-2">
          {roles.map((role) => (
            <span
              key={role}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-[#2D3D46] text-gray-800 dark:text-white text-[13px] font-medium"
            >
              {role}
              <button
                type="button"
                onClick={() => handleRemoveRole(role)}
                className="text-gray-500 dark:text-[#868E96] hover:text-gray-900 dark:hover:text-white transition"
              >
                ×
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={() => setShowRoleModal(true)}
            className="shrink-0 flex items-center justify-center w-[51.564px] h-9 rounded-full bg-[#44BCFF] text-white hover:bg-[#2eaef5] transition"
            aria-label="Add role"
          >
            <FiPlus size={18} />
          </button>
        </div>
      </div>

      {/* Communities */}
      <div>
        <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">Communities</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <button
            type="button"
            className="shrink-0 flex items-center justify-center w-[51.564px] h-9 rounded-full bg-[#44BCFF] text-white hover:bg-[#2eaef5] transition"
            aria-label="Add community"
          >
            <FiPlus size={18} />
          </button>
          <PrivacyDropdown value={communitiesPrivacy} onChange={setCommunitiesPrivacy} />
        </div>
      </div>

      {/* Interest */}
      <div>
        <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">Interest</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <button
            type="button"
            className="shrink-0 flex items-center justify-center w-[51.564px] h-9 rounded-full bg-[#44BCFF] text-white hover:bg-[#2eaef5] transition"
            aria-label="Add interest"
          >
            <FiPlus size={18} />
          </button>
          <PrivacyDropdown value={interestPrivacy} onChange={setInterestPrivacy} />
        </div>
      </div>

      {showRoleModal && (
        <SelectRolesModal
          onClose={() => setShowRoleModal(false)}
          onSave={handleAddRole}
        />
      )}
    </div>
  );
};
