var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/logout', (req, res, next) => {
  res.clearCookie('secureToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  return res.status(200).json({ msg: 'Successfully logged out' });
});

module.exports = router;
