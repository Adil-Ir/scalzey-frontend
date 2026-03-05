import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineInformationCircle } from "react-icons/hi";

interface EnrolledCommunity {
  id: number;
  type: string;
  name: string;
  announcement: string;
  description: string;
  avatarColors: string[];
}

const ENROLLED_COMMUNITIES: EnrolledCommunity[] = [
  {
    id: 1,
    type: "Community",
    name: "#Geeki_learn",
    announcement: "Community Announcement",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    avatarColors: ["bg-pink-500", "bg-purple-500", "bg-blue-400"],
  },
  {
    id: 2,
    type: "Community",
    name: "#Geeki_learn",
    announcement: "Community Announcement",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    avatarColors: ["bg-yellow-500", "bg-green-500", "bg-pink-400"],
  },
  {
    id: 3,
    type: "Community",
    name: "#Geeki_learn",
    announcement: "Community Announcement",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    avatarColors: ["bg-red-500", "bg-orange-500", "bg-sky-400"],
  },
  {
    id: 4,
    type: "Community",
    name: "#Geeki_learn",
    announcement: "Community Announcement",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    avatarColors: ["bg-red-500", "bg-orange-500", "bg-sky-400"],
  },
  {
    id: 5,
    type: "Community",
    name: "#Geeki_learn",
    announcement: "Community Announcement",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    avatarColors: ["bg-red-500", "bg-orange-500", "bg-sky-400"],
  },
];

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

export const EnrolledCommunities = () => {
  return (
    <div>
      <h2 className="text-base font-semibold text-[#0F161A] dark:text-white mb-3">
        Enrolled Communities
      </h2>

      <Swiper
        className="equal-swiper"
        spaceBetween={16}
        slidesPerView={1.1}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.1 },
          1024: { slidesPerView: 2.5 },
          1280: { slidesPerView: 3.1 },
        }}
        style={{ padding: "4px 2px" }}
      >
        {ENROLLED_COMMUNITIES.map((community) => (
          <SwiperSlide key={community.id}>
          
            <div className="enrolled-card h-full flex flex-col p-4">
              {/* Card header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#0F161ABF] dark:text-[#FFFFFFBF]">
                    {community.type}
                  </span>
                  <MiniAvatars colors={community.avatarColors} />
                </div>
                <button
                  type="button"
                  className="inline-flex h-7 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-white/20 text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition"
                >
                  <FiArrowUpRight size={13} />
                </button>
              </div>

              {/* Community name */}
              <h3 className="text-lg font-semibold text-[#0F161A] dark:text-white mb-3">
                {community.name}
              </h3>

              {/* Announcement box — flex-1 so it fills remaining height */}
              <div className="flex-1 rounded-xl bg-gray-50 dark:bg-[#44BCFF14] p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <HiOutlineInformationCircle
                    size={14}
                    className="text-[#0F161A] dark:text-white"
                  />
                  <span className="text-xs font-medium text-[#44BCFF]">
                    {community.announcement}
                  </span>
                </div>
                <p className="text-[12px]  leading-relaxed text-[#0F161ABF] dark:text-[#FFFFFFBF]">
                  {community.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
