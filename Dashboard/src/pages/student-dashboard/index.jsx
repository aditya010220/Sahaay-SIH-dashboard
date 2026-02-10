import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WelcomeSection from './components/WelcomeSection';
import QuickActionsGrid from './components/QuickActionsGrid';
import ProgressOverview from './components/ProgressOverview';
import RecentActivity from './components/RecentActivity';
import UpcomingAppointments from './components/UpcomingAppointments';
import ResourceHub from './components/ResourceHub';
import PeerSupportPreview from './components/PeerSupportPreview';
import MotivationTicker from './components/MotivationTicker';
import StudentProfile from './components/StudentProfile';
import StudentSettings from './components/StudentSettings';

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentMood, setCurrentMood] = useState('neutral');
  const [userName, setUserName] = useState(() => localStorage.getItem('studentName') || 'Alex');

  // Mock user data - in real app this would come from authentication context
  const userData = {
    name: userName,
    email: 'alex.student@university.edu',
    studentId: 'STU2024001',
    currentMood: currentMood,
    joinDate: new Date('2024-01-15'),
    lastLogin: new Date()
  };

  useEffect(() => {
    document.title = 'Student Dashboard - Sahaay';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    try { localStorage.setItem('studentName', userName); } catch { }
  }, [userName]);

  const handleMoodUpdate = (newMood) => {
    setCurrentMood(newMood);
  };

  const section = new URLSearchParams(location.search).get('section');

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {section === 'profile' && (
            <>
              <div className="mb-6">
                <button onClick={() => navigate('/student-dashboard')} className="text-sm text-primary hover:underline">← Back to Dashboard</button>
              </div>
              <StudentProfile user={userData} onUpdateName={setUserName} />
            </>
          )}

          {section === 'settings' && (
            <>
              <div className="mb-6">
                <button onClick={() => navigate('/student-dashboard')} className="text-sm text-primary hover:underline">← Back to Dashboard</button>
              </div>
              <StudentSettings />
            </>
          )}

          {!section && (
            <>
              <div className="mb-8">
                <WelcomeSection
                  userName={userData?.name}
                  currentMood={currentMood}
                  onMoodUpdate={handleMoodUpdate}
                />
              </div>

              <div className="mb-8">
                <MotivationTicker />
              </div>

              <div className="mb-8">
                <QuickActionsGrid />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 space-y-8">
                  <ProgressOverview />
                  <RecentActivity />
                </div>
                <div className="lg:col-span-1">
                  <UpcomingAppointments />
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <ResourceHub />
                <PeerSupportPreview />
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-red-600"
                      >
                        <path
                          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-red-900">
                        Need Immediate Support?
                      </h3>
                      <p className="text-sm text-red-700">
                        Crisis support is available 24/7. You're not alone.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                      Call 14416
                    </button>
                    <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                      Chat Now
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
