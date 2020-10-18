/**  */
const SALT_ROUNDS = 10;

const PASSWORD_LENGTH = {
	MIN: 6,
	MAX: 16
};

const EMAIL_LENGTH = {
	MIN: 1,
	MAX: 100
};

module.exports = {
	SALT_ROUNDS,
	PASSWORD_LENGTH,
	EMAIL_LENGTH
};
