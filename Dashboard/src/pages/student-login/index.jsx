import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import AuthIllustration from './components/AuthIllustration';
import AuthLinks from './components/AuthLinks';
import FloatingLeaves from './components/FloatingLeaves';

const StudentLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (isAuthenticated === 'true' && userRole === 'student') {
      navigate('/student-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <Header isAuthenticated={false} />
      {/* Floating background elements */}
      <FloatingLeaves />
      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Illustration Panel */}
          <div className="hidden lg:block">
            <AuthIllustration />
          </div>
          {/* Auth Card */}
          <div className="max-w-md w-full lg:ml-auto">
            <div className="glass-card rounded-2xl p-8 sm:p-10 shadow-prominent gentle-transition hover:shadow-lg">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">Welcome Back!</h1>
                <p className="text-sm text-muted-foreground">Let’s get you signed in and ready to go.</p>
              </div>
              <LoginForm />
              <div className="mt-8 pt-6 border-t border-border/30">
                <AuthLinks />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentLogin;
