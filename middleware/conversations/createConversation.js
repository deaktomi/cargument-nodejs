/**
 * Creates a new conversation with the first message with the given user
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        console.log("createConversation");
        return res.redirect('/conversations/details/1');
    };

};