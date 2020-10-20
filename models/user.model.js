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
				message: "Invalid email"
			},
			min: EMAIL_LENGTH.MIN,
			max: EMAIL_LENGTH.MAX
		},
		password: {
			type: String,
			required: true,
			select: false,
			min: PASSWORD_LENGTH.MIN
		},
		name: {
			first: {
				type: String,
				min: 1
			},
			last: {
				type: String,
				min: 1
			}
		}
	},
	{ collection: "user", timestamps: true }
);

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
