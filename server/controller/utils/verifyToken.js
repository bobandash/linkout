const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.cookies.secureToken || '';
  // TO DO: figure out a more eloquent way to do this
  const tokenWithoutDoubleQuotes = token.replace(/"/g, '');
  try {
    if (!tokenWithoutDoubleQuotes) {
      return res.status(401).json('You need to login');
    }
    const decrypt = await jwt.verify(
      tokenWithoutDoubleQuotes,
      process.env.SECRET_TOKEN,
    );
    req.user = {
      email: decrypt.email,
    };
    next();
  } catch (err) {
    return res.status(500).json({ msg: 'Unauthorized: Please log in.' });
  }
};

module.exports = verifyToken;
