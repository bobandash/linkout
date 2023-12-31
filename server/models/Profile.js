const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = new Schema(
  {
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
      default: 'images/defaultPfp.jpg',
    },
    aboutMe: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    interests: {
      type: String,
      default: '',
    },
    skills: {
      type: Schema.Types.Mixed,
      default: '',
    },
    socialMediaUrls: {
      instagram: {
        type: String,
        default: '',
      },
      facebook: {
        type: String,
        default: '',
      },
      tiktok: {
        type: String,
        default: '',
      },
      twitter: {
        type: String,
        default: '',
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Profile', ProfileSchema);
