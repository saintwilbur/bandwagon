'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Gig Schema
 */
var GigSchema = new Schema({
	_uid: Number,
	type: String,
	gigName: String,
	tourName: String,
	date: Date,
	otherArtists: [Number], //artist_uid
	location: {
		city: String,
		region: String,
		country: String
	},
	venue: {
		latitude: String,
		longitude: String,
		venueName: String
	},
    updated: Date
});

mongoose.model('Gig', GigSchema);