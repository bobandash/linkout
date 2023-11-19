const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Profile = require('../models/Profile');

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
