import { useParams } from "react-router-dom";
import { FaHandPaper } from "react-icons/fa";
import { ProfilePublicView } from "./components/ProfilePublicView";
import { useUserProfile } from "../../context/UserProfileContext";

/**
 * Public view of a user's profile at /profile/:username
 * - When YOU visit your own URL (/profile/your-username): preview what others see + "Edit profile" link
 * - When OTHERS visit: they see public profile only if isPublicProfile, else "This profile is private"
 * Never shows Edit, Progress, or visibility toggle.
 */
export const PublicProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { profile } = useUserProfile();

  const currentUsername = profile.username ?? profile.name.toLowerCase().replace(/\s+/g, "-");
  const isOwnProfile = username === currentUsername;

  // TODO: Fetch profile by username from API when viewing another user
  const displayProfile = profile;
  const isPublic = displayProfile.isPublicProfile ?? false;

  // Another user's profile that is private
  if (!isOwnProfile && !isPublic) {
    return (
      <div className="rounded-2xl bg-white dark:bg-[#1D242A]p-4 sm:p-6 md:p-8">
        <h1 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-gray-900 dark:text-white mb-6">
          Profile
        </h1>
        <div className="py-12 text-center">
          <p className="text-[15px] text-gray-500 dark:text-slate-400">
            This profile is private.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-[#1D242A] border border-gray-200 dark:border-[#2D3D46] p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h1 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-gray-900 dark:text-white">
          Profile
        </h1>
      
      </div>

      {/* Two-column: left = image 15%, right = data 85% */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-4">
        {/* Left side — Image only, 15% width */}
        <div className="shrink-0 w-25 h-25 flex justify-center lg:justify-start">
          <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden">
            {displayProfile.avatarUrl ? (
              <img
                src={displayProfile.avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-base sm:text-lg font-semibold">
                {displayProfile.name ? displayProfile.name[0].toUpperCase() : "U"}
              </div>
            )}
          </div>
        </div>

        {/* Right side — Name + stars, New Member below, then Contact, About, etc. */}
        <div className="flex-1 min-w-0 lg:w-[85%]">
          <div className="pb-4 md:pb-6 border-b border-gray-200 dark:border-[#2D3D46] mb-4 md:mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[18px] sm:text-[20px] font-semibold text-gray-900 dark:text-white truncate">
                {displayProfile.name}
              </h2>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[26px] border border-[#2D3D46] bg-transparent text-white text-[11px] font-medium shrink-0">
                <svg className="w-3 h-3 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                254
              </span>
            </div>
            <div className="mt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[26px] border border-[#2D3D46] bg-transparent text-white text-[11px] font-medium">
                <FaHandPaper size={11} className="shrink-0 text-amber-400" />
                New Member
              </span>
            </div>
          </div>
          <ProfilePublicView showPrivateFields={false} />
        </div>
      </div>
    </div>
  );
};
