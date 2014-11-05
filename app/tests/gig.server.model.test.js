'use strict';

/**
 * Module dependencies.
*/

var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Gig = mongoose.model('Gig');

/**
 * Globals
 */

 var user, gig;

/**
 * Unit tests
 */
 
describe('Gig Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			gig = new Gig({
				// Add model fields
				// ...
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return gig.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Gig.remove().exec();
		User.remove().exec();

		done();
	});
});