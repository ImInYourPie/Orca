/** Import libraries */
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

/** Model import */
const User = require("../models/user.model");

/**
 *
 * @param {*} passport
 */
exports.applyPassportStrategy = (passport) => {
	// Options to be used by passport config
	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.PASSPORT_SECRET
	};
	passport.use(
		new Strategy(options, (payload, done) => {
			User.findOne({ _id: payload.userId }, (err, user) => {
				if (err) return done(err, false);
				if (user) {
					return done(null, user);
				}
				return done(null, false);
			});
		})
	);
};
