const express = require('express');
const router = express.Router();
const communityController = require('../controller/communityController');

router.get('/', communityController.get_communities);
router.post('/create', communityController.create_community);
router.get('/:communityId', communityController.get_individual_community);
router.post('/:communityId/add-message', communityController.add_message);
router.post('/:communityId/add-image', communityController.add_image);
router.get('/:communityId/messages', communityController.get_messages);
router.get('/:communityId/users', communityController.get_users_by_community);

module.exports = router;
