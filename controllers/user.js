/** Model import */
const User = require("../models/user.model");

/** Utilities declaration */
const status = require("http-status");
const messages = require("../constants/messages");

exports.index = async (req, res, next) => {
	return res.status(status.OK).send({ success: true, message: "Hello Orca!" });
};

exports.register = async (req, res) => {
	try {
		const { body } = req;
		const newUser = await User.create(body);

		if (Boolean(newUser))
			return res
				.status(status.CREATED)
				.send({ success: true, message: messages.USER_CREATED });
	} catch (error) {
		return res
			.status(status.INTERNAL_SERVER_ERROR)
			.send({ success: false, message: status["500_MESSAGE"] });
	}
};
