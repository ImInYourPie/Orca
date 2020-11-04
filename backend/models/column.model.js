/** Import libraries */
const mongoose = require("mongoose");

/** Import child schemas */
const IssueModel = require("./issue.model");

/** Constants */
const {
	MAX_COLUMN_ISSUES_MESSAGE,
	MAX_COLUMN_NAME_LENGTH
} = require("../constants/column.const");

const Schema = mongoose.Schema;

const ColumnSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: MAX_COLUMN_NAME_LENGTH
		},
		maxIssueCount: {
			type: Number,
			default: null
		},
		isInitial: { type: Boolean },
		issues: {
			type: [IssueModel.Schema],
			validate: {
				validator: (val) => {
					if (ColumnSchema.maxIssueCount !== null)
						return ColumnSchema.maxIssueCount >= val.length;
					return true;
				},
				message: MAX_COLUMN_ISSUES_MESSAGE
			}
		}
	},
	{
		timestamps: true
	}
);

const Column = mongoose.model("Column", ColumnSchema);
module.exports = Column;
