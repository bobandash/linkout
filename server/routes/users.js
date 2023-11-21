const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');

router.post('/create', userController.create_user);
router.post('/login', userController.log_in);
router.get('/sign-in-status', userController.sign_in_status);

module.exports = router;
