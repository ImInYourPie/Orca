const express = require("express");
const router = express.Router();

/**
 * Controller declaration
 */
const TokenController = require("../controllers/token");

/** Middleware */

/* POST token */
router.post("/", TokenController.post);

module.exports = router;
