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
    console.log('LETS MAKE A REQUEST');
    var options, params, req;
    params = qs.stringify(data.params);
    options = {
        hostname: data.uri,
        path: '' + data.path + '?' + params,
        method: data.method
    };
    console.log('SHALL WE?');
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
                console.log('data: ', data);
                if (response.statusCode !== 200) {
                    console.log('statusCode !== 200');
                    return callback(data.errors, data);
                } else {
                    console.log('statusCode == 200');
                    return callback(null, data);
                }
            } catch (_error) {
                err = _error;
                console.log('_ERR!');
                return callback(err);
            }
        });
    });
    req.on('error', function(err) {
        console.log('ERR!');
        return callback(err);
    });
    if (data.method === 'POST') {
        req.write(params);
    }
    console.log('Dafuq, req.end()');
    return req.end();
}

/*
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



/*
exports.apiRequest = function(host_api, access_token, data, method, path, params, callback) {
    return _setupRequest(host_api, access_token, data, method, path, params, callback);
};
*/
function _setupRequest(data, callback) {
    console.log('_setupRequest');
    var requestData;
    if (callback === null) {
        callback = function () {
        };
    }
    if (data.access_token === null) {
        return callback({
            message: 'access_token is required.'
        }, null);
    }

    requestData = {
        method: data.method.toUpperCase(),
        uri: data.host_api
    };
    if (data.path[0] !== '/') {
        data.path = '/' + data.path;
    }

    requestData.path = data.path;
    if (typeof data.params === 'function') {
        //this is just not good.
        callback = data.params;
        data.params = null;
    }
    console.log('_setupRequest!', requestData);
    requestData.params = data.params || {
        format: 'json'
    };
    //data.params.oauth_token = data.access_token;
    requestData.params = data.params;
    //requestData.params.oauth_token = data.access_token;
    console.log('_setupRequest complete!', requestData);
    _request(requestData, callback);

}


exports.apiRequest = function(data, callback) {
    return _setupRequest(data, callback);
};


