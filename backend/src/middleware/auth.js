const httpStatus = require('http-status');
const JWT = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	// const token = req.headers?.authorization?.split(" ")[1] || null
	if (token === null) {
		return res
			.status(httpStatus.UNAUTHORIZED)
			.send({ error: 'please first you have to login' });
	}

	JWT.verify(token, process.env.PASSWORD_HASH, async (err, user) => {
		if (err) return res.status(httpStatus.FORBIDDEN).send({ error: err });
		console.log('user :>> ', user);
		req.user = await User.findById(user.id);
		next();
	});
};

module.exports = authenticateToken;
