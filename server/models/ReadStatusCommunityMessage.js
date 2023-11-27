const mongoose = require('mongoose');

const { Schema } = mongoose;

// Stores the messages for community messages
const ReadStatusCommunityMessageSchema = new Schema({
  CommunityMessage: {
    type: Schema.Types.ObjectId,
    ref: 'CommunityMessage',
  },
  User: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  hasRead: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model(
  'ReadStatusCommunityMessage',
  ReadStatusCommunityMessageSchema,
);
