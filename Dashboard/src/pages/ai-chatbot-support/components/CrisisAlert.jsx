import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CrisisAlert = ({ isVisible, onClose }) => {
  const navigate = useNavigate();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-6 rounded-lg animate-growth">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" className="text-error" size={24} />
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Crisis Support Detected
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            I've detected that you might be in crisis. Your safety is our priority. Please consider these immediate resources:
          </p>

          <div className="space-y-2">
            <Button
              asChild
              variant="destructive"
              fullWidth
              iconName="Phone"
              iconPosition="left"
            >
              <a href="tel:14416">Call Crisis Hotline: 14416</a>
            </Button>

            <Button
              variant="outline"
              fullWidth
              iconName="MessageCircle"
              iconPosition="left"
            >
              Text Crisis Line: 741741
            </Button>

            <Button
              variant="secondary"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              onClick={() => {
                navigate('/appointment-booking');
                onClose();
              }}
            >
              Emergency Counselor Session
            </Button>
          </div>

          <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
            <p className="text-xs text-foreground font-medium mb-1">
              Remember:
            </p>
            <p className="text-xs text-muted-foreground">
              You are not alone. These feelings are temporary. Help is available 24/7.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisAlert;
