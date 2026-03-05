import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";

const PAGE_TITLES: Record<string, string> = {
  "/":                          "Home",
  "/dashboard":                 "Dashboard",
  "/events-workshops":          "Events & Workshops",
  "/calendar":                  "Calendar",
  "/courses/explore":           "Explore Courses",
  "/courses/enrolled":          "Enrolled Courses",
  "/courses/results":           "Results",
  "/community/explore":         "Community",
  "/community/geki-learn":      "Geki Learn",
  "/community/product-visuals": "Product Visuals",
  "/community/dev-crown":       "Dev Crown",
  "/messages/chats":            "Chats",
  "/updates":                   "Updates",
};

export const DashboardLayout = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const pageTitle = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <div className="min-h-screen flex bg-[#F6F8F9] text-gray-900 dark:bg-[#0F161A] dark:text-slate-50">
      {/* Fixed sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Right column — grows with content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky topbar */}
        <Topbar
          pageTitle={pageTitle}
          onToggleSidebar={() => setCollapsed((prev) => !prev)}
        />
        {/* Content */}
        <main className="flex-1 p-4 md:p-6 xl:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
