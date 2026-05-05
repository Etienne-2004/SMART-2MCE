const express = require('express');
const { auth } = require('../middleware/auth');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.get('/conversations', auth, messageController.getConversations);
router.get('/conversations/:conversationId', auth, messageController.getMessages);
router.get('/unread-count', auth, messageController.getUnreadCount);
router.post('/', auth, messageController.sendMessage);
router.patch('/:messageId/read', auth, messageController.markAsRead);

// Task-specific messages
router.get('/task/:taskId', auth, async (req, res) => {
  try {
    const Message = require('../models/Message');
    const messages = await Message.getTaskMessages(req.params.taskId, req.user.id);
    res.json(messages);
  } catch (error) {
    console.error('Get task messages error:', error);
    res.status(500).json({ message: 'Server error fetching task messages' });
  }
});

// Order-specific messages
router.get('/order/:orderId', auth, async (req, res) => {
  try {
    const Message = require('../models/Message');
    const messages = await Message.getOrderMessages(req.params.orderId, req.user.id);
    res.json(messages);
  } catch (error) {
    console.error('Get order messages error:', error);
    res.status(500).json({ message: 'Server error fetching order messages' });
  }
});

module.exports = router;
