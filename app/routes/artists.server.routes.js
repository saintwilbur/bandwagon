'use strict';

/**
 * Module dependencies.
 */
//var passport = require('passport');

module.exports = function(app) {
    // Artist Routes
    var artists = require('../../app/controllers/artists');


    app.route('/art/add').post(artists.findArtist);

    app.route('/art/get').get(artists.get);
    //app.route('/delete').delete(artists.delete)

    //todo: Finish by binding the artist middleware
    //app.param('artistId', artists.artistByID);
};
