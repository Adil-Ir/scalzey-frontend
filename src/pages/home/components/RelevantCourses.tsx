import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FiStar } from "react-icons/fi";

interface Course {
  id: number;
  category: string;
  categoryStyle: string;
  title: string;
  description: string;
  instructor: string;
  instructorColor: string;
  members: string;
  rating: number;
}

const COURSES: Course[] = [
  {
    id: 1,
    category: "Design",
    categoryStyle: "border-[#91FF82] text-[#91FF82]",
    title: "Advances User Experience",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    instructor: "Dwoskey",
    instructorColor: "bg-pink-500",
    members: "300+",
    rating: 4.2,
  },
  {
    id: 2,
    category: "Development",
    categoryStyle: "border-[#978CFF] text-[#978CFF]",
    title: "Advance Java",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    instructor: "Dwoskey",
    instructorColor: "bg-purple-500",
    members: "300+",
    rating: 4.5,
  },
  {
    id: 3,
    category: "Management",
    categoryStyle: "border-[#FF7E94] text-[#FF7E94]",
    title: "Project Management",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    instructor: "Dwoskey",
    instructorColor: "bg-orange-500",
    members: "300+",
    rating: 4.0,
  },
  {
    id: 4,
    category: "Management",
    categoryStyle: "border-[#91FF82] text-[#91FF82]",
    title: "Project Management",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    instructor: "Dwoskey",
    instructorColor: "bg-orange-500",
    members: "300+",
    rating: 4.0,
  },
];

const MemberAvatars = () => (
  <div className="flex -space-x-1.5">
    {["bg-pink-400", "bg-yellow-400", "bg-sky-400"].map((color, i) => (
      <span
        key={i}
        className={`inline-block h-5 w-5 rounded-full border-2 border-white dark:border-[#1D242A] ${color}`}
      />
    ))}
  </div>
);

export const RelevantCourses = () => {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
        Most Relevant Courses
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
        {COURSES.map((course) => (
          <SwiperSlide key={course.id}>
            <div
              className="h-full flex flex-col gap-3 bg-white dark:bg-[#1D242A]"
              style={{ borderRadius: "26.53px", padding: "26px" }}
            >
              {/* Category pill */}
              <span
                className={`self-start text-[11px] font-medium px-3 py-1 rounded-full border ${course.categoryStyle}`}
              >
                {course.category}
              </span>

              {/* Title */}
              <h3 className="text-[15px] font-semibold leading-snug text-gray-900 dark:text-white">
                {course.title}
              </h3>

              {/* Description */}
              <p className="flex-1 text-[12px] leading-relaxed text-gray-500 dark:text-[#FFFFFFBF]">
                {course.description}
              </p>

              {/* Instructor + members row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-7 w-7 rounded-full items-center justify-center text-white text-[11px] font-bold ${course.instructorColor}`}
                  >
                    {course.instructor[0]}
                  </span>
                  <span className="text-[12px] text-gray-600 dark:text-[#FFFFFFBF]">
                    {course.instructor}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-medium text-gray-500 dark:text-slate-400">
                    {course.members}
                  </span>
                  <MemberAvatars />
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-100 dark:border-white/10" />

              {/* Rating + Get Course */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FiStar
                    size={15}
                    className="text-yellow-400 fill-yellow-400"
                  />
                  <span className="text-[13px] font-semibold text-gray-900 dark:text-white">
                    {course.rating.toFixed(1)}
                  </span>
                </div>
                <button
                  type="button"
                  className="px-5 py-2 rounded-full bg-[#44BCFF] text-white text-[12px] font-medium hover:bg-[#2eaef5] transition"
                >
                  Get Course
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
