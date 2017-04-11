/**
 * Adds a message to the conversation
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        console.log("addMessage");
        return next();
    };

};