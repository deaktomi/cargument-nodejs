var expect = require('chai').expect;
var updateProfileMW = require('../../../middleware/profile/updateProfile');

describe('updateProfile middleware ', function () {

    describe('should call next when', function () {
        it('no post parameter is given', function (done) {
            var nehivd = false;

            var fakeUserModel = {
                update: function (some, other, cb) {
                    nehivd = true;
                    cb();
                }
            };

            updateProfileMW({
                userModel: fakeUserModel
            })({}, {}, function (err) {
                expect(nehivd).to.be.eql(false);
                expect(err).to.eql(undefined);
                done();
            });
        });

        it('no name parameter is given', function (done) {
            var req = {
                body: {
                    // empty
                }
            };
            var nehivd = false;

            var fakeUserModel = {
                update: function (some, other, cb) {
                    nehivd = true;
                    cb();
                }
            };

            updateProfileMW({
                userModel: fakeUserModel
            })(req, {}, function (err) {
                expect(nehivd).to.be.eql(false);
                expect(err).to.eql(undefined);
                done();
            });
        });
    });

    it('return error when name is less then 3 characters', function (done) {
        var req = {
            body: {
                name: '2k'
            }
        };

        var res = {
            error : []
        };

        var nehivd = false;

        var fakeUserModel = function () {
        };

        fakeUserModel.update = function (some, other, cb) {
            nehivd = true;
            cb();
        };

        updateProfileMW({
            userModel: fakeUserModel
        })(req, res, function (err) {
            expect(res.error.length).to.be.above(0);
            expect(nehivd).to.be.eql(false);
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('should update profile and call next if everything is ok', function (done) {
        var req = {
            body: {
                name: 'Sándor'
            }
        };

        var res = {
            tpl: {
                user: {
                    _id: 1
                }
            }
        };

        var fakeUserModel = function () {
        };

        fakeUserModel.update = function (some, other, cb) {
            return cb(undefined, null);
        };

        updateProfileMW({
            userModel: fakeUserModel
        })(req, res, function (err) {
            expect(err).to.eql(undefined);
            done();
        });
    });
});