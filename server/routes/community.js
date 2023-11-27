var express = require('express');
var router = express.Router();
const communityController = require('../controller/communityController');

router.get('/', communityController.get_communities);
router.post('/create', communityController.create_community);
router.get('/:communityId', communityController.get_individual_community);
router.post('/:communityId/add-message', communityController.add_message);
router.get('/:communityId/messages', communityController.get_messages);

module.exports = router;
