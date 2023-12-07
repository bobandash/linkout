const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConversationSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  name: {
    type: String,
  },
  lastMessageDate: {
    type: Date,
    default: new Date(),
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isRequest: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Conversation', ConversationSchema);
