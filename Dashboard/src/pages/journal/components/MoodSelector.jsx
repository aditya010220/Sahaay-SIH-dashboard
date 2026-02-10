import React from 'react';

const moods = [
  { key: 'great', emoji: '😊', label: 'Happy', color: 'bg-green-100 text-green-700' },
  { key: 'good', emoji: '🙂', label: 'Okay', color: 'bg-sky-100 text-sky-700' },
  { key: 'neutral', emoji: '😐', label: 'Neutral', color: 'bg-gray-100 text-gray-700' },
  { key: 'sad', emoji: '☹️', label: 'Sad', color: 'bg-yellow-100 text-yellow-800' },
  { key: 'down', emoji: '😢', label: 'Down', color: 'bg-red-100 text-red-700' },
];

const MoodSelector = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {moods.map((m) => {
        const selected = value === m.key;
        return (
          <button
            type="button"
            key={m.key}
            onClick={() => onChange(m.key)}
            className={`px-3 py-2 rounded-full border gentle-transition ${selected ? 'border-primary bg-accent/50' : 'border-border hover:bg-accent/30'}`}
            aria-pressed={selected}
          >
            <span className="mr-2" aria-hidden>{m.emoji}</span>
            <span className="text-sm">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export const moodOptions = moods;
export default MoodSelector;
