# Detailed Installation Guide

Complete step-by-step guide to install and run the AI Chatbot application.

## 📋 Prerequisites Checklist

Before you begin, ensure you have:

- [ ] Node.js installed (v14 or higher)
- [ ] npm package manager (comes with Node.js)
- [ ] Text editor (VS Code recommended)
- [ ] Command prompt/terminal access
- [ ] MongoDB (optional, for chat history)

## 🔍 Verify Prerequisites

### Check Node.js Installation

```bash
node --version
```
Expected output: `v14.0.0` or higher

### Check npm Installation

```bash
npm --version
```
Expected output: `6.0.0` or higher

### Install Node.js (if needed)

1. Visit https://nodejs.org/
2. Download the LTS version
3. Run the installer
4. Verify installation using commands above

## 📥 Step-by-Step Installation

### Step 1: Open Project Directory

```bash
# Windows
cd "D:\chatbot for ADtip comapny"

# Or use File Explorer to navigate to the folder
```

### Step 2: Install Backend Dependencies

```bash
# Navigate to backend folder
cd backend

# Install all required packages
npm install
```

**What gets installed:**
- express - Web framework
- cors - Cross-origin resource sharing
- mongoose - MongoDB integration
- axios - HTTP client
- dotenv - Environment variables
- @huggingface/inference - AI model integration
- nodemon - Development auto-reload (dev dependency)

**Expected output:**
```
added 150 packages, and audited 151 packages in 30s
```

### Step 3: Install Frontend Dependencies

```bash
# Navigate to frontend folder
cd ../frontend

# Install all required packages
npm install
```

**What gets installed:**
- react - UI framework
- react-dom - React rendering
- react-scripts - Build tools
- axios - HTTP client
- react-markdown - Markdown rendering (if needed)

**Expected output:**
```
added 1500 packages, and audited 1501 packages in 2m
```

### Step 4: Configure Backend Environment

1. Navigate to `backend` folder
2. The `.env` file is already created
3. Open it and configure:

```env
# Server Configuration
PORT=5000

# Database (Optional)
MONGODB_URI=mongodb://localhost:27017/chatbot

# AI Configuration (Optional - works without it)
HUGGINGFACE_API_KEY=
```

**Getting Hugging Face API Key (Optional):**
1. Visit https://huggingface.co/
2. Sign up for free account
3. Go to Settings → Access Tokens
4. Create new token
5. Copy and paste into `.env` file

**Note:** The app works perfectly without the API key using rule-based responses.

### Step 5: Configure Frontend Environment

The `frontend/.env` file should already exist with:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Only change this if:**
- You changed the backend PORT in `backend/.env`
- You're deploying to production

## ▶️ Running the Application

### Method 1: Standard Start (Recommended for First Time)

**Terminal 1 - Start Backend:**

```bash
# From project root
cd backend
npm start
```

**Expected output:**
```
=================================
🤖 AI Chatbot Server Started
=================================
📡 Server running on port 5000
🌐 API URL: http://localhost:5000
💚 Health check: http://localhost:5000/health
=================================
⚠️  No MongoDB URI found. Running without database.
```

**Terminal 2 - Start Frontend:**

```bash
# Open new terminal
# From project root
cd frontend
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view ai-chatbot-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.X:3000
```

**Your browser should automatically open to:** `http://localhost:3000`

### Method 2: Development Mode (Auto-reload on changes)

**Backend with auto-reload:**
```bash
cd backend
npm run dev
```

**Frontend** (already has auto-reload):
```bash
cd frontend
npm start
```

## ✅ Verification Steps

### 1. Check Backend is Running

Open browser and visit: `http://localhost:5000/health`

**Expected response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-03T10:30:00.000Z",
  "uptime": 5.2,
  "database": "disconnected"
}
```

### 2. Check Frontend is Running

Your browser should show the chat interface with:
- "AI Chatbot" header
- "● Online" status (green)
- Message input box
- Welcome message from bot

### 3. Test the Chat

1. Type: "Hello"
2. Press Send or Enter
3. You should see:
   - Your message on the right (purple)
   - Bot thinking animation
   - Bot response on the left (white)

### 4. Test API Directly

**Using PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/chat" -Method Post -Body (@{message="Hello"} | ConvertTo-Json) -ContentType "application/json"
```

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/chat -H "Content-Type: application/json" -d "{\"message\":\"Hello\"}"
```

## 🐛 Common Issues and Solutions

### Issue 1: "npm: command not found"

**Problem:** Node.js not installed or not in PATH

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart your terminal/command prompt
3. Verify with `node --version`

### Issue 2: "Error: Cannot find module 'express'"

**Problem:** Dependencies not installed

**Solution:**
```bash
cd backend
npm install
```

### Issue 3: "Port 5000 is already in use"

**Problem:** Another application using port 5000

**Solution Option 1** - Kill the process:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

**Solution Option 2** - Change port:
1. Edit `backend/.env`: Change `PORT=5000` to `PORT=5001`
2. Edit `frontend/.env`: Change URL to `http://localhost:5001/api`
3. Restart both servers

### Issue 4: Frontend shows "Offline" status

**Problem:** Backend not running or wrong URL

**Solution:**
1. Ensure backend is running: `cd backend && npm start`
2. Check backend console for errors
3. Verify `frontend/.env` has correct API URL
4. Check firewall isn't blocking ports

### Issue 5: MongoDB Connection Error

**Problem:** MongoDB not installed or not running

**Solution:**
- **The app works WITHOUT MongoDB!** This is optional.
- To enable MongoDB:
  1. Install MongoDB Community Edition
  2. Start MongoDB service:
     - Windows: `net start MongoDB`
     - Mac: `brew services start mongodb-community`
     - Linux: `sudo systemctl start mongod`
  3. Restart backend server

### Issue 6: "Module not found: Can't resolve './components/ChatMessage'"

**Problem:** Frontend files not properly created

**Solution:**
```bash
cd frontend
# Ensure all files exist
ls src/components/

# If missing, verify project structure
# Should have: ChatMessage.js, ChatMessage.css, TypingIndicator.js, TypingIndicator.css
```

## 🔒 Firewall and Antivirus

If you have firewall/antivirus software:

1. **Windows Defender Firewall:**
   - Allow Node.js through firewall when prompted
   - Or manually add exception for Node.js

2. **Antivirus Software:**
   - Add project folder to exclusions
   - Allow ports 3000 and 5000

## 📱 Accessing from Mobile Device

To test on your phone/tablet:

1. **Get your computer's IP address:**
   ```bash
   # Windows
   ipconfig
   # Look for "IPv4 Address" (e.g., 192.168.1.100)
   
   # Mac/Linux
   ifconfig
   ```

2. **Update frontend to allow network access:**
   - Already configured by default with React

3. **Access from mobile:**
   - Open browser on mobile
   - Go to: `http://YOUR_IP:3000`
   - Example: `http://192.168.1.100:3000`

4. **Ensure both devices are on same network**

## 🎓 Next Steps

After successful installation:

1. ✅ **Test all features:**
   - Send messages
   - Try different questions
   - Test clear chat button

2. ✅ **Test API with Postman:**
   - Import `postman/API-Tests.json`
   - Test all endpoints

3. ✅ **Read API Documentation:**
   - Check `README.md` for endpoint details
   - Test each endpoint

4. ✅ **Customize (Optional):**
   - Modify colors in CSS files
   - Add more AI responses in `aiService.js`
   - Connect to advanced AI models

## 📞 Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review `README.md` for configuration details
3. Verify all prerequisites are met
4. Check console for error messages
5. Ensure all files are in correct locations

## 🎉 Success!

If you can:
- ✅ Access frontend at http://localhost:3000
- ✅ See "Online" status
- ✅ Send and receive messages
- ✅ Backend responds at http://localhost:5000

**Congratulations! Your AI Chatbot is running successfully!** 🚀

---

**Installation Time:** Approximately 5-10 minutes (depending on internet speed)

**Disk Space Required:** 
- Backend: ~50 MB
- Frontend: ~300 MB
- Total: ~350 MB

