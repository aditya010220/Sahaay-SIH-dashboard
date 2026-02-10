import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, isUser, timestamp, isTyping = false }) => {
  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderContent = () => {
    if (typeof message !== 'string') return null;
    // Parse special attachment formats: "audio:LABEL|URL" or "file:FILENAME|URL"
    if (message.startsWith('audio:')) {
      const payload = message.slice(6);
      const [labelEnc, url] = payload.split('|');
      const label = decodeURIComponent(labelEnc || 'Voice message');
      return (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">{label}</div>
          <audio controls src={url} className="w-56" />
        </div>
      );
    }
    if (message.startsWith('file:')) {
      const payload = message.slice(5);
      const [nameEnc, url] = payload.split('|');
      const name = decodeURIComponent(nameEnc || 'file');
      return (
        <a href={url} download={name} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline">
          <Icon name="Paperclip" size={14} className="mr-2" />
          <span className="text-sm break-all">{name}</span>
        </a>
      );
    }
    return <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>;
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} className="text-primary" />
        </div>
        <div className="bg-primary/10 rounded-2xl rounded-tl-md px-4 py-3 max-w-xs">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-secondary/20' :'bg-primary/20'
      }`}>
        <Icon 
          name={isUser ? "User" : "Bot"} 
          size={16} 
          className={isUser ? "text-secondary" : "text-primary"} 
        />
      </div>
      
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'text-right' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-secondary/10 rounded-tr-md text-foreground' 
            : 'bg-primary/10 rounded-tl-md text-foreground'
        }`}>
          {renderContent()}
        </div>
        <p className="text-xs text-muted-foreground mt-1 px-2">
          {formatTime(timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
