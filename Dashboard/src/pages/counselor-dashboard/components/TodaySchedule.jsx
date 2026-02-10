import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TodaySchedule = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const todayAppointments = [

    {
      id: 2,
      studentName: "Ishita Sharma",
      studentId: "IS2023",
      time: "10:30 AM",
      duration: "50 min",
      sessionType: "Crisis Support",
      status: "urgent",
      riskLevel: "high",
      notes: "Emergency session requested. Student experiencing severe exam stress and anxiety.",
      lastSession: "2025-09-10",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      studentName: "Rohan Mehta",
      studentId: "RM2024",
      time: "02:00 PM",
      duration: "50 min",
      sessionType: "Group Therapy",
      status: "confirmed",
      riskLevel: "medium",
      notes: "Participating in peer support group for social anxiety. Showing progress in group discussions.",
      lastSession: "2025-09-09",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      studentName: "Ananya Singh",
      studentId: "AS2023",
      time: "03:30 PM",
      duration: "50 min",
      sessionType: "Assessment",
      status: "pending",
      riskLevel: "low",
      notes: "Initial assessment for new student. Referred by faculty for time management issues.",
      lastSession: null,
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'text-error bg-error/10 border-error/20';
      case 'confirmed': return 'text-success bg-success/10 border-success/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" className="text-primary" size={24} />
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Today's Schedule
            </h2>
            <p className="text-sm text-muted-foreground">
              {new Date()?.toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          className="hidden sm:flex"
        >
          Add Session
        </Button>
      </div>
      <div className="space-y-4">
        {todayAppointments?.map((appointment) => (
          <div
            key={appointment?.id}
            className={`p-4 rounded-lg border gentle-transition cursor-pointer ${selectedAppointment?.id === appointment?.id
              ? 'bg-primary/5 border-primary/20' : 'bg-background/50 border-border hover:bg-background/80'
              }`}
            onClick={() => setSelectedAppointment(
              selectedAppointment?.id === appointment?.id ? null : appointment
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <img
                  src={appointment?.avatar}
                  alt={appointment?.studentName}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-foreground truncate">
                      {appointment?.studentName}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      ({appointment?.studentId})
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{appointment?.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Timer" size={14} />
                      <span>{appointment?.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment?.status)}`}>
                      {appointment?.status?.charAt(0)?.toUpperCase() + appointment?.status?.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(appointment?.riskLevel)}`}>
                      {appointment?.riskLevel?.charAt(0)?.toUpperCase() + appointment?.riskLevel?.slice(1)} Risk
                    </span>
                  </div>

                  <p className="text-sm text-foreground font-medium mb-1">
                    {appointment?.sessionType}
                  </p>

                  {selectedAppointment?.id === appointment?.id && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-3">
                        {appointment?.notes}
                      </p>

                      {appointment?.lastSession && (
                        <p className="text-xs text-muted-foreground mb-3">
                          Last session: {new Date(appointment.lastSession)?.toLocaleDateString('en-IN')}
                        </p>
                      )}

                      <div className="flex items-center space-x-2">
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
                        {appointment?.status === 'urgent' && (
                          <Button
                            variant="destructive"
                            size="sm"
                            iconName="AlertTriangle"
                            iconPosition="left"
                          >
                            Priority
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {appointment?.riskLevel === 'high' && (
                  <Icon name="AlertTriangle" className="text-error" size={20} />
                )}
                <Icon
                  name={selectedAppointment?.id === appointment?.id ? "ChevronUp" : "ChevronDown"}
                  className="text-muted-foreground"
                  size={16}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {todayAppointments?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" className="text-muted-foreground mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No appointments today
          </h3>
          <p className="text-muted-foreground mb-4">
            Your schedule is clear for today
          </p>
          <Button
            variant="secondary"
            iconName="Plus"
            iconPosition="left"
          >
            Schedule Session
          </Button>
        </div>
      )}
    </div>
  );
};

export default TodaySchedule;