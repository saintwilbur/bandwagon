'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Notification Schema
 */
var NotificationSchema = new Schema({
	_id: Number,
	notificationTime: Date,
	user_id: Number,
	eventList_id: Number,
	event_id: Number,
	artist_id: Number,
	distanceFromUserLocation: Number,
    updated: Date
});

mongoose.model('Notification', NotificationSchema);