import React, { useMemo, useState } from 'react';
import Button from '../../../components/ui/Button';
import { moodOptions } from './MoodSelector';

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return iso;
  }
};

const JournalEntriesList = ({ entries, onDelete, onToggleShare }) => {
  const [query, setQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState('all');

  const filtered = useMemo(() => {
    const byQuery = (e) => !query || e.content.toLowerCase().includes(query.toLowerCase());
    const byMood = (e) => moodFilter === 'all' || e.mood === moodFilter;
    return entries.filter((e) => byQuery(e) && byMood(e));
  }, [entries, query, moodFilter]);

  return (
    <section className="space-y-4">
      <div className="glass-card p-4 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">Search entries</label>
            <input
              id="search"
              type="text"
              className="w-full rounded-lg border border-border bg-white/80 p-3 outline-none focus:ring-2 focus:ring-ring"
              placeholder="Search by keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Filter by mood</label>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={`px-3 py-2 rounded-full border ${moodFilter === 'all' ? 'border-primary bg-accent/50' : 'border-border hover:bg-accent/30'}`} onClick={() => setMoodFilter('all')}>All</button>
              {moodOptions.map((m) => (
                <button
                  type="button"
                  key={m.key}
                  className={`px-3 py-2 rounded-full border ${moodFilter === m.key ? 'border-primary bg-accent/50' : 'border-border hover:bg-accent/30'}`}
                  onClick={() => setMoodFilter(m.key)}
                >
                  <span className="mr-1" aria-hidden>{m.emoji}</span>
                  <span className="text-sm">{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="glass-card p-6 rounded-xl text-center">
            <p className="text-sm text-muted-foreground">No entries found.</p>
          </div>
        )}
        {filtered.map((e) => (
          <article key={e.id} className="glass-card p-6 rounded-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">{formatDate(e.createdAt)}</p>
                <div className="mt-1 inline-flex items-center gap-2 px-2 py-1 rounded-md border border-border">
                  <span aria-hidden>{moodOptions.find((m) => m.key === e.mood)?.emoji || '😐'}</span>
                  <span className="text-xs text-muted-foreground capitalize">{e.mood}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName={e.shared ? 'Eye' : 'Share2'}
                  onClick={() => onToggleShare(e)}
                >
                  {e.shared ? 'Shared' : 'Share'}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => onDelete(e)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <p className="mt-3 text-foreground whitespace-pre-wrap">{e.content}</p>
            {!e.shared && (
              <p className="mt-3 text-xs text-muted-foreground">Private — not visible to anyone unless you share this entry.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default JournalEntriesList;
