import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AIChatbotSupport from './pages/ai-chatbot-support';
import CounselorDashboard from './pages/counselor-dashboard';
import StudentLogin from './pages/student-login';
import AppointmentBooking from './pages/appointment-booking';
import AdminAnalyticsDashboard from './pages/admin-analytics-dashboard';
import StudentDashboard from './pages/student-dashboard';
import AdminLogin from './pages/admin-login';
import CounselorLogin from './pages/counselor-login';
import RegisterPage from './pages/register';
import CounselorSessions from './pages/counselor-sessions';
import CounselorSchedule from './pages/counselor-schedule';
import SelfAssessmentPage from './pages/self-assessment';
import JournalPage from './pages/journal';
import ForumIndex from './pages/peer-support-forum';
import NewPost from './pages/peer-support-forum/NewPost';
import PostDetail from './pages/peer-support-forum/PostDetail';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<StudentLogin />} />
        <Route path="/ai-chatbot-support" element={<AIChatbotSupport />} />
        <Route path="/counselor-dashboard" element={<CounselorDashboard />} />
        <Route path="/counselor-sessions" element={<CounselorSessions />} />
        <Route path="/counselor-schedule" element={<CounselorSchedule />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/counselor-login" element={<CounselorLogin />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/appointment-booking" element={<AppointmentBooking />} />
        <Route path="/admin-analytics-dashboard" element={<AdminAnalyticsDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/self-assessment" element={<SelfAssessmentPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/peer-support-forum" element={<ForumIndex />} />
        <Route path="/peer-support-forum/new-post" element={<NewPost />} />
        <Route path="/peer-support-forum/post/:id" element={<PostDetail />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
