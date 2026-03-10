import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfilePublicView } from "./components/ProfilePublicView";
import { ProfileForm } from "../edit-onboarding-profile/components/ProfileForm";
import { useUserProfile } from "../../context/UserProfileContext";

const computeProgress = (
  profile: ReturnType<typeof useUserProfile>["profile"],
) => {
  const fields = [
    profile.name,
    profile.email,
    profile.avatarUrl,
    profile.phone,
    profile.location,
    profile.website,
    profile.aboutMe,
    profile.roles?.length,
    profile.enrolledCommunities?.length,
    profile.interests?.length,
  ];
  const filled = fields.filter((f) => {
    if (Array.isArray(f)) return (f as unknown[]).length > 0;
    return f != null && f !== "";
  }).length;
  return Math.round((filled / 10) * 100);
};

export const ProfilePage = () => {
  const { profile, updateProfile } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);

  const progress = useMemo(() => computeProgress(profile), [profile]);
  const isPublicProfile = profile.isPublicProfile ?? false;

  const handleVisibilityChange = (value: boolean) => {
    updateProfile({ isPublicProfile: value });
  };

  const profileUsername =
    profile.username ?? profile.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="rounded-2xl bg-white dark:bg-[#1D242A] p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h1 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-gray-900 dark:text-white">
          Profile
        </h1>
        {isPublicProfile && (
          <Link
            to={`/profile/${profileUsername}`}
            className="text-[13px] text-[#44BCFF] hover:underline font-medium"
          >
            Preview as others see
          </Link>
        )}
      </div>

      {isEditing ? (
        <div className="pt-0">
          <ProfileForm
            onSaved={() => setIsEditing(false)}
            showBackButton={false}
          />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:items-start ">
          {/* Left side — Image only, 15% width */}
          <div className="shrink-0 w-25 h-25 flex justify-center lg:justify-start">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-base sm:text-lg font-semibold">
                  {profile.name ? profile.name[0].toUpperCase() : "U"}
                </div>
              )}
            </div>
          </div>

          {/* Right side — All other content, 85% width */}
          <div className="flex-1">
            <ProfileHeader
              isPublicProfile={isPublicProfile}
              onVisibilityChange={handleVisibilityChange}
              onEditClick={() => setIsEditing(true)}
              progress={progress}
              isOwnProfile
            />
            <div className="pt-4 md:pt-6">
              <ProfilePublicView showPrivateFields />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
