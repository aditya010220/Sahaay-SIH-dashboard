import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CounselorWorkload = () => {
  const [viewMode, setViewMode] = useState('overview');
  const [selectedCounselor, setSelectedCounselor] = useState(null);

  // Mock counselor data
  const counselors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Anxiety & Depression',
      currentLoad: 28,
      capacity: 35,
      satisfaction: 4.8,
      weeklyHours: 32,
      avgSessionLength: 52,
      riskCases: 3,
      status: 'available',
      nextAvailable: '2025-09-13 10:00 AM',
      recentFeedback: 'Excellent rapport with students, very effective with CBT techniques.'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Academic Stress',
      currentLoad: 35,
      capacity: 35,
      satisfaction: 4.6,
      weeklyHours: 35,
      avgSessionLength: 48,
      riskCases: 2,
      status: 'at-capacity',
      nextAvailable: '2025-09-16 2:00 PM',
      recentFeedback: 'Great with exam anxiety cases, students respond well to his approach.'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialization: 'Trauma & PTSD',
      currentLoad: 22,
      capacity: 30,
      satisfaction: 4.9,
      weeklyHours: 28,
      avgSessionLength: 58,
      riskCases: 5,
      status: 'available',
      nextAvailable: '2025-09-13 1:30 PM',
      recentFeedback: 'Exceptional with trauma cases, highly recommended by peer counselors.'
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialization: 'Substance Abuse',
      currentLoad: 18,
      capacity: 25,
      satisfaction: 4.4,
      weeklyHours: 24,
      avgSessionLength: 55,
      riskCases: 4,
      status: 'available',
      nextAvailable: '2025-09-13 11:00 AM',
      recentFeedback: 'Strong expertise in addiction counseling, good crisis intervention skills.'
    },
    {
      id: 5,
      name: 'Dr. Lisa Thompson',
      specialization: 'Eating Disorders',
      currentLoad: 31,
      capacity: 32,
      satisfaction: 4.7,
      weeklyHours: 30,
      avgSessionLength: 60,
      riskCases: 2,
      status: 'near-capacity',
      nextAvailable: '2025-09-15 9:00 AM',
      recentFeedback: 'Specialized approach works well, students show consistent improvement.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success bg-success/10';
      case 'near-capacity': return 'text-warning bg-warning/10';
      case 'at-capacity': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getLoadPercentage = (current, capacity) => {
    return Math.round((current / capacity) * 100);
  };

  const getLoadColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  const viewModes = [
    { value: 'overview', label: 'Overview', icon: 'LayoutGrid' },
    { value: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { value: 'assignments', label: 'Assignments', icon: 'Users' }
  ];

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex items-center space-x-2 mb-4 lg:mb-0">
          <Icon name="Users" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Counselor Workload Management
          </h2>
        </div>
        
        <div className="flex rounded-lg bg-muted p-1">
          {viewModes?.map((mode) => (
            <Button
              key={mode?.value}
              variant={viewMode === mode?.value ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode(mode?.value)}
              iconName={mode?.icon}
              iconPosition="left"
              className="text-xs"
            >
              {mode?.label}
            </Button>
          ))}
        </div>
      </div>
      {viewMode === 'overview' && (
        <div className="space-y-4">
          {counselors?.map((counselor) => {
            const loadPercentage = getLoadPercentage(counselor?.currentLoad, counselor?.capacity);
            
            return (
              <div key={counselor?.id} className="border border-border rounded-lg p-4 gentle-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-heading font-semibold text-foreground">
                        {counselor?.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(counselor?.status)}`}>
                        {counselor?.status?.replace('-', ' ')?.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {counselor?.specialization}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span className="text-xs font-medium text-foreground">
                        {counselor?.satisfaction}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {counselor?.currentLoad}/{counselor?.capacity} students
                    </p>
                  </div>
                </div>
                {/* Workload Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Current Workload</span>
                    <span>{loadPercentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full gentle-transition ${getLoadColor(loadPercentage)}`}
                      style={{ width: `${loadPercentage}%` }}
                    ></div>
                  </div>
                </div>
                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div className="text-center">
                    <p className="text-sm font-heading font-semibold text-foreground">
                      {counselor?.weeklyHours}h
                    </p>
                    <p className="text-xs text-muted-foreground">Weekly Hours</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-heading font-semibold text-foreground">
                      {counselor?.avgSessionLength}m
                    </p>
                    <p className="text-xs text-muted-foreground">Avg Session</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-heading font-semibold text-error">
                      {counselor?.riskCases}
                    </p>
                    <p className="text-xs text-muted-foreground">Risk Cases</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Next Available</p>
                    <p className="text-xs font-medium text-foreground">
                      {counselor?.nextAvailable}
                    </p>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex space-x-2 pt-2 border-t border-border">
                  <Button variant="outline" size="sm" iconName="Calendar">
                    View Schedule
                  </Button>
                  <Button variant="ghost" size="sm" iconName="MessageCircle">
                    Contact
                  </Button>
                  <Button variant="ghost" size="sm" iconName="UserPlus">
                    Assign Student
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {viewMode === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-heading font-semibold text-foreground">4.7</p>
              <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-heading font-semibold text-foreground">53m</p>
              <p className="text-sm text-muted-foreground">Avg Session Length</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-heading font-semibold text-foreground">16</p>
              <p className="text-sm text-muted-foreground">High-Risk Cases</p>
            </div>
          </div>

          <div className="space-y-3">
            {counselors?.map((counselor) => (
              <div key={counselor?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-heading font-semibold text-foreground">
                    {counselor?.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-warning fill-current" />
                    <span className="text-xs font-medium text-foreground">
                      {counselor?.satisfaction}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {counselor?.recentFeedback}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{counselor?.avgSessionLength}min avg session</span>
                  <span>{counselor?.riskCases} high-risk cases</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {viewMode === 'assignments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Manage student-counselor assignments and workload distribution
            </p>
            <Button variant="default" size="sm" iconName="UserPlus">
              New Assignment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {counselors?.filter(c => c?.status !== 'at-capacity')?.map((counselor) => (
              <div key={counselor?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-heading font-semibold text-foreground">
                      {counselor?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {counselor?.specialization}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(counselor?.status)}`}>
                    {counselor?.capacity - counselor?.currentLoad} slots
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline" size="sm" fullWidth iconName="Calendar">
                    View Availability
                  </Button>
                  <Button variant="ghost" size="sm" fullWidth iconName="Users">
                    Current Students
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CounselorWorkload;