import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import type { Community } from "../data";

const TOP_GRADIENTS = [
  "linear-gradient(90deg, #FBED96 0%, #ABECD6 100%)",
  "linear-gradient(90deg, #ECE9E6 0%, #FFF 100%)",
  "linear-gradient(90deg, #0052D4 0%, #9CECFB 100%)",
];

const MiniAvatars = ({ colors }: { colors: string[] }) => (
  <div className="flex -space-x-1.5">
    {colors.map((color, i) => (
      <span
        key={i}
        className={`inline-block h-5 w-5 rounded-full border-2 border-white ${color}`}
      />
    ))}
  </div>
);

interface TopCommunitySwiperProps {
  communities: Community[];
  onJoinClick: (community: Community) => void;
}

export const TopCommunitySwiper = ({
  communities,
  onJoinClick,
}: TopCommunitySwiperProps) => {
  const navigate = useNavigate();

  return (
    <Swiper
      className="equal-swiper"
      spaceBetween={16}
      slidesPerView={1.1}
      breakpoints={{
        640: { slidesPerView: 1.5 },
        768: { slidesPerView: 2.1 },
        1024: { slidesPerView: 2.6 },
        1280: { slidesPerView: 3.1 },
      }}
      style={{ padding: "4px 2px" }}
    >
      {communities.map((community, idx) => (
        <SwiperSlide key={community.id}>
          <div
            className="h-full flex flex-col"
            style={{
              borderRadius: "26.53px",
              padding: "17.5px 22.373px 17.5px 22.627px",
              background: TOP_GRADIENTS[idx % TOP_GRADIENTS.length],
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#0F161ABF]">
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
                className="text-[12px] px-3.5 py-1.5 rounded-full bg-white text-[#0F161A] hover:bg-white/80 transition font-medium shadow-sm"
              >
                {community.isPrivate ? "Request Join" : "Join Today"}
              </button>
            </div>

            {/* Name */}
            <h3
              className="text-[18px] font-semibold text-[#0F161A] mb-1.5 leading-snug cursor-pointer hover:opacity-80 transition"
              style={{ fontFamily: "Sora, sans-serif" }}
              onClick={() => navigate(`/community/${community.slug}`)}
            >
              {community.name}
            </h3>

            {/* Description */}
            <p className="text-[12px] leading-relaxed text-[#0F161ABF] line-clamp-3">
              {community.description}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
