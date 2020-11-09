/** Import libraries */
const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const status = require("http-status");
const jwt = require("jsonwebtoken");

/** App import */
const app = require("../app");

/** Schema import */
const Project = require("../models/project.model");
const User = require("../models/user.model");

chai.use(chaiHttp);

describe("Project", () => {
	before((done) => {
		Project.deleteMany({}, () => {
			User.deleteMany({}, () => {
				done();
			});
		});
	});

	describe("/GET Project", () => {
		let testUser = {};
		before((done) => {
			testUser = {
				email: "project@gmail.com",
				name: {
					first: "John",
					last: "Doe"
				},
				password: "123456"
			};
			User.create(testUser, (err, res) => {
				console.log(res);
				testUser = res;
			});
			const testProject = {
				title: "Test Project",
				key: "TP",
				description: "This is a test project",
				category: "Test"
			};
			Project.create(testProject, () => done());
		});

		it("Should return all projects", (done) => {
			const token = jwt.sign(
				{ userId: testUser._id },
				process.env.PASSPORT_SECRET,
				{
					expiresIn: process.env.JWT_EXPIRATION
				}
			);
			chai
				.request(app)
				.get("/project/read")
				.set("Authorization", `Bearer ${token}`)
				.end((err, res) => {
					assert.equal(res.status, status.OK);
					done();
				});
		});
	});
});
