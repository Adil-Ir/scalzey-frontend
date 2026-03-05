
import { LoginForm } from "./components/LoginForm";
import TabPills from "../signup/components/TabPills";

export const LoginPage = () => {


  return (
    <section className="w-full rounded-[26.53px] bg-[#1D242A] pt-12.25 pr-[72.852px] pb-[70.565px] pl-17.5">
     <TabPills />

      <div className="space-y-6">
        <div className="space-y-1.5">
           <div className="2xl:mb-10 xl:mb-8 mb-6">
          <h2 className="font-poppins text-[28.23px] font-medium leading-none text-white">
            Login
          </h2>
        </div>
        </div>
        <LoginForm />
      </div>
    </section>
  );
};

