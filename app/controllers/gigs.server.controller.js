'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    //note the ./
    errorHandler = require('./errors'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    seatgeek = require('seatgeek'),
    Gig = mongoose.model('Gig');
/**
 * Create a Gig
 */
exports.create = function(req, res) {
    console.log('Gig create');
    // Init Variables
    var gig = new Gig(req.body);
    var message = null;

    gig.provider = 'local';

    // save the gig
    gig.save(function(err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
                //message: 'feet'
            });
        } else {
            //console.log('gig.save ', gig);
            /*
            req.login(gig, function(err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.jsonp(gig);
                }
            });
            */
            res.jsonp(gig);
        }
    });
};



exports.findGig = function(req, res) {
    console.log('FIND GIG: ');
    console.log(req.body);
    var gig = req.body;
    var user = req.user;

    //finds all gigs with the name and adds them to the gigs array of users
    Gig.find({gigName: gig.gigName, users: {$nin: [user]}}, function(err, gigs) {
        if (err) {
           res.send(err);
        }

        console.log(gigs);

        for (var i = 0; i < gigs.length; i++) {
            user.gigs.push(gigs[i]);
            user.save();
            console.log('ADD GIG TO USER ID ARRAY OF GIGS: ', user.gigs);
            gigs[i].users.push(user);
            gigs[i].save();
            console.log('ADD USER TO GIG ID ARRAY OF USERS: ', gigs[i].users);
        }
    });
    res.jsonp(gig);
};


/**
 * Get Gigs by UserID
 */
exports.get = function(req, res) {
    var user = req.user;
    console.log('GET GAGS BY USER ID: ', user);
    /*
    Gig.findOne({
     addedBy: id
     }).exec(function(err, gig) {
     if (err) return next(err);
     if (!gig) return next(new Error('Failed to load Gig by userID' + id));
     next();
     });

    */
     Gig.find({users: user, city: user.location}, function(err, gigs) {
     if (err) {
        res.send(err);
     }
	 console.log('user.location-------------------------------------- ', user.location);
	 console.log('list of gags yayyy-------------------------------------- ', gigs);
     res.jsonp(gigs);
     });

};

/**
 * Show the current Gig
 */
exports.read = function(req, res) {

};

/**
 * Update a Gig
 */
exports.update = function(req, res) {

};

/**
 * Delete an Gig
 */
exports.delete = function(req, res) {

};

/**
 * List of Gigs
 */
exports.list = function(req, res) {

};



/**
 * User middleware
 */
exports.gigByID = function(req, res, next, id) {
    Gig.findOne({
        _id: id
    }).exec(function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load Gig ' + id));
        //req.profile = user;
        next();
    });
};