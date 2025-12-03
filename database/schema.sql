-- ============================================
-- AI CHATBOT DATABASE SCHEMA
-- Manish Kumar
-- ============================================
-- 
-- This file contains the database schema for the AI Chatbot application.
-- While the primary database is MongoDB (NoSQL), this SQL schema is provided
-- for reference and for those who want to use MySQL/PostgreSQL instead.
-- 
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS chatbot_db;
USE chatbot_db;

-- ============================================
-- Table: chats
-- Stores all chat messages and responses
-- ============================================
CREATE TABLE IF NOT EXISTS chats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    reply TEXT NOT NULL,
    user_id VARCHAR(255) DEFAULT 'anonymous',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: users (Optional)
-- For user authentication feature
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: chat_sessions (Optional)
-- Group chats into sessions
-- ============================================
CREATE TABLE IF NOT EXISTS chat_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) DEFAULT 'anonymous',
    session_token VARCHAR(255) UNIQUE,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP NULL,
    message_count INT DEFAULT 0,
    INDEX idx_user_id (user_id),
    INDEX idx_session_token (session_token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: chat_feedback (Optional)
-- Store user feedback on bot responses
-- ============================================
CREATE TABLE IF NOT EXISTS chat_feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT,
    rating TINYINT CHECK (rating BETWEEN 1 AND 5),
    feedback_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    INDEX idx_chat_id (chat_id),
    INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: analytics (Optional)
-- Track usage statistics
-- ============================================
CREATE TABLE IF NOT EXISTS analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    total_messages INT DEFAULT 0,
    unique_users INT DEFAULT 0,
    avg_response_time DECIMAL(10,2),
    error_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_date (date),
    INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- MongoDB Equivalent Schema (for reference)
-- ============================================
-- 
-- Collection: chats
-- {
--   _id: ObjectId,
--   message: String (required),
--   reply: String (required),
--   userId: String (default: "anonymous"),
--   timestamp: Date (default: now)
-- }
-- 
-- Collection: users (optional)
-- {
--   _id: ObjectId,
--   username: String (unique, required),
--   email: String (unique, required),
--   passwordHash: String (required),
--   createdAt: Date,
--   lastLogin: Date,
--   isActive: Boolean
-- }
-- 
-- Collection: chat_sessions (optional)
-- {
--   _id: ObjectId,
--   userId: String,
--   sessionToken: String (unique),
--   startedAt: Date,
--   endedAt: Date,
--   messageCount: Number
-- }
-- 
-- ============================================

-- ============================================
-- Sample Data for Testing
-- ============================================

-- Insert sample chats
INSERT INTO chats (message, reply, user_id) VALUES
    ('Hello', 'Hi! How can I help you today?', 'user123'),
    ('What is your name?', 'I am an AI chatbot built by Manish Kumar!', 'user123'),
    ('Tell me about ADtip', 'I’m an AI assistant designed to help you with quick, clear, and useful answers. You can ask me anything—I am here to make things easier for you.', 'user456'),
    ('What can you do?', 'I can answer questions, help with information, and chat with you!', 'anonymous'),
    ('Thank you', 'You are welcome! Happy to help!', 'user123');

-- ============================================
-- Useful Queries
-- ============================================

-- Get all chats from today
-- SELECT * FROM chats WHERE DATE(timestamp) = CURDATE();

-- Get total message count
-- SELECT COUNT(*) as total_messages FROM chats;

-- Get messages per user
-- SELECT user_id, COUNT(*) as message_count 
-- FROM chats 
-- GROUP BY user_id 
-- ORDER BY message_count DESC;

-- Get recent conversations (last 24 hours)
-- SELECT * FROM chats 
-- WHERE timestamp >= NOW() - INTERVAL 24 HOUR 
-- ORDER BY timestamp DESC;

-- Get most active users
-- SELECT user_id, COUNT(*) as chat_count, MAX(timestamp) as last_chat
-- FROM chats 
-- GROUP BY user_id 
-- ORDER BY chat_count DESC 
-- LIMIT 10;

-- Clear old chats (older than 30 days)
-- DELETE FROM chats WHERE timestamp < NOW() - INTERVAL 30 DAY;

-- ============================================
-- Indexes for Performance
-- ============================================

-- Additional indexes for better query performance
CREATE INDEX idx_message_fulltext ON chats(message(100));
CREATE INDEX idx_timestamp_desc ON chats(timestamp DESC);

-- ============================================
-- Backup and Maintenance
-- ============================================

-- Backup command (run from terminal):
-- mysqldump -u root -p chatbot_db > chatbot_backup.sql

-- Restore command:
-- mysql -u root -p chatbot_db < chatbot_backup.sql

-- ============================================
-- PostgreSQL Version (Alternative)
-- ============================================
-- 
-- CREATE TABLE chats (
--     id SERIAL PRIMARY KEY,
--     message TEXT NOT NULL,
--     reply TEXT NOT NULL,
--     user_id VARCHAR(255) DEFAULT 'anonymous',
--     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- 
-- CREATE INDEX idx_user_id ON chats(user_id);
-- CREATE INDEX idx_timestamp ON chats(timestamp);
-- 
-- ============================================

-- End of schema

