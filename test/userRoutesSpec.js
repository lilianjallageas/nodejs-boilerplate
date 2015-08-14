// =============================================================================
// test/userRoutesSpec.js
// =============================================================================

// BASE SETUP
// =============================================================================
var should              = require('should');
var request             = require('superagent');
var mongoose            = require('mongoose');
var httpStatus          = require('http-status-codes');
var config              = require('../config');
var msg                 = require('../app/common/messages');
var userModel           = require('../app/models/user');
var userCtrl            = require("../app/controllers/userCtrl.js");


// TESTS DATA
// =============================================================================
var user_email          = "lja@toto.com";
var user_pwd            = "toto21";
var user_id             = null;
var user_fake_email     = "fake@toto.com";
var user_fake_pwd       = "fake21";
var user_email_fixt_1   = "toto@toto.com"; // See fixtures
var user_pwd_fixt_1     = "password_1"; // See fixtures
var user_email_fixt_2   = "titi@titi.com"; // See fixtures
var user_pwd_fixt_2     = "password_2"; // See fixtures
var user_email_fixt_3   = "tata@tata.com"; // See fixtures
var user_pwd_fixt_3     = "password_3"; // See fixtures


// TESTS
// =============================================================================

// userCtrl ------------------------------------------
describe("Testing '/users' routes", function() {


	// Before --------------------------------------------
	before(function(done) {
		// Connecting to the database
		mongoose.connect(config.mongodb.dburl);
		done();
	});


	// Test route : POST /users --------------------------
	// ---------------------------------------------------
	it('POST /users: should be able to add a user', function(done) {
		request
			.post(config.app.url.api+'/users')
			.send({"username":user_email,"password":user_pwd})
			.end(function(err, res) {
				if (err) { throw err; done(); }
				// Validations
				res.status.should.equal(httpStatus.OK);
				res.body.should.be.an.Object;
				res.body.email.should.be.equal(user_email);
				user_id = res.body._id;
				done();
		});
	});

	it('POST /users: should not be able to add the same user', function(done) {
		request
			.post(config.app.url.api+'/users')
			.send({"username":user_email,"password":user_pwd})
			.end(function(err, res) {
				if (err) { throw err; done(); }
				// Validations
				res.status.should.equal(httpStatus.FORBIDDEN);
				res.body.should.be.an.Object;
				res.body.error.should.be.equal(msg.user.ERROR.ALREADY_EXISTS);
				done();
		});
	});

	it('POST /users: should not be able to add a user if the "password" is missing in the request', function(done) {
		request
			.post(config.app.url.api+'/users')
			.send({"username":user_email})
			.end(function(err, res) {
				if (err) { throw err; done(); }
				// Validations
				res.status.should.equal(httpStatus.BAD_REQUEST);
				res.body.should.be.an.Object;
				res.body.error.should.be.equal(msg.req.ERROR.MISSING_PARAM);
				done();
		});
	});

	it('POST /users: should not be able to add a user if the "username" is missing in the request', function(done) {
		request
			.post(config.app.url.api+'/users')
			.send({"password":user_pwd})
			.end(function(err, res) {
				if (err) { throw err; done(); }
				// Validations
				res.status.should.equal(httpStatus.BAD_REQUEST);
				res.body.should.be.an.Object;
				res.body.error.should.be.equal(msg.req.ERROR.MISSING_PARAM);
				done();
		});
	});

	// Test route : GET /users/validate ------------------
	// ---------------------------------------------------
	it('GET /users/validate: should be able to find the user we just created', function(done) {
		request
			.get(config.app.url.api+'/users/validate?username='+user_email+'&password='+user_pwd)
			.end(function(err, res) {
				if (err) { throw err; done(); }
				// Validations
				res.status.should.equal(httpStatus.OK);
				res.body.should.be.an.Object;
				res.body.email.should.be.equal(user_email);
				done();
		});
	});

	it('GET /users/validate: should return an error if user does not exist', function(done) {
		request
			.get(config.app.url.api+'/users/validate?username='+user_fake_email+'&password='+user_fake_pwd)
			.end(function(err, res) {
				if (err) { throw err; done(); }
				// Validations
				res.status.should.equal(httpStatus.NOT_FOUND);
				res.body.should.be.an.Object;
				res.body.error.should.be.equal(msg.user.ERROR.NOT_FOUND);
				done();
		});
	});

	it('GET /users/validate: should return an error if the username is missing in the request', function(done) {
		request
			.get(config.app.url.api+'/users/validate?password='+user_pwd)
			.end(function(err, res) {
				if (err) { throw err; done(); }
				// Validations
				res.status.should.equal(httpStatus.BAD_REQUEST);
				res.body.should.be.an.Object;
				res.body.error.should.be.equal(msg.req.ERROR.MISSING_PARAM);
				done();
		});
	});

	it('GET /users/validate: should return an error if the username is missing in the request', function(done) {
		request
			.get(config.app.url.api+'/users/validate?username='+user_email)
			.end(function(err, res) {
				if (err) { throw err; done(); }
				// Validations
				res.status.should.equal(httpStatus.BAD_REQUEST);
				res.body.should.be.an.Object;
				res.body.error.should.be.equal(msg.req.ERROR.MISSING_PARAM);
				done();
		});
	});


	// Test route : GET /users/:id/profile ---------------
	// ---------------------------------------------------
	it('GET /users/:id/profile: should be able to get the profile of a user, if the requester is an ADMIN', function(done) {
		request
			.get(config.app.url.api+'/users/54331aab6a1f1d538eaaacde/profile')
			.auth(user_email_fixt_1, user_pwd_fixt_1)
			.end(function(err, res) {
				if (err) { throw err; done(); }
				// Validations
				res.status.should.equal(httpStatus.OK);
				res.body.should.be.an.Object;
				res.body.email.should.be.equal('tutu@tutu.com');
				done();
		});
	});

	it('GET /users/:id/profile: should not be able to get the profile of a user, if the requester is not an ADMIN', function(done) {
		request
			.get(config.app.url.api+'/users/54331aab6a1f1d538eaaacde/profile')
			.auth(user_email_fixt_3, user_pwd_fixt_3)
			.end(function(err, res) {
				if (err) { throw err; done(); }
				// Validations
				res.status.should.equal(httpStatus.UNAUTHORIZED);
				done();
		});
	});
	it('GET /users/:id/profile: should not be able to get the profile of a user, if the requester is not authenticated', function(done) {
		request
			.get(config.app.url.api+'/users/54331aab6a1f1d538eaaacde/profile')
			.end(function(err, res) {
				if (err) { throw err; done(); }
				// Validations
				res.status.should.equal(httpStatus.UNAUTHORIZED);
				done();
		});
	});

	// After ---------------------------------------------
	after(function() {
		// Deleting the test data
		userModel.find({'email':user_email}).remove().exec();
	});

});