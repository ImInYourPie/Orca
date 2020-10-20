const express = require("express");
const router = express.Router();

/** Controller declaration */
const UsersController = require("../controllers/user");

/** Middleware */
const FormValidator = require("../middleware/validation/form.validator");
const schema = require("../middleware/validation/schemas/user.schema");
const passport = require("passport");

/* GET user info. */
router.get(
	"/me",
	passport.authenticate("jwt", { session: false }),
	UsersController.getMe
);

/** POST user registration */
router.post("/register", FormValidator(schema), UsersController.register);

module.exports = router;
