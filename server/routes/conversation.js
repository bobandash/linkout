const express = require('express');

const router = express.Router();
const conversationController = require('../controller/conversationController.js');

router.get('/conversation', conversationController.get_conversation_if_exists);
router.get(
  '/:conversationId/details',
  conversationController.get_conversation_details,
);
router.get(
  '/:conversationId/messages',
  conversationController.get_conversation_messages,
);
router.post('/:conversationId/add-message', conversationController.add_message);
router.post('/:conversationId/add-image', conversationController.add_image);
router.post('/create', conversationController.create_conversation);

module.exports = router;
