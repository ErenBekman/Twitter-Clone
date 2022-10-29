const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema(
	{
		conversationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Conversation',
		},
		sender: {
			type: String,
		},
		text: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Message', MessagesSchema);
