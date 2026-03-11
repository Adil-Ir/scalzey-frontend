import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "react-phone-input-2/lib/style.css";

type SignupFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  terms: boolean;
  marketing: boolean;
};

const schema: yup.ObjectSchema<SignupFormValues> = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .min(8, "At least 8 characters")
    .matches(/[A-Z]/, "One uppercase letter required")
    .matches(/[0-9]/, "One number required")
    .matches(/[^A-Za-z0-9]/, "One symbol required")
    .required("Password is required"),
  terms: yup.boolean().oneOf([true], "You must agree to the terms").required(),
  marketing: yup.boolean().optional().default(false),
});

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: SignupFormValues) => {
    console.log("Signup data", data);
    navigate("/edit-onboarding-profile");
  };

  const baseFieldClasses =
    "rounded-full bg-transparent px-4 h-[47px] min-h-[47px] flex items-center text-sm transition-colors text-gray-900 dark:text-slate-50";

  const getBorderClass = (hasError: boolean) =>
    hasError
      ? "border border-red-500"
      : "border border-gray-200 dark:border-[#2D3D46] hover:border-[#44BCFF] focus-within:border-[#44BCFF]";

  const labelClass = "font-poppins text-[13.259px] font-normal leading-none text-gray-900 dark:text-white";
  const inputClass = "w-full bg-transparent text-sm text-gray-900 dark:text-slate-50 placeholder-gray-400 dark:placeholder-slate-400 outline-none border-none";
  const showHideClass = "inline-flex items-center gap-1 text-[11px] md:text-xs text-gray-400 dark:text-slate-300 hover:text-gray-700 dark:hover:text-slate-50";
  const mutedTextClass = "text-[11px] text-gray-500 dark:text-[#FFFFFFBF]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
        <div className="space-y-1.5">
          <label className={`${labelClass} mb-3`} htmlFor="firstName">First name</label>
          <div className={`${baseFieldClasses} ${getBorderClass(!!errors.firstName)}`}>
            <input id="firstName" type="text" className={inputClass} placeholder="First name" {...register("firstName")} />
          </div>
          {errors.firstName && <p className="mt-1 text-[11px] text-red-500">{errors.firstName.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="lastName">Last name</label>
          <div className={`${baseFieldClasses} ${getBorderClass(!!errors.lastName)}`}>
            <input id="lastName" type="text" className={inputClass} placeholder="Last name" {...register("lastName")} />
          </div>
          {errors.lastName && <p className="mt-1 text-[11px] text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
        <label className={labelClass} htmlFor="email">Email address</label>
        <div className={`${baseFieldClasses} ${getBorderClass(!!errors.email)}`}>
          <input id="email" type="email" className={inputClass} placeholder="Enter your email" {...register("email")} />
        </div>
        {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5 mb-3">
        <label className={labelClass} htmlFor="phone">Phone number</label>
        <div className={`${baseFieldClasses} gap-3 ${getBorderClass(!!errors.phone)}`}>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                country="us"
                value={value}
                onChange={(val) => onChange(val)}
                inputProps={{ name: "phone", id: "phone" }}
                containerClass="w-full"
                containerStyle={{ height: 47, minHeight: 47 }}
                inputStyle={{ height: 47, minHeight: 47 }}
                buttonClass="!bg-transparent !border-none"
                dropdownClass="!bg-slate-900 !text-slate-50"
              />
            )}
          />
        </div>
        {errors.phone && <p className="mt-1 text-[11px] text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className={labelClass} htmlFor="password">Password</label>
          <button type="button" onClick={() => setShowPassword((p) => !p)} className={showHideClass}>
            {showPassword ? <><FiEyeOff /> Hide</> : <><FiEye /> Show</>}
          </button>
        </div>
        <div className={`${baseFieldClasses} ${getBorderClass(!!errors.password)}`}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className={inputClass}
            placeholder="Create a strong password"
            {...register("password")}
          />
        </div>
        {errors.password && <p className="mt-1 text-[11px] text-red-500">{errors.password.message}</p>}
        <p className={`${mutedTextClass} mb-8`}>
          Use 8 or more characters with a mix of letters, numbers &amp; symbols
        </p>
      </div>

      <div className={mutedTextClass}>
        <label className="flex items-start gap-2 mb-6">
          <input
            type="checkbox"
            className="mt-0.5 h-3.5 w-3.5 rounded border border-[#44BCFF] bg-transparent text-[#44BCFF]"
            {...register("terms")}
          />
          <span>
            By creating an account, I agree to our{" "}
            <button type="button" className="text-sky-400 underline">Terms of use</button>{" "}
            and{" "}
            <button type="button" className="text-sky-400 underline">Privacy Policy</button>.
          </span>
        </label>
        {errors.terms && <p className="mt-1 text-[11px] text-red-500">{errors.terms.message}</p>}

        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            className="mt-0.5 h-3.5 w-3.5 rounded border border-[#44BCFF] bg-transparent text-[#44BCFF]"
            {...register("marketing")}
          />
          <span>
            By creating an account, I am also consenting to receive SMS messages and emails,
            including product new feature updates, events, and marketing promotions.
          </span>
        </label>
      </div>

      <div className="mt-6 flex items-center gap-5">
        <button
          type="submit"
          className="inline-flex w-32 items-center justify-center rounded-full bg-[#44BCFF] px-5 py-2.5 text-sm text-white"
        >
          Sign up
        </button>
        <p className={`text-[13px] ${mutedTextClass}`}>
          Already have an account?{" "}
          <Link to="/login" className="text-[#44BCFF] underline">Log in</Link>
        </p>
      </div>
    </form>
  );
};
