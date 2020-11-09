/** Import libraries */
const { assert, expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const status = require("http-status");
const jwt = require("jsonwebtoken");

/** App import */
const app = require("../app");

/** Schema import */
const User = require("../models/user.model");

/** String messages */
const messages = require("../constants/messages");

chai.use(chaiHttp);

describe("Users", () => {
	before((done) => {
		User.deleteMany({}, () => {
			done();
		});
	});

	describe("/GET User", async () => {
		let testUser = {};
		before((done) => {
			testUser = {
				email: "testmail@gmail.com",
				name: {
					first: "John",
					last: "Doe"
				},
				password: "123456"
			};
			User.create(testUser, (err, res) => {
				testUser = res;
				done();
			});
		});

		it("Should return 200 and user info", (done) => {
			const token = jwt.sign(
				{ userId: testUser._id },
				process.env.PASSPORT_SECRET,
				{
					expiresIn: process.env.JWT_EXPIRATION
				}
			);
			chai
				.request(app)
				.get("/user/me")
				.set("Authorization", `Bearer ${token}`)
				.end((err, res) => {
					assert.equal(res.status, status.OK);
					assert.isObject(res.body);
					assert.property(res.body, "success");
					assert.property(res.body, "user");
					assert.isNotEmpty(res.body.user);
					done();
				});
		});
	});

	describe("/POST User", () => {
		it("Should return invalid email with 400", (done) => {
			chai
				.request(app)
				.post("/user/register")
				.send({
					email: "notemail.com",
					name: {
						first: "Jane",
						last: "Doe"
					},
					password: "123456"
				})
				.end((err, res) => {
					assert.equal(res.status, status.BAD_REQUEST);
					assert.isObject(res.body);
					assert.property(res.body, "success");
					assert.isArray(res.body.message);
					assert.equal(res.body.success, false);
					expect(res.body.message).to.include.members([messages.INVALID_EMAIL]);
					done();
				});
		});

		it("Should return 400, missing required email and password fields", (done) => {
			chai
				.request(app)
				.post("/user/register")
				.end((err, res) => {
					assert.equal(res.status, status.BAD_REQUEST);
					assert.isObject(res.body);
					assert.isArray(res.body.message);
					assert.property(res.body, "success");
					assert.equal(res.body.success, false);
					expect(res.body.message).to.include.members([
						messages.EMPTY_EMAIL,
						messages.EMPTY_PASSWORD
					]);
					done();
				});
		});

		it("Should register a user and return 201", (done) => {
			chai
				.request(app)
				.post("/user/register")
				.send({
					email: "testmailpost@gmail.com",
					name: {
						first: "Jane",
						last: "Doe"
					},
					password: "123456"
				})
				.end((err, res) => {
					assert.equal(res.status, status.CREATED);
					assert.isObject(res.body);
					assert.property(res.body, "success");
					assert.property(res.body, "message");
					done();
				});
		});
	});
});
