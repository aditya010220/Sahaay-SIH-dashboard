import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CounselorCard = ({ counselor, onBookAppointment, onViewProfile }) => {
  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10';
      case 'busy':
        return 'text-warning bg-warning/10';
      case 'unavailable':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available':
        return 'Available Today';
      case 'busy':
        return 'Limited Availability';
      case 'unavailable':
        return 'Fully Booked';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg gentle-hover">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={counselor?.avatar}
              alt={counselor?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background ${
            counselor?.isOnline ? 'bg-success' : 'bg-muted-foreground'
          }`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {counselor?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {counselor?.title}
              </p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(counselor?.availability)}`}>
              {getAvailabilityText(counselor?.availability)}
            </span>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="GraduationCap" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{counselor?.experience}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-warning" />
              <span className="text-sm text-foreground">
                {counselor?.rating} ({counselor?.reviewCount} reviews)
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{counselor?.location}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm font-medium text-foreground mb-2">Specializations:</p>
            <div className="flex flex-wrap gap-2">
              {counselor?.specializations?.map((spec, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-xs"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewProfile(counselor?.id)}
              iconName="User"
              iconPosition="left"
              className="flex-1"
            >
              View Profile
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onBookAppointment(counselor?.id)}
              iconName="Calendar"
              iconPosition="left"
              className="flex-1"
              disabled={counselor?.availability === 'unavailable'}
            >
              Book Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorCard;