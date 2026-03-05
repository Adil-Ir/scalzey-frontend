import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import OTPInput from "react-otp-input";

type OtpFormValues = {
  otp: string;
};

const schema: yup.ObjectSchema<OtpFormValues> = yup.object({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "Please enter all 6 digits"),
});

export const OtpForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const {
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  const handleChange = (value: string) => {
    setOtp(value);
    setValue("otp", value);
    trigger("otp");
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (_data: OtpFormValues) => {
    // TODO: verify OTP before navigation
    navigate("/new-password");
  };

  const hasError = !!errors.otp;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <OTPInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          shouldAutoFocus
          inputType="tel"
          skipDefaultStyles
          renderInput={(inputProps) => (
            <input
              {...inputProps}
              style={{ width: "76px", height: "46px" }}
              className={`rounded-full border bg-transparent text-center text-lg text-slate-50 outline-none transition-colors
                ${
                  hasError
                    ? "border-red-500"
                    : "border-[#2D3D46] hover:border-[#44BCFF] focus:border-[#44BCFF]"
                }`}
            />
          )}
          containerStyle={{ display: "flex", gap: "10px" }}
        />
        {errors.otp && (
          <p className="text-[11px] text-red-500">{errors.otp.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-32 items-center justify-center rounded-full bg-[#44BCFF] px-5 py-2.5 text-sm text-white"
      >
        Verify
      </button>
    </form>
  );
};
