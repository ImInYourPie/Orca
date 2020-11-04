/** Import libraries */
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/** Import child schemas */

/** Constants */

const Schema = mongoose.Schema;

const LabelSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true
		},
		project: {
			type: Schema.ObjectId,
			ref: "Project",
			required: true
		}
	},
	{
		collection: "labels",
		timestamps: true
	}
);

UserSchema.plugin(uniqueValidator);

const Label = mongoose.model("Label", LabelSchema);
module.exports = Label;
