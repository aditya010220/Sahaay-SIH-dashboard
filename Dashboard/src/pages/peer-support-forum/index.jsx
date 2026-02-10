import React, { useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const STORAGE_KEY = 'forumPosts';

const seedPosts = [
  {
    id: 'seed-1',
    title: 'Dealing with exam anxiety - tips that actually work',
    category: 'Academic Stress',
    author: 'Anonymous Student',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    replies: 12,
    upvotes: 24,
    preview: 'I wanted to share some techniques that have really helped me manage my anxiety during finals week...'
  },
];

const ForumIndex = () => {
  useEffect(() => {
    document.title = 'Peer Support Forum';
    window.scrollTo(0, 0);
  }, []);

  const posts = useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const combined = [...parsed, ...seedPosts];
      const unique = new Map();
      combined.forEach((p) => unique.set(p.id, p));
      return Array.from(unique.values()).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch {
      return seedPosts;
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="glass-card p-6 rounded-xl flex-1 mr-4">
              <h1 className="text-2xl font-heading font-semibold text-foreground">Peer Support Forum</h1>
              <p className="text-sm text-muted-foreground mt-1">Connect anonymously with fellow students. Be supportive and respectful.</p>
            </div>
            <Button variant="secondary" iconName="Plus" onClick={() => (window.location.href = '/peer-support-forum/new-post')}>New Post</Button>
          </div>

          <div className="space-y-3">
            {posts.map((p) => (
              <article key={p.id} className="glass-card p-6 rounded-xl cursor-pointer" onClick={() => (window.location.href = `/peer-support-forum/post/${p.id}`)}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{new Date(p.timestamp).toLocaleString()}</p>
                    <h3 className="mt-1 text-lg font-heading font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.preview}</p>
                    <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 rounded-md border border-border text-xs">
                      <Icon name="Tag" size={12} />
                      <span>{p.category}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1"><Icon name="MessageCircle" size={14} /> {p.replies}</span>
                      <span className="inline-flex items-center gap-1"><Icon name="ArrowUp" size={14} /> {p.upvotes}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForumIndex;
