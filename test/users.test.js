/** Import libraries */
const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const status = require("http-status");

/** App import */
const app = require("../app");

/** Schema import */
const User = require("../models/user.model");

chai.use(chaiHttp);

describe("Users", () => {
	before((done) => {
		User.deleteMany({}, async () => {
			done();
		});
	});

	describe("/GET User", () => {
		it("Should return 200 and object body", (done) => {
			chai
				.request(app)
				.get("/user")
				.end((err, res) => {
					assert.equal(res.status, status.OK);
					assert.isObject(res.body);
					assert.property(res.body, "success");
					assert.property(res.body, "message");
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
					assert.equal(res.body.success, false);
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
