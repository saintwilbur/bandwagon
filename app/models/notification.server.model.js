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
	_uid: Number,
	notificationTime: Date,
	user_uid: Number,
	gigList_uid: Number,
	gig_uiid: Number,
	artist_uid: Number,
	distanceFromUserLocation: Number,
    updated: Date
});

mongoose.model('Notification', NotificationSchema);