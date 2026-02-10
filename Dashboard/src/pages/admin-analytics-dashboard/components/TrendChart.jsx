import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('6months');

  // Mock trend data
  const trendData = [
    { month: 'Mar', appointments: 145, assessments: 89, riskAlerts: 12, satisfaction: 4.2 },
    { month: 'Apr', appointments: 167, assessments: 102, riskAlerts: 8, satisfaction: 4.3 },
    { month: 'May', appointments: 189, assessments: 124, riskAlerts: 15, satisfaction: 4.1 },
    { month: 'Jun', appointments: 156, assessments: 98, riskAlerts: 6, satisfaction: 4.4 },
    { month: 'Jul', appointments: 134, assessments: 76, riskAlerts: 4, satisfaction: 4.5 },
    { month: 'Aug', appointments: 198, assessments: 145, riskAlerts: 18, satisfaction: 4.0 },
    { month: 'Sep', appointments: 223, assessments: 167, riskAlerts: 22, satisfaction: 3.9 }
  ];

  const departmentData = [
    { name: 'Computer Science', value: 28, color: '#7C9885' },
    { name: 'Engineering', value: 22, color: '#A8B5D1' },
    { name: 'Business', value: 18, color: '#E8B4A0' },
    { name: 'Medicine', value: 15, color: '#8B7355' },
    { name: 'Psychology', value: 10, color: '#68D391' },
    { name: 'Others', value: 7, color: '#FC8181' }
  ];

  const chartTypes = [
    { value: 'line', label: 'Line Chart', icon: 'TrendingUp' },
    { value: 'bar', label: 'Bar Chart', icon: 'BarChart3' },
    { value: 'pie', label: 'Pie Chart', icon: 'PieChart' }
  ];

  const timeRanges = [
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-card p-3 rounded-lg shadow-moderate">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry?.color }}>
              {entry?.dataKey}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="appointments" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="assessments" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="riskAlerts" 
                stroke="var(--color-error)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-error)', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="appointments" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="assessments" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
              >
                {departmentData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex items-center space-x-2 mb-4 lg:mb-0">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Mental Health Trends
          </h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex rounded-lg bg-muted p-1">
            {chartTypes?.map((type) => (
              <Button
                key={type?.value}
                variant={chartType === type?.value ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setChartType(type?.value)}
                iconName={type?.icon}
                iconPosition="left"
                className="text-xs"
              >
                {type?.label}
              </Button>
            ))}
          </div>
          
          <div className="flex rounded-lg bg-muted p-1">
            {timeRanges?.map((range) => (
              <Button
                key={range?.value}
                variant={timeRange === range?.value ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range?.value)}
                className="text-xs"
              >
                {range?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-4">
        {renderChart()}
      </div>
      {/* Legend */}
      {chartType !== 'pie' && (
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
            <span className="text-xs text-muted-foreground">Appointments</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-secondary)' }}></div>
            <span className="text-xs text-muted-foreground">Assessments</span>
          </div>
          {chartType === 'line' && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-error)' }}></div>
              <span className="text-xs text-muted-foreground">Risk Alerts</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendChart;