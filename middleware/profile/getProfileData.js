var requireOption = require('../common').requireOption;

/**
 * Gets the data of the profile
 */
module.exports = function (objectrepository) {
    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        console.log("getProfileData");
        userModel.findOne({
        }, function (err, results) {
            if (err) {
                return next(new Error('Error getting user info'));
            }

            res.tpl.user = results;
            return next();
        });
        return next();
    };

};