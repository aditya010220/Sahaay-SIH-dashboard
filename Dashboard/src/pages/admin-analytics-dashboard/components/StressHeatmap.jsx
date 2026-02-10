import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StressHeatmap = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [selectedDemographic, setSelectedDemographic] = useState('all');

  // Mock heatmap data
  const heatmapData = [
    { department: 'Computer Science', week1: 65, week2: 72, week3: 85, week4: 78, week5: 68, week6: 75, week7: 82, week8: 90 },
    { department: 'Engineering', week1: 58, week2: 64, week3: 78, week4: 71, week5: 62, week6: 69, week7: 76, week8: 83 },
    { department: 'Business', week1: 52, week2: 59, week3: 71, week4: 65, week5: 58, week6: 63, week7: 70, week8: 77 },
    { department: 'Psychology', week1: 48, week2: 55, week3: 67, week4: 61, week5: 54, week6: 59, week7: 66, week8: 73 },
    { department: 'Medicine', week1: 70, week2: 77, week3: 89, week4: 82, week5: 74, week6: 79, week7: 86, week8: 93 },
    { department: 'Arts & Humanities', week1: 45, week2: 52, week3: 64, week4: 58, week5: 51, week6: 56, week7: 63, week8: 70 }
  ];

  const getIntensityColor = (value) => {
    if (value >= 80) return 'bg-error/80';
    if (value >= 65) return 'bg-warning/60';
    if (value >= 50) return 'bg-accent/40';
    return 'bg-success/30';
  };

  const periods = [
    { value: 'semester', label: 'Full Semester' },
    { value: 'month', label: 'This Month' },
    { value: 'week', label: 'This Week' }
  ];

  const demographics = [
    { value: 'all', label: 'All Students' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'international', label: 'International' }
  ];

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex items-center space-x-2 mb-4 lg:mb-0">
          <Icon name="Activity" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Campus Stress Level Heatmap
          </h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex rounded-lg bg-muted p-1">
            {periods?.map((period) => (
              <Button
                key={period?.value}
                variant={selectedPeriod === period?.value ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(period?.value)}
                className="text-xs"
              >
                {period?.label}
              </Button>
            ))}
          </div>
          
          <div className="flex rounded-lg bg-muted p-1">
            {demographics?.map((demo) => (
              <Button
                key={demo?.value}
                variant={selectedDemographic === demo?.value ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedDemographic(demo?.value)}
                className="text-xs"
              >
                {demo?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-9 gap-2 mb-2">
            <div className="text-xs font-medium text-muted-foreground p-2">
              Department
            </div>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="text-xs font-medium text-muted-foreground text-center p-2">
                Week {i + 1}
              </div>
            ))}
          </div>

          {/* Heatmap Grid */}
          <div className="space-y-1">
            {heatmapData?.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-9 gap-2">
                <div className="text-sm font-medium text-foreground p-2 bg-muted/30 rounded">
                  {row?.department}
                </div>
                {Object.entries(row)?.slice(1)?.map(([week, value], colIndex) => (
                  <div
                    key={colIndex}
                    className={`${getIntensityColor(value)} rounded p-2 text-center relative group cursor-pointer gentle-transition hover:scale-105`}
                  >
                    <span className="text-xs font-medium text-foreground">
                      {value}%
                    </span>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {row?.department}: {value}% stress level
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <span className="text-xs font-medium text-muted-foreground">Stress Level:</span>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success/30 rounded"></div>
            <span className="text-xs text-muted-foreground">Low (0-49%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent/40 rounded"></div>
            <span className="text-xs text-muted-foreground">Moderate (50-64%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning/60 rounded"></div>
            <span className="text-xs text-muted-foreground">High (65-79%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error/80 rounded"></div>
            <span className="text-xs text-muted-foreground">Critical (80%+)</span>
          </div>
        </div>
        
        <Button variant="outline" size="sm" iconName="Download">
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default StressHeatmap;