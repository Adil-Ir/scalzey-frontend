import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProfileProvider } from "./context/UserProfileContext";
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
import { ExploreCommunityPage } from "./pages/explore-community";
import { ChatPage } from "./pages/chat";
import { CommunityChannelPage } from "./pages/community-channel";
import { UpdatesPage } from "./pages/dashboard/UpdatesPage";
import { EditOnboardingProfilePage } from "./pages/edit-onboarding-profile";
import { ProfilePage } from "./pages/profile";
import { PublicProfilePage } from "./pages/profile/PublicProfilePage";

const App = () => {
  return (
    <ThemeProvider>
      <UserProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/new-password" element={<NewPasswordPage />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="/home" element={<HomePage />} />
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

            {/* Community — explore + dynamic :slug */}
            <Route path="/community/explore" element={<ExploreCommunityPage />} />
            <Route path="/community/:slug" element={<CommunityChannelPage />} />

            <Route path="/messages/chats" element={<ChatPage />} />
            <Route path="/messages/:slug" element={<ChatPage />} />

            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:username" element={<PublicProfilePage />} />
            <Route path="/edit-onboarding-profile" element={<EditOnboardingProfilePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      </UserProfileProvider>
    </ThemeProvider>
  );
};

export default App;
