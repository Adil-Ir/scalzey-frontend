import { NewPasswordForm } from "./components/NewPasswordForm";

export const NewPasswordPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">
          Set new password
        </h2>
        <p className="text-sm text-slate-300">
          Choose a strong password to secure your account.
        </p>
      </div>
      <NewPasswordForm />
    </div>
  );
};

