/**
 * Logs out the user
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        console.log("logout");
        return next();
    };

};