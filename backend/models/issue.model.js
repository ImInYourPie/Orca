/** Import libraries */
const mongoose = require("mongoose");

/** Constants */
const { MAX_SUMMARY_LENGTH, PRIORITY } = require("../constants/issue.const");

const Schema = mongoose.Schema;

const IssueSchema = new Schema(
	{
		summary: {
			type: String,
			required: true,
			maxlength: MAX_SUMMARY_LENGTH
		},
		priority: {
			type: String,
			enum: [
				PRIORITY.HIGHEST,
				PRIORITY.HIGH,
				PRIORITY.MEDIUM,
				PRIORITY.LOW,
				PRIORITY.LOWEST
			],
			required: true,
			default: PRIORITY.MEDIUM
		},
		due: {
			type: Date
		},
		estimation: { type: Number },
		assignee: { type: Schema.ObjectId, ref: "User" },
		labels: {
			type: [
				{
					labelId: {
						type: Schema.ObjectId,
						ref: "Label"
					}
				}
			]
		},
		comments: {
			type: [
				{
					user: {
						type: Schema.ObjectId,
						ref: "User",
						required: true
					},
					text: {
						type: String,
						required: true
					},
					createdAt: {
						type: Date,
						default: new Date()
					},
					editedAt: {
						type: Date
					}
				}
			]
		}
	},
	{
		timestamps: true
	}
);

const Issue = mongoose.model("Issue", IssueSchema);
module.exports = Issue;
