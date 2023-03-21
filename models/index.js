// Import the required modules and schemas
const mongoose = require('mongoose');
const { chatSchema, messageSchema } = require('./schemas');

// Create the Chat model
const Chat = mongoose.model('Chat', chatSchema);

// Create the Message model
const Message = mongoose.model('Message', messageSchema);

// Export the models
module.exports = {
  Chat,
  Message,
};
