const User = require('../../models/User');
const Conversation = require('../../models/Conversation');

// Has to be run after verifyToken to check whether the user is in community
const verifyInConversation = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { conversationId } = req.params;
    const user = await User.findOne({
      email: email,
    }).exec();
    const conversation = await Conversation.findOne({
      id: conversationId,
      users: { $elemMatch: { $eq: user } },
    }).exec();
    if (!conversation) {
      return res.status(404).json({ msg: 'The conversation does not exist' });
    }

    next();
  } catch {
    return res.status(404).json({ msg: 'The conversation does not exist' });
  }
};

module.exports = verifyInConversation;
