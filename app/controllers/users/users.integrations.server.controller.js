'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

exports.getSoundCloudOAuthToken = function(req, res) {
    var SoundCloudAPI = require('soundcloud-node');

    // instantiate the client
    var client = new SoundCloudAPI(client_id, client_secret, redirect_uri);

    // Connect User
    var oauthInit = function(req, res) {
        var url = client.getConnectUrl();

        res.writeHead(301, 'Location: '+ url);
        res.end();
    };

    // Get OAuth Token
    // callback function from the connect url
    var oauthHandleToken = function(req, res) {
        var query = req.query;

        client.getToken(query.code, function(err, tokens) {
            if (err)
                callback(err);
            else {
                callback(null, tokens);
            }
        });
    };

    //  By default upon authentication, the access_token is saved, but you can add it like
    client.setToken(access_token);
};