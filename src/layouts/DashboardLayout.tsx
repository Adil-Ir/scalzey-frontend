import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";

const PAGE_TITLES: Record<string, string> = {
  "/home":                      "Home",
  "/dashboard":                 "Dashboard",
  "/events-workshops":          "Events & Workshops",
  "/calendar":                  "Calendar",
  "/courses/explore":           "Explore Courses",
  "/courses/enrolled":          "Enrolled Courses",
  "/courses/results":           "Results",
  "/community/explore":         "Communities",
  "/community/geki-learn":      "Geki Learn",
  "/community/product-visuals": "Product Visuals",
  "/community/dev-crown":       "Dev Crown",
  "/messages/chats":                "Chats",
  "/messages/savannah-nguyen":     "Savannah Nguyen",
  "/messages/jenny-wilson":        "Jenny Wilson",
  "/messages/guy-hawkins":         "Guy Hawkins",
  "/updates":                      "Updates",
  "/profile":                     "Profile",
  "/profile/:username":           "Profile",
  "/edit-onboarding-profile":     "Profile Setup",
};

export const DashboardLayout = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileSidebarOpen]);

  const pageTitle =
    PAGE_TITLES[pathname] ??
    (pathname.startsWith("/profile/") && pathname !== "/profile" ? "Profile" :
    pathname.startsWith("/courses/detail/") ? "Course Details" :
    pathname.match(/^\/classroom\/\d+\/module\/\d+\/lesson\/\d+$/) ? "Course Details" :
    pathname.startsWith("/community/") && pathname !== "/community/explore" ? "Community" :
    pathname.startsWith("/classroom/") ? "Classroom" :
    "Dashboard");

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex bg-[#F6F8F9] text-gray-900 dark:bg-[#0F161A] dark:text-slate-50">
      {/* Mobile overlay backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/50"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — overlay on mobile, inline on md+ */}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Right column — fills remaining width, locked to viewport height */}
      <div id="dashboard-main" className="relative flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar — always visible at top */}
        <Topbar
          pageTitle={pageTitle}
          onToggleSidebar={handleToggleSidebar}
        />
        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 xl:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
