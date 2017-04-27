var requireOption = require('../common').requireOption;

/**
 * Creates a new conversation with the first message with the given user
 */
module.exports = function (objectrepository) {
    var userModel = requireOption(objectrepository, 'userModel');
    var conversationsModel = requireOption(objectrepository, 'conversationsModel');
    var messageModel = requireOption(objectrepository, 'messageModel');

    return function (req, res, next) {
        console.log("createConversation");
        userModel.findOne({
            regNumber: req.body.targetRegNumber
        }, function (err, result) {
            if (err) {
                return next(new Error('Target user not existing'));
            }
            if (result == null){
                console.log("Tried to send message to not existing user");
                return res.redirect('/error/Tried-to-send-message-to-not-existing-user');
            }

            var message = new messageModel();
            message.body = req.body.message;
            message.date = new Date();
            message._senderUser = req.session.userId;
            message._targetUser = result;
            message.save(function (err, resultMessage){
                if (err) {
                    console.log(err.message);
                }

                var conversation = new conversationsModel();
                conversation._user1 = req.session.userId;
                conversation._user2 = result;
                conversation._messages = [resultMessage._id];
                conversation.newMessages1 = 0;
                conversation.newMessages2 = 1;
                conversation.lastMessageDate = new Date();
                conversation.save(function (err, resultConv){
                    if (err) {
                        console.log(err.message);
                    }
                    return res.redirect('/conversations/details/' + resultConv._id);
                });
            });
        });
    };
};