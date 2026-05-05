const pool = require('../config/database');

class Message {
  static async create(messageData) {
    const {
      sender_id,
      receiver_id,
      task_id,
      order_id,
      message_text,
      message_type = 'text',
      file_path = null
    } = messageData;
    
    // Generate room_id for Socket.io
    const roomId = this.generateRoomId(sender_id, receiver_id, task_id, order_id);
    
    const query = `
      INSERT INTO messages (
        sender_id, receiver_id, task_id, order_id, message_text,
        message_type, file_path, room_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    
    const values = [
      sender_id, receiver_id, task_id, order_id, message_text,
      message_type, file_path, roomId
    ];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getConversations(userId) {
    const query = `
      SELECT DISTINCT ON (room_id)
        m.*,
        u_sender.first_name as sender_first_name,
        u_sender.last_name as sender_last_name,
        u_receiver.first_name as receiver_first_name,
        u_receiver.last_name as receiver_last_name,
        CASE 
          WHEN m.sender_id = $1 THEN u_receiver.first_name || ' ' || u_receiver.last_name
          ELSE u_sender.first_name || ' ' || u_sender.last_name
        END as conversation_name,
        CASE 
          WHEN m.sender_id = $1 THEN u_receiver.role
          ELSE u_sender.role
        END as conversation_role,
        (SELECT COUNT(*) FROM messages m2 
         WHERE ((m2.sender_id = $1 AND m2.receiver_id = m.receiver_id) OR 
                (m2.sender_id = m.receiver_id AND m2.receiver_id = $1))
         AND m2.is_read = FALSE AND m2.sender_id != $1) as unread_count
      FROM messages m
      JOIN users u_sender ON m.sender_id = u_sender.id
      JOIN users u_receiver ON m.receiver_id = u_receiver.id
      WHERE (m.sender_id = $1 OR m.receiver_id = $1)
      ORDER BY room_id, m.created_at DESC
    `;
    
    try {
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getMessages(conversationId, userId, page = 1, limit = 50) {
    const offset = (page - 1) * limit;
    
    const query = `
      SELECT m.*, 
             u_sender.first_name as sender_first_name,
             u_sender.last_name as sender_last_name,
             u_sender.role as sender_role
      FROM messages m
      JOIN users u_sender ON m.sender_id = u_sender.id
      WHERE m.room_id = $1 AND (m.sender_id = $2 OR m.receiver_id = $2)
      ORDER BY m.created_at ASC
      LIMIT $3 OFFSET $4
    `;
    
    try {
      const result = await pool.query(query, [conversationId, userId, limit, offset]);
      
      // Mark messages as read
      await this.markMessagesAsRead(conversationId, userId);
      
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async markAsRead(messageId, userId) {
    const query = `
      UPDATE messages 
      SET is_read = TRUE 
      WHERE id = $1 AND receiver_id = $2
    `;
    
    try {
      const result = await pool.query(query, [messageId, userId]);
      return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  }

  static async markMessagesAsRead(conversationId, userId) {
    const query = `
      UPDATE messages 
      SET is_read = TRUE 
      WHERE room_id = $1 AND receiver_id = $2 AND is_read = FALSE
    `;
    
    try {
      await pool.query(query, [conversationId, userId]);
    } catch (error) {
      throw error;
    }
  }

  static async getUnreadCount(userId) {
    const query = `
      SELECT COUNT(*) as count
      FROM messages
      WHERE receiver_id = $1 AND is_read = FALSE
    `;
    
    try {
      const result = await pool.query(query, [userId]);
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw error;
    }
  }

  static generateRoomId(senderId, receiverId, taskId = null, orderId = null) {
    // Create a unique room ID based on participants and context
    const participants = [senderId, receiverId].sort().join('_');
    const context = taskId ? `task_${taskId}` : orderId ? `order_${orderId}` : 'direct';
    return `${context}_${participants}`;
  }

  static async getTaskMessages(taskId, userId) {
    const query = `
      SELECT m.*, 
             u_sender.first_name as sender_first_name,
             u_sender.last_name as sender_last_name,
             u_sender.role as sender_role
      FROM messages m
      JOIN users u_sender ON m.sender_id = u_sender.id
      WHERE m.task_id = $1 AND (m.sender_id = $2 OR m.receiver_id = $2)
      ORDER BY m.created_at ASC
    `;
    
    try {
      const result = await pool.query(query, [taskId, userId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getOrderMessages(orderId, userId) {
    const query = `
      SELECT m.*, 
             u_sender.first_name as sender_first_name,
             u_sender.last_name as sender_last_name,
             u_sender.role as sender_role
      FROM messages m
      JOIN users u_sender ON m.sender_id = u_sender.id
      WHERE m.order_id = $1 AND (m.sender_id = $2 OR m.receiver_id = $2)
      ORDER BY m.created_at ASC
    `;
    
    try {
      const result = await pool.query(query, [orderId, userId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Message;
