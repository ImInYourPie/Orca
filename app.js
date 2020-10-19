/**
 * Libraries
 */
require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

/**
 * Passport imports
 */
const passport = require("passport");
const { applyPassportStrategy } = require("./config/passport");

/**
 * Utils
 */

/**
 * Routes declaration
 */
const userRouter = require("./routes/user");
const tokenRouter = require("./routes/token");

const app = express();

/**
 *  Node environment variables booleans
 */
const isProd = process.env.NODE_ENV === "production";
const isStaging = process.env.NODE_ENV === "staging";
const isDev = process.env.NODE_ENV === "dev";
const isTest = process.env.NODE_ENV === "test";

/**
 * Database connection
 */
mongoose.connect(process.env.TEST_DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

if (!isProd) mongoose.set("debug", true);

/**
 * Libraries usage
 */
applyPassportStrategy(passport);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes usage
 */
app.use("/user", userRouter);
app.use("/token", tokenRouter);

module.exports = app;
