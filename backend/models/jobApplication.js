/** @format */

const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
	// There is an attibute _id auto generated stands for job_id

	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	title: {
		type: String,
		required: true
	},
	company: {
		type: String,
		required: true
	},
	location: {
		type: String
	},
	salary: {
		type: String
	},
	website: {
		type: String
	},
	status: {
		type: String,
		enum: ["Applied", "Interview", "Rejected", "Not Applied", "Offered"],
		required: true
	}
});

module.exports = JobApplication = mongoose.model(
	"jobapplication",
	jobApplicationSchema
);
