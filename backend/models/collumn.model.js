/** Import libraries */
const mongoose = require("mongoose");

/** Import child schemas */
const IssueModel = require("./issue.model");

/** Constants */
const { MAX_COLLUMN_NAME_LENGTH } = require("../constants/board.const");

const Schema = mongoose.Schema;

const CollumnSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: MAX_COLLUMN_NAME_LENGTH
		},
		maxIssueCount: {
			type: Number
		},
		isInitial: { type: Boolean },
		issues: {
			type: [IssueModel.Schema],
			validate: {
				validator: (val) => CollumnSchema.maxIssueCount >= val.length,
				message: "Max issues reached for collumn"
			}
		}
	},
	{
		timestamps: true
	}
);

const Collumn = mongoose.model("Collumn", CollumnSchema);
module.exports = Collumn;
