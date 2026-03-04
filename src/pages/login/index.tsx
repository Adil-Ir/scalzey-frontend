import { NavLink, useLocation } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";

export const LoginPage = () => {
  const { pathname } = useLocation();

  return (
    <section className="w-full max-w-xl rounded-[26.53px] bg-[#1D242A] pt-[49px] pr-[72.852px] pb-[70.565px] pl-[70px]">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="w-full flex rounded-full bg-[#20303B] text-xs md:text-sm overflow-hidden">
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `flex-1 py-2.5 text-center transition ${
                isActive
                  ? "bg-[#20303B] text-white"
                  : "text-slate-200"
              }`
            }
          >
            Sign up
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex-1 py-2.5 text-center transition ${
                isActive || pathname === "/"
                  ? "bg-[#3DB5FF] text-white"
                  : "text-slate-200"
              }`
            }
          >
            Log in
          </NavLink>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-1.5">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Login
          </h2>
          <p className="text-sm text-slate-300">
            Enter your email and password to access your account.
          </p>
        </div>
        <LoginForm />
      </div>
    </section>
  );
};

