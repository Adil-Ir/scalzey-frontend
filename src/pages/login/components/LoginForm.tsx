import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
export const LoginForm = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: hook into real auth flow
  };

    const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5 mb-4">
        <label
          className="font-poppins text-[13.259px] mb-3 font-normal leading-none text-white"
          htmlFor="email"
        >
          Email address
        </label>
        <div className="rounded-full border border-[#2D3D46] bg-transparent px-4 py-2.5 text-sm text-slate-50 transition-colors hover:border-sky-500 focus-within:border-sky-500">
          <input
            id="email"
            type="email"
            required
            className="w-full bg-transparent text-sm text-slate-50 placeholder-slate-400 outline-none border-none"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="space-y-1.5 ">
        <div className="flex items-center justify-between">
          <label
            className="font-poppins text-[13.259px] font-normal leading-none text-white"
            htmlFor="password"
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="inline-flex items-center gap-1 text-[11px] md:text-xs text-slate-300 hover:text-slate-50"
          >
            {showPassword ? (
              <>
                <FiEyeOff /> Hide
              </>
            ) : (
              <>
                <FiEye /> Show
              </>
            )}
          </button>
        </div>
        <div className="rounded-full border border-[#2D3D46] bg-transparent px-4 py-2.5 text-sm text-slate-50 flex items-center gap-2 transition-colors hover:border-sky-500 focus-within:border-sky-500">
          <input
            id="password"
          type={showPassword ? "text" : "password"}
            required
            className="w-full bg-transparent text-sm text-slate-50 placeholder-slate-400 outline-none border-none"
            placeholder="Enter your password"
          />
       
        </div>
      </div>

      <div className="flex items-center justify-between text-xs mt-1">
        <span className="text-slate-400"> </span>
        <Link
          to="/forgot-password"
          className="text-xs text-[#FFFFFFBF] hover:text-sky-400"
        >
          Forgot Password
        </Link>
      </div>

      <div className="xl:mt12 lg:mt-10 md:mt-8 mt-6 flex items-center gap-5">
        <button
        type="submit"
          className="inline-flex w-32 items-center justify-center rounded-full bg-[#44BCFF] px-5 py-2.5 text-sm  text-white"
        >
        Login
      </button>

      <p  className="text-[13px] text-[#FFFFFFBF]">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="text-[#44BCFF] underline"
        >
          Sign Up
        </Link>
      </p>
      </div>
    </form>
  );
};
