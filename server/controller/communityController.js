const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Community = require('../models/Community');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const verifyToken = require('./utils/verifyToken');
const multer = require('multer');
const path = require('path');
const CommunityMessage = require('../models/CommunityMessage');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ' ' + file.originalname);
  },
});
const upload = multer({ storage: storage });

exports.get_communities = [
  verifyToken,
  async (req, res, next) => {
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

    res.json({ communities: communities });
  },
];

exports.get_individual_community = [
  verifyToken,
  async (req, res, next) => {
    const { communityId } = req.params;
    const community = await Community.findById(communityId).exec();
    res.json(community);
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
    const errors = validationResult(req).mapped();
    const { name, description } = req.body;
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
    const { email } = req.user;
    const user = await User.findOne({ email: email }).exec();
    let community = {};
    const defaultPfp = name.length === 1 ? name : name.substring(0, 2);
    let image = req.file ? path.join('uploads', req.file.filename) : defaultPfp;
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
  },
];

exports.add_message = [
  verifyToken,
  body('message', 'Message must not be empty').trim().notEmpty().escape(),
  async (req, res, next) => {
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
    // Need to format the message with relevant fields
    const messageToReturn = await CommunityMessage.findById(newMessage._id)
      .populate({
        path: 'sender',
        select: 'profile',
        populate: {
          path: 'profile',
          select: 'profilePic username',
        },
      })
      .exec();
    res.json({ message: messageToReturn });
  },
];

exports.get_messages = [
  verifyToken,
  async (req, res, next) => {
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
    res.json(messages);
  },
];

exports.add_image = [
  verifyToken,
  upload.single('image'),
  async (req, res, next) => {
    let imagePath = path.join('uploads', req.file.filename);
    const { email } = req.user;
    const { communityId } = req.params;
    const [community, user] = await Promise.all([
      Community.findById(communityId).exec(),
      User.findOne({ email: email }).exec(),
    ]);

    const newMessage = new CommunityMessage({
      image: imagePath,
      sender: user,
      community: community,
    });
    await newMessage.save();
    // Need to format the message with relevant fields
    const messageToReturn = await CommunityMessage.findById(newMessage._id)
      .populate({
        path: 'sender',
        select: 'profile',
        populate: {
          path: 'profile',
          select: 'profilePic username',
        },
      })
      .exec();
    res.json({ message: messageToReturn });
  },
];
