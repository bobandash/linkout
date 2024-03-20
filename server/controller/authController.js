const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const { hashPassword, createUser } = require('./utils/createUser');
const verifyToken = require('./utils/verifyToken');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

exports.register_user = [
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
  // Error messages such as account already exists, not strong password should take precedence
  async (req, res, next) => {
    const errors = validationResult(req).mapped();
    const { email, password, confirmPassword } = req.body;
    const hasUser = await User.findOne({ email }).exec();
    const passwordMatches = confirmPassword === password;
    if (hasUser) {
      return res
        .status(400)
        .json({ email: { msg: 'Email already has an account' } });
    }

    if (Object.keys(errors).length > 0) {
      if (!errors.password && !passwordMatches) {
        errors.confirmPassword = { msg: 'Passwords do not match' };
      }
      return res.status(400).json(errors);
    }

    if (!passwordMatches) {
      return res
        .status(400)
        .json({ confirmPassword: { msg: 'Passwords do not match' } });
    }
    next();
  },
  async (req, res, next) => {
    const { email, password, displayName } = req.body;
    try {
      const hashedPassword = await hashPassword(password);
      const result = await createUser(email, hashedPassword, displayName);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating user' });
    }
  },
];

exports.log_in = [
  body('email', 'Your credentials are invalid').trim().isEmail().escape(),
  async (req, res, next) => {
    const errors = validationResult(req).mapped();
    const { email, password } = req.body;
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: email }).exec();

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
          expiresIn: '7d',
        });
        return res
          .status(200)
          .cookie('secureToken', JSON.stringify(token), {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 * 7,
          })
          .json({ msg: 'Successfully signed in' });
      }
      return res.status(400).json({
        password: {
          msg: 'Your credentials are invalid',
        },
      });
    }
  },
];

exports.sign_in_status = [
  verifyToken,
  (req, res, next) => {
    return res.status(200).json({
      signedInStatus: true,
    });
  },
];

exports.logout = [
  verifyToken,
  (req, res, next) => {
    res.clearCookie('secureToken', { secure: true, httpOnly: true });
    return res.status(200).json({ msg: 'Successfully logged out' });
  },
];
