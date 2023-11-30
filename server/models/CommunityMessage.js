const mongoose = require('mongoose');
const { Schema } = mongoose;
const { DateTime } = require('luxon');

// Stores the messages for community messages
const CommunityMessageSchema = new Schema(
  {
    content: {
      type: String,
    },
    image: {
      type: String,
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

CommunityMessageSchema.path('content').validate(function (value) {
  return this.content || this.image;
}, 'Either content or image is required.');

CommunityMessageSchema.virtual('longDateFormatted').get(function () {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(this.createdAt);
});

module.exports = mongoose.model('CommunityMessage', CommunityMessageSchema);
