import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceHub = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources', icon: 'Grid3X3' },
    { id: 'meditation', label: 'Meditation', icon: 'Brain' },
    { id: 'audio', label: 'Audio Content', icon: 'Headphones' },
    { id: 'videos', label: 'Educational Videos', icon: 'Play' },
    { id: 'articles', label: 'Articles', icon: 'FileText' }
  ];

  const resources = [
    {
      id: 1,
      title: '5-Minute Morning Meditation',
      description: 'Start your day with mindfulness and positive energy',
      category: 'meditation',
      type: 'audio',
      duration: '5 min',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      rating: 4.8,
      views: '2.3k'
    },
    {
      id: 2,
      title: 'Understanding Anxiety',
      description: 'Learn about anxiety symptoms and coping strategies',
      category: 'videos',
      type: 'video',
      duration: '12 min',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
      rating: 4.9,
      views: '5.1k'
    },
    {
      id: 3,
      title: 'Sleep Stories for Better Rest',
      description: 'Calming bedtime stories to help you fall asleep',
      category: 'audio',
      type: 'audio',
      duration: '20 min',
      thumbnail: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300&h=200&fit=crop',
      rating: 4.7,
      views: '1.8k'
    },
    {
      id: 4,
      title: 'Breathing Techniques for Stress',
      description: 'Simple breathing exercises to manage stress and anxiety',
      category: 'meditation',
      type: 'guide',
      duration: '8 min',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
      rating: 4.6,
      views: '3.2k'
    },
    {
      id: 5,
      title: 'Building Healthy Relationships',
      description: 'Tips for maintaining positive relationships in college',
      category: 'articles',
      type: 'article',
      duration: '6 min read',
      thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop',
      rating: 4.5,
      views: '4.7k'
    },
    {
      id: 6,
      title: 'Progressive Muscle Relaxation',
      description: 'Full-body relaxation technique for deep stress relief',
      category: 'meditation',
      type: 'audio',
      duration: '15 min',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
      rating: 4.8,
      views: '2.9k'
    }
  ];

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources?.filter(resource => resource?.category === activeCategory);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'audio':
        return 'Headphones';
      case 'video':
        return 'Play';
      case 'article':
        return 'FileText';
      case 'guide':
        return 'BookOpen';
      default:
        return 'File';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'audio':
        return 'text-purple-600 bg-purple-100';
      case 'video':
        return 'text-red-600 bg-red-100';
      case 'article':
        return 'text-blue-600 bg-blue-100';
      case 'guide':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Resource Hub
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore wellness content and learning materials
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
        >
          Browse All
        </Button>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={activeCategory === category?.id ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveCategory(category?.id)}
            iconName={category?.icon}
            iconPosition="left"
            className="gentle-transition"
          >
            {category?.label}
          </Button>
        ))}
      </div>
      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources?.slice(0, 6)?.map((resource) => (
          <div
            key={resource?.id}
            className="group cursor-pointer bg-muted/20 rounded-lg overflow-hidden hover:bg-muted/30 transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Thumbnail */}
            <div className="relative h-32 overflow-hidden">
              <img
                src={resource?.thumbnail}
                alt={resource?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              
              {/* Type Badge */}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource?.type)}`}>
                <div className="flex items-center gap-1">
                  <Icon name={getTypeIcon(resource?.type)} size={12} />
                  <span className="capitalize">{resource?.type}</span>
                </div>
              </div>

              {/* Duration */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {resource?.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-medium text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                {resource?.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {resource?.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={12} className="text-yellow-500" />
                  <span>{resource?.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Eye" size={12} />
                  <span>{resource?.views} views</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More Button */}
      {filteredResources?.length > 6 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            iconName="ChevronDown"
            iconPosition="right"
          >
            Show More Resources
          </Button>
        </div>
      )}
      {/* Empty State */}
      {filteredResources?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-2">No resources found</h3>
          <p className="text-sm text-muted-foreground">
            Try selecting a different category or check back later for new content.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResourceHub;