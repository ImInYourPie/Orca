/** Import libraries */
const mongoose = require("mongoose");

/** Import child schemas */

/** Constants */
const { EVENT_TYPE } = require("../constants/notification.const");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		url: {
			type: String,
			required: true
		},
		eventType: {
			type: String,
			enum: [
				EVENT_TYPE.UPDATE,
				EVENT_TYPE.DELETE,
				EVENT_TYPE.TRANSITION,
				EVENT_TYPE.ASSIGN,
				EVENT_TYPE.COMMENT,
				EVENT_TYPE.CREATED
			],
			required: true
		},
		read: {
			type: Boolean,
			default: false
		},
		receivers: {
			type: [Schema.ObjectId],
			ref: "User"
		},
		metadata: {
			type: Schema.Types.Mixed
		},
		fromStatus: {
			type: String
		},
		toStatus: {
			type: String
		}
	},
	{
		collection: "notifications",
		timestamps: true
	}
);

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
