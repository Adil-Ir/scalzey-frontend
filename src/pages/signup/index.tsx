import { SignupForm } from "./components/SignupForm";
import TabPills from "./components/TabPills";

export const SignupPage = () => {
  return (
    <section className="w-full rounded-[26.53px] bg-white dark:bg-[#1D242A] pt-12.25 px-16 pb-[70.565px]">
      <TabPills />
      <div className="">
        <div className="2xl:mb-10 xl:mb-8 mb-6">
          <h2 className="font-poppins text-[28.23px] font-medium leading-none text-gray-900 dark:text-white">
            Sign up
          </h2>
        </div>
        <SignupForm />
      </div>
    </section>
  );
};
