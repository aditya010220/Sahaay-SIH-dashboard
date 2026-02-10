import React, { useEffect, useMemo, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MotivationTicker = () => {
  // Curated mental-health affirmations and reminders
  const quotes = useMemo(() => [
    'Your feelings are valid. Healing is not linear.',
    'Small steps count. Celebrate tiny wins today.',
    'You are not your thoughts. Let them pass like clouds.',
    'Asking for help is a sign of strength, not weakness.',
    'Breathe in calm, breathe out tension.',
    'Rest is productive. Your mind deserves care.',
    'Progress over perfection. Keep moving forward.',
    'You’ve survived 100% of your hard days. This one too.',
    'Boundaries protect your peace and energy.',
    'Be kind to the parts of you still learning.',
  ], []);

  const [index, setIndex] = useState(0);

  // Rotate every second
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(id);
  }, [quotes.length]);

  const handlePrev = () => setIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % quotes.length);

  return (
    <section aria-live="polite" className="glass-card rounded-xl p-4 sm:p-5 shadow-subtle">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-success/15 text-success flex items-center justify-center shrink-0">
            <Icon name="Sparkles" size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Daily Motivation</p>
            <p className="text-foreground font-medium truncate animate-fade-in">
              {quotes[index]}
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Button variant="ghost" size="xs" iconName="ChevronLeft" onClick={handlePrev} aria-label="Previous" />
          <Button variant="ghost" size="xs" iconName="ChevronRight" onClick={handleNext} aria-label="Next" />
        </div>
      </div>
    </section>
  );
};

export default MotivationTicker;
