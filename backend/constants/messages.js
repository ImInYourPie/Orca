/*Registration messages */

// Email
const INVALID_EMAIL = "Invalid email submited";
const EMPTY_EMAIL = "Email is a required field";

// Password
const PASSWORD_LENGTH = "Password must be between 6 and 16 characters";
const EMPTY_PASSWORD = "Password is a required field";

// User
const USER_CREATED = "User has been created with success";
const USER_ALREADY_EXISTS = "Email is already registered";

// Login
const INVALID_CREDENTIALS = "Email or password is invalid";

// Project
const NO_PROJECTS_FOUND = "No project(s) found";
const INVALID_PROJECT_BODY = "Invalid project form submited";
const PROJECT_CREATED = "Project created succesfully";
const PROJECT_TITLE_REQUIRED = "Project title is required";
const MAX_DESCRIPTION_LENGTH = "Max description length exceeded";

module.exports = {
	INVALID_EMAIL,
	EMPTY_EMAIL,
	PASSWORD_LENGTH,
	EMPTY_PASSWORD,
	USER_CREATED,
	USER_ALREADY_EXISTS,
	INVALID_CREDENTIALS,
	NO_PROJECTS_FOUND,
	INVALID_PROJECT_BODY,
	PROJECT_CREATED,
	PROJECT_TITLE_REQUIRED,
	MAX_DESCRIPTION_LENGTH
};
