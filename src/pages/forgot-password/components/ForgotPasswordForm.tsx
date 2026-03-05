import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type ForgotPasswordFormValues = {
  email: string;
};

const schema: yup.ObjectSchema<ForgotPasswordFormValues> = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (_data: ForgotPasswordFormValues) => {
    navigate("/otp");
  };

  const baseFieldClasses =
    "rounded-full bg-transparent px-4 py-2.5 text-sm transition-colors text-gray-900 dark:text-slate-50";

  const getBorderClass = (hasError: boolean) =>
    hasError
      ? "border border-red-500"
      : "border border-gray-200 dark:border-[#2D3D46] hover:border-[#44BCFF] focus-within:border-[#44BCFF]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="mb-10">
        <label
          className="font-poppins text-[13.259px] font-normal leading-none text-gray-900 dark:text-white"
          htmlFor="email"
        >
          Email address
        </label>
        <div className={`${baseFieldClasses} ${getBorderClass(!!errors.email)} mt-2`}>
          <input
            id="email"
            type="email"
            className="w-full bg-transparent text-sm text-gray-900 dark:text-slate-50 placeholder-gray-400 dark:placeholder-slate-400 outline-none border-none"
            placeholder="Enter your email"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="mt-2 text-[11px] text-red-500">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex w-32 items-center justify-center rounded-full bg-[#44BCFF] px-5 py-2.5 text-sm text-white"
      >
        Submit
      </button>
    </form>
  );
};
