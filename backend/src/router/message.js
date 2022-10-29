const router = require('express').Router();
const MessageController = require('../controllers/MessageController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, MessageController.create);
router.get(
	'/:conversationId',
	authenticateToken,
	MessageController.getConversation
);

module.exports = router;
