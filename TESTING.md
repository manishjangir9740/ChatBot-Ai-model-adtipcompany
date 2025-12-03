# API Testing Guide

Complete guide for testing the AI Chatbot API using Postman and other tools.

## 📋 Table of Contents

- [Postman Testing](#postman-testing)
- [Manual Testing with curl](#manual-testing-with-curl)
- [PowerShell Testing](#powershell-testing)
- [Browser Testing](#browser-testing)
- [Test Cases](#test-cases)
- [Expected Responses](#expected-responses)

## 🧪 Postman Testing

### Import Collection

1. Open Postman desktop app or web version
2. Click **Import** button (top left)
3. Select **File** tab
4. Click **Choose Files**
5. Navigate to `postman/API-Tests.json`
6. Click **Import**

### Run All Tests

1. Click on **AI Chatbot API** collection
2. Click **Run** button (top right)
3. Select all requests
4. Click **Run AI Chatbot API**
5. View results

### Individual Test Execution

#### Test 1: Health Check
```
Method: GET
URL: http://localhost:5000/health
Expected Status: 200 OK
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-03T10:30:00.000Z",
  "uptime": 123.45,
  "database": "connected" or "disconnected"
}
```

#### Test 2: Send Hello Message
```
Method: POST
URL: http://localhost:5000/api/chat
Headers: Content-Type: application/json
Body:
{
  "message": "Hello"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Hello",
  "reply": "Hello! How can I assist you today?",
  "timestamp": "2025-12-03T10:30:00.000Z"
}
```

#### Test 3: Get Chat History
```
Method: GET
URL: http://localhost:5000/api/history
Expected Status: 200 OK
```

#### Test 4: Get Statistics
```
Method: GET
URL: http://localhost:5000/api/stats
Expected Status: 200 OK
```

## 💻 Manual Testing with curl

### Windows (PowerShell)

```powershell
# Test Health Check
curl http://localhost:5000/health

# Send Chat Message
curl -Method Post -Uri "http://localhost:5000/api/chat" `
  -ContentType "application/json" `
  -Body '{"message": "Hello"}'

# Get History
curl http://localhost:5000/api/history

# Get Stats
curl http://localhost:5000/api/stats
```

### Windows (Command Prompt)

```cmd
# Test Health Check
curl http://localhost:5000/health

# Send Chat Message
curl -X POST http://localhost:5000/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"message\": \"Hello\"}"
```

### Linux/Mac

```bash
# Test Health Check
curl http://localhost:5000/health

# Send Chat Message
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'

# Get History
curl http://localhost:5000/api/history

# Get Stats  
curl http://localhost:5000/api/stats

# Delete History
curl -X DELETE http://localhost:5000/api/history
```

## 🔵 PowerShell Testing

### Comprehensive PowerShell Script

Create a file `test-api.ps1`:

```powershell
# AI Chatbot API Test Script

$baseUrl = "http://localhost:5000"
$apiUrl = "$baseUrl/api"

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "AI Chatbot API Testing" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Test 1: Health Check
Write-Host "`n[Test 1] Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "✓ Server is healthy" -ForegroundColor Green
    Write-Host "  Uptime: $($health.uptime) seconds" -ForegroundColor Gray
    Write-Host "  Database: $($health.database)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Health check failed" -ForegroundColor Red
}

# Test 2: Send Message
Write-Host "`n[Test 2] Sending chat message..." -ForegroundColor Yellow
try {
    $body = @{
        message = "Hello, this is a test!"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$apiUrl/chat" -Method Post `
        -Body $body -ContentType "application/json"
    
    Write-Host "✓ Message sent successfully" -ForegroundColor Green
    Write-Host "  User: $($response.message)" -ForegroundColor Gray
    Write-Host "  Bot: $($response.reply)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Message send failed" -ForegroundColor Red
}

# Test 3: Get History
Write-Host "`n[Test 3] Getting chat history..." -ForegroundColor Yellow
try {
    $history = Invoke-RestMethod -Uri "$apiUrl/history" -Method Get
    Write-Host "✓ History retrieved" -ForegroundColor Green
    Write-Host "  Total messages: $($history.count)" -ForegroundColor Gray
} catch {
    Write-Host "✗ History retrieval failed" -ForegroundColor Red
}

# Test 4: Get Stats
Write-Host "`n[Test 4] Getting statistics..." -ForegroundColor Yellow
try {
    $stats = Invoke-RestMethod -Uri "$apiUrl/stats" -Method Get
    Write-Host "✓ Statistics retrieved" -ForegroundColor Green
    Write-Host "  Total chats: $($stats.stats.totalChats)" -ForegroundColor Gray
    Write-Host "  Today's chats: $($stats.stats.todayChats)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Stats retrieval failed" -ForegroundColor Red
}

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "Testing Complete!" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
```

Run with:
```powershell
powershell -ExecutionPolicy Bypass -File test-api.ps1
```

## 🌐 Browser Testing

### Using Browser Developer Tools

1. Open browser (Chrome, Firefox, Edge)
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Run these JavaScript commands:

```javascript
// Test Health Check
fetch('http://localhost:5000/health')
  .then(r => r.json())
  .then(console.log)

// Send Chat Message
fetch('http://localhost:5000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello from browser!' })
})
  .then(r => r.json())
  .then(console.log)

// Get History
fetch('http://localhost:5000/api/history')
  .then(r => r.json())
  .then(console.log)
```

### Direct URL Testing

Simply visit these URLs in your browser:

- Health: `http://localhost:5000/health`
- API Info: `http://localhost:5000/`
- History: `http://localhost:5000/api/history`
- Stats: `http://localhost:5000/api/stats`

## ✅ Comprehensive Test Cases

### Test Suite 1: Basic Functionality

| Test # | Endpoint | Method | Input | Expected Output | Status Code |
|--------|----------|--------|-------|-----------------|-------------|
| 1.1 | /health | GET | - | Health status | 200 |
| 1.2 | / | GET | - | API info | 200 |
| 1.3 | /api/chat | POST | "Hello" | Greeting response | 200 |
| 1.4 | /api/history | GET | - | Chat array | 200 |
| 1.5 | /api/stats | GET | - | Statistics | 200 |

### Test Suite 2: Chat Functionality

| Test # | Message | Expected Response Type |
|--------|---------|----------------------|
| 2.1 | "Hello" | Greeting |
| 2.2 | "Who are you?" | Bot introduction |
| 2.3 | "What can you do?" | Capabilities list |
| 2.4 | "Tell me about ADtip" | Company info |
| 2.5 | "What time is it?" | Current time |
| 2.6 | "Thank you" | Appreciation response |

### Test Suite 3: Error Handling

| Test # | Scenario | Expected Behavior |
|--------|----------|------------------|
| 3.1 | Empty message | 400 Bad Request |
| 3.2 | Invalid endpoint | 404 Not Found |
| 3.3 | Malformed JSON | 400 Bad Request |
| 3.4 | Server stopped | Connection error |

### Test Suite 4: Edge Cases

| Test # | Input | Expected Output |
|--------|-------|-----------------|
| 4.1 | Very long message (1000+ chars) | Successful response |
| 4.2 | Special characters: !@#$%^&*() | Handled correctly |
| 4.3 | Multiple rapid requests | All processed |
| 4.4 | Empty spaces "   " | Error message |

## 📊 Expected API Responses

### Success Response Format

```json
{
  "success": true,
  "message": "user message",
  "reply": "bot response",
  "timestamp": "ISO 8601 date string"
}
```

### Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details"
}
```

### History Response Format

```json
{
  "success": true,
  "count": 10,
  "history": [
    {
      "_id": "...",
      "message": "...",
      "reply": "...",
      "timestamp": "...",
      "userId": "..."
    }
  ]
}
```

## 🎯 Performance Testing

### Load Test with PowerShell

```powershell
# Send 100 requests
1..100 | ForEach-Object {
    $body = @{ message = "Test message $_" } | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:5000/api/chat" `
        -Method Post -Body $body -ContentType "application/json"
    Write-Host "Request $_ completed"
}
```

### Response Time Test

```powershell
Measure-Command {
    $body = @{ message = "Hello" } | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:5000/api/chat" `
        -Method Post -Body $body -ContentType "application/json"
}
```

Expected response time: **< 500ms** (without external AI API)

## 📸 Screenshot Checklist

For submission, capture screenshots of:

- [ ] Postman test results (all green)
- [ ] Health check response
- [ ] Successful chat message
- [ ] Chat history
- [ ] Statistics endpoint
- [ ] Error handling (400/404)
- [ ] Frontend showing online status
- [ ] Full conversation in UI

## 🐛 Troubleshooting Tests

### If tests fail:

1. **Check server is running:**
   ```powershell
   curl http://localhost:5000/health
   ```

2. **Check correct port:**
   - Backend should be on port 5000
   - Frontend should be on port 3000

3. **Check firewall:**
   - Ensure ports are not blocked

4. **Check console logs:**
   - Backend terminal for errors
   - Browser console for frontend errors

5. **Verify JSON format:**
   - Ensure no syntax errors in request body

## ✨ Success Criteria

Your API passes testing if:

- ✅ All health checks return 200 OK
- ✅ Chat endpoint accepts and responds to messages
- ✅ Responses are contextually appropriate
- ✅ History endpoint returns array of messages
- ✅ Stats endpoint shows correct counts
- ✅ Error handling works for invalid inputs
- ✅ Response times are under 1 second
- ✅ No server crashes or uncaught exceptions

---

**Testing Complete!** 🎉

Your AI Chatbot API is fully functional and ready for deployment.

