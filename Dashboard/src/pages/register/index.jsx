import React from 'react';
import Header from '../../components/ui/Header';
import FloatingLeaves from '../student-login/components/FloatingLeaves';
import AuthIllustration from '../student-login/components/AuthIllustration';
import RegisterForm from './components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Header isAuthenticated={false} />
      <FloatingLeaves />
      <main className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="hidden lg:block">
            <AuthIllustration />
          </div>
          <div className="max-w-md w-full lg:ml-auto">
            <div className="glass-card rounded-2xl p-8 sm:p-10 shadow-prominent gentle-transition hover:shadow-lg">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">Create your account</h1>
                <p className="text-sm text-muted-foreground">Join Sahaay and begin your wellness journey.</p>
              </div>
              <RegisterForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
