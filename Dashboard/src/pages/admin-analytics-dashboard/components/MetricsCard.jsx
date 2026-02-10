import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, description }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="glass-card p-6 rounded-lg gentle-hover">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={icon} size={20} className="text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-heading font-semibold text-foreground">{value}</p>
            {change && (
              <div className="flex items-center space-x-1">
                <Icon name={getChangeIcon()} size={14} className={getChangeColor()} />
                <span className={`text-xs font-medium ${getChangeColor()}`}>
                  {change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mt-3 border-t border-border pt-3">
          {description}
        </p>
      )}
    </div>
  );
};

export default MetricsCard;