'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * EventList Schema
 */
var EventListSchema = new Schema({
	username: String,
	user_id: Number,
	events: [{
		event_id: Number,
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

mongoose.model('EventList', EventListSchema);