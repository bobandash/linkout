const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: '',
  },
  profilePic: {
    type: String,
    default: '',
  },
  aboutMe: {
    type: String,
    default: '',
  },
  link: {
    type: String,
  },
  interests: {
    type: String,
  },
  skills: {
    type: Schema.Types.Mixed,
  },
  socialMediaUrls: {
    type: Schema.Types.Mixed,
  },
  timestamp: true,
});

module.exports = mongoose.model('Profile', ProfileSchema);
