import { IoIosArrowBack } from "react-icons/io";
import { NewPasswordForm } from "./components/NewPasswordForm";
import { Link } from "react-router-dom";

export const NewPasswordPage = () => {
  return (
    <div className="w-full rounded-[26.53px] bg-white dark:bg-[#1D242A] px-17.5 pt-12.25 pb-24.5">
      <div className="mb-22.75 flex items-center justify-between">
        <Link
          to="/forgot-password"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-lg bg-gray-100 text-gray-600 dark:bg-[#20303B] dark:text-white"
        >
          <IoIosArrowBack />
        </Link>
      </div>
      <div className="space-y-1.5 mb-12">
        <h2 className="font-poppins text-[28.23px] font-medium leading-none text-gray-900 dark:text-white">
          Create New Password
        </h2>
        <p className="text-sm text-gray-500 dark:text-[#FFFFFFBF]">
          Use 8 or more characters with a mix of letters, numbers &amp; symbols
        </p>
      </div>
      <NewPasswordForm />
    </div>
  );
};
