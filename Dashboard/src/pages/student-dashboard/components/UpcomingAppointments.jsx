import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingAppointments = () => {
  const navigate = useNavigate();

  const upcomingAppointments = [
    {
      id: 2,
      counselorName: 'Dr. Rajesh Kumar',
      counselorTitle: 'Family & Career Counselor',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      time: '10:30 AM',
      duration: 45,
      type: 'Follow-up Session',
      location: 'Virtual Meeting (Google Meet)',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      status: 'confirmed',
      sessionType: 'Career vs Family Expectations',
      languages: ['Hindi', 'English', 'Marathi']
    },
    {
      id: 3,
      counselorName: 'Dr. Meera Reddy',
      counselorTitle: 'Crisis Intervention Specialist',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      time: '4:30 PM',
      duration: 60,
      type: 'Emergency Support Session',
      location: 'Crisis Support Center, NIMHANS Bangalore',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      status: 'pending',
      sessionType: 'Anxiety & Depression Support',
      languages: ['Telugu', 'English', 'Hindi', 'Kannada']
    }
  ];

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);

    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === tomorrow?.toDateString()) {
      return 'Tomorrow';
    } else {
      return date?.toLocaleDateString('en-IN', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-success bg-success/10 border border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border border-warning/20';
      case 'cancelled':
        return 'text-error bg-error/10 border border-error/20';
      default:
        return 'text-muted-foreground bg-muted/10 border border-border';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const handleJoinSession = (appointment) => {
    if (appointment?.location?.includes('Virtual')) {
      // Logic to join virtual session
      window.open('https://meet.google.com/new', '_blank');
    } else {
      // Show directions or location info
      alert(`Please visit: ${appointment?.location}`);
    }
  };

  const handleEmergencyContact = () => {
    // Indian mental health emergency contacts
    alert('Emergency Contacts:\n\nKIRAN Helpline: 1800-599-0019\nVandrevala Foundation: 9999 666 555\nSneha Helpline: 044-24640050');
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Upcoming Appointments
          </h2>
          <p className="text-sm text-muted-foreground">
            Your scheduled counseling sessions with Indian mental health experts
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEmergencyContact}
            iconName="Phone"
            iconPosition="left"
            className="text-error hover:bg-error/10"
          >
            Help
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/appointment-booking')}
            iconName="Plus"
            iconPosition="left"
          >
            Book New
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {upcomingAppointments?.map((appointment) => (
          <div
            key={appointment?.id}
            className="p-4 bg-muted/20 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors duration-200"
          >
            <div className="flex items-start gap-4">
              {/* Counselor Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                <img
                  src={appointment?.avatar}
                  alt={`${appointment?.counselorName} - Indian Mental Health Counselor`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>

              {/* Appointment Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-foreground">
                      {appointment?.counselorName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {appointment?.counselorTitle}
                    </p>
                    <p className="text-xs text-primary font-medium">
                      {appointment?.sessionType}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment?.status)}`}>
                    {getStatusText(appointment?.status)}
                  </div>
                </div>

                {/* Date and Time */}
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(appointment?.date)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>{appointment?.time} ({appointment?.duration} min)</span>
                  </div>
                </div>

                {/* Session Type and Location */}
                <div className="flex flex-col gap-2 mb-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Icon name="User" size={14} />
                    <span>{appointment?.type}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Icon name={appointment?.location?.includes('Virtual') ? 'Video' : 'MapPin'} size={14} />
                    <span className="truncate">{appointment?.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Icon name="Globe" size={14} />
                    <span>Languages: {appointment?.languages?.join(', ')}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {appointment?.location?.includes('Virtual') && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleJoinSession(appointment)}
                      iconName="Video"
                      iconPosition="left"
                      className="bg-success hover:bg-success/90"
                    >
                      Join Session
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    className="text-error hover:text-error/80 hover:bg-error/10"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>

            {/* Session Preparation Tips */}
            {appointment?.status === 'confirmed' && (
              <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-start gap-2">
                  <Icon name="Info" size={16} className="text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="text-primary font-medium mb-1">Session Preparation:</p>
                    <ul className="text-muted-foreground space-y-1 text-xs">
                      <li>• Find a quiet, private space</li>
                      <li>• Keep a glass of water nearby</li>
                      <li>• Have your questions/concerns written down</li>
                      <li>• Join 2-3 minutes early</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {upcomingAppointments?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-2">No Upcoming Appointments</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Schedule a session with one of our certified Indian mental health counselors to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              variant="default"
              onClick={() => navigate('/appointment-booking')}
              iconName="Plus"
              iconPosition="left"
            >
              Book Appointment
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/ai-chatbot-support')}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Try AI Support
            </Button>
          </div>
        </div>
      )}

      {/* Emergency Support Banner */}
      <div className="mt-6 p-4 bg-error/5 border border-error/20 rounded-lg">
        <div className="flex items-center gap-3">
          <Icon name="Heart" size={20} className="text-error" />
          <div className="flex-1">
            <h4 className="font-medium text-foreground text-sm">Need immediate help?</h4>
            <p className="text-xs text-muted-foreground">
              24/7 crisis support available in Hindi, English, and regional languages
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEmergencyContact}
            iconName="Phone"
            iconPosition="left"
            className="border-error/20 text-error hover:bg-error/10"
          >
            Crisis Helpline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointments;
