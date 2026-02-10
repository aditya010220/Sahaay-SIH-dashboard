import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeMessage = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            className="text-primary"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="30"
              cy="30"
              r="28"
              fill="currentColor"
              fillOpacity="0.1"
              className="animate-pulse"
            />
            <path
              d="M18 30c0-6.6 5.4-12 12-12s12 5.4 12 12c0 3.3-1.35 6.3-3.45 8.55l-4.2-4.2c1.05-0.9 1.65-2.25 1.65-4.35 0-2.55-1.95-4.5-4.5-4.5s-4.5 1.95-4.5 4.5c0 2.1 0.6 3.45 1.65 4.35l-4.2 4.2C19.35 36.3 18 33.3 18 30z"
              fill="currentColor"
            />
            <circle cx="30" cy="30" r="3" fill="currentColor" />
            <path
              d="M22.5 42c2.25 2.25 5.25 3 7.5 3s5.25-0.75 7.5-3"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          {/* Floating particles animation */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-accent/30 rounded-full animate-bounce"
            style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-secondary/40 rounded-full animate-bounce"
            style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}></div>
        </div>
      </div>

      {/* Welcome Text */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
          Welcome to Sahaay
        </h1>
        <p className="text-base text-muted-foreground font-caption leading-relaxed max-w-md mx-auto">
          Your safe space for mental wellness and support.
          <br />
          <span className="text-primary font-medium">Stigma-free • Confidential • Caring</span>
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 pt-2">
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="Shield" size={14} className="text-success" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="Heart" size={14} className="text-primary" />
          <span>Licensed Counselors</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="Users" size={14} className="text-secondary" />
          <span>Peer Support</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;