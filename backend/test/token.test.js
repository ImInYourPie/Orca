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

describe("Token", () => {
	before((done) => {
		User.deleteMany({}, async () => {
			done();
		});
	});

	/***** POST *****/
	describe("/POST Token", () => {
		before((done) => {
			const testUser = {
				email: "testmail@gmail.com",
				name: {
					first: "John",
					last: "Doe"
				},
				password: "123456"
			};
			User.create(testUser, async () => done());
		});

		it("Should login user and return 200 with token", (done) => {
			chai
				.request(app)
				.post("/token")
				.send({ email: "testmail@gmail.com", password: "123456" })
				.end((err, res) => {
					assert.equal(res.status, status.OK);
					assert.isObject(res.body);
					assert.property(res.body, "success");
					assert.property(res.body, "token");
					assert.isString(res.body.token);
					done();
				});
		});
	});
});
