import { useNavigate } from "react-router-dom";
import type { Community } from "../data";

interface CommunityCardProps {
  community: Community;
  onJoinClick: (community: Community) => void;
}

const MiniAvatars = ({ colors }: { colors: string[] }) => (
  <div className="flex -space-x-1.5">
    {colors.map((color, i) => (
      <span
        key={i}
        className={`inline-block h-5 w-5 rounded-full border-2 border-white dark:border-[#20303B] ${color}`}
      />
    ))}
  </div>
);

export const CommunityCard = ({ community, onJoinClick }: CommunityCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col h-full [background:linear-gradient(65deg,#FFF_60.69%,#44BCFF_267.25%)] dark:[background:linear-gradient(83deg,rgba(29,36,42,0.00)_-40.94%,#20303B_95.73%)]"
      style={{
        borderRadius: "26.53px",
        padding: "17.5px 22.373px 17.5px 22.627px",
      }}
    >
      {/* Header: type + avatars + Join button */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#0F161ABF] dark:text-[#FFFFFFBF]">
            {community.type}
          </span>
          <MiniAvatars colors={community.avatarColors} />
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onJoinClick(community);
          }}
          className="text-[12px] px-3.5 py-1.5 rounded-full bg-white dark:bg-white/10 text-[#0F161A] dark:text-white hover:bg-gray-50 dark:hover:bg-white/20 transition font-medium shadow-sm"
        >
          Join Today
        </button>
      </div>

      {/* Community name — click navigates into community */}
      <h3
        className="text-[18px] font-semibold text-[#0F161A] dark:text-white mb-1.5 leading-snug cursor-pointer hover:opacity-80 transition"
        style={{ fontFamily: "Sora, sans-serif" }}
        onClick={() => navigate(`/community/${community.slug}`)}
      >
        {community.name}
      </h3>

      {/* Description */}
      <p className="text-[12px] leading-relaxed text-[#0F161ABF] dark:text-[#FFFFFFBF] line-clamp-3">
        {community.description}
      </p>
    </div>
  );
};
