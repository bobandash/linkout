const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Community = require('../models/Community');
const jwt = require('jsonwebtoken');
const verifyToken = require('./utils/verifyToken');
const multer = require('multer');
const path = require('path');
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
    const { limit, numUsersOrder, nameOrder } = req.query;

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
      Users: 1,
    });

    if (limit) {
      communities = communities.limit(Number(limit));
    }

    communities = await communities.exec();

    res.json(communities);
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
      Users: [user],
      Admins: [user],
      LinkOuts: [],
    });
    await user.updateOne({ $push: { communities: community } }).exec();
    await community.save();
    return res.json(community);
  },
];
