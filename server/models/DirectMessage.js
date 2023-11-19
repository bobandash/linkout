const mongoose = require('mongoose');

const { Schema } = mongoose;

// Stores the messages for conversations
const DirectMessageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    conversation: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
    },
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Friend',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('DirectMessage', DirectMessageSchema);
