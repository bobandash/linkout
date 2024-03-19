const { body, validationResult } = require('express-validator');
const Conversation = require('../models/Conversation');
const verifyToken = require('./utils/verifyToken');
const User = require('../models/User');
const Profile = require('../models/Profile');
const DirectMessage = require('../models/DirectMessage');
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
const verifyInConversation = require('./utils/verifyInConversation');
const { s3Uploadsv2 } = require('../s3Serve');

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
      res.json(conversations);
    } catch {
      res.status(404).json({ error: 'Does not exist' });
    }
  },
];

exports.get_conversation_if_exists = [
  verifyToken,
  async (req, res, next) => {
    try {
      const { profileId } = req.query;
      const { email } = req.user;
      const otherUserProfile = await Profile.findById(profileId).exec();
      const [currentUser, otherUser] = await Promise.all([
        User.findOne({ email: email }).exec(),
        User.findOne({ profile: otherUserProfile }).exec(),
      ]);
      const conversation = await Conversation.findOne({
        users: { $all: [currentUser, otherUser] },
      });
      if (conversation) {
        return res.json({ conversation: conversation });
      } else {
        return res.status(404).json({ message: 'Does not exist' });
      }
    } catch {
      return res.status(404).json({ message: 'Does not exist' });
    }
  },
];

// TO-DO: be able to create group conversations
exports.create_conversation = [
  verifyToken,
  async (req, res, next) => {
    try {
      const { email } = req.user;
      const { profileId } = req.body;
      const otherUserProfile = await Profile.findById(profileId).exec();
      const [currentUser, otherUser] = await Promise.all([
        User.findOne({ email: email }).exec(),
        User.findOne({ profile: otherUserProfile }).exec(),
      ]);
      const newConversation = new Conversation({
        users: [currentUser, otherUser],
        creator: currentUser,
      });
      await newConversation.save();

      // return new conversation in different format
      const conversation = await Conversation.findById(
        newConversation._id,
      ).populate({
        path: 'users',
        select: 'profile',
        populate: {
          path: 'profile',
          select: 'username status profilePic',
        },
      });
      res.json({ conversation: conversation });
    } catch {
      return res.status(404).json({ message: 'Does not exist' });
    }
  },
];

// TO-DO: if group chat, change image to default group chat
exports.get_conversation_details = [
  verifyToken,
  verifyInConversation,
  async (req, res, next) => {
    try {
      const { email } = req.user;
      const { conversationId } = req.params;
      const currentUser = await User.findOne({ email: email })
        .populate({
          path: 'profile',
          select: 'username status profilePic',
        })
        .select('profile')
        .exec();
      const username = currentUser.profile.username;
      let profilePic = '';
      let usersConcatenated = '';
      const conversation = await Conversation.findById(conversationId)
        .populate({
          path: 'users',
          select: 'profile',
          populate: {
            path: 'profile',
            select: 'username status profilePic',
          },
        })
        .exec();

      const usersArray = conversation.users;
      usersArray.forEach((user) => {
        const currentUsername = user.profile.username;
        if (currentUsername !== username) {
          profilePic = user.profile.profilePic;
          usersConcatenated =
            usersConcatenated === ''
              ? currentUsername
              : usersConcatenated + ', ' + currentUsername;
        }
      });
      res.json({ name: usersConcatenated, profilePic: profilePic });
    } catch {
      return res.status(404).json({ message: 'Does not exist' });
    }
  },
];

exports.get_conversation_messages = [
  verifyToken,
  verifyInConversation,
  async (req, res, next) => {
    try {
      const { conversationId } = req.params;
      const conversation = await Conversation.findById(conversationId).exec();
      const messages = await DirectMessage.find({ conversation: conversation })
        .sort({ createdAt: 1 })
        .populate({
          path: 'sender',
          select: 'profile',
          populate: {
            path: 'profile',
            select: 'username status profilePic',
          },
        })
        .exec();
      res.json({ messages });
    } catch {
      return res.status(404).json({ message: 'Does not exist' });
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
      const { conversationId } = req.params;
      const { message } = req.body;
      const [conversation, user] = await Promise.all([
        Conversation.findById(conversationId).exec(),
        User.findOne({ email: email }).exec(),
      ]);
      const newMessage = new DirectMessage({
        content: message,
        sender: user,
        conversation: conversation,
      });
      await newMessage.save();
      // Need to format the message with relevant fields
      const messageToReturn = await DirectMessage.findById(newMessage._id)
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
    } catch {
      return res.status(404).json({ message: 'Does not exist' });
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
      const { conversationId } = req.params;
      const [conversation, user] = await Promise.all([
        Conversation.findById(conversationId).exec(),
        User.findOne({ email: email }).exec(),
      ]);
      const newMessage = new DirectMessage({
        image: result.Location,
        sender: user,
        conversation: conversation,
      });
      await newMessage.save();
      // Need to format the message with relevant fields
      const messageToReturn = await DirectMessage.findById(newMessage._id)
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
    } catch {
      return res.status(404).json({ message: 'Does not exist' });
    }
  },
];
