/** Import libraries */
const status = require("http-status");

/**
 *
 * @param {*} schema Yup schema object
 * validates based on schema
 */
const validateForm = (schema) => {
	return async (req, res, next) => {
		try {
			const { body } = req;
			const validatedBody = await schema.validate(body);
			req.body = validatedBody;
			next();
		} catch (err) {
			return res
				.status(status.BAD_REQUEST)
				.send({ success: false, message: err.errors });
		}
	};
};

module.exports = validateForm;
