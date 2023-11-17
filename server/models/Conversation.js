const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConversationSchema = new Schema({
  Users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  timestamp: true,
});

module.exports = mongoose.model('Conversation', ConversationSchema);
