import { NavLink } from "react-router-dom";

const TabPills = () => {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div className="w-full flex rounded-full text-xs md:text-sm overflow-hidden bg-gray-100 dark:bg-[#20303B]">
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            `flex-1 py-3 text-center transition ${
              isActive
                ? "bg-[#3DB5FF] text-white"
                : "text-gray-500 dark:text-slate-200"
            }`
          }
        >
          Sign up
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `flex-1 py-3 text-center transition ${
              isActive
                ? "bg-[#3DB5FF] text-white"
                : "text-gray-500 dark:text-slate-200"
            }`
          }
        >
          Log in
        </NavLink>
      </div>
    </div>
  );
};

export default TabPills;
