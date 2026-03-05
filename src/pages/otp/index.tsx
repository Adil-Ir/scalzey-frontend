import { Link } from "react-router-dom";
import { OtpForm } from "./components/OtpForm";
import { IoIosArrowBack } from "react-icons/io";

export const OtpPage = () => {
  return (
    <section className="w-full rounded-[26.53px] bg-[#1D242A] px-17.5 pt-12.25 pb-24.5">
      <div className="mb-22.75 flex items-center justify-between">
        <Link
          to="/forgot-password"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#20303B]  text-white text-lg "
        >
          <IoIosArrowBack />
        </Link>
      </div>

      <div className="space-y-6">
        <div className="space-y-1.5 mb-12">
          <h2 className="font-poppins text-[28.23px] font-medium leading-none text-white">
            Verify It’s you
          </h2>
          <p className="text-sm text-[#FFFFFFBF]">
            We have sent a 6 digit code to your email address.
          </p>
        </div>
        <OtpForm />
      </div>
    </section>
  );
};
