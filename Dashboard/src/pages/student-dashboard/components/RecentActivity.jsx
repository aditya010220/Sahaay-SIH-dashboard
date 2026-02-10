import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = () => {
  const recentActivities = [
    {
      id: 1,
      type: 'journal',
      title: 'Morning Reflection',
      description: 'Wrote about feeling more optimistic today after a good night\'s sleep.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'BookOpen',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      type: 'mood',
      title: 'Mood Check-in',
      description: 'Recorded mood as "Good" - feeling positive about upcoming presentation.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      icon: 'Heart',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      type: 'assessment',
      title: 'PHQ-9 Assessment',
      description: 'Completed weekly depression screening - scores showing improvement.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'ClipboardList',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 4,
      type: 'session',
      title: 'Counseling Session',
      description: 'Had a productive session with Dr. Sarah about stress management techniques.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: 'Users',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Recent Activity
          </h2>
          <p className="text-sm text-muted-foreground">
            Your latest wellness activities
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {recentActivities?.map((activity) => (
          <div
            key={activity?.id}
            className="flex items-start gap-4 p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors duration-200"
          >
            {/* Icon */}
            <div className={`w-10 h-10 ${activity?.bgColor} rounded-lg flex items-center justify-center shrink-0`}>
              <Icon name={activity?.icon} size={18} className={activity?.color} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-foreground truncate">
                  {activity?.title}
                </h3>
                <span className="text-xs text-muted-foreground shrink-0 ml-2">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {activity?.description}
              </p>
            </div>

            {/* Action */}
            <Button
              variant="ghost"
              size="icon"
              iconName="ChevronRight"
              className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
      {/* Empty State (if no activities) */}
      {recentActivities?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Activity" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-2">No recent activity</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start your wellness journey by tracking your mood or writing in your journal.
          </p>
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;