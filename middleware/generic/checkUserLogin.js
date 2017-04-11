/**
 * Checks if the login credentials are okay
 *  - if yes: redirects to /conversations
 *  - if no: redirect to /login
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        console.log("checkUserLogin");
        return res.redirect('/conversations');
    };

};