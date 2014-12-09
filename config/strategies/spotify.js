'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    url = require('url'),
    SpotifyStrategy = require('passport-spotify').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users');

module.exports = function(){
    //use soundcloud strategy
    passport.use(new SpotifyStrategy({
            clientID: 'c98d620cd0c741848904b2746d822fc5',
            clientSecret: 'c1d8f51da9f94b1590ef29e6ff558c5b',
            callbackURL: 'http://localhost:3000/auth/spotify/callback',
            passReqToCallback: true

        },
        function(req, accessToken, refreshToken, profile, done) {
            console.log('SPOTIFY BITCHES: ', profile._json);

            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            // Create the user OAuth profile
            var providerUserProfile = {
                id: profile.id,
                displayName: profile.full_name,
                followings: profile.followings_count,
                //email: profile.emails[0].value,
                username: profile.username,
                provider: 'spotify',
                providerIdentifierField: 'id',
                providerData: providerData
            };

            var requestData = {};
            requestData.options = {
                //url: 'https://api.spotify.com/v1/me' + profile.id + '/tracks',
				url: 'https://api.spotify.com/v1/me/tracks',
                method: 'GET',
                headers: {
                    'User-Agent': 'Super Agent/0.0.1',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    json: true,
                    'Authorization': 'Bearer ' + accessToken
                }
            };
			
			
            //todo: scrub this, scrub.
            //requestData.params = {clientID: 'c98d620cd0c741848904b2746d822fc5'};
			
            users.saveOAuthUserProfile(req, providerUserProfile, done);
            /*users.apiReq(requestData, function(res){
				console.log('results==========================================================================:', res);
			});*/
            users.apiReq(requestData, function(tracks) {
                //console.log('TRACKS: ', tracks);

                tracks.items.forEach(function(entry) {
					entry.track.artists.forEach(function(artist) {
						console.log('Spotify Artists: ', artist.name);
						req.artistName = artist.name;
						var user = req.user;
						if (!user.artistNames) {
							user.artistNames = {};
						}
						if (user.artistNames.indexOf(artist.name) < 0) {
							user.artistNames.push(artist.name);
							user.markModified('artistNames');
							user.save(function(err) {
								console.log(err);
							});
						}
					});
					/* req.artistName = 
                    req.artistName = entry.user.username;
                    var user = req.user;
                    if (!user.artistNames) {
                        user.artistNames = {};
                    }
                    //console.log('ENTRY[]', user.artistNames[entry.user.username]);
                    if (user.artistNames.indexOf(entry.user.username) < 0) {
                        user.artistNames.push(entry.user.username);
                        user.markModified('artistNames');
                        user.save(function(err) {
                        console.log(err);
                    });
                    }*/

                    //users.findArtist()
                    //artists.addArtist({artist})
                });
			});

        }
    ));
};