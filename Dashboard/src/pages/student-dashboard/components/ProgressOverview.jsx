import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressOverview = () => {
  const progressData = [
    {
      id: 'mood',
      label: 'Mood Tracking',
      current: 12,
      target: 30,
      unit: 'days',
      color: 'bg-blue-500',
      icon: 'TrendingUp'
    },
    {
      id: 'journal',
      label: 'Journal Entries',
      current: 8,
      target: 15,
      unit: 'entries',
      color: 'bg-green-500',
      icon: 'BookOpen'
    },
    {
      id: 'sessions',
      label: 'Counseling Sessions',
      current: 3,
      target: 6,
      unit: 'sessions',
      color: 'bg-purple-500',
      icon: 'Users'
    },
    {
      id: 'assessments',
      label: 'Self Assessments',
      current: 2,
      target: 4,
      unit: 'completed',
      color: 'bg-orange-500',
      icon: 'ClipboardCheck'
    }
  ];

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Your Progress
          </h2>
          <p className="text-sm text-muted-foreground">
            Track your mental wellness journey
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span>This Month</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {progressData?.map((item) => {
          const percentage = getProgressPercentage(item?.current, item?.target);
          
          return (
            <div key={item?.id} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 ${item?.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={item?.icon} size={16} className="text-white" />
                  </div>
                  <span className="font-medium text-foreground">{item?.label}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {item?.current}/{item?.target} {item?.unit}
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-border rounded-full h-2 mb-2">
                <div
                  className={`h-2 ${item?.color} rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">
                  {percentage?.toFixed(0)}% Complete
                </span>
                {percentage >= 100 ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <Icon name="CheckCircle" size={12} />
                    <span>Goal Achieved!</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">
                    {item?.target - item?.current} more to go
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressOverview;