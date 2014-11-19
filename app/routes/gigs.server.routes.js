'use strict';

/**
 * Module dependencies.
 */
//var passport = require('passport');

module.exports = function(app) {
    // Gig Routes
    var gigs = require('../../app/controllers/gigs');


    app.route('/ga/add').post(gigs.findGig);

    app.route('/ga/get').get(gigs.get);
    //app.route('/delete').delete(gigs.delete)

    //todo: Finish by binding the gig middleware
    //app.param('gigId', gigs.gigByID);
};
