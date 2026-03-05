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
    bg: "rgba(131,255,22,0.18)",
  },
  {
    id: 2,
    text: "There is a Deadline for course Product Designing coming up soon.",
    bg: "rgba(131,255,22,0.18)",
  },
  {
    id: 3,
    text: "Finish Client Communication Skills training before the end of this week.",
    bg: "rgba(255,126,148,0.14)",
  },
  {
    id: 4,
    text: "There is a Deadline for course Product Designing — 2 days remaining.",
    bg: "rgba(255,126,148,0.14)",
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
              className="flex items-center justify-between gap-3 rounded-[26.53px] px-4 py-3.5"
              style={{ background: n.bg }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <HiOutlineInformationCircle
                  size={22}
                  className="shrink-0 text-[#0F161ABF] dark:text-white"
                />
                <p className="text-sm leading-relaxed text-[#0F161ABF] dark:text-[#FFFFFFBF] truncate">
                  {n.text}
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 inline-flex h-8 w-8 rounded-full items-center justify-center border border-[#0F161A33] dark:border-[#ffffff33] text-[#0F161ABF] dark:text-white hover:opacity-80 transition"
              >
                <FiArrowUpRight size={18} />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
