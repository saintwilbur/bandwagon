'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    //note the ./
    errorHandler = require('./errors'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    Gag = mongoose.model('Gag');
/**
 * Create a Gag
 */
exports.create = function(req, res) {
    console.log('Gag create');
    // Init Variables
    var gag = new Gag(req.body);
    var message = null;

    gag.provider = 'local';

    // save the gag
    gag.save(function(err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
                //message: 'feet'
            });
        } else {
            //console.log('gag.save ', gag);
            /*
            req.login(gag, function(err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.jsonp(gag);
                }
            });
            */
            res.jsonp(gag);
        }
    });
};

exports.findGag = function(req, res) {
    console.log('FIND GAG: ');
    console.log(req.body);
    var gag = req.body;
    var user = req.user;

    //finds all gags with the name and adds them to the gags array of users
    Gag.find({gagName: gag.gagName, users: {$nin: [user]}}, function(err, gags) {
        if (err) {
           res.send(err);
        }

        console.log(gags);

        for (var i = 0; i < gags.length; i++) {
            user.gags.push(gags[i]);
            user.save();
            console.log('ADD GAG TO USER ID ARRAY OF GAGS: ', user.gags);
            gags[i].users.push(user);
            gags[i].save();
            console.log('ADD USER TO GAG ID ARRAY OF USERS: ', gags[i].users);
        }
    });
    res.jsonp(gag);
};

/**
 * Get Gags by UserID
 */
exports.get = function(req, res) {
    var user = req.user;
    console.log('GET GAGS BY USER ID: ', user);
    /*
    Gag.findOne({
     addedBy: id
     }).exec(function(err, gag) {
     if (err) return next(err);
     if (!gag) return next(new Error('Failed to load Gag by userID' + id));
     next();
     });

    */
     Gag.find({users: user}, function(err, gags) {
     if (err) {
        res.send(err);
     }
     res.jsonp(gags);
     });

};

/**
 * Show the current Gag
 */
exports.read = function(req, res) {

};

/**
 * Update a Gag
 */
exports.update = function(req, res) {

};

/**
 * Delete an Gag
 */
exports.delete = function(req, res) {

};

/**
 * List of Gags
 */
exports.list = function(req, res) {

};



/**
 * User middleware
 */
exports.gagByID = function(req, res, next, id) {
    Gag.findOne({
        _id: id
    }).exec(function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load Gag ' + id));
        //req.profile = user;
        next();
    });
};