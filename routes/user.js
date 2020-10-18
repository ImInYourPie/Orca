const express = require("express");
const router = express.Router();

/** Controller declaration */
const UsersController = require("../controllers/user");

/** Middleware */
const { validate } = require("../middleware/registration.validator");

/* GET users listing. */
router.get("/", UsersController.index);

/** POST user registration */
router.post("/register", validate, UsersController.register);

module.exports = router;
