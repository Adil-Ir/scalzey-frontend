import { Outlet } from "react-router-dom";
import { AuthHero } from "../components/auth/AuthHero";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import authHeroBg from "../assets/authherobg.png";

export const AuthLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${authHeroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Theme toggle — top right */}
      <div className="absolute top-5 right-6 z-20">
        <button
          type="button"
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full transition bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
        >
          {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
        </button>
      </div>

      <div className="min-h-screen flex items-center">
        <div className="w-full max-w-[1140px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <AuthHero />

            {/* Right auth card container */}
            <div className="w-full flex justify-center lg:justify-end">
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
