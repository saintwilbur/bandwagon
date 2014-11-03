'use strict';

/**
 * Module dependencies.
 */
 
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GigList = mongoose.model('GigList');

/**
 * Globals
 */
var user, gigList;

/**
 * Unit tests
 */
 
describe('Gig list Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			gigList = new GigList({
				// Add model fields
				// ...
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return gigList.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		GigList.remove().exec();
		User.remove().exec();

		done();
	});
});