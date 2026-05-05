import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  Divider,
  Badge,
  CircularProgress
} from '@mui/material';
import {
  Send,
  AttachFile,
  ArrowBack,
  Phone,
  VideoCall
} from '@mui/icons-material';
import { io } from 'socket.io-client';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChatSystem = ({ taskId = null, orderId = null, recipientId = null }) => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [socket, setSocket] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const messagesEndRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to chat server');
    });

    newSocket.on('receive_message', (message) => {
      if (selectedConversation && message.room_id === selectedConversation.room_id) {
        setMessages(prev => [...prev, message]);
      } else {
        // Update conversations list to show new message
        fetchConversations();
      }
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    fetchConversations();
    fetchUnreadCount();
    
    // Set up polling for unread count
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.room_id);
      if (socket) {
        socket.emit('join_room', selectedConversation.room_id);
      }
    }
  }, [selectedConversation, socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get('/api/messages/conversations');
      setConversations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await axios.get(`/api/messages/conversations/${conversationId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await axios.get('/api/messages/unread-count');
      setUnreadCount(response.data.count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    setSending(true);
    try {
      const messageData = {
        receiver_id: selectedConversation.sender_id === user.id ? 
          selectedConversation.receiver_id : selectedConversation.sender_id,
        task_id: taskId,
        order_id: orderId,
        message_text: newMessage.trim(),
        message_type: 'text'
      };

      const response = await axios.post('/api/messages', messageData);
      
      // Add message to local state immediately
      setMessages(prev => [...prev, response.data]);
      
      // Send via socket for real-time delivery
      if (socket) {
        socket.emit('send_message', {
          ...response.data,
          room_id: selectedConversation.room_id
        });
      }
      
      setNewMessage('');
      fetchConversations(); // Update conversations list
      fetchUnreadCount(); // Update unread count
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: '600px', display: 'flex', border: '1px solid #ddd', borderRadius: 2 }}>
      {/* Conversations List */}
      <Box sx={{ width: 300, borderRight: '1px solid #ddd', overflow: 'auto' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #ddd', bgcolor: 'grey.50' }}>
          <Typography variant="h6" fontWeight="bold">
            Messages
            {unreadCount > 0 && (
              <Badge badgeContent={unreadCount} color="error" sx={{ ml: 2 }}>
                <Box />
              </Badge>
            )}
          </Typography>
        </Box>
        
        <List>
          {conversations.map((conversation) => (
            <ListItem
              key={conversation.id}
              button
              selected={selectedConversation?.room_id === conversation.room_id}
              onClick={() => setSelectedConversation(conversation)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText'
                }
              }}
            >
              <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                {conversation.conversation_name.charAt(0)}
              </Avatar>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2" fontWeight="bold">
                      {conversation.conversation_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatTime(conversation.created_at)}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" sx={{ 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {conversation.message_text}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                      <Chip 
                        label={conversation.conversation_role} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                      {conversation.unread_count > 0 && (
                        <Badge badgeContent={conversation.unread_count} color="error">
                          <Box />
                        </Badge>
                      )}
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <Box sx={{ 
              p: 2, 
              borderBottom: '1px solid #ddd', 
              bgcolor: 'grey.50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Box display="flex" alignItems="center">
                <IconButton onClick={() => setSelectedConversation(null)} sx={{ mr: 1 }}>
                  <ArrowBack />
                </IconButton>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                  {selectedConversation.conversation_name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {selectedConversation.conversation_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedConversation.conversation_role}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <IconButton>
                  <Phone />
                </IconButton>
                <IconButton>
                  <VideoCall />
                </IconButton>
              </Box>
            </Box>

            {/* Messages */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              {messages.map((message, index) => {
                const isOwn = message.sender_id === user.id;
                return (
                  <Box key={message.id} sx={{ mb: 2 }}>
                    {index === 0 || 
                     formatDate(messages[index-1].created_at) !== formatDate(message.created_at) ? (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mb: 1 }}>
                        {formatDate(message.created_at)}
                      </Typography>
                    ) : null}
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: isOwn ? 'flex-end' : 'flex-start'
                    }}>
                      <Paper sx={{
                        p: 2,
                        maxWidth: '70%',
                        bgcolor: isOwn ? 'primary.main' : 'grey.100',
                        color: isOwn ? 'white' : 'text.primary'
                      }}>
                        <Typography variant="body2">
                          {message.message_text}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          display: 'block', 
                          mt: 1,
                          opacity: 0.7
                        }}>
                          {formatTime(message.created_at)}
                          {isOwn && (
                            message.is_read ? ' ✓✓' : ' ✓'
                          )}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                );
              })}
              <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <Box sx={{ p: 2, borderTop: '1px solid #ddd', bgcolor: 'grey.50' }}>
              <Box display="flex" gap={1}>
                <IconButton>
                  <AttachFile />
                </IconButton>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || sending}
                  startIcon={sending ? <CircularProgress size={16} /> : <Send />}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'grey.50'
          }}>
            <Typography variant="h6" color="text.secondary">
              Select a conversation to start messaging
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatSystem;
