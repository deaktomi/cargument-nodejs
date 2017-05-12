var requireOption = require('../common').requireOption;

/**
 * Updates the profile data
 */
module.exports = function (objectrepository) {
    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        console.log("updateProfile");
        if ((typeof req.body === 'undefined') || (typeof req.body.name === 'undefined')) {
            console.log("No param")
            return next();
        }
        console.log(req.body.name);
        if (req.body.name.length < 3) {
            res.error.push('The name should be at least 3 characters!');
            return next();
        }
        userModel.update({ _id: res.tpl.user._id }, { $set: { name: req.body.name }}, function (err) {
            if (err) {
                console.log(err.message);
                res.error.push("Problem with the db")
            }
            return next();
        });
    };

};