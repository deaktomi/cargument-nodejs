var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');
var getProfileDataMW = require('../middleware/profile/getProfileData');
var getConversationsListMW = require('../middleware/conversations/getConversationsList');
var conversationAuthMW = require('../middleware/conversations/conversationAuth');
var getConversationDataMW = require('../middleware/conversations/getConversationData');
var createConversation = require('../middleware/conversations/createConversation');
var deleteConversation = require('../middleware/conversations/deleteConversation');
var addMessage = require('../middleware/conversations/addMessage');

var userModel = require('../models/user');
var conversationsModel = require('../models/conversations');
var messageModel = require('../models/message');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel,
        conversationsModel: conversationsModel,
        messageModel: messageModel,
    };

    /**
     * Conversations page
     */
    app.get('/conversations',
        authMW(objectRepository),
        getProfileDataMW(objectRepository),
        getConversationsListMW(objectRepository),
        renderMW(objectRepository, 'conversations')
    );

    /**
     * Open conversation page
     */
    app.get('/conversations/details/:id',
        authMW(objectRepository),
        getProfileDataMW(objectRepository),
        conversationAuthMW(objectRepository),
        getConversationDataMW(objectRepository),
        renderMW(objectRepository, 'conversation')
    );

    /**
     * New conversation page
     */
    app.get('/conversations/new',
        authMW(objectRepository),
        getProfileDataMW(objectRepository),
        renderMW(objectRepository, 'new-conversation')
    );

    /**
     * Create new conversation
     */
    app.post('/conversations/new',
        authMW(objectRepository),
        createConversation(objectRepository)
    );

    /**
     * Delete conversation
     */
    app.get('/conversations/delete',
        authMW(objectRepository),
        conversationAuthMW(objectRepository),
        deleteConversation(objectRepository),
        function (req, res, next) {
            return res.redirect('/conversations');
        }
    );

    /**
     * Add new message to conversation
     */
    app.post('/message/add/:conversationid',
        authMW(objectRepository),
        conversationAuthMW(objectRepository),
        addMessage(objectRepository),
        function (req, res, next) {
            return res.redirect('/conversations/details/' + req.param('conversationid'));
        }
    );
};