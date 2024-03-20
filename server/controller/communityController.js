const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Community = require('../models/Community');

const verifyToken = require('./utils/verifyToken');
const multer = require('multer');
const CommunityMessage = require('../models/CommunityMessage');
const verifyInCommunity = require('./utils/verifyInCommunity');
const { s3Uploadsv2 } = require('../s3Serve');
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new MulterError.MulterError('LIMIT_UNEXPECTED_FILE', false));
  }
};
const upload = multer({ storage, fileFilter });

exports.get_communities = [
  verifyToken,
  async (req, res, next) => {
    try {
      const { limit, numUsersOrder, nameOrder, communityId } = req.query;

      let communities = Community.find({});

      if (numUsersOrder) {
        communities = communities.sort({ numUsers: Number(numUsersOrder) });
      } else if (nameOrder) {
        communities = communities.sort({ name: Number(nameOrder) });
      }

      communities = communities.select({
        name: 1,
        description: 1,
        profilePic: 1,
        users: 1,
      });

      if (limit) {
        communities = communities.limit(Number(limit));
      }
      communities = await communities.exec();
      return res.json({ communities });
    } catch {
      return res.status(404).json({ error: 'Cannot find' });
    }
  },
];

exports.get_individual_community = [
  verifyToken,
  verifyInCommunity,
  async (req, res, next) => {
    try {
      const { communityId } = req.params;
      const community = await Community.findById(communityId).exec();
      return res.json(community);
    } catch {
      return res.status(404).json({ error: 'Cannot find' });
    }
  },
];

exports.create_community = [
  verifyToken,
  upload.single('profilePic'),
  body('name', 'Name must not be empty').trim().notEmpty().escape(),
  body('description', 'Description must not be empty')
    .trim()
    .notEmpty()
    .escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req).mapped();
      const { name, description } = req.body;
      if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
      }
      const { email } = req.user;
      const user = await User.findOne({ email: email }).exec();
      let community = {};
      const defaultPfp = name.length === 1 ? name : name.substring(0, 2);
      let image = req.file
        ? (await s3Uploadsv2(req.file)).Location
        : defaultPfp;
      community = new Community({
        name,
        description,
        profilePic: image,
        users: [
          {
            user: user,
            isVisible: true,
          },
        ],
        admins: [user],
        linkOuts: [],
      });
      await user.updateOne({ $push: { communities: community } }).exec();
      await community.save();
      return res.json({ community: community });
    } catch {
      return res.status(404).json({ error: 'Cannot find' });
    }
  },
];

exports.add_message = [
  verifyToken,
  body('message', 'Message must not be empty').trim().notEmpty().escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req).mapped();
      if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
      }
      const { email } = req.user;
      const { communityId } = req.params;
      const { message } = req.body;
      const [community, user] = await Promise.all([
        Community.findById(communityId).exec(),
        User.findOne({ email: email }).exec(),
      ]);
      const newMessage = new CommunityMessage({
        content: message,
        sender: user,
        community: community,
      });
      await newMessage.save();
      const messageFormatted = await CommunityMessage.findById(newMessage._id)
        .populate({
          path: 'sender',
          select: 'profile',
          populate: {
            path: 'profile',
            select: 'profilePic username',
          },
        })
        .exec();
      return res.json({ message: messageFormatted });
    } catch {
      return res.status(404).json({ error: 'Cannot find' });
    }
  },
];

exports.get_messages = [
  verifyToken,
  verifyInCommunity,
  async (req, res, next) => {
    try {
      const { communityId } = req.params;
      const messages = await CommunityMessage.find({
        community: communityId,
      })
        .populate({
          path: 'sender',
          select: 'profile',
          populate: {
            path: 'profile',
            select: 'profilePic username',
          },
        })
        .sort({ createdAt: 1 })
        .exec();
      return res.status(200).json(messages);
    } catch {
      return res.status(404).json({ error: 'Cannot find' });
    }
  },
];

exports.add_image = [
  verifyToken,
  upload.single('image'),
  async (req, res, next) => {
    try {
      const file = req.file;
      const result = await s3Uploadsv2(file);
      const { email } = req.user;
      const { communityId } = req.params;
      const [community, user] = await Promise.all([
        Community.findById(communityId).exec(),
        User.findOne({ email: email }).exec(),
      ]);

      const newMessage = new CommunityMessage({
        image: result.Location,
        sender: user,
        community: community,
      });
      await newMessage.save();
      // Need to format the message with relevant fields
      const messageFormatted = await CommunityMessage.findById(newMessage._id)
        .populate({
          path: 'sender',
          select: 'profile',
          populate: {
            path: 'profile',
            select: 'profilePic username',
          },
        })
        .exec();
      return res.status(200).json({ message: messageFormatted });
    } catch {
      return res.status(404).json({ error: 'Cannot find' });
    }
  },
];

// Returns an array of all users in a community
exports.get_users_by_community = [
  verifyToken,
  verifyInCommunity,
  async (req, res, next) => {
    try {
      const { communityId } = req.params;
      const community = await Community.findById(communityId).populate({
        path: 'users.user',
        populate: {
          path: 'profile',
          select: 'username status profilePic',
        },
      });
      const userObj = community.users;
      const profiles = userObj.map((userObj) => {
        return userObj.user.profile;
      });
      profiles.sort(function (a, b) {
        const textA = a.username.toUpperCase();
        const textB = b.username.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      return res.status(200).json(profiles);
    } catch {
      return res
        .status(404)
        .json({ error: 'Could not find users in the community' });
    }
  },
];
