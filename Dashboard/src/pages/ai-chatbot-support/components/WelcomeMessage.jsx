import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeMessage = ({ onStartChat }) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "MessageCircle",
      title: "24/7 Support",
      description: "Get instant mental health guidance anytime"
    },
    {
      icon: "Shield",
      title: "Private & Secure",
      description: "Your conversations are confidential and encrypted"
    },
    {
      icon: "Heart",
      title: "Empathetic AI",
      description: "Trained to provide compassionate mental health support"
    },
    {
      icon: "Users",
      title: "Human Connection",
      description: "Easy escalation to professional counselors when needed"
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
            <Icon name="Bot" size={32} className="text-primary" />
          </div>
          
          <div>
            <h1 className="text-3xl font-heading font-semibold text-foreground mb-2">
              Welcome to AI Support
            </h1>
            <p className="text-lg text-muted-foreground">
              I'm here to provide you with mental health support and guidance whenever you need it.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features?.map((feature, index) => (
            <div key={index} className="glass-card p-4 rounded-lg text-left gentle-hover">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={feature?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">
                    {feature?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Button
            size="lg"
            onClick={onStartChat}
            iconName="MessageCircle"
            iconPosition="left"
            className="px-8"
          >
            Start Conversation
          </Button>
          
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/appointment-booking')}
              iconName="Calendar"
              iconPosition="left"
            >
              Book Counselor Session
            </Button>

            <Button
              asChild
              variant="success"
              iconName="Phone"
              iconPosition="left"
              onClick={() => { window.location.href = 'tel:9555631308'; }}
            >
              <a href="tel:9555631308" rel="noopener noreferrer">Call Support</a>
            </Button>

            <Button
              variant="ghost"
              onClick={() => navigate('/student-dashboard')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground mb-1">
                Important Notice
              </p>
              <p className="text-sm text-muted-foreground">
                This AI assistant provides support and guidance but is not a replacement for professional mental health care. In case of emergency, please contact crisis services immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
