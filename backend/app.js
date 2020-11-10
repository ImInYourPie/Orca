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
const projectRouter = require("./routes/project");

const app = express();

/**
 *  Node environment variables booleans
 */
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "dev";
const isStaging = process.env.NODE_ENV === "staging";
const isTest = process.env.NODE_ENV === "test";

/**
 * Database connection
 */
console.log(process.env.NODE_ENV);
const connectionString = isDev ? process.env.DB_URI : process.env.TEST_DB_URI;

console.log(connectionString);

mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

if (!isProd && !isTest) mongoose.set("debug", true);

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
app.use("/project", projectRouter);

module.exports = app;
