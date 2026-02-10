import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ConfirmationModal = ({ appointment, onClose, onConfirm }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    setIsConfirming(true);
    await onConfirm();
    setIsConfirming(false);
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getUrgencyColor = (level) => {
    switch (level) {
      case 'crisis':
        return 'text-error bg-error/10';
      case 'high':
        return 'text-warning bg-warning/10';
      case 'medium':
        return 'text-accent bg-accent/10';
      default:
        return 'text-success bg-success/10';
    }
  };

  return (
    <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-card max-w-lg w-full p-6 rounded-lg animate-growth max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" className="text-primary" size={24} />
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Confirm Appointment
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Counselor Info */}
        <div className="flex items-center space-x-4 mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={appointment?.counselor?.avatar}
              alt={appointment?.counselor?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground">
              {appointment?.counselor?.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {appointment?.counselor?.title}
            </p>
            <div className="flex items-center space-x-1 mt-1">
              <Icon name="Star" size={14} className="text-warning" />
              <span className="text-sm text-foreground">
                {appointment?.counselor?.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Date</p>
              <p className="text-foreground">{formatDate(appointment?.date)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Time</p>
              <p className="text-foreground">{appointment?.time}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Session Type</p>
              <p className="text-foreground capitalize">{appointment?.sessionType?.replace('_', ' ')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Urgency Level</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getUrgencyColor(appointment?.urgencyLevel)}`}>
                {appointment?.urgencyLevel}
              </span>
            </div>
          </div>

          {appointment?.concerns && (
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Primary Concerns</p>
              <p className="text-foreground text-sm bg-muted/30 p-3 rounded-lg">
                {appointment?.concerns}
              </p>
            </div>
          )}
        </div>

        {/* Data Sharing Summary */}
        {(appointment?.shareAssessments || appointment?.shareMoodData) && (
          <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
              <Icon name="Share2" size={16} />
              <span>Data Sharing Enabled</span>
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {appointment?.shareAssessments && (
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span>Assessment results will be shared</span>
                </li>
              )}
              {appointment?.shareMoodData && (
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span>Mood tracking data will be shared</span>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Reminder Preferences */}
        <div className="mb-6 p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
          <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
            <Icon name="Bell" size={16} />
            <span>Reminder Preferences</span>
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {appointment?.reminderEmail && (
              <li className="flex items-center space-x-2">
                <Icon name="Mail" size={14} className="text-secondary" />
                <span>Email reminders enabled</span>
              </li>
            )}
            {appointment?.reminderSMS && (
              <li className="flex items-center space-x-2">
                <Icon name="MessageSquare" size={14} className="text-secondary" />
                <span>SMS reminders enabled</span>
              </li>
            )}
          </ul>
        </div>

        {/* Important Notes */}
        <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Important Notes</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Please arrive 5 minutes early for your appointment</li>
                <li>• Cancellations must be made at least 24 hours in advance</li>
                <li>• Bring a valid student ID to your session</li>
                <li>• All sessions are confidential and HIPAA compliant</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isConfirming}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            loading={isConfirming}
            iconName="Check"
            iconPosition="left"
            className="flex-1"
          >
            Confirm Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
