import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { HiOutlineInformationCircle } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";

interface Announcement {
  id: number;
  text: string;
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet consectetur. Suscipit sapien convallis neque sagittis malesuada mi erat natoque malesuada. Lorem ipsum dolor sit amet consectetur",
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet consectetur. Suscipit sapien convallis neque sagittis malesuada mi erat natoque malesuada. Lorem ipsum dolor sit amet consectetur",
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet consectetur. Suscipit sapien convallis neque sagittis malesuada mi erat natoque malesuada. Lorem ipsum dolor sit amet consectetur",
  },
];

export const LatestAnnouncement = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[#0F161A] dark:text-white mb-3">
        Latest Announcements
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1.1 },
          768: { slidesPerView: 1.2 },
          1024: { slidesPerView: 1.1},
          1280: { slidesPerView: 1.1 },
        }}
        loop
        style={{ padding: "4px 2px" }}
      >
        {ANNOUNCEMENTS.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex justify-between items-center gap-3 bg-[rgba(131,255,22,0.19)] dark:bg-[rgba(131,255,22,0.19)] rounded-[26.53px] p-3.5">
              <div className="flex  gap-3 items-center">
                <HiOutlineInformationCircle
                  size={24}
                  className="shrink-0 mt-0.5 text-[#0F161ABF] dark:text-white"
                />
                <p className="flex-1 text-sm leading-relaxed max-w-173 text-[#0F161ABF] dark:text-[#FFFFFFBF]">
                  {item.text}
                </p>
              </div>
              <button
                type="button"
                style={{ borderRadius: "50%" }}
                className="shrink-0 inline-flex h-8 w-8 items-center justify-center hover:border border-[#0F161A33] dark:border-[#ffffff33] text-[#0F161ABF] dark:text-white hover:border-current transition"
              >
                <FiArrowUpRight size={21} />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
