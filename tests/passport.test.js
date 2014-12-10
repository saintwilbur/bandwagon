/**
 * Author: Michael Weibel <michael.weibel@gmail.com>
 * License: MIT
 */
var request = require('supertest'),
    superagent = require('superagent'),
    path = require('path'),
    app = require(path.join(process.cwd(), 'index.js'))(),
    passportMock = require(path.join(process.cwd(), 'src', 'shared', 'test', 'passport-mock'));

describe('GET /protected-resource authorized', function() {
    var agent = superagent.agent();

    beforeEach(function(done) {
        passportMock(app, {
            passAuthentication: true,
            userId: 1
        });
        request(app)
            .get('/mock/login')
            .end(function(err, result) {
                if (!err) {
                    agent.saveCookies(result.res);
                    done();
                } else {
                    done(err);
                }
            });
    });

    it('should allow access to /protected-resource', function(done) {
        var req = request(app).get('/protected-resource');
        agent.attachCookies(req);
        req.expect(200, done);
    });
});