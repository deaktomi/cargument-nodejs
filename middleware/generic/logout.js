/**
 * Logs out the user
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        console.log("logout");
        req.session.userid = undefined;
        return next();
    };

};