import { Outlet } from "react-router-dom";
import { AuthHero } from "../components/auth/AuthHero";
import authHeroBg from "../assets/authherobg.png";

export const AuthLayout = () => {
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
      <div className="min-h-screen flex items-center">
        <div className="w-full max-w-8xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 ">
            <AuthHero />

            {/* Right auth card container */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="w-full  py-20">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
