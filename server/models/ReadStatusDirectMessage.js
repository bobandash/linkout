const mongoose = require('mongoose');

const { Schema } = mongoose;

// Stores the messages for community messages
const ReadStatusDirectMessageSchema = new Schema({
  DirectMessage: {
    type: Schema.Types.ObjectId,
    ref: 'DirectMessage',
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
  'ReadStatusDirectMessage',
  ReadStatusDirectMessageSchema,
);
