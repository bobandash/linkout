const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Community = require('../../models/Community');

// Has to be run after verifyToken to check whether the user is in community
const verifyInCommunity = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { communityId } = req.params;
    const community = await Community.findById(communityId).exec();
    if (!community) {
      return res.status(404).json({ msg: 'The community does not exist' });
    }
    const user = await User.findOne({
      email: email,
      communities: { $elemMatch: { $eq: community } },
    }).exec();
    if (!user) {
      return res
        .status(401)
        .json({ msg: 'You are not authorized to view this community' });
    }
    next();
  } catch {
    return res.status(404).json({ msg: 'The community does not exist' });
  }
};

module.exports = verifyInCommunity;
