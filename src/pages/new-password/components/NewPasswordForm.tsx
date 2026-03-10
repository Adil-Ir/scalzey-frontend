import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";

type NewPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

const schema: yup.ObjectSchema<NewPasswordFormValues> = yup.object({
  password: yup
    .string()
    .min(8, "At least 8 characters")
    .matches(/[A-Z]/, "One uppercase letter required")
    .matches(/[0-9]/, "One number required")
    .matches(/[^A-Za-z0-9]/, "One symbol required")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

export const NewPasswordForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (_data: NewPasswordFormValues) => {
    navigate("/login");
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
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className={labelClass} htmlFor="password">New password</label>
          <button type="button" onClick={() => setShowPassword((p) => !p)} className={showHideClass}>
            {showPassword ? <><FiEyeOff /> Hide</> : <><FiEye /> Show</>}
          </button>
        </div>
        <div className={`${baseFieldClasses} flex items-center gap-2 ${getBorderClass(!!errors.password)}`}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className={inputClass}
            placeholder="Create a strong password"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-[11px] text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className={labelClass} htmlFor="confirmPassword">Confirm password</label>
          <button type="button" onClick={() => setShowConfirm((p) => !p)} className={showHideClass}>
            {showConfirm ? <><FiEyeOff /> Hide</> : <><FiEye /> Show</>}
          </button>
        </div>
        <div className={`${baseFieldClasses} flex items-center gap-2 ${getBorderClass(!!errors.confirmPassword)}`}>
          <input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            className={inputClass}
            placeholder="Repeat your password"
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-[11px] text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex w-44 items-center justify-center rounded-full bg-[#44BCFF] px-5 py-2.5 text-sm text-white"
      >
        Save password
      </button>
    </form>
  );
};
