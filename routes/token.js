const express = require("express");
const router = express.Router();

/**
 * Controller declaration
 */
const TokenController = require("../controllers/token");

/** Middleware */
const { validate } = require("../middleware/login.validator");

/* POST token */
router.post("/", validate, TokenController.post);

module.exports = router;
