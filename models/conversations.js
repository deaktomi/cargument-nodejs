var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Conversation = db.model('Conversation', {
    _user1: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _user2: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lastMessageDate: Date,
    newMessages1: Number,
    newMessages2: Number,
    _messages: [{
        type : Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

module.exports = Conversation;