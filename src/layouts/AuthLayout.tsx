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
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${authHeroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1440px] mx-auto h-screen w-full p-4 md:p-6 xl:p-10">
        {/* Theme toggle — top right */}
        <div className="w-full flex justify-between items-center">
          <div className="">
            <img
              src={logo}
              alt="Cotechy"
              className="w-[200px] h-[52px] object-contain"
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

        <div className="h-[calc(100%-52px)] flex items-center w-full">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 xl:gap-">

            <div className="hidden lg:flex w-full justify-center lg:justify-end">
              <div className="w-full py-20 flex justify-center items-center">
                <AuthHero />
              </div>
            </div>

            {/* Right auth card container */}
            <div className="w-full flex justify-center lg:justify-start">
              <div className="w-full py-20">
                <Outlet />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
