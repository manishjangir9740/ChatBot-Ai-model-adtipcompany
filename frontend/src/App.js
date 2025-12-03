import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [thinkingMode, setThinkingMode] = useState('Thinking');
  const [showThinkingDropdown, setShowThinkingDropdown] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check API connection on mount
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      await axios.get(API_URL.replace('/api', '/health'));
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
      console.error('Connection error:', error);
    }
  };

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        message: inputMessage
      });

      setIsTyping(false);

      if (response.data.success) {
        const botMessage = {
          text: response.data.reply,
          isBot: true,
          timestamp: new Date(response.data.timestamp)
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(response.data.error || 'Failed to get response');
      }
    } catch (error) {
      setIsTyping(false);
      const errorMessage = {
        text: "Sorry, I'm having trouble connecting to the server. Please make sure the backend is running.",
        isBot: true,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Chat error:', error);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="app">
      {/* Background Effects */}
      <div className="background-gradient"></div>
      
      {/* Main Container */}
      <div className="main-container">
        {/* Header with status */}
        <header className="app-header">
          <div className="header-left">
            <div className="logo-container">
              <img 
                src="/logo.png" 
                alt="AI Assistant" 
                className="ai-logo"
              />
            </div>
            <div className="brand-info">
              <span className="brand-name">AI Chatbot</span>
              <span className={`connection-status ${isConnected ? 'online' : 'offline'}`}>
                <span className="status-dot"></span>
                {isConnected ? 'Connected' : 'Offline'}
              </span>
            </div>
          </div>
          <div className="header-right">
            {hasMessages && (
              <button className="clear-chat-btn" onClick={handleClearChat} title="Clear chat">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            )}
          </div>
        </header>

        {/* Full Width Horizontal Line */}
        <div className="header-line"></div>

        {/* Chat Area */}
        <main className="chat-area">
          {!hasMessages ? (
            <div className="welcome-section">
              <div className="welcome-logo">
                <img 
                  src="/logo.png" 
                  alt="AI Assistant" 
                  className="welcome-ai-image"
                />
                <div className="logo-glow"></div>
              </div>
              <h1 className="welcome-title">
              Hello there,
              </h1>
              <p className="welcome-subtitle">How can I assist you today?</p>
              
              <div className="quick-actions">
                <button className="quick-action-btn" onClick={() => setInputMessage("Tell me about yourself")}>
                  <span className="action-icon">💡</span>
                  <span>About AI</span>
                </button>
                <button className="quick-action-btn" onClick={() => setInputMessage("What can you help me with?")}>
                  <span className="action-icon">🚀</span>
                  <span>Capabilities</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="messages-container">
              {messages.map((message, index) => (
                <ChatMessage 
                  key={index} 
                  message={message.text}
                  isBot={message.isBot}
                  timestamp={message.timestamp}
                  isError={message.isError}
                />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </main>

        {/* Input Section */}
        <footer className="input-section">
          <div className="input-wrapper">
            <form onSubmit={handleSendMessage} className="input-form">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="message-input"
                disabled={isTyping}
              />

              <div className="thinking-dropdown">
                <button 
                  type="button" 
                  className="thinking-btn"
                  onClick={() => setShowThinkingDropdown(!showThinkingDropdown)}
                >
                  <span>{thinkingMode}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {showThinkingDropdown && (
                  <div className="dropdown-menu">
                    <button onClick={() => { setThinkingMode('Thinking'); setShowThinkingDropdown(false); }}>
                      Thinking
                    </button>
                    <button onClick={() => { setThinkingMode('Creative'); setShowThinkingDropdown(false); }}>
                      Creative
                    </button>
                    <button onClick={() => { setThinkingMode('Precise'); setShowThinkingDropdown(false); }}>
                      Precise
                    </button>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className={`send-btn ${inputMessage.trim() ? 'active' : ''}`}
                disabled={!inputMessage.trim() || isTyping}
              >
                {isTyping ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                )}
              </button>
            </form>
          </div>
          <p className="powered-by">Powered by <span>Manish Kumar</span></p>
        </footer>
      </div>
    </div>
  );
}

export default App;
