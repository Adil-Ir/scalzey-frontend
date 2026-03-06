import { Link } from "react-router-dom";
import { OtpForm } from "./components/OtpForm";
import { IoIosArrowBack } from "react-icons/io";

export const OtpPage = () => {
  return (
    <section className="w-full rounded-[26px] bg-white dark:bg-[#1D242A] p-12 xl:p-16">
      <div className="mb-22.75 flex items-center justify-between">
        <Link
          to="/forgot-password"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-lg bg-gray-100 text-gray-600 dark:bg-[#20303B] dark:text-white"
        >
          <IoIosArrowBack />
        </Link>
      </div>

      <div className="space-y-6">
        <div className="space-y-1.5 mb-12">
          <h2 className="font-poppins text-[28.23px] font-medium leading-none text-gray-900 dark:text-white">
            Verify It's you
          </h2>
          <p className="text-sm text-gray-500 dark:text-[#FFFFFFBF]">
            We have sent a 6 digit code to your email address.
          </p>
        </div>
        <OtpForm />
      </div>
    </section>
  );
};
