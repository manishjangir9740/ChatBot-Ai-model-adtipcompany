const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  reply: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    default: 'anonymous'
  }
});

module.exports = mongoose.model('Chat', chatSchema);

