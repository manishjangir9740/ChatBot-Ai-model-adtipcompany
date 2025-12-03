const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const Chat = require('../models/Chat');

// POST /api/chat - Main chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    // Get AI response
    const reply = await aiService.getResponse(message);

    // Save to database (if MongoDB is connected)
    try {
      const chat = new Chat({
        message,
        reply,
        userId: req.body.userId || 'anonymous'
      });
      await chat.save();
    } catch (dbError) {
      console.log('Database save skipped (MongoDB not connected):', dbError.message);
    }

    // Return response
    res.json({
      success: true,
      message,
      reply,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process message',
      details: error.message
    });
  }
});

// GET /api/chat/history - Get chat history
router.get('/history', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const chats = await Chat.find()
      .sort({ timestamp: -1 })
      .limit(limit);

    res.json({
      success: true,
      count: chats.length,
      history: chats
    });
  } catch (error) {
    console.error('History retrieval error:', error);
    res.json({
      success: true,
      count: 0,
      history: [],
      note: 'Database not connected, history unavailable'
    });
  }
});

// DELETE /api/chat/history - Clear chat history
router.delete('/history', async (req, res) => {
  try {
    await Chat.deleteMany({});
    res.json({
      success: true,
      message: 'Chat history cleared'
    });
  } catch (error) {
    console.error('History deletion error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to clear history'
    });
  }
});

// GET /api/chat/stats - Get chat statistics
router.get('/stats', async (req, res) => {
  try {
    const totalChats = await Chat.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayChats = await Chat.countDocuments({
      timestamp: { $gte: today }
    });

    res.json({
      success: true,
      stats: {
        totalChats,
        todayChats,
        serverUptime: process.uptime()
      }
    });
  } catch (error) {
    res.json({
      success: true,
      stats: {
        totalChats: 0,
        todayChats: 0,
        serverUptime: process.uptime()
      },
      note: 'Database not connected'
    });
  }
});

module.exports = router;

