import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ onClearChat, onShowCrisisSupport }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Icon name="Bot" size={20} className="text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Sahaay AI Assistant
          </h2>
          <p className="text-sm text-success flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Online • Available 24/7</span>
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          asChild
          variant="success"
          size="sm"
          iconName="Phone"
          iconPosition="left"
          onClick={() => { window.location.href = 'tel:9555631308'; }}
        >
          <a href="tel:+919555631308" rel="noopener noreferrer">Call Support</a>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onShowCrisisSupport}
          iconName="Heart"
          iconPosition="left"
          className="text-error border-error/20 hover:bg-error/10"
        >
          Crisis Support
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClearChat}
          iconName="RotateCcw"
          className="rounded-full"
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/student-dashboard')}
          iconName="X"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default ChatHeader;
