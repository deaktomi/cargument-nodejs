/**
 * Delete a conversation
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        console.log("deleteConversation");
        return next();
    };

};