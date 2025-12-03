# AI-Powered Chatbot Application

**Built for **company**

A modern, full-stack AI chatbot application with React.js frontend and Node.js backend, featuring intelligent responses powered by NLP models and optional chat history storage.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)

## 🌟 Features

✅ **Real-time Chat Interface** - Beautiful, responsive chat UI with smooth animations  
✅ **AI-Powered Responses** - Intelligent responses using NLP models  
✅ **Multiple AI Integration** - Support for Hugging Face Transformers  
✅ **Chat History** - Optional MongoDB integration for persistent storage  
✅ **Typing Indicators** - Real-time typing animation  
✅ **Error Handling** - Robust error handling and connection status  
✅ **RESTful API** - Clean, well-documented API endpoints  
✅ **Modern UI/UX** - Beautiful gradient design with emoji support  
✅ **Mobile Responsive** - Works perfectly on all devices  

## 📋 Table of Contents

- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation Guide](#installation-guide)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing with Postman](#testing-with-postman)
- [Configuration](#configuration)
- [Optional Features](#optional-features)
- [Troubleshooting](#troubleshooting)

## 🛠️ Technology Stack

### Frontend
- **React.js 18.2** - UI Framework
- **Axios** - HTTP Client
- **CSS3** - Styling with animations

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **Mongoose** - MongoDB ODM (optional)
- **Axios** - API Requests

### AI Integration
- **Hugging Face Transformers** - NLP Model
- **Rule-Based System** - Fallback responses

### Database (Optional)
- **MongoDB** - Chat history storage

## 📁 Project Structure

```
chatbot-for-ADtip-company/
├── backend/
│   ├── models/
│   │   └── Chat.js                 # MongoDB chat schema
│   ├── routes/
│   │   └── chatRoutes.js          # API routes
│   ├── services/
│   │   └── aiService.js           # AI/NLP service
│   ├── server.js                   # Main server file
│   ├── package.json               # Backend dependencies
│   └── .env                       # Environment variables
│
├── frontend/
│   ├── public/
│   │   └── index.html            # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatMessage.js    # Message component
│   │   │   ├── ChatMessage.css
│   │   │   ├── TypingIndicator.js
│   │   │   └── TypingIndicator.css
│   │   ├── App.js                # Main App component
│   │   ├── App.css
│   │   ├── index.js              # React entry point
│   │   └── index.css
│   └── package.json              # Frontend dependencies
│
├── database/
│   └── schema.sql                # Database schema (optional)
├── postman/
│   └── API-Tests.json            # Postman collection
├── README.md                      # This file
└── INSTALLATION.md               # Detailed installation guide
```

## 🚀 Installation Guide

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (optional) - [Download here](https://www.mongodb.com/try/download/community)

### Step 1: Clone or Download Project

```bash
cd "chatbot for ADtip comapny"
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 4: Configure Environment Variables

1. Navigate to `backend/` folder
2. Open `.env` file (already created)
3. Update the configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chatbot
HUGGINGFACE_API_KEY=your_api_key_here
```

**Note:** The chatbot works without API keys using a rule-based system. For advanced AI responses, get a free API key from [Hugging Face](https://huggingface.co/settings/tokens).

## ▶️ Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Server will run on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will open automatically at: `http://localhost:3000`

### Option 2: Development Mode (Auto-reload)

**Backend with nodemon:**
```bash
cd backend
npm run dev
```

**Frontend (already has auto-reload):**
```bash
cd frontend
npm start
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. **POST /api/chat** - Send Message
Send a message and get AI response.

**Request:**
```json
{
  "message": "Hello, how are you?"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Hello, how are you?",
  "reply": "Hi! I'm doing great! How can I assist you today?",
  "timestamp": "2025-12-03T10:30:00.000Z"
}
```

#### 2. **GET /api/history** - Get Chat History
Retrieve past conversations.

**Response:**
```json
{
  "success": true,
  "count": 10,
  "history": [
    {
      "_id": "...",
      "message": "Hello",
      "reply": "Hi there!",
      "timestamp": "2025-12-03T10:30:00.000Z",
      "userId": "anonymous"
    }
  ]
}
```

#### 3. **DELETE /api/history** - Clear History
Delete all chat history.

**Response:**
```json
{
  "success": true,
  "message": "Chat history cleared"
}
```

#### 4. **GET /api/stats** - Get Statistics
Get chatbot statistics.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalChats": 150,
    "todayChats": 25,
    "serverUptime": 3600.5
  }
}
```

#### 5. **GET /health** - Health Check
Check server status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-03T10:30:00.000Z",
  "uptime": 3600.5,
  "database": "connected"
}
```

## 🧪 Testing with Postman

### Import Collection

1. Open Postman
2. Click **Import**
3. Select `postman/API-Tests.json`
4. All endpoints will be imported

### Manual Testing

1. **Test Chat Endpoint:**
   - Method: `POST`
   - URL: `http://localhost:5000/api/chat`
   - Body (JSON):
   ```json
   {
     "message": "Tell me about yourself"
   }
   ```

2. **Test History:**
   - Method: `GET`
   - URL: `http://localhost:5000/api/history`

3. **Test Health Check:**
   - Method: `GET`
   - URL: `http://localhost:5000/health`

## ⚙️ Configuration

### Frontend Configuration

Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend Configuration

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chatbot
HUGGINGFACE_API_KEY=your_key_here
```

## 🎯 Optional Features Implemented

### ✅ Implemented Features:

1. **Chat History Storage** - MongoDB integration
2. **Typing Animation** - Real-time typing indicator
3. **Rule-Based AI** - Works without external APIs
4. **Connection Status** - Real-time server status
5. **Clear Chat** - Reset conversation
6. **Statistics Dashboard** - Chat stats endpoint
7. **Error Handling** - Comprehensive error messages
8. **Responsive Design** - Mobile-friendly UI

### 🔮 Future Enhancements:

- User authentication system
- Multiple AI model selection
- Sentiment analysis
- Voice input/output
- Admin dashboard
- Message search
- Export conversations

## 🐛 Troubleshooting

### Backend won't start
**Problem:** `Error: Cannot find module 'express'`  
**Solution:** Run `npm install` in the `backend` folder

### Frontend shows connection error
**Problem:** "Cannot connect to server"  
**Solution:** 
1. Ensure backend is running on port 5000
2. Check `frontend/.env` has correct API URL
3. Disable any firewall/antivirus blocking ports

### MongoDB connection failed
**Problem:** "MongoDB connection error"  
**Solution:** 
- This is optional! The app works without MongoDB
- To enable: Install MongoDB and start the service
- Or comment out MongoDB code in `server.js`

### Port already in use
**Problem:** "Port 5000 is already in use"  
**Solution:** 
1. Change port in `backend/.env`
2. Update `frontend/.env` with new port
3. Or kill the process using port 5000:
   - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
   - Mac/Linux: `lsof -ti:5000 | xargs kill`

## 📸 Screenshots

### Chat Interface
The application features a modern, gradient-styled interface with:
- Real-time message bubbles
- Typing indicators
- Connection status
- Mobile-responsive design

### API Testing
All endpoints are testable via Postman with the included collection.

## 🤝 Contributing

This project was built for company. For improvements or bug reports, please contact the development team.

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

** Development Team**




---<img width="1918" height="859" alt="Screenshot 2025-12-03 175656" src="https://github.com/user-attachments/assets/473634fa-8569-42f8-8594-8b6890cfc1fb" />
<img width="1366" height="882" alt="Screenshot 2025-12-03 182113" src="https://github.com/user-attachments/assets/bd9b76cc-1ef0-4a4b-a245-997c6a19cd4b" />

<img width="1377" height="922" alt="Screenshot 2025-12-03 182511" src="https://github.com/user-attachments/assets/c34bbbf2-0007-4d12-9c00-d1eaef3257cc" />

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Tutorials](https://www.mongodb.com/docs/)
- [Hugging Face Models](https://huggingface.co/models)

---

**Need Help?** Check `INSTALLATION.md` for detailed setup instructions or the troubleshooting section above.

**Happy Chatting! 🤖💬**

