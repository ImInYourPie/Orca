/** Import libraries */
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");
const validator = require("validator");

/** Constants */
const {
	SALT_ROUNDS,
	PASSWORD_LENGTH,
	EMAIL_LENGTH
} = require("../constants/user.const");
const { INVALID_EMAIL } = require("../constants/messages");

const Schema = mongoose.Schema;

/** Declare schema */
const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: (value) => validator.isEmail(value),
				message: INVALID_EMAIL
			},
			minlength: EMAIL_LENGTH.MIN,
			maxlength: EMAIL_LENGTH.MAX
		},
		avatar: {
			type: String
		},
		password: {
			type: String,
			required: true,
			select: false,
			minlength: PASSWORD_LENGTH.MIN
		},
		name: {
			first: {
				type: String
			},
			last: {
				type: String
			}
		}
	},
	{ collection: "users", timestamps: true }
);

/**
 * Password hashing function
 * runs on created || password field modified
 */
UserSchema.pre("save", function (next) {
	if (this.isNew || this.isModified("password")) {
		const document = this;
		bcrypt.hash(document.password, SALT_ROUNDS, function (err, hashedPassword) {
			if (err) {
				next(err);
			} else {
				document.password = hashedPassword;
				next();
			}
		});
	} else {
		next();
	}
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model("User", UserSchema);
module.exports = User;
