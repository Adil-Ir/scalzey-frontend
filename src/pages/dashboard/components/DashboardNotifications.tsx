import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";

interface Notification {
  id: number;
  text: string;
  bg: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    text: "Complete your profile to unlock all features and get the best experience.",
    bg: "#20303B1A",
  },
  {
    id: 2,
    text: "There is a Deadline for course Product Designing coming up soon.",
    bg: "#83FF161A",
  },
  {
    id: 3,
    text: "Finish Client Communication Skills training before the end of this week.",
    bg: "#FF16161A",
  },
  {
    id: 4,
    text: "There is a Deadline for course Product Designing — 2 days remaining.",
    bg: "#FF16161A",
  },
];

export const DashboardNotifications = () => {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
        Notifications
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={14}
        slidesPerView={1.05}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640:  { slidesPerView: 1.5 },
          768:  { slidesPerView: 2.1 },
          1024: { slidesPerView: 2.6 },
          1280: { slidesPerView: 3.2 },
        }}
        loop
        style={{ padding: "4px 2px" }}
      >
        {NOTIFICATIONS.map((n) => (
          <SwiperSlide key={n.id}>
            <div
              className="flex justify-between items-center gap-3 rounded-[14px] p-3.5 transition-colors"
              style={{ backgroundColor: n.bg }}
            >
              <div className="flex gap-3 items-center">
                <HiOutlineInformationCircle
                  size={24}
                  className="shrink-0 mt-0.5 text-[#0F161ABF] dark:text-white"
                />
                <p className="flex-1 text-xs leading-relaxed max-w-48.25 text-[#0F161ABF] line-clamp-1 dark:text-[#FFFFFFBF]">
                  {n.text}
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
