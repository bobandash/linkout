const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommunitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    Users: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        isVisible: {
          type: Boolean,
          default: true,
        },
      },
    ],
    Admins: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    LinkOuts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Linkout',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

CommunitySchema.virtual('numUsers').get(function () {
  return this.Users.length;
});

module.exports = mongoose.model('Community', CommunitySchema);
