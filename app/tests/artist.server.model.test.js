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
				artistName: 'Artist',
				tourInfo: [],
				users: []
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should begin with no artists', function(done) {
			Artist.find({}, function(err, artists) {
				artists.should.have.length(0);
				done();
			});
		});

		it('should save artist without problems', function(done) {
			return artist.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should find artist without problems', function(done) {
			artist.save(function(err) {
				var query = Artist.find({});
				query.exec(function(err, result) {
					result.should.have.length(1);
					done();
				});
			});
		});

		it('should retrieve artist by name', function(done) {
			artist.save(function(err) {
				var query = Artist.findOne({'artistName' : artist.artistName});
				query.exec(function(err, result) {
					(result.artistName === undefined).should.be.false;
					result.artistName.should.equal(artist.artistName);
					done();
				});
			});
		});

		it('should retrieve tour info for given artist', function(done) {
			artist.save(function(err) {
				var query = Artist.findOne({'artistName' : artist.artistName});
				query.exec(function(err, result) {
					(result.tourInfo === undefined).should.be.false;
					done();
				});
			});
		});

		it('should add user to artist array of users without problems', function(done) {
			artist.users.push(user);
			artist.save(function(err) {
				var query = Artist.findOne({'artistName' : artist.artistName});
				query.exec(function(err, result) {
					(result.users === undefined).should.be.false;
					result.users.should.have.length(1);
					done();
				});
			});
		});
	});

	afterEach(function(done) { 
		Artist.remove().exec();
		User.remove().exec();

		done();
	});
});