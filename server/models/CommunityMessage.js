const mongoose = require('mongoose');
const { Schema } = mongoose;
const { DateTime } = require('luxon');

// Stores the messages for community messages
const CommunityMessageSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

CommunityMessageSchema.virtual('dateFormatted').get(function () {
  return this.createdAt.toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('CommunityMessage', CommunityMessageSchema);
