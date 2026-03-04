import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const OtpForm = () => {
  const navigate = useNavigate();
  const inputs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement | null>(null),
  );

  const handleChange = (index: number) => {
    const current = inputs[index].current;
    if (!current) return;

    const value = current.value.replace(/[^0-9]/g, "").slice(0, 1);
    current.value = value;

    if (value && index < inputs.length - 1) {
      inputs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !inputs[index].current?.value && index > 0) {
      inputs[index - 1].current?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: verify OTP before navigation
    navigate("/new-password");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-100">
          Enter OTP
        </label>
        <div className="flex justify-start gap-3">
          {inputs.map((ref, index) => (
            <input
              key={index}
              ref={ref}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#2D3D46] bg-transparent text-center text-lg text-slate-50 outline-none ring-0 transition-colors hover:border-sky-500 focus:border-sky-500"
              onChange={() => handleChange(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex w-32 items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(56,189,248,0.8)] transition hover:bg-sky-400"
      >
        Verify
      </button>
    </form>
  );
};

