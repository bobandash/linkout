const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  communities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Community',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Friend',
    },
  ],
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
  timestamp: true,
});

module.exports = mongoose.model('User', UserSchema);
