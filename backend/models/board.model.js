/** Import libraries */
const mongoose = require("mongoose");

/** Import child schemas */
const CollumnModel = require("./collumn.model");
const IssueModel = require("./issue.model");

/** Constants */
const {
	COLLUMN_COUNT,
	MAX_BOARD_NAME_LENGTH
} = require("../constants/board.const");

const Schema = mongoose.Schema;

const BoardSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: MAX_BOARD_NAME_LENGTH
		},
		collumns: {
			type: [CollumnModel.Schema],
			validate: {
				validator: (val) =>
					COLLUMN_COUNT.MIN <= val.length || val.length <= COLLUMN_COUNT.MAX
			}
		}
	},
	{
		timestamps: true
	}
);

const Board = mongoose.model("Board", BoardSchema);
module.exports = Board;
