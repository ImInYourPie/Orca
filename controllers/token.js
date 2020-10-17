/**
 * Utilities declaration
 */
const status = require("http-status");

exports.post = async (req, res, next) => {
	return res.status(status.OK).send({ success: true, message: "Hello Orca!" });
};
