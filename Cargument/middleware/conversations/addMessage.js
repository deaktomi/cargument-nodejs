var requireOption = require('../common').requireOption;

/**
 * Adds a message to the conversation
 */
module.exports = function (objectrepository) {
    var conversationsModel = requireOption(objectrepository, 'conversationsModel');
    var messageModel = requireOption(objectrepository, 'messageModel');

    return function (req, res, next) {
        console.log("addMessage");
        conversationsModel.findOne({
            _id: req.param("conversationid")
        }).populate("_user1 _user2").exec(function(err, result){
            if (err){
                console.log(err);
            }
            var message = new messageModel();
            message._senderUser = req.session.userId;
            message._targetUser = req.session.userId === result._user1._id ? result._user1.id : result._user2._id;
            message.date = new Date;
            message.body = req.body.message;
            message.save(function (err, resultMessage){
                if (err){
                    console.log(err.message);
                }
                result._messages.push(resultMessage._id);
               result.save(function (err){
                   if (err){
                       console.log(err.message);
                   }
                   return next();
               });
            });
        });
    }
};