'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Heartbit = mongoose.model('Heartbit'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, heartbit;

/**
 * Heartbit routes tests
 */
describe('Heartbit CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Heartbit
		user.save(function() {
			heartbit = {
				name: 'Heartbit Name'
			};

			done();
		});
	});

	it('should be able to save Heartbit instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Heartbit
				agent.post('/heartbits')
					.send(heartbit)
					.expect(200)
					.end(function(heartbitSaveErr, heartbitSaveRes) {
						// Handle Heartbit save error
						if (heartbitSaveErr) done(heartbitSaveErr);

						// Get a list of Heartbits
						agent.get('/heartbits')
							.end(function(heartbitsGetErr, heartbitsGetRes) {
								// Handle Heartbit save error
								if (heartbitsGetErr) done(heartbitsGetErr);

								// Get Heartbits list
								var heartbits = heartbitsGetRes.body;

								// Set assertions
								(heartbits[0].user._id).should.equal(userId);
								(heartbits[0].name).should.match('Heartbit Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Heartbit instance if not logged in', function(done) {
		agent.post('/heartbits')
			.send(heartbit)
			.expect(401)
			.end(function(heartbitSaveErr, heartbitSaveRes) {
				// Call the assertion callback
				done(heartbitSaveErr);
			});
	});

	it('should not be able to save Heartbit instance if no name is provided', function(done) {
		// Invalidate name field
		heartbit.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Heartbit
				agent.post('/heartbits')
					.send(heartbit)
					.expect(400)
					.end(function(heartbitSaveErr, heartbitSaveRes) {
						// Set message assertion
						(heartbitSaveRes.body.message).should.match('Please fill Heartbit name');
						
						// Handle Heartbit save error
						done(heartbitSaveErr);
					});
			});
	});

	it('should be able to update Heartbit instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Heartbit
				agent.post('/heartbits')
					.send(heartbit)
					.expect(200)
					.end(function(heartbitSaveErr, heartbitSaveRes) {
						// Handle Heartbit save error
						if (heartbitSaveErr) done(heartbitSaveErr);

						// Update Heartbit name
						heartbit.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Heartbit
						agent.put('/heartbits/' + heartbitSaveRes.body._id)
							.send(heartbit)
							.expect(200)
							.end(function(heartbitUpdateErr, heartbitUpdateRes) {
								// Handle Heartbit update error
								if (heartbitUpdateErr) done(heartbitUpdateErr);

								// Set assertions
								(heartbitUpdateRes.body._id).should.equal(heartbitSaveRes.body._id);
								(heartbitUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Heartbits if not signed in', function(done) {
		// Create new Heartbit model instance
		var heartbitObj = new Heartbit(heartbit);

		// Save the Heartbit
		heartbitObj.save(function() {
			// Request Heartbits
			request(app).get('/heartbits')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Heartbit if not signed in', function(done) {
		// Create new Heartbit model instance
		var heartbitObj = new Heartbit(heartbit);

		// Save the Heartbit
		heartbitObj.save(function() {
			request(app).get('/heartbits/' + heartbitObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', heartbit.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Heartbit instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Heartbit
				agent.post('/heartbits')
					.send(heartbit)
					.expect(200)
					.end(function(heartbitSaveErr, heartbitSaveRes) {
						// Handle Heartbit save error
						if (heartbitSaveErr) done(heartbitSaveErr);

						// Delete existing Heartbit
						agent.delete('/heartbits/' + heartbitSaveRes.body._id)
							.send(heartbit)
							.expect(200)
							.end(function(heartbitDeleteErr, heartbitDeleteRes) {
								// Handle Heartbit error error
								if (heartbitDeleteErr) done(heartbitDeleteErr);

								// Set assertions
								(heartbitDeleteRes.body._id).should.equal(heartbitSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Heartbit instance if not signed in', function(done) {
		// Set Heartbit user 
		heartbit.user = user;

		// Create new Heartbit model instance
		var heartbitObj = new Heartbit(heartbit);

		// Save the Heartbit
		heartbitObj.save(function() {
			// Try deleting Heartbit
			request(app).delete('/heartbits/' + heartbitObj._id)
			.expect(401)
			.end(function(heartbitDeleteErr, heartbitDeleteRes) {
				// Set message assertion
				(heartbitDeleteRes.body.message).should.match('User is not logged in');

				// Handle Heartbit error error
				done(heartbitDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Heartbit.remove().exec();
		done();
	});
});