const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        reject(err);
      } else {
        resolve(hashedPassword);
      }
    });
  });
};

const createUser = async (email, password, displayName) => {
  const username = displayName === '' ? email : displayName;
  const hashedPassword = await hashPassword(password);
  try {
    const newProfile = new Profile({ username });
    await newProfile.save();

    const newUser = new User({
      email,
      password: hashedPassword,
      profile: newProfile,
    });
    await newUser.save();
    return { success: 'Your account was successfully created.' };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  hashPassword,
};
