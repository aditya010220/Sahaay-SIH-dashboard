import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AuthIllustration = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of mental health/wellness images
  const images = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      alt: "Person meditating peacefully in nature"
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      alt: "Calm yoga session for mental wellness"
    },
    {
      src: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=400&h=400&fit=crop",
      alt: "Peaceful mindfulness and mental health"
    }
  ];

  // Change image every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % images.length
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center p-8">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl" />

      {/* Main Visual Content */}
      <div className="relative z-10 max-w-lg w-full flex-1 flex items-center justify-center">

        {/* Central Mental Health Image */}
        <div className="relative">
          {/* Main image container */}
          <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center relative overflow-hidden shadow-xl">

            {/* Rotating Images */}
            <div className="relative w-72 h-72 rounded-full overflow-hidden">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              ))}

              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>

            {/* Floating calming elements */}
            <div className="absolute top-8 left-12 w-4 h-4 rounded-full bg-success/60 animate-float shadow-lg"></div>
            <div className="absolute top-16 right-16 w-3 h-3 rounded-full bg-primary/60 animate-float shadow-lg" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-8 w-5 h-5 rounded-full bg-secondary/60 animate-float shadow-lg" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-12 right-12 w-4 h-4 rounded-full bg-accent/60 animate-float shadow-lg" style={{ animationDelay: '1.5s' }}></div>

            {/* Removed all leaf icons */}
          </div>

          {/* Security shields around the main illustration */}
          <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center border border-primary/20">
            <Icon name="Shield" size={20} className="text-primary" />
          </div>

          <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center border border-success/20">
            <Icon name="Lock" size={20} className="text-success" />
          </div>

          <div className="absolute top-1/2 -right-8 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center border border-error/20">
            <Icon name="Heart" size={16} className="text-error" />
          </div>

          {/* Image indicators */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                  ? 'bg-primary scale-125'
                  : 'bg-muted-foreground/40'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Message Section */}
      <div className="relative z-10 w-full max-w-md mt-12">
        <div className="bg-white/95 backdrop-blur-therapeutic shadow-xl rounded-2xl p-6 border border-border/20 text-center">

          {/* Main Message - Updated font */}
          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <Icon name="Zap" size={28} className="text-primary mr-3" />
            </div>
            <h2 className="text-2xl font-sans font-bold text-foreground leading-relaxed tracking-wide">
              You are one step away from your mental wellness journey
            </h2>
          </div>

          {/* Security Features - Updated for Indian compliance */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Lock" size={16} className="text-success" />
              <span>End-to-end encrypted</span>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Shield" size={16} className="text-primary" />
              <span>DPDP Act 2023 compliant</span>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Heart" size={16} className="text-secondary" />
              <span>MHCA 2017 certified</span>
            </div>
          </div>

          {/* Calming message */}
          <div className="pt-4 border-t border-border/20">
            <p className="text-xs text-muted-foreground italic">
              "Your mental health matters. Take the first step with confidence."
            </p>
          </div>
        </div>
      </div>

      {/* Ambient background elements */}
      <div className="absolute top-1/4 left-8 w-16 h-16 rounded-full bg-primary/5 blur-lg"></div>
      <div className="absolute bottom-1/4 right-8 w-20 h-20 rounded-full bg-secondary/5 blur-lg"></div>
      <div className="absolute top-1/2 left-4 w-12 h-12 rounded-full bg-accent/5 blur-lg"></div>
    </div>
  );
};

export default AuthIllustration;
