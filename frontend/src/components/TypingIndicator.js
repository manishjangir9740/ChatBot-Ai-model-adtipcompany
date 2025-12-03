import React from 'react';
import './TypingIndicator.css';

const TypingIndicator = () => {
  return (
    <div className="typing-indicator">
      <div className="typing-avatar">
        <img 
          src="/logo.png" 
          alt="AI" 
          className="typing-avatar-image"
        />
      </div>
      <div className="typing-content">
        <div className="typing-bubble">
          <div className="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <span className="typing-text">AI is thinking...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
