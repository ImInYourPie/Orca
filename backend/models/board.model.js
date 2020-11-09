/** Import libraries */
const mongoose = require("mongoose");

/** Import child schemas */
const ColumnModel = require("./column.model");
const IssueModel = require("./issue.model");

/** Constants */
const {
	COLUMN_COUNT,
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
		columns: {
			type: [ColumnModel.Schema],
			validate: {
				validator: (val) =>
					COLUMN_COUNT.MIN <= val.length || val.length <= COLUMN_COUNT.MAX
			}
		}
	},
	{
		timestamps: true
	}
);

const Board = mongoose.model("Board", BoardSchema);
module.exports = Board;
