import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";

type LoginFormValues = {
  email: string;
  password: string;
};

const schema: yup.ObjectSchema<LoginFormValues> = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data", data);
    navigate("/home");
  };

  const baseFieldClasses =
    "rounded-full bg-transparent px-4 py-2.5 text-sm transition-colors text-gray-900 dark:text-slate-50";

  const getBorderClass = (hasError: boolean) =>
    hasError
      ? "border border-red-500"
      : "border border-gray-200 dark:border-[#2D3D46] hover:border-[#44BCFF] focus-within:border-[#44BCFF]";

  const labelClass = "font-poppins text-[13.259px] font-normal leading-none text-gray-900 dark:text-white";
  const inputClass = "w-full bg-transparent text-sm text-gray-900 dark:text-slate-50 placeholder-gray-400 dark:placeholder-slate-400 outline-none border-none";
  const showHideClass = "inline-flex items-center gap-1 text-[11px] md:text-xs text-gray-400 dark:text-slate-300 hover:text-gray-700 dark:hover:text-slate-50";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5 mb-4">
        <label className={`${labelClass} mb-3`} htmlFor="email">
          Email address
        </label>
        <div className={`${baseFieldClasses} ${getBorderClass(!!errors.email)}`}>
          <input
            id="email"
            type="email"
            className={inputClass}
            placeholder="Enter your email"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-[11px] text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className={labelClass} htmlFor="password">
            Password
          </label>
          <button type="button" onClick={() => setShowPassword((p) => !p)} className={showHideClass}>
            {showPassword ? <><FiEyeOff /> Hide</> : <><FiEye /> Show</>}
          </button>
        </div>
        <div className={`${baseFieldClasses} flex items-center gap-2 ${getBorderClass(!!errors.password)}`}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className={inputClass}
            placeholder="Enter your password"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-[11px] text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-xs mt-1">
        <span />
        <Link
          to="/forgot-password"
          className="text-xs text-gray-500 dark:text-[#FFFFFFBF] hover:text-sky-400"
        >
          Forgot Password
        </Link>
      </div>

      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 flex sm:flex-row flex-col sm:items-center gap-5">
        <button
          type="submit"
          className="inline-flex w-32 items-center justify-center rounded-full bg-[#44BCFF] px-5 py-2.5 text-sm text-white"
        >
          Login
        </button>
        <p className="text-[13px] text-gray-500 dark:text-[#FFFFFFBF]">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-[#44BCFF] underline">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};
