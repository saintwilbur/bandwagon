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
 * Artist Schema
 */
var ArtistSchema = new Schema({
    _uid: Number,
    artistName: {
        type: String,
        trim: true,
        default: 'Artist',
        validate: [validateLocalStrategyProperty, 'Please fill in valid artist name']
    },
    users: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    provider: {
        type: String
    },
    providerData: {},
    additionalProvidersData: {},
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Artist', ArtistSchema);