const express = require('express');

const router = express.Router();
const authController = require('../controller/authController');

router.post('/register', authController.register_user);
router.post('/login', authController.log_in);
router.get('/sign-in-status', authController.sign_in_status);
router.post('/logout', authController.log_out);
module.exports = router;
