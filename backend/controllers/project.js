/* Utilities declaration */
const status = require("http-status");
const { Types } = require("mongoose");
const messages = require("../constants/messages");

// Models
const Project = require("../models/project.model");

/**
 * Get controller for read route
 * @param {*} req .params => String id ?
 * @param {*} res returns 200 || 404 || 500
 */
exports.get = async (req, res) => {
	try {
		const { id } = req.params;
		let data = {};
		if (id) {
			data = await Project.findById(id);
		} else {
			data = await Project.find();
		}
		if (!data) {
			return res
				.status(status.NOT_FOUND)
				.send({ success: false, message: messages.NO_PROJECTS_FOUND });
		}
		return res
			.status(status.OK)
			.send({ success: true, data: { projects: data } });
	} catch (error) {
		return res
			.status(status.INTERNAL_SERVER_ERROR)
			.send({ success: false, message: status["500_MESSAGE"] });
	}
};

/**
 * Post controller for create a project route
 * @param {*} req .body => project form
 * @param {*} res returns 201 || 400 || 500
 */
exports.post = async (req, res) => {
	try {
		const { body } = req;
		if (!body) {
			return res
				.status(status.BAD_REQUEST)
				.send({ success: false, message: messages.INVALID_PROJECT_BODY });
		}
		const newProject = new Project(body);
		newProject.save();
		return res
			.status(status.CREATED)
			.send({ success: true, message: messages.PROJECT_CREATED });
	} catch (error) {
		return res
			.status(status.INTERNAL_SERVER_ERROR)
			.send({ success: false, message: status["500_MESSAGE"] });
	}
};

exports.put = async (req, res) => {
	try {
		const { body } = req;
		const { id } = req.params;

		const isValidId = Types.ObjectId.isValid(id);

		if (!isValidId)
			return res
				.status(status.BAD_REQUEST)
				.send({ success: false, message: messages.BAD_ID });

		const project = await Project.findByIdAndUpdate(id, body, {
			useFindAndModify: true
		});

		if (!project)
			return res
				.status(status.NOT_FOUND)
				.send({ success: false, message: messages.NO_PROJECT_WITH_ID_FOUND });

		return res
			.status(status.OK)
			.send({ success: true, message: messages.PROJECT_UPDATED });
	} catch (error) {
		return res
			.status(status.INTERNAL_SERVER_ERROR)
			.send({ success: false, message: status["500_MESSAGE"] });
	}
};
