import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import SelfAssessmentForm from './components/SelfAssessmentForm';

const SelfAssessmentPage = () => {
  useEffect(() => {
    document.title = 'Self Assessment - Sahaay';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <div className="glass-card p-6 rounded-xl">
              <h1 className="text-2xl font-heading font-semibold text-foreground">Self Assessment</h1>
              <p className="text-sm text-muted-foreground mt-1">Mental Health Screening (GAD-7 + PHQ-9)</p>
            </div>
          </div>
          <SelfAssessmentForm />
        </div>
      </main>
    </div>
  );
};

export default SelfAssessmentPage;
