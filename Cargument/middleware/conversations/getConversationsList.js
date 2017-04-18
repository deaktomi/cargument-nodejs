var requireOption = require('../common').requireOption;

/**
 * Gets a list of all the conversations that the user have permission to see.
 */
module.exports = function (objectrepository) {
    var conversationModel = requireOption(objectrepository, 'conversationsModel');

    return function (req, res, next) {
        console.log("getConversationsList");
        conversationModel.find({
            $or: [ {_user1: req.session.userId}, {_user2:req.session.userId}]
        }).populate('_user1 _user2')
            .exec(function (err, results) {
            if (err) {
                console.log(err.message);
                return next(new Error('Error getting conversations'));
            }

            console.log("Conversations set on tpl");
            res.tpl.conversations = results;
            return next();
        });
    };

};