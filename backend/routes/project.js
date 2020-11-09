const express = require("express");
const router = express.Router();

/**
 * Controller declaration
 */
const ProjectsController = require("../controllers/project");

/** Middleware */
const passport = require("passport");
const FormValidator = require("../middleware/validation/form.validator");

/* GET */
// All projects
router.get(
	"/read",
	passport.authenticate("jwt", { session: false }),
	ProjectsController.get
);

// Single project based on id
router.get(
	"/:id/read",
	passport.authenticate("jwt", { session: false }),
	ProjectsController.get
);

/* POST */
router.post(
	"/create",
	passport.authenticate("jwt", { session: false }),
	ProjectsController.post
);

module.exports = router;
