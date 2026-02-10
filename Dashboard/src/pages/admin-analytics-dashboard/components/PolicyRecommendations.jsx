import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PolicyRecommendations = () => {
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  // Mock AI-generated policy recommendations
  const recommendations = [
    {
      id: 1,
      priority: 'high',
      title: 'Increase Counselor Capacity During Exam Periods',
      description: 'Data shows 40% spike in stress levels during midterms and finals. Recommend temporary counselor hiring.',
      impact: 'Could reduce peak stress levels by 25% and improve appointment availability',
      implementation: `1. Hire 3 temporary counselors for exam periods\n2. Extend counseling hours to 8 PM during peak weeks\n3. Implement group counseling sessions for exam anxiety\n4. Create dedicated study wellness spaces`,
      cost: '$15,000 per semester',
      timeline: '2-3 weeks to implement',
      supportingData: {
        stressIncrease: '40%',
        appointmentDemand: '180%',
        studentsSeeking: '67%'
      },
      status: 'pending'
    },
    {
      id: 2,
      priority: 'medium',
      title: 'Implement Peer Support Program',
      description: 'Anonymous forum engagement is high. Structured peer support could enhance mental health resources.',
      impact: 'Estimated 30% reduction in counselor workload and improved peer connection',
      implementation: `1. Train 20 student peer supporters\n2. Create structured peer support groups\n3. Develop peer mentorship matching system\n4. Establish peer crisis intervention protocols`,
      cost: '$8,000 initial setup',
      timeline: '4-6 weeks to launch',
      supportingData: {
        forumEngagement: '85%',
        peerInterest: '72%',
        currentWaitTime: '5.2 days'
      },
      status: 'approved'
    },
    {
      id: 3,
      priority: 'low',
      title: 'Expand Digital Wellness Resources',
      description: 'Mobile app usage indicates strong preference for self-help tools and guided meditation.',
      impact: 'Could serve 200+ additional students with self-service mental health tools',
      implementation: `1. Develop mobile wellness app\n2. Create guided meditation library\n3. Implement mood tracking features\n4. Add crisis intervention chatbot`,
      cost: '$25,000 development',
      timeline: '3-4 months to develop',
      supportingData: {
        appUsage: '92%',
        selfHelpPreference: '78%',
        meditationRequests: '156/month'
      },
      status: 'under-review'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'under-review': return 'text-secondary bg-secondary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Lightbulb" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-foreground">
            AI Policy Recommendations
          </h2>
        </div>
        
        <Button variant="outline" size="sm" iconName="RefreshCw">
          Generate New
        </Button>
      </div>
      <div className="space-y-4">
        {recommendations?.map((rec) => (
          <div key={rec?.id} className="border border-border rounded-lg p-4 gentle-hover cursor-pointer"
               onClick={() => setSelectedRecommendation(selectedRecommendation === rec?.id ? null : rec?.id)}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec?.priority)}`}>
                    {rec?.priority?.toUpperCase()} PRIORITY
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rec?.status)}`}>
                    {rec?.status?.replace('-', ' ')?.toUpperCase()}
                  </span>
                </div>
                
                <h3 className="text-sm font-heading font-semibold text-foreground mb-1">
                  {rec?.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {rec?.description}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Cost: {rec?.cost}</span>
                  <span>Timeline: {rec?.timeline}</span>
                </div>
              </div>
              
              <Icon 
                name={selectedRecommendation === rec?.id ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-muted-foreground ml-2" 
              />
            </div>

            {/* Expanded Details */}
            {selectedRecommendation === rec?.id && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                <div>
                  <h4 className="text-xs font-medium text-foreground mb-2">Expected Impact</h4>
                  <p className="text-xs text-muted-foreground">{rec?.impact}</p>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium text-foreground mb-2">Implementation Plan</h4>
                  <div className="text-xs text-muted-foreground whitespace-pre-line">
                    {rec?.implementation}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium text-foreground mb-2">Supporting Data</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(rec?.supportingData)?.map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-lg font-heading font-semibold text-primary">{value}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button variant="default" size="sm" iconName="Check">
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" iconName="Clock">
                    Schedule Review
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Download">
                    Export Report
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: September 12, 2025 at 2:45 PM</span>
          <span>Powered by AI Analytics Engine</span>
        </div>
      </div>
    </div>
  );
};

export default PolicyRecommendations;