
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthLayout } from "./layouts/AuthLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { OtpPage } from "./pages/otp";
import { NewPasswordPage } from "./pages/new-password";
import { HomePage } from "./pages/home";
import { MainDashboardPage } from "./pages/dashboard/MainDashboardPage";
import { EventsWorkshopsPage } from "./pages/events-workshops";
import { CalendarPage } from "./pages/calendar";
import { ExploreCourses } from "./pages/explore-course";
import { EnrolledCoursesPage } from "./pages/enrolled-course";
import { CoursesResultsPage } from "./pages/results";
import { CourseDetailPage } from "./pages/course-detail";
import { ClassroomPage } from "./pages/classroom";
import { LessonDetailsPage } from "./pages/lesson-details";
import { CommunityExplorePage } from "./pages/dashboard/CommunityExplorePage";
import { CommunityGekiLearnPage } from "./pages/dashboard/CommunityGekiLearnPage";
import { CommunityProductVisualsPage } from "./pages/dashboard/CommunityProductVisualsPage";
import { CommunityDevCrownPage } from "./pages/dashboard/CommunityDevCrownPage";
import { MessagesChatsPage } from "./pages/dashboard/MessagesChatsPage";
import {
  SavannahNguyenPage,
  JennyWilsonPage,
  GuyHawkinsPage,
} from "./pages/dashboard/MessageDetailPage";
import { UpdatesPage } from "./pages/dashboard/UpdatesPage";

const App = () => {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/new-password" element={<NewPasswordPage />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<MainDashboardPage />} />
          <Route path="/events-workshops" element={<EventsWorkshopsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />

          <Route path="/courses/explore" element={<ExploreCourses />} />
          <Route path="/courses/enrolled" element={<EnrolledCoursesPage />} />
          <Route path="/courses/results" element={<CoursesResultsPage />} />
          <Route path="/courses/detail/:id" element={<CourseDetailPage />} />
          <Route path="/classroom/:id" element={<ClassroomPage />} />
          <Route
            path="/classroom/:courseId/module/:moduleId/lesson/:lessonId"
            element={<LessonDetailsPage />}
          />

          <Route path="/community/explore" element={<CommunityExplorePage />} />
          <Route
            path="/community/geki-learn"
            element={<CommunityGekiLearnPage />}
          />
          <Route
            path="/community/product-visuals"
            element={<CommunityProductVisualsPage />}
          />
          <Route
            path="/community/dev-crown"
            element={<CommunityDevCrownPage />}
          />

          <Route path="/messages/chats" element={<MessagesChatsPage />} />
          <Route
            path="/messages/savannah-nguyen"
            element={<SavannahNguyenPage />}
          />
          <Route path="/messages/jenny-wilson" element={<JennyWilsonPage />} />
          <Route path="/messages/guy-hawkins" element={<GuyHawkinsPage />} />

          <Route path="/updates" element={<UpdatesPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;