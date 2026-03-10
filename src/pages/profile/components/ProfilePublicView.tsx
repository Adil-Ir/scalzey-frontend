import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineStar, HiOutlineInformationCircle } from "react-icons/hi";
import { useUserProfile } from "../../../context/UserProfileContext";
import type { EnrolledCommunity } from "../../../context/UserProfileContext";

/** Shared pill style: rounded-[64px], bg-[#20303B] */
const PILL_CLASS =
  "inline-flex items-center gap-2 px-4 py-2 rounded-[64px] bg-[#20303B] text-white text-[13px] font-medium";

/** Normalize community to { name, slug } — supports API object or legacy string */
function toCommunity(item: string | EnrolledCommunity): { name: string; slug: string } {
  if (typeof item === "string") {
    return { name: item, slug: item.toLowerCase().replace(/\s+/g, "-") };
  }
  return { name: item.name, slug: item.slug };
}

interface ProfilePublicViewProps {
  showPrivateFields?: boolean;
}

export const ProfilePublicView = ({ showPrivateFields = false }: ProfilePublicViewProps) => {
  const { profile } = useUserProfile();
  const {
    phone,
    email,
    location,
    website,
    aboutMe,
    roles,
    courses = [],
    enrolledCommunities = [],
    interests = [],
  } = profile;

  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <div>
        <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          Contact Details
          {showPrivateFields && (
            <span
              title="Only Visible to Admins"
              className="inline-flex items-center gap-1 text-[11px] font-normal text-gray-500 dark:text-[#868E96] cursor-help"
            >
              <HiOutlineInformationCircle size={14} className="shrink-0" />
              Only Visible to Admins
            </span>
          )}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {showPrivateFields && phone && (
            <div>
              <span className="block text-[12px] text-gray-500 dark:text-[#868E96] mb-0.5">Phone</span>
              <span className="text-[14px] text-gray-900 dark:text-white">{phone}</span>
            </div>
          )}
          {showPrivateFields && email && (
            <div>
              <span className="block text-[12px] text-gray-500 dark:text-[#868E96] mb-0.5">Email</span>
              <span className="text-[14px] text-gray-900 dark:text-white">{email}</span>
            </div>
          )}
          {location && (
            <div>
              <span className="block text-[12px] text-gray-500 dark:text-[#868E96] mb-0.5">Location</span>
              <span className="text-[14px] text-gray-900 dark:text-white">{location}</span>
            </div>
          )}
          {website && (
            <div>
              <span className="block text-[12px] text-gray-500 dark:text-[#868E96] mb-0.5">Website</span>
              <a
                href={website.startsWith("http") ? website : `https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-[#44BCFF] hover:underline break-all"
              >
                {website}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* About me */}
      {aboutMe && (
        <div>
          <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">About me</h2>
          <p className="text-[14px] text-gray-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {aboutMe}
          </p>
        </div>
      )}

      {/* Roles — only in private view */}
      {showPrivateFields && roles && roles.length > 0 && (
        <div>
          <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">Roles</h2>
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <span key={role} className={PILL_CLASS}>
                {role}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Courses */}
      {courses.length > 0 && (
        <div>
          <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">Courses</h2>
          <div className="flex flex-wrap gap-2">
            {courses.map((c, i) => (
              <span key={c.id ?? `${c.name}-${i}`} className={PILL_CLASS}>
                <HiOutlineStar size={14} className="text-amber-400 shrink-0" />
                {c.name}
                {c.score != null && (
                  <span className="text-[11px] text-slate-300">{c.score}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Enrolled Communities — links to /community/:slug with arrow icon */}
      {enrolledCommunities && enrolledCommunities.length > 0 && (
        <div>
          <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">
            Enrolled Communities
          </h2>
          <div className="flex flex-wrap gap-2">
            {enrolledCommunities.map((item) => {
              const { name, slug } = toCommunity(item);
              return (
                <Link
                  key={slug}
                  to={`/community/${slug}`}
                  className={`${PILL_CLASS} hover:bg-[#293943] transition-colors`}
                >
                  {name}
                  <FiArrowUpRight size={14} className="shrink-0 text-white" />
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Interest — only in private view */}
      {showPrivateFields && interests && interests.length > 0 && (
        <div>
          <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">Interest</h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((item) => (
              <span key={item} className={PILL_CLASS}>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
