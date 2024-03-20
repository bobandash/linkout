const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Community = require('../models/Community');
const Conversation = require('../models/Conversation');
const jwt = require('jsonwebtoken');
const verifyToken = require('./utils/verifyToken');
const getUsername = require('./utils/getUsername');
const verifyInCommunity = require('./utils/verifyInCommunity');
const multer = require('multer');
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new MulterError.MulterError('LIMIT_UNEXPECTED_FILE', false));
  }
};
const upload = multer({ storage, fileFilter });
const path = require('path');
const { s3Uploadsv2 } = require('../s3Serve');

exports.get_username = [
  verifyToken,
  async (req, res, next) => {
    const { email } = req.user;
    const user = await User.findOne({ email }).populate('profile').exec();
    return res.json({
      username: user.profile.username,
    });
  },
];

exports.get_email = [
  verifyToken,
  async (req, res, next) => {
    const { email } = req.user;
    return res.json({
      email: email,
    });
  },
];

exports.get_profile = [
  verifyToken,
  async (req, res, next) => {
    const { email } = req.user;
    const user = await User.findOne({ email }).populate('profile').exec();
    return res.json({ profile: user.profile });
  },
];

exports.get_other_user_profile = [
  verifyToken,
  async (req, res, next) => {
    const { profileId } = req.params;
    const profile = await Profile.findById(profileId).exec();
    return res.status(200).json({ profile });
  },
];

exports.update_profile = [
  verifyToken,
  getUsername,
  upload.single('image'),
  body('username', 'Username cannot be empty').trim().notEmpty(),
  body('socialMediaUrls.instagram')
    .optional()
    .trim()
    .custom((value) => {
      if (value && !value.startsWith('instagram.com/')) {
        throw new Error('Link must start with: instagram.com/');
      }
      return true;
    }),
  body('socialMediaUrls.facebook')
    .optional()
    .trim()
    .custom((value) => {
      if (value && !value.startsWith('facebook.com/')) {
        throw new Error('Link must start with: facebook.com/');
      }
      return true;
    }),
  body('socialMediaUrls.twitter')
    .optional()
    .trim()
    .custom((value) => {
      if (value && !value.startsWith('twitter.com/')) {
        throw new Error('Link must start with: twitter.com/');
      }
      return true;
    }),
  body('socialMediaUrls.tiktok')
    .optional()
    .trim()
    .custom((value) => {
      if (value && !value.startsWith('tiktok.com/')) {
        throw new Error('Link must start with: tiktok.com/');
      }
      return true;
    }),
  async (req, res, next) => {
    // show all the errors
    const errors = validationResult(req).mapped();
    const { username } = req.body;
    if (username !== req.username) {
      const profile = await Profile.findOne({
        username: username,
      }).exec();
      if (profile) {
        errors.username = { msg: 'Username already exists' };
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors: errors });
    }
    next();
  },
  async (req, res, next) => {
    const { username, status, aboutMe, link, interests } = req.body;
    const instagram = req.body['socialMediaUrls.instagram'];
    const facebook = req.body['socialMediaUrls.facebook'];
    const twitter = req.body['socialMediaUrls.twitter'];
    const tiktok = req.body['socialMediaUrls.tiktok'];
    const { email } = req.user;
    const user = await User.findOne({ email }).populate('profile').exec();
    const profileId = user.profile.id;
    const existingProfile = await Profile.findById(profileId).exec();
    let imagePath = req.file
      ? (await s3Uploadsv2(req.file)).Location
      : existingProfile.profilePic;
    const updateFields = {
      profilePic: imagePath,
      username,
      status,
      aboutMe,
      link,
      interests,
      socialMediaUrls: {
        instagram,
        facebook,
        twitter,
        tiktok,
      },
    };

    const profile = await Profile.findByIdAndUpdate(
      profileId,
      updateFields,
    ).exec();
    return res.json(profile);
  },
];

exports.post_pfp = [
  verifyToken,
  upload.single('image'),
  async (req, res, next) => {
    const { email } = req.user;
    const file = req.file;
    const result = await s3Uploadsv2(file);
    const user = await User.findOne({ email }).populate('profile').exec();
    const profileId = user.profile._id;
    await Profile.findByIdAndUpdate(profileId, {
      profilePic: result.Location,
    }).exec();
    return res.json({ data: result.Location });
  },
];

exports.get_communities = [
  verifyToken,
  async (req, res, next) => {
    const { email } = req.user;
    const user = await User.findOne({ email })
      .populate({
        path: 'communities',
        select: 'description name profilePic users',
      })
      .select('communities')
      .exec();
    return res.json({ communities: user.communities });
  },
];

exports.join_community = [
  verifyToken,
  async (req, res, next) => {
    const { email } = req.user;
    const { communityId } = req.body;
    const community = await Community.findById(communityId).exec();

    const user = await User.findOneAndUpdate(
      { email },
      {
        $push: { communities: community },
      },
    ).exec();

    await Community.findByIdAndUpdate(communityId, {
      $push: {
        users: {
          user: user,
          isVisible: true,
        },
      },
    });

    return res.json({ user: user });
  },
];

// Returns array of all users with username, status, and profilePic
exports.get_users = [
  verifyToken,
  async (req, res, next) => {
    const users = await User.find({})
      .populate({
        path: 'profile',
        select: 'username status profilePic',
      })
      .select('profile')
      .exec();
    const usersFormatted = users.map((user) => {
      return user.profile;
    });

    // sorts alphabetically
    usersFormatted.sort(function (a, b) {
      const textA = a.username.toUpperCase();
      const textB = b.username.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    return res.status(200).json(usersFormatted);
  },
];

// gets all the conversations for particular user
exports.get_conversations = [
  verifyToken,
  async (req, res, next) => {
    try {
      const { email } = req.user;
      const user = await User.findOne({ email: email }).exec();
      const conversations = await Conversation.find({ users: { $all: user } })
        .populate({
          path: 'users',
          select: 'profile',
          populate: {
            path: 'profile',
            select: 'username status profilePic',
          },
        })
        .sort({ lastMessageDate: -1 })
        .exec();
      return res.status(200).json(conversations);
    } catch {
      return res.status(404).json({ error: 'Does not exist' });
    }
  },
];
