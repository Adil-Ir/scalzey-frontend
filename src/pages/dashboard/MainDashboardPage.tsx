import { DashboardNotifications } from "./components/DashboardNotifications";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { DashboardCalendar } from "./components/DashboardCalendar";
import { ProgressWidget } from "./components/ProgressWidget";
import { ActiveCourses } from "./components/ActiveCourses";

export const MainDashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* Notifications */}
      <DashboardNotifications />

      {/* Actions row: Events | Calendar | Progress */}
      <div>
        <h2 className="text-lg  text-[] dark:text-white mb-3">
          Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <UpcomingEvents />
          <DashboardCalendar />
          <ProgressWidget />
        </div>
      </div>

      {/* Active Courses */}
      <ActiveCourses />
    </div>
  );
};
