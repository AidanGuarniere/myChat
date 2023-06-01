const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['system', 'user', 'assistant'],
    required: true,
  },
  // model: {
  //   type: String,
  //   required: true,
  // },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  messages: [messageSchema],
});


const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

module.exports = { Chat, chatSchema };
