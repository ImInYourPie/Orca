/**
 * Utilities declaration
 */
const status = require("http-status");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const messages = require("../constants/messages");

exports.post = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email }).select("+password");

		if (!user)
			return res
				.status(status.BAD_REQUEST)
				.send({ success: false, message: messages.INVALID_CREDENTIALS });

		bcrypt.compare(password, user.password, (err, success) => {
			if (!err && success) {
				const token = jwt.sign({ userId: user._id }, process.env.PASSPORT_SECRET, {
					expiresIn: process.env.JWT_EXPIRATION
				});
				return res.status(status.OK).send({ success: true, token });
			} else {
				return res
					.status(status.BAD_REQUEST)
					.send({ success: false, message: messages.INVALID_CREDENTIALS });
			}
		});
	} catch (error) {
		return res
			.status(status.INTERNAL_SERVER_ERROR)
			.send({ sucess: false, message: status["500_MESSAGE"] });
	}
};
