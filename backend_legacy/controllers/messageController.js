const Message = require('../models/Message');

const getConversations = async (req, res) => {
  try {
    const conversations = await Message.getConversations(req.user.id);
    res.json(conversations);
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ message: 'Server error fetching conversations' });
  }
};

const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    
    const messages = await Message.getMessages(conversationId, req.user.id, page, limit);
    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error fetching messages' });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { receiver_id, task_id, order_id, message_text, message_type = 'text' } = req.body;
    
    const message = await Message.create({
      sender_id: req.user.id,
      receiver_id,
      task_id,
      order_id,
      message_text,
      message_type
    });
    
    res.status(201).json(message);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error sending message' });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    await Message.markAsRead(messageId, req.user.id);
    res.json({ message: 'Message marked as read' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ message: 'Server error marking message as read' });
  }
};

const getUnreadCount = async (req, res) => {
  try {
    const count = await Message.getUnreadCount(req.user.id);
    res.json({ count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: 'Server error fetching unread count' });
  }
};

module.exports = {
  getConversations,
  getMessages,
  sendMessage,
  markAsRead,
  getUnreadCount
};
