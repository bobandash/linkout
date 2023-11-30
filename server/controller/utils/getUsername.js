const User = require('../../models/User');

// Function has to be run after verify token
const getUsername = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email }).populate('profile').exec();
    const username = user.profile.username;
    req.username = username;
    next();
  } catch (err) {
    return res.status(500).json({ msg: 'Could not get username' });
  }
};

module.exports = getUsername;
