const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');

router.post('/create', userController.create_user);
router.post('/login', userController.log_in);

/* for individual user operations */
router.get('/user/sign-in-status', userController.sign_in_status);
router.get('/user/username', userController.get_username);
router.get('/user/email', userController.get_email);
router.get('/user/profile', userController.get_profile);
router.put('/user/profile', userController.update_profile);
router.put('/user/pfp', userController.post_pfp);
router.get('/user/community', userController.get_communities);
router.put('/user/community/join', userController.join_community);

// to get users related to a community
router.get('/community', userController.get_users);
router.get('/community/:communityId', userController.get_users_by_community);

module.exports = router;
