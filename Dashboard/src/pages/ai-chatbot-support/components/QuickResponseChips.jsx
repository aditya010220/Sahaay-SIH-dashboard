import React from 'react';
import Button from '../../../components/ui/Button';

const QuickResponseChips = ({ onChipClick, disabled = false }) => {
  const quickResponses = [
    { id: 1, text: "I\'m feeling anxious", icon: "Heart" },
    { id: 2, text: "Academic stress", icon: "BookOpen" },
    { id: 3, text: "Sleep problems", icon: "Moon" },
    { id: 4, text: "Relationship issues", icon: "Users" },
    { id: 5, text: "Feeling overwhelmed", icon: "AlertCircle" },
    { id: 6, text: "Need coping strategies", icon: "Lightbulb" }
  ];

  return (
    <div className="mb-4">
      <p className="text-sm text-muted-foreground mb-3">Quick responses:</p>
      <div className="flex flex-wrap gap-2">
        {quickResponses?.map((response) => (
          <Button
            key={response?.id}
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={() => onChipClick(response?.text)}
            iconName={response?.icon}
            iconPosition="left"
            className="text-xs gentle-transition hover:bg-primary/10 hover:border-primary/30"
          >
            {response?.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickResponseChips;