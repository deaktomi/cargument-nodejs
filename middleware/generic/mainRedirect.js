/**
 * This middleware has one purpose, when the user visits the / main page,
 * should be redirected to
 *    - /login when not signed in
 *    - /conversations when signed in
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        console.log("mainRedirect");
        if (typeof req.session.userId === 'undefined') {
            return res.redirect('/login');
        } else {
            return res.redirect('/conversations');
        }
    };

};