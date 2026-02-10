import React from 'react';
import Header from '../../components/ui/Header';
import CalendarWidget from '../counselor-dashboard/components/CalendarWidget';
import TodaySchedule from '../counselor-dashboard/components/TodaySchedule';
import Icon from '../../components/AppIcon';

const CounselorSchedule = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header userRole="counselor" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={20} className="text-primary" />
              <h1 className="text-3xl font-heading font-semibold text-foreground">Schedule</h1>
            </div>
            <p className="text-muted-foreground">View your calendar and today’s appointments.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <CalendarWidget />
            <TodaySchedule />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CounselorSchedule;
