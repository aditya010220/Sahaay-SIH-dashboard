import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../components/ui/Header';
import JournalEntryForm from './components/JournalEntryForm';
import JournalEntriesList from './components/JournalEntriesList';
import Button from '../../components/ui/Button';

const STORAGE_KEY = 'journalEntries';

const JournalPage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    document.title = 'Journal Section (Beta) - Sahaay';
    window.scrollTo(0, 0);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch { }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch { }
  }, [entries]);

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [entries]);

  const handleSave = (entry) => {
    setEntries((prev) => [entry, ...prev]);
  };

  const handleDelete = (entry) => {
    const ok = window.confirm('Delete this entry?');
    if (!ok) return;
    setEntries((prev) => prev.filter((e) => e.id !== entry.id));
  };

  const handleToggleShare = async (entry) => {
    if (!entry.shared) {
      const text = `Sahaay Journal Entry\nDate: ${new Date(entry.createdAt).toLocaleString()}\nMood: ${entry.mood}\n\n${entry.content}`;
      try {
        await navigator.clipboard.writeText(text);
        alert('Copied entry to clipboard. You can paste it in an email or message to your counselor.');
      } catch {
        const body = encodeURIComponent(text);
        window.location.href = `mailto:?subject=Journal%20Entry&body=${body}`;
      }
    }
    setEntries((prev) => prev.map((e) => (e.id === entry.id ? { ...e, shared: !e.shared } : e)));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-heading font-semibold text-foreground">Journal Section (Beta)</h1>
                  <p className="text-sm text-muted-foreground mt-1">Private & Secure — Only visible to you unless you share an entry.</p>
                </div>
                <Button variant="secondary" iconName="Lock">Private</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <JournalEntryForm onSave={handleSave} />
              <JournalEntriesList entries={sortedEntries} onDelete={handleDelete} onToggleShare={handleToggleShare} />
            </div>
            <aside className="lg:col-span-1 space-y-4">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-heading font-semibold text-foreground">Tips</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Write freely — there’s no right or wrong.</li>
                  <li>Capture your mood to see patterns over time.</li>
                  <li>Share specific entries if you want counselor feedback.</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JournalPage;
