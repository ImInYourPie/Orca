/** Import libraries */
const mongoose = require("mongoose");

/** Import child schemas */
const BoardModel = require("./board.model");

/** Constants */
const {
	MAX_DESCRIPTION_LENGTH,
	USER_ROLES
} = require("../constants/project.const");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			maxlength: MAX_DESCRIPTION_LENGTH
		},
		key: {
			type: String,
			required: true
		},
		lead: {
			type: Schema.ObjectId,
			ref: "User"
		},
		members: {
			type: [
				{
					user: {
						type: Schema.ObjectId,
						ref: "User",
						required: true
					},
					role: {
						type: String,
						enum: [USER_ROLES.ADMIN, USER_ROLES.EDITOR, USER_ROLES.VISITOR],
						required: true,
						default: USER_ROLES.VISITOR
					}
				}
			]
		},
		category: {
			type: String
		},
		start: {
			type: Date,
			default: new Date(),
			required: true
		},
		end: {
			type: Date
		},
		board: {
			type: [BoardModel.Schema]
		},
		repository: {
			type: String
		}
	},
	{
		collection: "projects",
		timestamps: true
	}
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
