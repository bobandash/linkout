const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

const createUser = async (email, hashedPassword, displayName) => {
  const username = displayName === '' ? email : displayName;
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
