'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    qs = require('querystring'),
    https = require('https'),
    User = mongoose.model('User');

var soundcloud = {
    host_api : 'api.soundcloud.com',
    host_connect : 'https://soundcloud.com/connect'
    //access_token : users.
};

function _request(data, callback) {
    var options, params, req;
    params = qs.stringify(data.params);
    options = {
        hostname: data.uri,
        path: '' + data.path + '?' + params,
        method: data.method
    };
    if (data.method === 'POST') {
        options.path = data.path;
        options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': params.length
        };
    }
    req = https.request(options, function(response) {
        var body;
        body = '';
        response.on('data', function(chunk) {
            return body += chunk;
        });
        return response.on('end', function() {
            var err;
            try {
                data = JSON.parse(body);
                if (response.statusCode !== 200) {
                    return callback(data.errors, data);
                } else {
                    return callback(null, data);
                }
            } catch (_error) {
                err = _error;
                return callback(err);
            }
        });
    });
    req.on('error', function(err) {
        return callback(err);
    });
    if (data.method === 'POST') {
        req.write(params);
    }
    return req.end();
}

function _setupRequest(host_api, access_token, data, method, path, params, callback) {
    var requestData;
    if (callback === null) {
        callback = function() {};
    }
    if (access_token === null) {
        return callback({
            message: 'access_token is required.'
        }, null);
    }
    requestData = {
        method: method.toUpperCase(),
        uri: host_api
    };
    if (path[0] !== '/') {
        path = '/' + path;
    }
    requestData.path = path;
    if (typeof params === 'function') {
        callback = params;
        params = null;
    }
    params = params || {
        format: 'json'
    };
    params.oauth_token = access_token;
    requestData.params = params;
    //return _request.apply(this, [requestData, callback]);
    _request.apply(data, [requestData, callback]);
}



exports.apiRequest = function(host_api, access_token, data, method, path, params, callback) {
    return _setupRequest(host_api, access_token, data, method, path, params, callback);
};
