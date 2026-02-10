import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PeerSupportPreview = () => {
  const navigate = useNavigate();

  const forumPosts = [
    {
      id: 1,
      title: 'Dealing with exam anxiety - tips that actually work',
      category: 'Academic Stress',
      author: 'Anonymous Student',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      replies: 12,
      upvotes: 24,
      preview: 'I wanted to share some techniques that have really helped me manage my anxiety during finals week...',
      tags: ['anxiety', 'exams', 'coping-strategies'],
      isHot: true
    },
    {
      id: 2,
      title: 'Finding motivation when everything feels overwhelming',
      category: 'Mental Health',
      author: 'Anonymous Student',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      replies: 8,
      upvotes: 18,
      preview: 'Has anyone else been feeling completely overwhelmed lately? I\'m struggling to find motivation...',
      tags: ['motivation', 'overwhelm', 'support'],
      isHot: false
    },
    {
      id: 3,
      title: 'Healthy sleep habits that changed my life',
      category: 'Wellness Tips',
      author: 'Anonymous Student',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      replies: 15,
      upvotes: 31,
      preview: 'After months of terrible sleep, I finally found a routine that works. Here\'s what helped me...',
      tags: ['sleep', 'wellness', 'routine'],
      isHot: true
    }
  ];

  const categories = [
    { name: 'Academic Stress', count: 45, color: 'bg-blue-100 text-blue-700' },
    { name: 'Mental Health', count: 38, color: 'bg-green-100 text-green-700' },
    { name: 'Wellness Tips', count: 29, color: 'bg-purple-100 text-purple-700' },
    { name: 'Relationships', count: 22, color: 'bg-orange-100 text-orange-700' }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days}d ago`;
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Peer Support Forum
          </h2>
          <p className="text-sm text-muted-foreground">
            Connect anonymously with fellow students
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/peer-support-forum')}
          iconName="MessageSquare"
          iconPosition="left"
        >
          Join Forum
        </Button>
      </div>
      {/* Popular Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Popular Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <div
              key={category?.name}
              className={`px-3 py-1 rounded-full text-xs font-medium ${category?.color} cursor-pointer hover:opacity-80 transition-opacity`}
            >
              {category?.name} ({category?.count})
            </div>
          ))}
        </div>
      </div>
      {/* Recent Posts */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">Recent Discussions</h3>
        
        {forumPosts?.map((post) => (
          <div
            key={post?.id}
            className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate(`/peer-support-forum/post/${post?.id}`)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {post?.isHot && (
                  <div className="flex items-center gap-1 text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                    <Icon name="TrendingUp" size={10} />
                    <span>Hot</span>
                  </div>
                )}
                <span className="text-xs text-muted-foreground">{post?.category}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(post?.timestamp)}
              </span>
            </div>

            <h4 className="font-medium text-foreground mb-2 hover:text-primary transition-colors">
              {post?.title}
            </h4>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {post?.preview}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {post?.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-border/50 text-muted-foreground px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="MessageCircle" size={14} />
                  <span>{post?.replies} replies</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="ArrowUp" size={14} />
                  <span>{post?.upvotes} upvotes</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon name="User" size={12} />
                <span>{post?.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Call to Action */}
      <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <Icon name="Users" size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground mb-1">
              Share Your Experience
            </h3>
            <p className="text-sm text-muted-foreground">
              Your story could help someone else. Join the conversation anonymously.
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate('/peer-support-forum/new-post')}
            iconName="Plus"
            iconPosition="left"
          >
            New Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PeerSupportPreview;