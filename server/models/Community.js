const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommunityMessageSchema = new Schema({
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
});

module.exports = mongoose.model('Community', CommunityMessageSchema);
