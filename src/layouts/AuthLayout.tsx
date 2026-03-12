import { Outlet } from "react-router-dom";
import { AuthHero } from "../components/auth/AuthHero";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import authHeroBg from "../assets/authherobg.png";
import logo from "../assets/logo.png";


export const AuthLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="min-h-screen relative flex flex-col"
      style={{
        backgroundImage: `url(${authHeroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-360 mx-auto min-h-screen w-full p-4 md:p-6 xl:p-10 flex flex-col flex-1">
        {/* Theme toggle — top right */}
        <div className="w-full flex justify-between items-center">
          <div className="relative z-10">
            <img
              src={logo}
              alt="Cotechy"
              
              className="xl:w-50  w-40 h-13 object-contain"
            />
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          >
            {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>
        </div>

        <div className="flex-1 min-h-0 flex items-center w-full overflow-y-auto">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-7">

            <div className="flex w-full justify-center lg:justify-end">
              <div className="w-full pt-10 flex justify-center items-center">
                <AuthHero />
              </div>
            </div>

            {/* Right auth card container */}
            <div className="w-full flex justify-center lg:justify-start">
              <div className="w-full md:py-10">
                <Outlet />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
