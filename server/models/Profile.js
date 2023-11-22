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
      type: Schema.Types.Mixed,
      default: {
        instagram: '',
        facebook: '',
        twitter: '',
        tiktok: '',
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Profile', ProfileSchema);
