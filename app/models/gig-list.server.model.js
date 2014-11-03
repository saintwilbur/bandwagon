'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * GigList Schema
 */
var GigListSchema = new Schema({
	username: String,
	user_uid: Number,
	gigs: [{
		gig_uid: Number,
		status: {
			type: String,
			enum: ['show', 'hide'],
			default: 'show'
		},
		customNotifications: [Number],
		notifications: [Number],
		datetime: Date,
		venue: 
		{
			latitude: String,
			longitude: String,
			venueName: String
		},
		distance: [Number]
	}],
    updated: Date
});

mongoose.model('GigList', GigListSchema);