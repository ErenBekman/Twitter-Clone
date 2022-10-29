const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const httpStatus = require('http-status');
const authenticateToken = require('../middleware/auth');
const nodemailer = require('nodemailer');

const passwordToHash = (password) => {
	return CryptoJS.HmacSHA256(
		password,
		CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString()
	).toString();
};

const generateAccessToken = (user) => {
	return JWT.sign({ id: user._id }, process.env.PASSWORD_HASH, {
		expiresIn: '1w',
	});
};

const generateRefreshToken = (user) => {
	return JWT.sign({ id: user._id }, process.env.PASSWORD_HASH);
};

// const transporter = nodemailer.createTransport({
// 	service: 'gmail',
// 	auth: {
// 		user: 'erenbekman@gmail.com',
// 		pass: 'zsqzrqaknwihupwv',
// 	},
// 	tls: {
// 		rejectUnauthorized: false,
// 	},
// });

router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	try {
		const newUser = new User({
			username: username,
			email: email,
			password: hashedPassword,
			emailToken: crypto.randomBytes(64).toString('hex'),
			isVerified: false,
		});

		const user = await newUser.save();
		res.status(200).json(user);

		console.log('user.email :>> ', user.email);

		const transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			auth: {
				user: 'robb.bradtke53@ethereal.email',
				pass: 'mPHkwUbmWyxmakKVsC',
			},
		});

		let mailOptions = {
			from: 'robb.bradtke53@ethereal.email',
			to: user.email,
			subject: 'twitter -verify your email',
			html: `
			<h2> ${user.username} Thanks for registering on twitter clone </h2> 
			<h4> Please verify your mail continue.. </h4>
			<a href="http://localhost:3000/auth/verify-email/${user.emailToken}">Verify Your Email</a>
			`,
		};

		const info = await transporter.sendMail(
			mailOptions,
			function (error, info) {
				if (error) {
					console.log('error :>> ', error);
				} else {
					console.log('Message sent: %s', info.messageId);
					console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
				}
			}
		);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/login', async (req, res) => {
	console.log('req.body :>> ', req.body);
	try {
		User.findOne({ email: req.body.email }).then(async (user) => {
			if (!user)
				return res
					.status(httpStatus.NOT_FOUND)
					.send({ message: 'User not found!' });
			// && user.isVerified
			if (bcrypt.compareSync(req.body.password, user.password)) {
				res.status(httpStatus.OK).send({
					access_token: generateAccessToken(user),
					refresh_token: generateRefreshToken(user),
				});
			} else {
				res
					.status(httpStatus.BAD_REQUEST)
					.send({ msg: 'incorrect password or email!' });
			}
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/verify-email', authenticateToken, async (req, res) => {
	try {
		const token = req.query.token;
		const user = await User.findOne({ emailToken: token });
		console.log('token :>> ', token);
		if (user) {
			user.emailToken = null;
			user.isVerified = true;
			await user.save();
			res.status(httpStatus.OK).send({ msg: 'verified email' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/me', authenticateToken, (req, res) => {
	res.json(req.user);
});

module.exports = router;
