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
  body('confirm-password').trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req).mapped();
    const { email, password, confirmPassword } = req.body;
    const hasUser = User.findOne({
      email,
    });
    if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (hasUser) {
      errors.userExists = 'Email already has an account';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json(errors);
    } else {
      next();
    }
  },
  (req, res, next) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        res.status(400).json({
          error: 'There was an error processing your request.',
        });
      } else {
        const newProfile = new Profile({
          username: email,
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
