import React, { useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';

const STORAGE_KEY = 'forumPosts';

const categories = ['Academic Stress', 'Mental Health', 'Wellness Tips', 'Relationships'];

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'New Post - Peer Support Forum';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const t = title.trim();
    const c = content.trim();
    if (!t || !c) return;
    setSubmitting(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing = raw ? JSON.parse(raw) : [];
      const post = {
        id: Date.now().toString(),
        title: t,
        category,
        author: 'Anonymous Student',
        timestamp: new Date().toISOString(),
        replies: 0,
        upvotes: 0,
        preview: c.slice(0, 140),
        content: c,
        tags: [],
        isHot: false,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([post, ...existing]));
      window.location.href = '/peer-support-forum';
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="glass-card p-6 rounded-xl mb-6">
            <h1 className="text-2xl font-heading font-semibold text-foreground">Create New Post</h1>
            <p className="text-sm text-muted-foreground mt-1">Share your experience anonymously. Be kind and respectful.</p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-6 rounded-xl space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">Title</label>
              <input
                id="title"
                type="text"
                className="w-full rounded-lg border border-border bg-white/80 p-3 outline-none focus:ring-2 focus:ring-ring"
                placeholder="Give your post a clear title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">Category</label>
              <select
                id="category"
                className="w-full rounded-lg border border-border bg-white/80 p-3 outline-none focus:ring-2 focus:ring-ring"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-foreground mb-1">Content</label>
              <textarea
                id="content"
                className="w-full rounded-lg border border-border bg-white/80 p-4 outline-none focus:ring-2 focus:ring-ring"
                rows={8}
                placeholder="Write your story, tips, or question..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">Please avoid sharing personal identifying information.</p>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => window.history.back()} iconName="X">Cancel</Button>
              <Button type="submit" loading={submitting} iconName="Plus">Post</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewPost;
