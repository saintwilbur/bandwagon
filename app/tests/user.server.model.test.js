'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * Globals
 */
var user, user2;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			areacode: '12345',
			distance: '1',
			provider: 'local'
		});
		user2 = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			areacode: '12345',
			distance: '1',
			provider: 'local'
		});

		done();
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			User.find({}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});

		it('should save new user without problems', function(done) {
			user.save(done);
		});

		it('should fail to save an existing user again', function(done) {
			user.save();
			return user2.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should show error on creating user without first name', function(done) {
			user.firstName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should show an error on creating user without last name', function(done) {
			user.lastName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should show error on creating user without email', function(done) {
			user.email = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('email should require @', function(done) {
			user.email = 'test';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('email should require .', function(done) {
			user.email = 'test@test';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should show error on creating user without username', function(done) {
			user.username = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should show error on creating user without password', function(done) {
			user.password = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('password should >1 character', function(done) {
			user.password = 'p';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('password should >2 character', function(done) {
			user.password = 'pa';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('password should >3 character', function(done) {
			user.password = 'pas';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('password should >4 character', function(done) {
			user.password = 'pass';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('password should >5 character', function(done) {
			user.password = 'passw';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('password should >6 character', function(done) {
			user.password = 'passwo';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should show error if no info is entered', function(done) {
			user.firstName = '',
			user.lastName = '',
			user.email = '',
			user.username = '',
			user.password = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should show error when areacode not 5-digit length', function(done) {
			user.areacode = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	after(function(done) {
		User.remove().exec();
		done();
	});
});
