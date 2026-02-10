import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import MoodSelector from './MoodSelector';

const JournalEntryForm = ({ onSave }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('neutral');

  const handleSave = (e) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    const entry = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      mood,
      content: trimmed,
      shared: false,
    };
    onSave(entry);
    setContent('');
    setMood('neutral');
  };

  return (
    <form onSubmit={handleSave} className="glass-card p-6 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Daily Journal</h3>
          <p className="text-sm text-muted-foreground">Write your thoughts and feelings. Only you can see this unless you choose to share.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">How are you feeling?</label>
        <MoodSelector value={mood} onChange={setMood} />
      </div>

      <div>
        <label htmlFor="journal-content" className="block text-sm font-medium text-foreground mb-2">Your entry</label>
        <textarea
          id="journal-content"
          className="w-full rounded-lg border border-border bg-white/80 p-4 outline-none focus:ring-2 focus:ring-ring"
          rows={5}
          placeholder="Type anything that’s on your mind..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Private & Secure — visible only to you</p>
        <Button type="submit" iconName="Save" iconPosition="left" disabled={!content.trim()}>Save Entry</Button>
      </div>
    </form>
  );
};

export default JournalEntryForm;
