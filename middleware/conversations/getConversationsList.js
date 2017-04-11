var requireOption = require('../common').requireOption;

/**
 * Gets a list of all the conversations that the user have permission to see.
 */
module.exports = function (objectrepository) {
    var conversationModel = requireOption(objectrepository, 'conversationsModel');

    return function (req, res, next) {
        console.log("getConversationsList");
        conversationModel.find({

        }, function (err, results) {
            if (err) {
                return next(new Error('Error getting conversations'));
            }

            res.tpl.conversations = results;
            return next();
        });
    };

};