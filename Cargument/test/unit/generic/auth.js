var expect = require('chai').expect;
var authMW = require('../../../middleware/generic/auth');

describe('auth middleware ', function () {

    describe('should call next when', function () {
        it('when user is in session', function (done) {
            var req = {
                session: {
                    userId: "userId-exists"
                }
            }

            authMW({
                userModel: null
            })(req, {}, function (err) {

                expect(err).to.eql(undefined);
                done();
            });
        });
    });

    describe('should redirect to login', function (done) {
        it('when user is not in session', function (done) {
            var req = {
                session: {
                    // userId not existing
                }
            }

            var res = {
                redirect: function (to) {
                    expect(to).to.eql('/login');
                    done();
                }
            };

            authMW({
                userModel: null
            })(req, res, function (err) {
                expect(err).to.eql(undefined);
                done();
            });
        });
    });
});