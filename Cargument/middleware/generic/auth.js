/**
 * If the user is not logged in, redirects to /login
 */
    module.exports = function (objectrepository) {

    return function (req, res, next) {
        console.log("auth");
        if (typeof req.session.userId === 'undefined') {
            return res.redirect('/login');
        } else {
            return next();
        }
    };

};