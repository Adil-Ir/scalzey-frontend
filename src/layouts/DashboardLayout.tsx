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
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      <Sidebar collapsed={collapsed} />

      <main className="flex-1 flex flex-col min-w-0">
        <Topbar
          pageTitle={pageTitle}
          onToggleSidebar={() => setCollapsed((prev) => !prev)}
        />
        <section className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
};
