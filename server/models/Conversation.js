const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Conversation', ConversationSchema);
