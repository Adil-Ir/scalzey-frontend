import { WorkshopsSection } from "./components/WorkshopsSection";
import { EventsSection } from "./components/EventsSection";

export const EventsWorkshopsPage = () => {
  return (
    <div className="space-y-10">
      <WorkshopsSection />
      <EventsSection />
    </div>
  );
};
