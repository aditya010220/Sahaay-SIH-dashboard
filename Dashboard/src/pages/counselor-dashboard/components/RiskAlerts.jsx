import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RiskAlerts = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterLevel, setFilterLevel] = useState('all');

  const riskAlerts = [
    {
      id: 2,
      studentName: "Ishita Sharma",
      studentId: "IS2023",
      riskLevel: "high",
      alertType: "Behavioral Pattern",
      timestamp: "2025-09-11 02:15 PM",
      description: "Significant decline in mood scores over the past week",
      details: "PHQ-9 scores increased from 12 to 18 in one week. Student also missed two scheduled appointments and has not responded to outreach attempts.",
      triggers: ["mood score decline", "missed appointments", "communication breakdown"],
      recommendedActions: [
        "Immediate outreach attempt",
        "Family contact (if authorized)",
        "Academic advisor notification",
        "Wellness check consideration"
      ],
      lastContact: "2025-09-05",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      status: "in-progress",
      priority: 2
    },
    {
      id: 3,
      studentName: "Rohan Mehta",
      studentId: "RM2024",
      riskLevel: "high",
      alertType: "Academic Stress",
      timestamp: "2025-09-11 11:45 AM",
      description: "Extreme academic pressure indicators detected",
      details: "Student reported failing multiple courses and expressed thoughts about dropping out. Mentioned family pressure and financial concerns.",
      triggers: ["academic failure", "family pressure", "financial stress"],
      recommendedActions: [
        "Academic counseling referral",
        "Financial aid consultation",
        "Stress management session",
        "Family therapy consideration"
      ],
      lastContact: "2025-09-09",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      status: "unresolved",
      priority: 2
    },
    {
      id: 4,
      studentName: "Maya Patel",
      studentId: "MP2024",
      riskLevel: "medium",
      alertType: "Social Isolation",
      timestamp: "2025-09-10 04:20 PM",
      description: "Prolonged social withdrawal patterns identified",
      details: "Student has not attended any social activities for 3 weeks and reported having no close friends on campus. Spending increasing time alone in dorm room.",
      triggers: ["social withdrawal", "isolation patterns", "loneliness indicators"],
      recommendedActions: [
        "Social skills assessment",
        "Group therapy referral",
        "Campus activity engagement",
        "Peer support program"
      ],
      lastContact: "2025-09-08",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
      status: "monitoring",
      priority: 3
    }
  ];

  const filteredAlerts = riskAlerts?.filter(alert =>
    filterLevel === 'all' || alert?.riskLevel === filterLevel
  );

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'unresolved': return 'text-error bg-error/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'monitoring': return 'text-primary bg-primary/10';
      case 'resolved': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'AI Detection': return 'Brain';
      case 'Behavioral Pattern': return 'TrendingDown';
      case 'Academic Stress': return 'BookOpen';
      case 'Social Isolation': return 'Users';
      default: return 'AlertTriangle';
    }
  };

  const handleResolveAlert = (alertId) => {
    // In real app, update alert status
    console.log('Resolving alert:', alertId);
  };

  const handleEscalateAlert = (alertId) => {
    // In real app, escalate to supervisor or emergency services
    console.log('Escalating alert:', alertId);
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="AlertTriangle" className="text-error" size={24} />
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Risk Alert System
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e?.target?.value)}
            className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground"
          >
            <option value="all">All Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <Button
            variant="destructive"
            size="sm"
            iconName="Phone"
            iconPosition="left"
          >
            Emergency Protocol
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {filteredAlerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`p-4 rounded-lg border gentle-transition relative overflow-hidden ${alert?.riskLevel === 'critical' ? 'bg-red-50/50 border-red-200 shadow-lg' : 'bg-background/50 border-border hover:bg-background/80'
              }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <img
                  src={alert?.avatar}
                  alt={alert?.studentName}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon
                      name={getAlertIcon(alert?.alertType)}
                      className="text-error"
                      size={16}
                    />
                    <h3 className="font-medium text-foreground">
                      {alert?.studentName}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      ({alert?.studentId})
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(alert?.riskLevel)}`}>
                      {alert?.riskLevel?.charAt(0)?.toUpperCase() + alert?.riskLevel?.slice(1)} Risk
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert?.status)}`}>
                      {alert?.status?.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <span>{alert?.alertType}</span>
                    <span>•</span>
                    <span>{alert?.timestamp}</span>
                    <span>•</span>
                    <span>Last contact: {new Date(alert.lastContact)?.toLocaleDateString()}</span>
                  </div>

                  <p className="text-sm text-foreground font-medium mb-2">
                    {alert?.description}
                  </p>

                  <p className="text-sm text-muted-foreground mb-3">
                    {alert?.details}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {alert?.triggers?.map((trigger, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-error/10 text-error text-xs rounded-full border border-error/20"
                      >
                        {trigger}
                      </span>
                    ))}
                  </div>

                  {selectedAlert?.id === alert?.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="font-medium text-foreground mb-2">Recommended Actions:</h4>
                      <ul className="space-y-1 mb-4">
                        {alert?.recommendedActions?.map((action, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <Icon name="CheckCircle" className="text-primary" size={14} />
                            <span className="text-muted-foreground">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-2 ml-4">
                <div className="text-right mr-2">
                  <div className="text-xs text-muted-foreground">Priority</div>
                  <div className="text-sm font-medium text-foreground">#{alert?.priority}</div>
                </div>

                {alert?.riskLevel === 'critical' && (
                  <Button
                    variant="destructive"
                    size="sm"
                    iconName="Phone"
                    iconPosition="left"
                    onClick={() => handleEscalateAlert(alert?.id)}
                  >
                    Escalate
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Contact
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  iconName={selectedAlert?.id === alert?.id ? "ChevronUp" : "ChevronDown"}
                  onClick={() => setSelectedAlert(
                    selectedAlert?.id === alert?.id ? null : alert
                  )}
                />
              </div>
            </div>

            {selectedAlert?.id === alert?.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="success"
                    size="sm"
                    iconName="Check"
                    iconPosition="left"
                    onClick={() => handleResolveAlert(alert?.id)}
                  >
                    Mark Resolved
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Schedule Session
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="FileText"
                    iconPosition="left"
                  >
                    Add Notes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Users"
                    iconPosition="left"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredAlerts?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Shield" className="text-success mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No active alerts
          </h3>
          <p className="text-muted-foreground">
            All students are currently within safe parameters
          </p>
        </div>
      )}
    </div>
  );
};

export default RiskAlerts;
