const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const verifyToken = require('./utils/verifyToken');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ' ' + file.originalname);
  },
});
const upload = multer({ storage: storage });

exports.create_user = [
  body('email', 'Email is invalid').trim().isEmail().escape(),
  body(
    'password',
    'Password has to be at least 8 characters, 1 uppercase, and 1 symbol',
  )
    .trim()
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minSymbols: 1,
    })
    .escape(),
  body('displayName').trim().escape(),
  body('confirmPassword').trim().escape(),
  async (req, res, next) => {
    // Error messages such as account already exists, not strong password should take precedence
    const errors = validationResult(req).mapped();
    const { email, password, confirmPassword } = req.body;
    const hasUser = await User.findOne({ email }).exec();
    const passwordMatches = confirmPassword === password;
    if (hasUser) {
      res.status(400).json({ email: { msg: 'Email already has an account' } });
    } else if (Object.keys(errors).length > 0) {
      if (!errors.password) {
        if (!passwordMatches) {
          errors.confirmPassword = { msg: 'Passwords do not match' };
        }
      }
      res.status(400).json(errors);
    } else if (!passwordMatches) {
      res
        .status(400)
        .json({ confirmPassword: { msg: 'Passwords do not match' } });
    } else {
      next();
    }
  },
  (req, res, next) => {
    const { email, password, displayName } = req.body;
    const username = displayName === '' ? email : displayName;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        res.status(400).json({
          error: 'There was an error processing your request.',
        });
      } else {
        const newProfile = new Profile({
          username,
        });
        await newProfile.save();
        const newUser = new User({
          email,
          password: hashedPassword,
          profile: newProfile,
        });
        await newUser.save();
      }
      res.json({
        success: 'Your account was successfully created.',
      });
    });
  },
];

exports.log_in = [
  body('email', 'Your credientials are invalid').trim().isEmail().escape(),
  async (req, res, next) => {
    const errors = validationResult(req).mapped();
    const { email, password } = req.body;
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const userOfInterest = await User.findOne({ email: email }).exec();

    if (userOfInterest) {
      const match = await bcrypt.compare(password, userOfInterest.password);
      if (match) {
        const token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
          expiresIn: '7d',
        });
        return res
          .status(200)
          .cookie('secureToken', JSON.stringify(token), {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 * 7,
          })
          .json({ msg: 'Successfully signed in' });
      }
      return res.status(400).json({
        password: {
          msg: 'Your credientials are invalid',
        },
      });
    }
  },
];

exports.sign_in_status = [
  verifyToken,
  (req, res, next) => {
    res.status(200).json({
      signedInStatus: true,
    });
  },
];

exports.get_username = [
  verifyToken,
  async (req, res, next) => {
    const { email } = req.user;
    const user = await User.findOne({ email }).populate('profile').exec();
    res.json({
      username: user.profile.username,
    });
  },
];

exports.get_email = [
  verifyToken,
  async (req, res, next) => {
    const { email } = req.user;
    res.json({
      email: email,
    });
  },
];

exports.get_profile = [
  verifyToken,
  async (req, res, next) => {
    const { email } = req.user;
    const user = await User.findOne({ email }).populate('profile').exec();
    res.json({ profile: user.profile });
  },
];

exports.update_profile = [
  verifyToken,
  upload.single('profilePic'),
  // TO-DO: add data validation for social media urls
  async (req, res, next) => {
    const file = req.file;
    const {
      username,
      status,
      aboutMe,
      link,
      interests,
      instagram,
      facebook,
      twitter,
      tiktok,
    } = req.body;
    const { email } = req.user;
    const user = await User.findOne({ email }).populate('profile').exec();
    const profileId = user.profile.id;
    const existingProfile = await Profile.findById(profileId).exec();
    const updateFields = {
      profilePic: file ? file.filename : existingProfile.profilePic,
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

    await Profile.findByIdAndUpdate(profileId, updateFields);
    res.json({ success: 'Success' });
  },
];

exports.post_pfp = [
  verifyToken,
  upload.single('image'),
  async (req, res, next) => {
    const { email } = req.user;
    const fullFilePath = req.file.path;
    const user = await User.findOne({ email }).populate('profile').exec();
    const profileId = user.profile._id;
    await Profile.findByIdAndUpdate(profileId, {
      profilePic: fullFilePath,
    }).exec();
    res.json({ data: fullFilePath });
  },
];

exports.get_communities = [
  verifyToken,
  async (req, res, next) => {
    const { email } = req.user;
    const user = await User.findOne({ email })
      .populate({
        path: 'communities',
        select: 'description name profilePic Users',
      })
      .select('communities')
      .exec();
    res.json({ communities: user.communities });
  },
];
