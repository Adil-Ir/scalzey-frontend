import { FormEvent } from "react";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: hook into real auth flow
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-100" htmlFor="email">
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

      <div className="space-y-1.5">
        <label
          className="text-sm font-medium text-slate-100"
          htmlFor="password"
        >
          Password
        </label>
        <div className="rounded-full border border-[#2D3D46] bg-transparent px-4 py-2.5 text-sm text-slate-50 flex items-center gap-2 transition-colors hover:border-sky-500 focus-within:border-sky-500">
          <input
            id="password"
            type="password"
            required
            className="w-full bg-transparent text-sm text-slate-50 placeholder-slate-400 outline-none border-none"
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="text-[11px] md:text-xs text-slate-300 hover:text-slate-50"
          >
            Hide
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs mt-1">
        <span className="text-slate-400">{" "}</span>
        <Link
          to="/forgot-password"
          className="text-[11px] md:text-xs text-slate-300 hover:text-sky-400"
        >
          Forgot Password
        </Link>
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex w-32 items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(56,189,248,0.8)] transition hover:bg-sky-400"
      >
        Login
      </button>

      <p className="text-xs text-slate-400 mt-2">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-sky-400 hover:text-sky-300"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
};

