const mongoose = require('mongoose');

const { Schema } = mongoose;

const LinkOutSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  usersLinkedOut: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('LinkOut', LinkOutSchema);
