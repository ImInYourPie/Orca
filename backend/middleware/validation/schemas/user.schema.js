/** Import libraries */
const yup = require("yup");

/** String messages */
const messages = require("../../../constants/messages");
const { PASSWORD_LENGTH } = require("../../../constants/user.const");

const schema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.email(messages.INVALID_EMAIL)
		.required(messages.EMPTY_EMAIL),
	password: yup
		.string()
		.required(messages.EMPTY_PASSWORD)
		.min(PASSWORD_LENGTH.MIN, messages.PASSWORD_LENGTH)
		.max(PASSWORD_LENGTH.MAX, messages.PASSWORD_LENGTH),
	name: yup.object().shape({
		first: yup
			.string()
			.nullable(true)
			.transform((value, object) => (object === "null" ? null : value)),
		last: yup
			.string()
			.nullable(true)
			.transform((value, object) => (object === "null" ? null : value))
	})
});

module.exports = schema;
