import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiPlus, FiMapPin } from "react-icons/fi";
import { FaHandPaper } from "react-icons/fa";
import { ProfileUpload } from "./ProfileUpload";
import { SelectRolesModal } from "./SelectRolesModal";
import { PrivacyDropdown } from "./PrivacyDropdown";
import { useUserProfile } from "../../../context/UserProfileContext";
import { profileSchema, type ProfileFormValues } from "../../../lib/validations/profileSchema";
import { updateProfileApi } from "../../../api/profile";

interface ProfileFormProps {
  onSaved?: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

const computeProgress = (form: ProfileFormValues & { enrolledCommunities?: unknown[]; interests?: unknown[] }) => {
  const fields = [
    form.name,
    form.email,
    form.avatarUrl,
    form.phone,
    form.location,
    form.website,
    form.aboutMe,
    form.roles?.length,
    form.enrolledCommunities?.length,
    form.interests?.length,
  ];
  const filled = fields.filter((f) => {
    if (Array.isArray(f)) return (f as unknown[]).length > 0;
    return f != null && f !== "";
  }).length;
  return Math.round((filled / 10) * 100);
};

export const ProfileForm = ({ onSaved, showBackButton, onBack }: ProfileFormProps) => {
  const { profile, updateProfile } = useUserProfile();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [communitiesPrivacy, setCommunitiesPrivacy] = useState("Public");
  const [interestPrivacy, setInterestPrivacy] = useState("Public");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? "",
      aboutMe: profile.aboutMe ?? "",
      location: profile.location ?? "",
      website: profile.website ?? "",
      avatarUrl: profile.avatarUrl ?? null,
      roles: profile.roles ?? [],
    },
  });

  const watched = watch();
  const progress = useMemo(
    () =>
      computeProgress({
        ...watched,
        enrolledCommunities: profile.enrolledCommunities,
        interests: profile.interests,
      }),
    [watched, profile.enrolledCommunities, profile.interests]
  );

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        location: data.location || undefined,
        website: data.website || undefined,
        aboutMe: data.aboutMe || undefined,
        avatarUrl: data.avatarUrl,
        roles: data.roles,
      };
      await updateProfileApi(payload, profile);
      updateProfile({
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        location: data.location || undefined,
        website: data.website || undefined,
        aboutMe: data.aboutMe || undefined,
        avatarUrl: data.avatarUrl,
        roles: data.roles,
      });
      onSaved?.();
    } catch (err) {
      console.error("Profile update failed:", err);
      // TODO: Show toast/alert - e.g. "Failed to save profile. Please try again."
    }
  };

  const handleAddRole = (role: string) => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const current = watch("roles");
    if (!current.includes(role)) {
      setValue("roles", [...current, role], { shouldValidate: true });
    }
  };

  const handleRemoveRole = (role: string) => {
    setValue(
      "roles",
      watch("roles").filter((r) => r !== role),
      { shouldValidate: true }
    );
  };

  const inputBase =
    "w-full rounded-full border bg-transparent px-4 py-3 text-[14px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#868E96] outline-none focus:border-[#44BCFF]";
  const getBorderClass = (hasError: boolean) =>
    hasError ? "border-red-500" : "border-gray-200 dark:border-[#2D3D46]";

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {hasErrors && (
        <div className="rounded-xl border border-red-500 bg-red-500/10 px-4 py-3 text-[13px] text-red-600 dark:text-red-400">
          Please fix the errors below before saving.
        </div>
      )}
      {(showBackButton || onBack) && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[13px] text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition"
        >
          Back to view
        </button>
      )}
      {/* Two columns: left = image, right = header + inputs */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-4">
        {/* Left — Image */}
        <div className="shrink-0 w-25 h-25 flex justify-center lg:justify-start">
          <ProfileUpload value={watch("avatarUrl")} onChange={(url) => setValue("avatarUrl", url)} />
        </div>

        {/* Right — Header row (name, New Member, progress, Save) + form */}
        <div className="flex-1 min-w-0 lg:w-[85%]">
          <div className="flex flex-wrap items-start justify-between gap-3 pb-4 md:pb-6 border-b border-gray-200 dark:border-[#2D3D46]">
            <div className="min-w-0">
              <div
                className={`rounded-lg border px-2 py-1 transition-colors ${
                  errors.name ? "border-red-500 bg-red-500/5" : "border-transparent"
                }`}
              >
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full text-[16px] sm:text-[18px] md:text-[20px] font-semibold bg-transparent border-none outline-none placeholder-gray-400 dark:placeholder-[#868E96]"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.name.message}</p>
              )}
              <div className="mt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[26px] border border-[#2D3D46] bg-transparent text-white text-[11px] font-medium">
                  <FaHandPaper size={11} className="shrink-0 text-amber-400" />
                  New Member
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-gray-200 dark:text-[#2D3D46]"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#FF9B44"
                    strokeWidth="3"
                    strokeDasharray={`${progress}, 100`}
                    strokeLinecap="round"
                    className="transition-[stroke-dasharray] duration-300"
                  />
                </svg>
                <span className="absolute text-[9px] font-semibold text-gray-700 dark:text-slate-200">
                  {progress}%
                </span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-full bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] transition shrink-0 disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

              <div className="pt-4 md:pt-6 space-y-8">
      {/* Contact Details */}
      <div>
        <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">Contact Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="min-w-0">
            <label className="block text-[12px] text-gray-500 dark:text-[#868E96] mb-1.5">Phone</label>
            <input
              type="text"
              placeholder="+923407712693"
              className={`${inputBase} ${getBorderClass(!!errors.phone)}`}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.phone.message}</p>
            )}
          </div>
          <div className="min-w-0">
            <label className="block text-[12px] text-gray-500 dark:text-[#868E96] mb-1.5">Email</label>
            <input
              type="email"
              placeholder="jhony@gmail.com"
              className={`${inputBase} ${getBorderClass(!!errors.email)}`}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.email.message}</p>
            )}
          </div>
          <div className="min-w-0">
            <label className="block text-[12px] text-gray-500 dark:text-[#868E96] mb-1.5">Location (Optional)</label>
            <div className={`relative rounded-full border ${getBorderClass(!!errors.location)}`}>
              <input
                type="text"
                placeholder="ex. New York,"
                className={`${inputBase} pl-10 rounded-full border-0`}
                {...register("location")}
              />
              <FiMapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#868E96]" />
            </div>
            {errors.location && (
              <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.location.message}</p>
            )}
          </div>
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <label className="block text-[12px] text-gray-500 dark:text-[#868E96] mb-1.5">Website</label>
            <input
              type="text"
              placeholder="ex. www.google.com"
              className={`${inputBase} ${getBorderClass(!!errors.website)}`}
              {...register("website")}
            />
            {errors.website && (
              <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.website.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* About me */}
      <div>
        <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">About me</h2>
        <textarea
          placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
          rows={5}
          className={`w-full rounded-2xl border bg-transparent px-4 py-3 text-[14px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#868E96] outline-none focus:border-[#44BCFF] resize-none ${getBorderClass(!!errors.aboutMe)}`}
          {...register("aboutMe")}
        />
        {errors.aboutMe && (
          <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.aboutMe.message}</p>
        )}
      </div>

      {/* Roles */}
      <div>
        <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">Roles</h2>
        <div className="flex flex-wrap items-center gap-2">
          {watch("roles").map((role) => (
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
        </div>
      </div>
    </form>
  );
};
