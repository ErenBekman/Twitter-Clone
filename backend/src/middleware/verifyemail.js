const httpStatus = require('http-status');
const User = require('../models/User');

const verifyemail = async (req, res, next) => {
	try {
		// const user = await User.findOne({ email: req.body.email });
		if (req.user.isVerified) {
			next();
		}
	} catch (error) {
		console.log('verifyemail error :>> ', error);
	}
};

module.exports = verifyemail;
