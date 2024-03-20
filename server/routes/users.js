const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');

/* to get all users */
router.get('/', userController.get_users);
router.get('/profile/:profileId', userController.get_other_user_profile);

/* for the user logged in, gets all their information */
router.get('/me/username', userController.get_username);
router.get('/me/email', userController.get_email);
router.get('/me/profile', userController.get_profile);
router.put('/me/profile', userController.update_profile);
router.put('/me/pfp', userController.post_pfp);
router.get('/me/community', userController.get_communities);
router.put('/me/community/join', userController.join_community);
router.get('/me/conversation', userController.get_conversations);

module.exports = router;
