var express = require('express');
var router = express.Router();
const communityController = require('../controller/communityController');

/* GET home page. */
router.post('/create', communityController.create_community);

module.exports = router;
