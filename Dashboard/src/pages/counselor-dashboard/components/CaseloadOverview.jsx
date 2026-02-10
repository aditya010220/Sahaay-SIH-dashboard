import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CaseloadOverview = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const caseloadStats = {
    totalStudents: 32,
    activeStudents: 26,
    highRisk: 4,
    mediumRisk: 9,
    lowRisk: 13,
    newThisWeek: 3
  };

  const priorityStudents = [
    {
      id: 1,
      name: "Rahul Sharma",
      studentId: "RS2023",
      riskLevel: "high",
      lastContact: "2025-01-10",
      reason: "Severe exam anxiety, panic attacks",
      nextSession: "2025-01-12 10:30 AM",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      alerts: ["Missed last session", "High PHQ-9 score"]
    },
    {
      id: 2,
      name: "Priya Patel",
      studentId: "PP2024",
      riskLevel: "high",
      lastContact: "2025-01-09",
      reason: "Depression, family pressure",
      nextSession: "2025-01-13 02:00 PM",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      alerts: ["Declining mood scores", "Academic stress concerns"]
    },
    {
      id: 3,
      name: "Arjun Singh",
      studentId: "AS2023",
      riskLevel: "high",
      lastContact: "2025-01-11",
      reason: "Engineering entrance exam stress",
      nextSession: "2025-01-14 11:00 AM",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      alerts: ["Emergency contact requested", "Career counseling needed"]
    }
  ];

  const recentProgress = [
    {
      id: 2,
      name: "Kavya Nair",
      studentId: "KN2024",
      improvement: "+25%",
      metric: "Social confidence improved",
      trend: "up",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Aditya Kumar",
      studentId: "AK2023",
      improvement: "+12%",
      metric: "Sleep pattern normalized",
      trend: "up",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Caseload Statistics */}
      <div className="glass-card p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Users" className="text-primary" size={24} />
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Caseload Overview
            </h2>
          </div>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            size="sm"
          >
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-background/50 rounded-lg border border-border shadow-md">
            <div className="text-4xl font-bold text-primary mb-2">
              {caseloadStats?.totalStudents}
            </div>
            <div className="text-sm text-muted-foreground">Total Students</div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-background/50 rounded-lg border border-border shadow-md">
            <div className="text-4xl font-bold text-success mb-2">
              {caseloadStats?.activeStudents}
            </div>
            <div className="text-sm text-muted-foreground">Active Cases</div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-background/50 rounded-lg border border-border shadow-md">
            <div className="text-4xl font-bold text-error mb-2">
              {caseloadStats?.highRisk}
            </div>
            <div className="text-sm text-muted-foreground">High Risk</div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-background/50 rounded-lg border border-border shadow-md">
            <div className="text-4xl font-bold text-warning mb-2">
              {caseloadStats?.mediumRisk}
            </div>
            <div className="text-sm text-muted-foreground">Medium Risk</div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-background/50 rounded-lg border border-border shadow-md">
            <div className="text-4xl font-bold text-success mb-2">
              {caseloadStats?.lowRisk}
            </div>
            <div className="text-sm text-muted-foreground">Low Risk</div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-background/50 rounded-lg border border-border shadow-md">
            <div className="text-4xl font-bold text-accent mb-2">
              {caseloadStats?.newThisWeek}
            </div>
            <div className="text-sm text-muted-foreground">New This Week</div>
          </div>
        </div>
      </div>
      {/* Priority Students */}
      <div className="glass-card p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" className="text-error" size={24} />
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Priority Students
            </h3>
          </div>
          <Button
            variant="destructive"
            size="sm"
            iconName="Phone"
            iconPosition="left"
          >
            Emergency Protocol
          </Button>
        </div>

        <div className="space-y-4">
          {priorityStudents?.map((student) => (
            <div
              key={student?.id}
              className="p-4 bg-background/50 rounded-lg border border-border hover:bg-background/80 gentle-transition relative overflow-hidden shadow-sm"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={student?.avatar}
                  alt={student?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">
                      {student?.name}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      ({student?.studentId})
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(student?.riskLevel)}`}>
                      {student?.riskLevel?.charAt(0)?.toUpperCase() + student?.riskLevel?.slice(1)} Risk
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    {student?.reason}
                  </p>

                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                    <span>Last contact: {new Date(student.lastContact)?.toLocaleDateString()}</span>
                    <span>Next: {student?.nextSession}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {student?.alerts?.map((alert, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-error/10 text-error text-xs rounded-full border border-error/20"
                      >
                        {alert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Progress */}
      <div className="glass-card p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="TrendingUp" className="text-success" size={24} />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Recent Progress
          </h3>
        </div>

        <div className="space-y-3">
          {recentProgress?.map((student) => (
            <div
              key={student?.id}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={student?.avatar}
                  alt={student?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground text-sm">
                      {student?.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({student?.studentId})
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {student?.metric}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-success">
                  {student?.improvement}
                </span>
                <Icon name="TrendingUp" className="text-success" size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseloadOverview;
