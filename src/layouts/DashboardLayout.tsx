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
  "/messages/chats":                "Chats",
  "/messages/savannah-nguyen":     "Savannah Nguyen",
  "/messages/jenny-wilson":        "Jenny Wilson",
  "/messages/guy-hawkins":         "Guy Hawkins",
  "/updates":                      "Updates",
};

export const DashboardLayout = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const pageTitle = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <div className="h-screen overflow-hidden flex bg-[#F6F8F9] text-gray-900 dark:bg-[#0F161A] dark:text-slate-50">
      {/* Sidebar — fixed height, never scrolls the page */}
      <Sidebar collapsed={collapsed} />

      {/* Right column — fills remaining width, locked to viewport height */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar — always visible at top */}
        <Topbar
          pageTitle={pageTitle}
          onToggleSidebar={() => setCollapsed((prev) => !prev)}
        />
        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 xl:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
