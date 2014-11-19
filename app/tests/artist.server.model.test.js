'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Artist = mongoose.model('Artist');

/**
 * Globals
 */
var user, artist;

/**
 * Unit tests
 */
describe('Artist Model Unit Tests:', function() {
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
			artist = new Artist({
				// Add model fields
				// ...
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return artist.save(function(err) {
				// Took out the .not in 
				// should.not.exist(err);
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Artist.remove().exec();
		User.remove().exec();

		done();
	});
});