/**
 * If the user is logged in, redirects to conversations
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        console.log("inverseAuth");
        return next();
    };

};