import { Link } from "react-router-dom";
import { OtpForm } from "./components/OtpForm";

export const OtpPage = () => {
  return (
    <section className="w-full max-w-xl rounded-[32px] bg-[#050816]/90 border border-slate-700/60 shadow-[0_24px_80px_rgba(15,23,42,0.9)] px-8 py-8 md:px-10 md:py-10 backdrop-blur">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/forgot-password"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-lg hover:bg-slate-800"
        >
          ←
        </Link>
      </div>

      <div className="space-y-6">
        <div className="space-y-1.5">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Verify it&apos;s you
          </h2>
          <p className="text-sm text-slate-300 max-w-sm">
            We have sent a 6 digit code to your email address.
          </p>
        </div>
        <OtpForm />
      </div>
    </section>
  );
};

