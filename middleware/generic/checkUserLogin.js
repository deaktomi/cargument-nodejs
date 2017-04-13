var requireOption = require('../common').requireOption;

/**
 * Checks if the login credentials are okay
 *  - if yes: save user to session redirects to /conversations
 *  - if no: redirect to /login
 */
module.exports = function (objectrepository) {
    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        console.log("checkUserLogin");

        if ((typeof req.body === 'undefined') || (typeof req.body.regNumber === 'undefined')) {
            console.log("Didn't fill the login form");
            return res.redirect('/login');
        }

        // Find the user by regNumber or create it
        userModel.findOne({
            regNumber: req.body.regNumber
        }, function (err, result) {
            if ((err) || (!result)) {
                console.log("New user creating")
                var user = new userModel();
                user.regNumber = req.body.regNumber;
                user.save(function (err){
                    if (err) {
                        console.log(err.message);
                    }
                    req.session.userId = user._id;
                    //redirect to / so the app can decide where to go next
                    return res.redirect('/conversations');
                });
            }
            else {
                //login is ok, save id to session
                req.session.userId = result._id;
                //redirect to / so the app can decide where to go next
                return res.redirect('/conversations');
            }
        });
    };

};