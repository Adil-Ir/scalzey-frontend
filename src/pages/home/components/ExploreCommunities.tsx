import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface ExploreCommunity {
  id: number;
  type: string;
  name: string;
  description: string;
  avatarColors: string[];
  gradient: string;
  textStyle: string;
  subTextStyle: string;
  btnStyle: string;
  avatarBorder: string;
}

const EXPLORE_COMMUNITIES: ExploreCommunity[] = [
  {
    id: 1,
    type: "Community",
    name: "#Geeki_learn",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    avatarColors: ["bg-pink-500", "bg-purple-500", "bg-blue-400"],
    gradient: "linear-gradient(90deg, #FBED96 0%, #ABECD6 100%)",
    textStyle: "text-gray-900",
    subTextStyle: "text-gray-700",
    btnStyle: "bg-white/60 text-gray-900 hover:bg-white/80",
    avatarBorder: "border-[#FBED96]",
  },
  {
    id: 2,
    type: "Community",
    name: "#Geeki_learn",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    avatarColors: ["bg-yellow-500", "bg-green-500", "bg-pink-400"],
    gradient: "linear-gradient(90deg, #ECE9E6 0%, #FFF 100%)",
    textStyle: "text-gray-900",
    subTextStyle: "text-gray-600",
    btnStyle: "bg-white/70 text-gray-900 hover:bg-white/90",
    avatarBorder: "border-[#ECE9E6]",
  },
  {
    id: 3,
    type: "Community",
    name: "#Geeki_learn",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    avatarColors: ["bg-red-400", "bg-orange-400", "bg-sky-400"],
    gradient: "linear-gradient(90deg, #0052D4 0%, #9CECFB 100%)",
    textStyle: "text-white",
    subTextStyle: "text-white/80",
    btnStyle: "bg-white/20 text-white hover:bg-white/30",
    avatarBorder: "border-[#0052D4]",
  },
  {
    id: 4 ,
    type: "Community",
    name: "#Geeki_learn",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    avatarColors: ["bg-red-400", "bg-orange-400", "bg-sky-400"],
    gradient: "linear-gradient(90deg, #EE9CA7 0%, #FFDDE1 100%)",
    textStyle: "text-white",
    subTextStyle: "text-white/80",
    btnStyle: "bg-white/20 text-white hover:bg-white/30",
    avatarBorder: "border-[#0052D4]",
  },
];

const MiniAvatars = ({
  colors,
  border,
}: {
  colors: string[];
  border: string;
}) => (
  <div className="flex -space-x-1.5">
    {colors.map((color, i) => (
      <span
        key={i}
        className={`inline-block h-5 w-5 rounded-full border-2 ${border} ${color}`}
      />
    ))}
  </div>
);

export const ExploreCommunities = () => {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
        Explore Communities
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
        {EXPLORE_COMMUNITIES.map((community) => (
          <SwiperSlide key={community.id}>
            <div
              className="h-full flex flex-col p-6"
              style={{
                borderRadius: "26.53px",
                background: community.gradient,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs text-[#0F161ABF]`}>
                    {community.type}
                  </span>
                  <MiniAvatars
                    colors={community.avatarColors}
                    border={community.avatarBorder}
                  />
                </div>
                <button
                  type="button"
                  className={`text-xs  px-3 py-2 rounded-full text-[#0F161A] transition bg-white`}
                >
                  Join Today
                </button>
              </div>

              {/* Name */}
              <h3
                className={`text-[18px] text-[#0F161A] font-semibold mb-1.5 `}
              >
                {community.name}
              </h3>

              {/* Description */}
              <p
                className={`flex-1 max-w-68 text-[12px] leading-relaxed text-[#0F161ABF]`}
              >
                {community.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
