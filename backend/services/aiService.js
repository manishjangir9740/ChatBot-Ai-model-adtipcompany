const axios = require('axios');

class AIService {
  constructor() {
    this.huggingfaceApiKey = process.env.HUGGINGFACE_API_KEY;
    
    // Simple rule-based responses as fallback
    this.fallbackResponses = {
      greetings: [
        "Hello! How can I assist you today?",
        "Hi there! What can I help you with?",
        "Greetings! I'm here to help.",
        "Hey! What would you like to know?"
      ],
      farewell: [
        "Goodbye! Have a great day!",
        "See you later! Feel free to come back anytime.",
        "Take care! It was nice chatting with you."
      ],
      help: [
        "I'm an AI assistant here to help answer your questions. Just type your question and I'll do my best to help!",
        "I can assist you with various topics. What would you like to know?"
      ],
      default: [
        "That's an interesting question. Could you provide more details?",
        "I understand. Can you tell me more about that?",
        "I'm here to help! Could you rephrase that question?",
        "Interesting! Let me think about that..."
      ]
    };
  }

  // Rule-based response system
  getRuleBasedResponse(message) {
    const lowerMessage = message.toLowerCase().trim();
    
    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i)) {
      return this.getRandomResponse(this.fallbackResponses.greetings);
    }
    
    // Farewell
    if (lowerMessage.match(/^(bye|goodbye|see you|take care|farewell)/i)) {
      return this.getRandomResponse(this.fallbackResponses.farewell);
    }
    
    // Help
    if (lowerMessage.match(/help|what can you do|how does this work/i)) {
      return this.getRandomResponse(this.fallbackResponses.help);
    }
    
    // Questions about the bot
    if (lowerMessage.match(/who are you|what are you|your name/i)) {
      return "I'm an AI-powered chatbot built by Manish Kumar to assist you with your questions!";
    }
    
    // Time-related
    if (lowerMessage.match(/time|date|day/i)) {
      const now = new Date();
      return `The current date and time is: ${now.toLocaleString()}`;
    }
    
    // Weather (mock response)
    if (lowerMessage.match(/weather/i)) {
      return "I don't have real-time weather data, but I suggest checking a weather website or app for accurate information!";
    }
    
    
    if (lowerMessage.match(/adtip|company|about/i)) {
      return "I’m an AI assistant designed to help you with quick, clear, and useful answers. You can ask me anything—I'm here to make things easier for you.";
    }
    
    // Thanks
    if (lowerMessage.match(/thank you|thanks|appreciate/i)) {
      return "You're welcome! Happy to help! 😊";
    }
    
    // Default response with context awareness
    return this.generateContextualResponse(message);
  }

  generateContextualResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Question detection
    if (lowerMessage.includes('?')) {
      return "That's a great question! While I'm working with basic AI capabilities, I can try to help. " +
             "For more accurate responses, you can connect me to advanced AI models like GPT or Claude.";
    }
    
    // Problem statement
    if (lowerMessage.match(/problem|issue|error|bug/i)) {
      return "I understand you're facing a challenge. Could you provide more specific details so I can better assist you?";
    }
    
    // How-to questions
    if (lowerMessage.match(/how to|how do|how can/i)) {
      return "I'd be happy to guide you through that! Could you provide more specific details about what you're trying to achieve?";
    }
    
    // Default
    return this.getRandomResponse(this.fallbackResponses.default);
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Hugging Face API integration
  async getHuggingFaceResponse(message) {
    if (!this.huggingfaceApiKey || this.huggingfaceApiKey === '') {
      console.log('No Hugging Face API key found, using rule-based responses');
      return this.getRuleBasedResponse(message);
    }

    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
        {
          inputs: message
        },
        {
          headers: {
            'Authorization': `Bearer ${this.huggingfaceApiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      if (response.data && response.data[0] && response.data[0].generated_text) {
        return response.data[0].generated_text;
      }
      
      return this.getRuleBasedResponse(message);
    } catch (error) {
      console.error('Hugging Face API error:', error.message);
      return this.getRuleBasedResponse(message);
    }
  }

  // Main method to get AI response
  async getResponse(message) {
    try {
      // Try Hugging Face first if API key is available
      if (this.huggingfaceApiKey && this.huggingfaceApiKey !== '') {
        return await this.getHuggingFaceResponse(message);
      }
      
      // Otherwise use rule-based system
      return this.getRuleBasedResponse(message);
    } catch (error) {
      console.error('AI Service error:', error);
      return "I apologize, but I'm having trouble processing your request right now. Please try again!";
    }
  }
}

module.exports = new AIService();

