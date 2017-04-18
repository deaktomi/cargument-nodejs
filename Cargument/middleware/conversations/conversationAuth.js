/**
 * Decides if the user can see the given conversation
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        console.log("conversationAuth");
        return next();
    };

};