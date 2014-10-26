'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
	_id: Number,
	type: String,
	eventName: String,
	tourName: String,
	date: Date,
	otherArtists: [Number], //artist_id
	location: {
		city: String,
		region: String,
		country: String
	},
	venue: {
		latitude: String,
		longitude: String,
		//venue_id: Number,
		venueName: String
	},
    updated: Date
});

mongoose.model('Event', EventSchema);