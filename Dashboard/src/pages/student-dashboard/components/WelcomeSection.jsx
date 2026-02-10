import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeSection = ({ userName = "Alex", currentMood = "neutral", onMoodUpdate }) => {
  const [selectedMood, setSelectedMood] = useState(currentMood);
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const moodEmojis = [
    { value: 'terrible', emoji: '😢', label: 'Terrible', color: 'text-red-500' },
    { value: 'sad', emoji: '😔', label: 'Sad', color: 'text-orange-500' },
    { value: 'neutral', emoji: '😐', label: 'Neutral', color: 'text-yellow-500' },
    { value: 'good', emoji: '😊', label: 'Good', color: 'text-green-500' },
    { value: 'excellent', emoji: '😄', label: 'Excellent', color: 'text-emerald-500' }
  ];

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getCurrentMoodData = () => {
    return moodEmojis?.find(mood => mood?.value === selectedMood) || moodEmojis?.[2];
  };

  const handleMoodSelect = (moodValue) => {
    setSelectedMood(moodValue);
    onMoodUpdate?.(moodValue);
    setShowMoodTracker(false);
  };

  const currentMoodData = getCurrentMoodData();

  return (
    <div className="glass-card p-6 rounded-xl gentle-hover floating-leaves">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Welcome Message */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-semibold text-foreground">
                {getGreeting()}, {userName}!
              </h1>
              <p className="text-sm text-muted-foreground">
                {currentTime?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground">
            Welcome to your mental wellness journey. How are you feeling today?
          </p>
        </div>

        {/* Current Mood Display */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Current Mood</p>
            <div className="flex items-center gap-2">
              <span className="text-3xl">{currentMoodData?.emoji}</span>
              <div className="text-left">
                <p className={`font-medium ${currentMoodData?.color}`}>
                  {currentMoodData?.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  Last updated: {new Date()?.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowMoodTracker(!showMoodTracker)}
            iconName="Edit3"
            iconPosition="left"
            className="shrink-0"
          >
            Update Mood
          </Button>
        </div>
      </div>
      {/* Mood Tracker Slider */}
      {showMoodTracker && (
        <div className="mt-6 pt-6 border-t border-border growth-animation">
          <h3 className="text-lg font-heading font-medium text-foreground mb-4 text-center">
            How are you feeling right now?
          </h3>
          
          <div className="flex justify-center items-center gap-2 mb-4">
            {moodEmojis?.map((mood, index) => (
              <button
                key={mood?.value}
                onClick={() => handleMoodSelect(mood?.value)}
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  selectedMood === mood?.value 
                    ? 'bg-primary/20 ring-2 ring-primary scale-110' :'hover:bg-muted'
                }`}
              >
                <span className="text-3xl block">{mood?.emoji}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <Button
              variant="ghost"
              onClick={() => setShowMoodTracker(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() => handleMoodSelect(selectedMood)}
              iconName="Check"
              iconPosition="left"
            >
              Save Mood
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeSection;