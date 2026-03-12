import { SignupForm } from "./components/SignupForm";
import TabPills from "./components/TabPills";

export const SignupPage = () => {
  return (
    <section className="w-full rounded-[26px] bg-white dark:bg-[#1D242A] lg:p-12 p-6 xl:p-16">
      <TabPills />
      <div className="">
        <div className="2xl:mb-10 xl:mb-8 mb-5">
          <h2 className="font-poppins lg:text-[28.23px] text-2xl font-medium leading-none text-gray-900 dark:text-white">
            Sign up
          </h2>
        </div>
        <SignupForm />
      </div>
    </section>
  );
};
