const router = require('express').Router();
const ConversationController = require('../controllers/ConversationController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, ConversationController.create);
router.get('/:userId', authenticateToken, ConversationController.getUser);
router.get(
	'/find/:firstUserId/:secondUserId',
	authenticateToken,
	ConversationController.find
);

module.exports = router;
