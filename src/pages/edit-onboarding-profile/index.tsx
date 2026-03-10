import { ProfileForm } from "./components/ProfileForm";

export const EditOnboardingProfilePage = () => {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#1D242A] border border-gray-200 dark:border-[#2D3D46] p-4 sm:p-6 md:p-8">
      <h1 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-gray-900 dark:text-white mb-6 md:mb-8">Profile Setup</h1>
      <ProfileForm />
    </div>
  );
};
