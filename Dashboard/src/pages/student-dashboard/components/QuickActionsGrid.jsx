import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsGrid = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'assessment',
      title: 'Self Assessment',
      description: 'Take PHQ-9 or GAD-7 questionnaire',
      icon: 'ClipboardList',
      color: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-600',
      action: () => navigate('/self-assessment'),
      badge: 'Weekly'
    },
    {
      id: 'ai-support',
      title: 'AI Support Chat',
      description: 'Get instant mental health guidance',
      icon: 'MessageCircle',
      color: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-600',
      action: () => navigate('/ai-chatbot-support'),
      badge: '24/7'
    },
    {
      id: 'booking',
      title: 'Book Session',
      description: 'Schedule with a counselor',
      icon: 'Calendar',
      color: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-600',
      action: () => navigate('/appointment-booking'),
      badge: 'Available'
    },
    {
      id: 'journal',
      title: 'Digital Journal',
      description: 'Record your thoughts and feelings',
      icon: 'BookOpen',
      color: 'from-orange-500/20 to-amber-500/20',
      iconColor: 'text-orange-600',
      action: () => navigate('/journal'),
      badge: 'Private'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickActions?.map((action) => (
        <div
          key={action?.id}
          className="glass-card p-6 rounded-xl gentle-hover cursor-pointer group"
          onClick={action?.action}
        >
          <div className="relative">
            {/* Badge */}
            <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
              {action?.badge}
            </div>

            {/* Icon */}
            <div className={`w-12 h-12 bg-gradient-to-br ${action?.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <Icon name={action?.icon} size={24} className={action?.iconColor} />
            </div>

            {/* Content */}
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              {action?.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {action?.description}
            </p>

            {/* Action Button */}
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
              className="w-full justify-between group-hover:bg-primary/10"
            >
              Get Started
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickActionsGrid;
