import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message, isBot, timestamp, isError }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`chat-message ${isBot ? 'bot' : 'user'} ${isError ? 'error' : ''}`}>
      {isBot && (
        <div className="message-avatar">
          <img 
            src="/logo.png" 
            alt="AI" 
            className="avatar-image"
          />
        </div>
      )}
      <div className="message-content">
        <div className="message-bubble">
          <p className="message-text">{message}</p>
        </div>
        <span className="message-time">{formatTime(timestamp)}</span>
      </div>
      {!isBot && (
        <div className="message-avatar user-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
