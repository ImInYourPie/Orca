/** Import libraries */
const yup = require("yup");

/** String messages */
const messages = require("../../../constants/messages");
const { MAX_DESCRIPTION_LENGTH } = require("../../../constants/project.const");

const schema = yup.object().shape({
	title: yup.string().required(messages.PROJECT_TITLE_REQUIRED),
	description: yup
		.string()
		.max(MAX_DESCRIPTION_LENGTH, messages.MAX_DESCRIPTION_LENGTH),
	key: yup.string(),
	category: yup.string(),
	repository: yup.string()
});

module.exports = schema;
