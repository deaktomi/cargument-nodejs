var requireOption = require('../common').requireOption;

/**
 * Delete a conversation
 */
module.exports = function (objectrepository) {
    var conversationModel = requireOption(objectrepository, 'conversationsModel');

    return function (req, res, next) {
        console.log("deleteConversation");
        conversationModel.deleteOne({
            _id: req.param("id")
        }).exec(function (err, results){
            if (err) {
                return next(new Error('Error getting conversation'));
            }
            console.log("successful delete");
            return next();
        });
    };

};