var requireOption = require('../common').requireOption;

/**
 * Updates the profile data
 */
module.exports = function (objectrepository) {
    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        console.log("updateProfile");
        console.log(req.body.name);
        userModel.update({ _id: res.tpl.user._id }, { $set: { name: req.body.name }}, function (err) {
            if (err) {
                console.log(err.message);
            }
            return next();
        });
    };

};