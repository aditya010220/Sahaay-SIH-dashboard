import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentProgress = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'quarter'

  const studentProgressData = [

    {
      id: 2,
      name: "Ishita Sharma",
      studentId: "IS2023",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      currentRisk: "high",
      trend: "concerning",
      lastAssessment: "2025-09-09",
      progressScore: 40,
      moodTrend: [50, 48, 45, 42, 40, 38, 40],
      anxietyScore: 17,
      depressionScore: 15,
      journalEntries: 10,
      sessionAttendance: 72,
      goals: [
        { goal: "Manage anxiety attacks", progress: 50, status: "on-track" },
        { goal: "Reduce academic pressure", progress: 35, status: "behind" },
        { goal: "Improve sleep quality", progress: 45, status: "behind" }
      ]
    },
    {
      id: 3,
      name: "Rohan Mehta",
      studentId: "RM2024",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      currentRisk: "medium",
      trend: "stable",
      lastAssessment: "2025-09-08",
      progressScore: 68,
      moodTrend: [60, 62, 65, 66, 68, 67, 68],
      anxietyScore: 12,
      depressionScore: 10,
      journalEntries: 20,
      sessionAttendance: 85,
      goals: [
        { goal: "Build social confidence", progress: 75, status: "on-track" },
        { goal: "Participate in group activities", progress: 70, status: "on-track" },
        { goal: "Improve communication skills", progress: 65, status: "on-track" }
      ]
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

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'improving': return 'text-success';
      case 'concerning': return 'text-error';
      case 'stable': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return 'TrendingUp';
      case 'concerning': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getGoalStatusColor = (status) => {
    switch (status) {
      case 'ahead': return 'text-success bg-success/10';
      case 'on-track': return 'text-primary bg-primary/10';
      case 'behind': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="BarChart3" className="text-primary" size={24} />
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Student Progress Tracking
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {studentProgressData?.map((student) => (
          <div
            key={student?.id}
            className={`p-4 rounded-lg border gentle-transition cursor-pointer ${selectedStudent?.id === student?.id
              ? 'bg-primary/5 border-primary/20' : 'bg-background/50 border-border hover:bg-background/80'
              }`}
            onClick={() => setSelectedStudent(
              selectedStudent?.id === student?.id ? null : student
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <img
                  src={student?.avatar}
                  alt={student?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-foreground">
                      {student?.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      ({student?.studentId})
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(student?.currentRisk)}`}>
                      {student?.currentRisk?.charAt(0)?.toUpperCase() + student?.currentRisk?.slice(1)} Risk
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm mb-3">
                    <div className="flex items-center space-x-1">
                      <Icon
                        name={getTrendIcon(student?.trend)}
                        className={getTrendColor(student?.trend)}
                        size={16}
                      />
                      <span className={getTrendColor(student?.trend)}>
                        {student?.trend?.charAt(0)?.toUpperCase() + student?.trend?.slice(1)}
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      Progress Score: {student?.progressScore}%
                    </span>
                    <span className="text-muted-foreground">
                      Last Assessment: {new Date(student.lastAssessment)?.toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Brain" size={14} />
                      <span>Anxiety: {student?.anxietyScore}/21</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={14} />
                      <span>Depression: {student?.depressionScore}/21</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="BookOpen" size={14} />
                      <span>{student?.journalEntries} entries</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>{student?.sessionAttendance}% attendance</span>
                    </div>
                  </div>

                  {selectedStudent?.id === student?.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="font-medium text-foreground mb-3">Treatment Goals</h4>
                      <div className="space-y-3">
                        {student?.goals?.map((goal, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-foreground">{goal?.goal}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${getGoalStatusColor(goal?.status)}`}>
                                  {goal?.status?.replace('-', ' ')}
                                </span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full gentle-transition"
                                  style={{ width: `${goal?.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-muted-foreground">{goal?.progress}% complete</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2 mt-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          iconName="User"
                          iconPosition="left"
                        >
                          View Profile
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="FileText"
                          iconPosition="left"
                        >
                          Session Notes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="MessageCircle"
                          iconPosition="left"
                        >
                          Journal Access
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {student?.progressScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Overall Progress
                  </div>
                </div>
                <Icon
                  name={selectedStudent?.id === student?.id ? "ChevronUp" : "ChevronDown"}
                  className="text-muted-foreground"
                  size={16}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {studentProgressData?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="BarChart3" className="text-muted-foreground mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No progress data available
          </h3>
          <p className="text-muted-foreground mb-4">
            Student progress will appear here once assessments are completed
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentProgress;