# Quick Start Guide

Get your AI Chatbot running in 5 minutes! ⚡

## 🚀 Fast Installation (Windows)

### Step 1: Open PowerShell in Project Folder

Right-click in the project folder and select "Open PowerShell window here"

### Step 2: Install Backend

```powershell
cd backend
npm install
```

Wait for installation to complete (~1 minute)

### Step 3: Install Frontend

```powershell
cd ../frontend
npm install
```

Wait for installation to complete (~2 minutes)

### Step 4: Start Backend

```powershell
cd ../backend
npm start
```

Keep this window open! You should see:
```
🤖 AI Chatbot Server Started
📡 Server running on port 5000
```

### Step 5: Start Frontend (New Window)

Open a **NEW** PowerShell window in the project folder:

```powershell
cd frontend
npm start
```

Your browser will automatically open to `http://localhost:3000`

## ✅ You're Done!

You should now see:
- ✅ Chat interface in your browser
- ✅ "● Online" status (green)
- ✅ Welcome message from the bot

### Test It!

Type: **"Hello"**

The bot should respond with a greeting!

---

## 🐛 Problems?

### Backend won't start

```powershell
# Make sure you're in the backend folder
cd backend
npm install
npm start
```

### Frontend won't start

```powershell
# Make sure you're in the frontend folder
cd frontend
npm install
npm start
```

### "Port already in use"

Someone else is using port 5000. Change it:

1. Edit `backend/.env`
2. Change `PORT=5000` to `PORT=5001`
3. Edit `frontend/.env`
4. Change URL to `http://localhost:5001/api`
5. Restart both servers

### Still stuck?

Read the full `INSTALLATION.md` for detailed help.

---

## 🎉 Next Steps

1. **Test the chat** - Try different messages
2. **Check the API** - Open `http://localhost:5000/health`
3. **Test with Postman** - Import `postman/API-Tests.json`
4. **Read the docs** - Check `README.md` for full features

---

## ⚡ Super Fast Commands

If you have everything installed and just want to restart:

```powershell
# Terminal 1 (Backend)
cd backend && npm start

# Terminal 2 (Frontend)
cd frontend && npm start
```

---

**That's it!** Your AI Chatbot is now running! 🤖💬

