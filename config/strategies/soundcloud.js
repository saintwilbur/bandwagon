'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    url = require('url'),
    SoundCloudStrategy = require('passport-soundcloud').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users');

module.exports = function(){
    //use soundcloud strategy
    passport.use(new SoundCloudStrategy({
            clientID: 'e4e0fdb81cf9639598a43f9071cd48c1',
            clientSecret: '73e1fe894b8b7981bc2f39fd94744a9b',
            callbackURL: 'http://localhost:3000/auth/soundcloud/callback',
            passReqToCallback: true

        },
        function(req, accessToken, refreshToken, profile, done) {
            console.log('SOUNDCLOUD BITCHES: ', profile._json);

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
                provider: 'soundcloud',
                providerIdentifierField: 'id',
                providerData: providerData
            };
            var requestData = {};
            //requestData.access_token = accessToken;
            requestData.options = {
                url: 'https://api.soundcloud.com/users/' + profile.id + '/favorites.json?client_id=e4e0fdb81cf9639598a43f9071cd48c1',
                method: 'GET',
                headers: {
                    'User-Agent': 'Super Agent/0.0.1',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            users.apiReq(requestData, function(tracks) {
                //console.log('TRACKS: ', tracks);

                tracks.forEach(function(entry) {
                    console.log(entry.user.username);
                    //users.findArtist()
                });

            });
            users.saveOAuthUserProfile(req, providerUserProfile, done);
            //console.log(users.me());
            //return done(null, profile);
            //var SC = require('integrations');
            //user.apiRequest('api.soundcloud.com', providerData.accessToken, )

            //var integrations = require('../../app/controllers/users')
            //users.apiRequest();
        }
    ));
};