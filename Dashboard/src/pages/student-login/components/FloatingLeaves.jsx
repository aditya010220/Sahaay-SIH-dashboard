import React from 'react';

const FloatingLeaves = () => {
  const leaves = [
    { id: 1, size: 'w-8 h-8', color: 'bg-primary/10', delay: '0s', duration: '20s', path: 'translate(0, 0) rotate(0deg)' },
    { id: 2, size: 'w-6 h-6', color: 'bg-secondary/15', delay: '2s', duration: '25s', path: 'translate(30px, -30px) rotate(120deg)' },
    { id: 3, size: 'w-10 h-10', color: 'bg-accent/8', delay: '4s', duration: '30s', path: 'translate(-20px, 20px) rotate(240deg)' },
    { id: 4, size: 'w-5 h-5', color: 'bg-primary/12', delay: '6s', duration: '22s', path: 'translate(50px, 10px) rotate(180deg)' },
    { id: 5, size: 'w-7 h-7', color: 'bg-secondary/10', delay: '8s', duration: '28s', path: 'translate(-40px, -10px) rotate(300deg)' },
    { id: 6, size: 'w-4 h-4', color: 'bg-accent/12', delay: '10s', duration: '24s', path: 'translate(20px, 40px) rotate(60deg)' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      {/* Floating leaf particles */}
      {leaves?.map((leaf) => (
        <div
          key={leaf?.id}
          className={`absolute ${leaf?.size} ${leaf?.color} rounded-full opacity-60`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float-leaf ${leaf?.duration} ease-in-out infinite`,
            animationDelay: leaf?.delay,
            transform: leaf?.path
          }}
        />
      ))}
      {/* Subtle animated shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-l from-accent/5 to-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-t from-secondary/5 to-accent/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '6s' }}></div>
      <style jsx>{`
        @keyframes float-leaf {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(30px, -30px) rotate(90deg) scale(1.1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-20px, 20px) rotate(180deg) scale(0.9);
            opacity: 0.4;
          }
          75% {
            transform: translate(40px, 10px) rotate(270deg) scale(1.05);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingLeaves;