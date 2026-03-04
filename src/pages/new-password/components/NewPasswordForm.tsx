import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export const NewPasswordForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: update password via API
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label
          className="text-sm font-medium text-slate-100"
          htmlFor="password"
        >
          New password
        </label>
        <input
          id="password"
          type="password"
          required
          className="w-full rounded-md border border-[#2D3D46] bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
          placeholder="Create a strong password"
        />
      </div>

      <div className="space-y-1.5">
        <label
          className="text-sm font-medium text-slate-100"
          htmlFor="confirmPassword"
        >
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          className="w-full rounded-md border border-[#2D3D46] bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
          placeholder="Repeat your password"
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-sky-500 px-3 py-2 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-sky-400"
      >
        Save new password
      </button>
    </form>
  );
};

