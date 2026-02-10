import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';

const STORAGE_KEY = 'forumPosts';

const PostDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    document.title = 'Post - Peer Support Forum';
    window.scrollTo(0, 0);
  }, []);

  const post = useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return parsed.find((p) => p.id === id) || null;
    } catch {
      return null;
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!post ? (
            <div className="glass-card p-6 rounded-xl">
              <h1 className="text-xl font-heading font-semibold text-foreground">Post not found</h1>
              <p className="text-sm text-muted-foreground mt-1">It may have been removed or you accessed an invalid link.</p>
            </div>
          ) : (
            <article className="glass-card p-6 rounded-xl">
              <p className="text-xs text-muted-foreground">{new Date(post.timestamp).toLocaleString()} • {post.category}</p>
              <h1 className="mt-1 text-2xl font-heading font-semibold text-foreground">{post.title}</h1>
              <p className="mt-4 whitespace-pre-wrap text-foreground">{post.content || post.preview}</p>
            </article>
          )}
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
