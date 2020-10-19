const express = require("express");
const router = express.Router();

/** Controller declaration */
const UsersController = require("../controllers/user");

/** Middleware */
const FormValidator = require("../middleware/validation/form.validator");
const schema = require("../middleware/validation/schemas/user.schema");

/* GET users listing. */
router.get("/", UsersController.index);

/** POST user registration */
router.post("/register", FormValidator(schema), UsersController.register);

module.exports = router;
