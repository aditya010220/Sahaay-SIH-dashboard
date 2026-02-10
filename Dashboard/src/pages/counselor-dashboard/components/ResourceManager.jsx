import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ResourceManager = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const resourceCategories = [
    { id: 'all', name: 'All Resources', count: 24 },
    { id: 'worksheets', name: 'Worksheets', count: 8 },
    { id: 'audio', name: 'Audio Guides', count: 6 },
    { id: 'videos', name: 'Educational Videos', count: 5 },
    { id: 'articles', name: 'Articles', count: 3 },
    { id: 'assessments', name: 'Assessments', count: 2 }
  ];

  const resources = [
    {
      id: 1,
      title: "Anxiety Management Worksheet",
      category: "worksheets",
      type: "PDF",
      size: "2.3 MB",
      uploadDate: "2025-01-10",
      downloads: 45,
      description: "Comprehensive worksheet for identifying anxiety triggers and developing coping strategies.",
      tags: ["anxiety", "coping", "CBT"],
      thumbnail: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?w=300&h=200&fit=crop",
      isShared: true
    },
    {
      id: 2,
      title: "Progressive Muscle Relaxation Guide",
      category: "audio",
      type: "MP3",
      size: "15.7 MB",
      uploadDate: "2025-01-08",
      downloads: 32,
      description: "20-minute guided progressive muscle relaxation session for stress relief.",
      tags: ["relaxation", "stress", "mindfulness"],
      thumbnail: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?w=300&h=200&fit=crop",
      isShared: false
    },
    {
      id: 3,
      title: "Understanding Depression - Educational Video",
      category: "videos",
      type: "MP4",
      size: "125 MB",
      uploadDate: "2025-01-05",
      downloads: 28,
      description: "Educational video explaining depression symptoms, causes, and treatment options.",
      tags: ["depression", "education", "awareness"],
      thumbnail: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?w=300&h=200&fit=crop",
      isShared: true
    },
    {
      id: 4,
      title: "Mood Tracking Journal Template",
      category: "worksheets",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2025-01-03",
      downloads: 67,
      description: "Daily mood tracking template with space for triggers, emotions, and reflections.",
      tags: ["mood", "tracking", "journal"],
      thumbnail: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?w=300&h=200&fit=crop",
      isShared: true
    },
    {
      id: 5,
      title: "Breathing Exercises Audio Collection",
      category: "audio",
      type: "MP3",
      size: "45.2 MB",
      uploadDate: "2025-01-01",
      downloads: 89,
      description: "Collection of 5 different breathing exercises for anxiety and stress management.",
      tags: ["breathing", "anxiety", "relaxation"],
      thumbnail: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?w=300&h=200&fit=crop",
      isShared: false
    },
    {
      id: 6,
      title: "PHQ-9 Depression Assessment",
      category: "assessments",
      type: "PDF",
      size: "0.8 MB",
      uploadDate: "2024-12-28",
      downloads: 156,
      description: "Patient Health Questionnaire-9 for depression screening and monitoring.",
      tags: ["assessment", "depression", "PHQ-9"],
      thumbnail: "https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?w=300&h=200&fit=crop",
      isShared: true
    }
  ];

  const filteredResources = resources?.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource?.category === selectedCategory;
    const matchesSearch = resource?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         resource?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         resource?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return 'FileText';
      case 'mp3': return 'Music';
      case 'mp4': return 'Video';
      case 'doc': case'docx': return 'FileText';
      default: return 'File';
    }
  };

  const getFileTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return 'text-error bg-error/10';
      case 'mp3': return 'text-success bg-success/10';
      case 'mp4': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="FolderOpen" className="text-primary" size={24} />
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Resource Manager
          </h2>
        </div>
        <Button
          variant="secondary"
          iconName="Upload"
          iconPosition="left"
          onClick={() => setShowUploadModal(true)}
        >
          Upload Resource
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Categories Sidebar */}
        <div className="lg:w-64 space-y-2">
          <h3 className="font-medium text-foreground mb-3">Categories</h3>
          {resourceCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`w-full text-left p-3 rounded-lg gentle-transition ${
                selectedCategory === category?.id
                  ? 'bg-primary/10 text-primary border border-primary/20' :'bg-background/50 text-foreground border border-border hover:bg-background/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{category?.name}</span>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  {category?.count}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="flex-1">
          <div className="mb-4">
            <Input
              type="search"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="max-w-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredResources?.map((resource) => (
              <div
                key={resource?.id}
                className="p-4 bg-background/50 rounded-lg border border-border hover:bg-background/80 gentle-transition"
              >
                <div className="relative mb-3">
                  <img
                    src={resource?.thumbnail}
                    alt={resource?.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getFileTypeColor(resource?.type)}`}>
                      {resource?.type}
                    </span>
                  </div>
                  {resource?.isShared && (
                    <div className="absolute top-2 left-2">
                      <Icon name="Share2" className="text-success bg-success/10 p-1 rounded" size={20} />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground line-clamp-2">
                    {resource?.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {resource?.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{resource?.size}</span>
                    <span>{new Date(resource.uploadDate)?.toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {resource?.tags?.slice(0, 3)?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Icon name="Download" size={12} />
                      <span>{resource?.downloads} downloads</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Share2"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredResources?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="FolderOpen" className="text-muted-foreground mx-auto mb-4" size={48} />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No resources found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or category filter
              </p>
              <Button
                variant="secondary"
                iconName="Upload"
                iconPosition="left"
                onClick={() => setShowUploadModal(true)}
              >
                Upload First Resource
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 rounded-lg animate-growth">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Upload Resource
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUploadModal(false)}
                iconName="X"
              />
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Icon name="Upload" className="text-muted-foreground mx-auto mb-2" size={32} />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <Button variant="outline" size="sm">
                  Choose Files
                </Button>
              </div>
              
              <Input
                label="Resource Title"
                placeholder="Enter resource title"
                required
              />
              
              <Input
                label="Description"
                placeholder="Brief description of the resource"
                required
              />
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="shareResource"
                  className="rounded border-border"
                />
                <label htmlFor="shareResource" className="text-sm text-foreground">
                  Share with other counselors
                </label>
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  iconName="Upload"
                  iconPosition="left"
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceManager;
