const mongoose = require('mongoose');
const { Schema } = mongoose;
const { DateTime } = require('luxon');

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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

DirectMessageSchema.virtual('dateFormatted').get(function () {
  return this.createdAt.toLocaleString(DateTime.DATE_MED);
});

DirectMessageSchema.virtual('longDateFormatted').get(function () {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(this.createdAt);
});

module.exports = mongoose.model('DirectMessage', DirectMessageSchema);
