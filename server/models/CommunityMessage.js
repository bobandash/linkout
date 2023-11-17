const mongoose = require('mongoose');

const { Schema } = mongoose;

// Stores the messages for community messages
const CommunityMessageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: 'Community',
  },
  readBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('CommunityMessage', CommunityMessageSchema);
