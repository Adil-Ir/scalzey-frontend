import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { IoIosArrowBack } from "react-icons/io";

export const ForgotPasswordPage = () => {
  return (
    <section className="w-full rounded-[26.53px] bg-white dark:bg-[#1D242A] xl:px-17.5 px-7 xl:pt-12.25 pt-7 xl:pb-24.5 pb-10">
      <div className="xl:mb-24 lg:mb-20 md:mb-16 mb-6 flex items-center justify-between">
        <Link
          to="/login"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-lg bg-gray-100 text-gray-600 dark:bg-[#20303B] dark:text-white"
        >
          <IoIosArrowBack />
        </Link>
      </div>

      <div className="space-y-6">
        <div className="space-y-1.5 xl:mb-10 mb-4">
          <h2 className="font-poppins lg:text-[28.23px] text-2xl font-medium leading-none text-gray-900 dark:text-white">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-500 dark:text-[#FFFFFFBF]">
            Please enter email associated with your account.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </section>
  );
};
