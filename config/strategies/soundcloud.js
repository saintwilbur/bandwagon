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
    console.log('test\n');
    passport.use(new SoundCloudStrategy({
            clientID: 'e4e0fdb81cf9639598a43f9071cd48c1',
            clientSecret: '73e1fe894b8b7981bc2f39fd94744a9b',
            callbackURL: 'http://localhost:3000/auth/soundcloud/callback',
            passReqToCallback: true

        },
        function(req, accessToken, refreshToken, profile, done) {
            //users.findOrCreate({ soundcloudId: profile.id }, function (err, user) {
            //    return done(err, user);
            //});
            console.log('SOUNDCLOUD BITCHES: ', profile._json);

            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            // Create the user OAuth profile
            var providerUserProfile = {
                displayName: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: 'github',
                providerIdentifierField: 'id',
                providerData: providerData
            };

            //return done(null, profile, accessToken, refreshToken);
            users.saveOAuthUserProfile(req, providerUserProfile, done);
            //return done(null, profile);
            
        }
    ));
    console.log('gets called');
};