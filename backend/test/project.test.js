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
	// Drop db
	before((done) => {
		Promise.all([Project.deleteMany({}), User.deleteMany({})]).then(() => {
			done();
		});
	});

	describe("/GET Project", () => {
		// Test variables //
		let testUser = {
			email: "project@gmail.com",
			name: {
				first: "John",
				last: "Doe"
			},
			password: "123456"
		};
		let testProject = {
			title: "Test Project 1",
			key: "TP",
			description: "This is a test project",
			category: "Test"
		};
		let token = {};

		// Create new db entries for user and project
		before((done) => {
			Promise.all([User.create(testUser), Project.create(testProject)]).then(
				(values) => {
					testUser = values[0];
					testProject = values[1];
					token = jwt.sign({ userId: testUser._id }, process.env.PASSPORT_SECRET, {
						expiresIn: process.env.JWT_EXPIRATION
					});
					done();
				}
			);
		});

		it("Should return an array of all projects with 200", (done) => {
			chai
				.request(app)
				.get("/project/read")
				.set("Authorization", `Bearer ${token}`)
				.end((err, res) => {
					assert.equal(res.status, status.OK);
					assert.isObject(res.body);
					assert.property(res.body, "success");
					assert.property(res.body, "data");
					assert.isArray(res.body["data"]["projects"]);
					done();
				});
		});

		it("Should return an object project based on id with 200", (done) => {
			const { _id } = testProject;
			chai
				.request(app)
				.get(`/project/${_id}/read`)
				.set("Authorization", `Bearer ${token}`)
				.end((err, res) => {
					assert.equal(res.status, status.OK);
					assert.isObject(res.body);
					assert.property(res.body, "success");
					assert.property(res.body, "data");
					assert.property(res.body["data"], "projects");
					assert.isObject(res.body["data"]["projects"]);
					done();
				});
		});
	});

	describe("/POST Project", () => {
		let testUser = {
			email: "project2@gmail.com",
			name: {
				first: "John",
				last: "Doe"
			},
			password: "123456"
		};
		let token = {};
		// Create new db entries for user
		before((done) => {
			Promise.all([User.create(testUser)]).then((values) => {
				testUser = values[0];
				token = jwt.sign({ userId: testUser._id }, process.env.PASSPORT_SECRET, {
					expiresIn: process.env.JWT_EXPIRATION
				});
				done();
			});
		});

		it("Creates a new project and returns 201", (done) => {
			chai
				.request(app)
				.post("/project/create")
				.set("Authorization", `Bearer ${token}`)
				.send({
					title: "Test Project 2",
					key: "TP",
					description: "This is a test project",
					category: "Test"
				})
				.end((err, res) => {
					assert.equal(res.status, status.CREATED);
					assert.property(res.body, "success");
					assert.property(res.body, "message");
					done();
				});
		});

		it("Should fail to create a project based on empty body, returns 400", (done) => {
			chai
				.request(app)
				.post("/project/create")
				.set("Authorization", `Bearer ${token}`)
				.send({}) // empty body || no body
				.end((err, res) => {
					console.log(res);
					assert.equal(res.status, status.BAD_REQUEST);
					assert.property(res.body, "success");
					assert.property(res.body, "message");
					assert.equal(res.body["success"], false);
					done();
				});
		});
	});
});
