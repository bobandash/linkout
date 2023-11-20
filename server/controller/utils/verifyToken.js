const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || '';
  try {
    if (!token) {
      return res.status(401).json('You need to login');
    }
    const tokenWithoutAuthString = token.split(' ')[1];
    const decrypt = await jwt.verify(
      tokenWithoutAuthString,
      process.env.SECRET_TOKEN,
    );
    req.user = {
      email: decrypt.email,
    };
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

module.exports = verifyToken;
