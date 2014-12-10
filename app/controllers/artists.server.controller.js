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
    SongKick = require('node-songkick'),
    Artist = mongoose.model('Artist');
/**
 * Create a Artist
 */
exports.create = function(req, res) {
    console.log('Artist create');
    // Init Variables
    var artist = new Artist(req.artistName);
    var message = null;

    artist.provider = 'local';

    // save the artist
    artist.save(function(err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        //else {
            //console.log('artist.save ', artist);
            /*
            req.login(artist, function(err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.jsonp(artist);
                }
            });
            */
            //res.jsonp(artist);
        //}
    });
};

exports.addArtist = function(req, res) {
    var artist = req.artistName;
    Artist.find({artistName: artist}, function(err, result) {
        //artist exists!
        if (result.length) {
            res('Artist exists', null);
        } else {
            Artist.save(function(err) {
                res(err, artist);
            });
        }
    });
};

//this is incomplete....
exports.getUserArtist = function(req, res) {
    var user = req.user;
};

//this is horribly named
exports.findArtist = function(req, res) {
    console.log('FIND ARTIST: ');
    console.log(req.body);
    var artist = req.body;
    var user = req.user;

    //finds all artists with the name and adds them to the artists array of users
    Artist.find({artistName: artist.artistName, users: {$nin: [user]}}, function(err, artists) {
        if (err) {
           res.send(err);
        }

        console.log(artists);

        for (var i = 0; i < artists.length; i++) {
            user.artists.push(artists[i]);
            user.save();
            console.log('ADD ARTIST TO USER ID ARRAY OF ARTISTS: ', user.artists);
            artists[i].users.push(user);
            artists[i].save();
            console.log('ADD USER TO ARTIST ID ARRAY OF USERS: ', artists[i].users);
        }
    });
    res.jsonp(artist);
};

/**
 * Get Artists by User
 */
exports.get = function(req, res) {
    var user = req.user;
    console.log('GET ARTISTS BY USER ID: ', user);
    /*
    Artist.findOne({
     addedBy: id
     }).exec(function(err, artist) {
     if (err) return next(err);
     if (!artist) return next(new Error('Failed to load Artist by userID' + id));
     next();
     });


     Artist.find({users: user}, function(err, artists) {
     if (err) {
        res.send(err);
     }
     */
    console.log('artists: ', user.artistNames);
    res.jsonp(user.artistNames);
     //});

};

/**
 * Show the current Artist
 */
exports.read = function(req, res) {

};

/**
 * Update a Artist
 */
exports.update = function(req, res) {

};

/**
 * Delete an Artist
 */
exports.delete = function(req, res) {

};

/**
 * List of Artists
 */
exports.list = function(req, res) {

};

exports.getArtistSeatGeek = function(req, res) {
    var artistName = req;
    //seatgeek.performers(function(err, performers) {
    //    if (err) return console.log(err);
    //    console.log(performers);
    //});
    //badbad: plaintext api key
    var sk = new SongKick('wzqh4iWAlzjnQovS');
    console.log('artistname:', req);

    sk.artist.search(artistName, {page: 1, per_page: 25}, function(r) {
        console.log('R-----------'+artistName, r.resultsPage.results.artist[0]);
        r.resultsPage.results.artist.forEach()
    });
    /*
    sk.artist.all({page: 1}, function(r) {console.log(r);});
    */

};

/**
 * User middleware
 */
exports.artistByID = function(req, res, next, id) {
    Artist.findOne({
        _id: id
    }).exec(function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load Artist ' + id));
        //req.profile = user;
        next();
    });
};