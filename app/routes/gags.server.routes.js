'use strict';

/**
 * Module dependencies.
 */
//var passport = require('passport');

module.exports = function(app) {
    // Gag Routes
    var gags = require('../../app/controllers/gags');


    app.route('/ga/add').post(gags.findGag);

    app.route('/ga/get').get(gags.get);
    //app.route('/delete').delete(gags.delete)

    //todo: Finish by binding the gag middleware
    //app.param('gagId', gags.gagByID);
};
