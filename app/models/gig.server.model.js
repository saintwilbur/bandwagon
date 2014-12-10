'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * Gig Schema
 */
var GigSchema = new Schema({
	artist: {
        type: mongoose.Schema.ObjectId,
        ref: 'Artist'
	},
	artistName: {
		type: String,
		trim: true
	},
    name: {
        type: String,
        trim: true,
        default: 'Gig',
        validate: [validateLocalStrategyProperty, 'Please fill in valid artist name']
    },
    users: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
        /*artist_uid: Number,
        status: {
            type: String,
            enum: ['tracking', 'watching']
        }*/
    }],
	gigs: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Gig'
	}],
    provider: {
        type: String
    },
    providerData: {},
    additionalProvidersData: {},
    updated: {
        type: Date
    },
	date: {
        type: Date,
        default: Date.now
    },
	city: {
		type: String,
		trim: true
	},
	venue: {
		city: String,
		region: String,
		country: String,
		name: String
	},
	location: {
		latitude: String,
		longitude: String
	},
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Gig', GigSchema);