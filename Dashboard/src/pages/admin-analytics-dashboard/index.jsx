import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import StressHeatmap from './components/StressHeatmap';
import TrendChart from './components/TrendChart';
import PolicyRecommendations from './components/PolicyRecommendations';
import CounselorWorkload from './components/CounselorWorkload';
import ExportPanel from './components/ExportPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminAnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState({ autoRefresh: false, granularity: 'weekly', anonymize: true });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock key metrics data
  const keyMetrics = [
    {
      title: 'Total Active Students',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Users',
      description: 'Students currently enrolled in mental health programs'
    },
    {
      title: 'Anonymous Risk Percentage',
      value: '18.3%',
      change: '-2.1%',
      changeType: 'positive',
      icon: 'Shield',
      description: 'Students identified as requiring additional support'
    },
    {
      title: 'Counselor Utilization',
      value: '87.2%',
      change: '+5.8%',
      changeType: 'negative',
      icon: 'Activity',
      description: 'Average counselor capacity utilization rate'
    },
    {
      title: 'Resource Engagement',
      value: '94.6%',
      change: '+8.3%',
      changeType: 'positive',
      icon: 'BookOpen',
      description: 'Students actively using digital wellness resources'
    },
    {
      title: 'Average Response Time',
      value: '4.2 hrs',
      change: '-1.3 hrs',
      changeType: 'positive',
      icon: 'Clock',
      description: 'Time from appointment request to first available slot'
    },
    {
      title: 'Crisis Interventions',
      value: '23',
      change: '-8',
      changeType: 'positive',
      icon: 'AlertTriangle',
      description: 'Emergency interventions this month'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
    { id: 'counselors', label: 'Counselors', icon: 'Users' },
    { id: 'policies', label: 'Policies', icon: 'Lightbulb' },
    { id: 'export', label: 'Export', icon: 'Download' }
  ];

  const formatTime = (date) => {
    return date
      ? date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      : 'Invalid Date';
  };

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setCurrentTime(new Date());
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSaveConfig = () => {
    setShowConfig(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-heading font-semibold text-foreground mb-2">
                  Analytics Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive mental health insights and institutional analytics
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Last updated: {formatTime(currentTime)}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  size="sm"
                  onClick={handleRefresh}
                  loading={isRefreshing}
                  aria-label="Refresh Data"
                >
                  Refresh Data
                </Button>
                <Button
                  variant="outline"
                  iconName="Settings"
                  size="sm"
                  onClick={() => setShowConfig(true)}
                  aria-label="Configure Settings"
                >
                  Configure
                </Button>
                <Button variant="default" iconName="AlertTriangle" size="sm" aria-label="View Crisis Alerts">
                  Crisis Alerts (3)
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap gentle-transition ${activeTab === tab?.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }`}
                    aria-label={`Navigate to ${tab?.label}`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keyMetrics?.map((metric, index) => (
                  <MetricsCard
                    key={index}
                    title={metric?.title}
                    value={metric?.value}
                    change={metric?.change}
                    changeType={metric?.changeType}
                    icon={metric?.icon}
                    description={metric?.description}
                  />
                ))}
              </div>

              {/* Main Analytics */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="xl:col-span-2">
                  <StressHeatmap />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-8">
              <TrendChart />
            </div>
          )}

          {activeTab === 'counselors' && (
            <div className="space-y-8">
              <CounselorWorkload />
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="space-y-8">
              <PolicyRecommendations />
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-8">
              <ExportPanel />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminAnalyticsDashboard;
