import { LoginForm } from "./components/LoginForm";
import TabPills from "../signup/components/TabPills";

export const LoginPage = () => {
  return (
    <section className="w-full rounded-[26px] bg-white dark:bg-[#1D242A] md:p-12 p-6 xl:p-16">
      <TabPills />
      <div className="space-y-6">
        <div className="space-y-1.5">
          <div className="2xl:mb-10 xl:mb-8 mb-6">
            <h2 className="font-poppins md:text-[28.23px] text-2xl font-medium leading-none text-gray-900 dark:text-white">
              Login
            </h2>
          </div>
        </div>
        <LoginForm />
      </div>
    </section>
  );
};
