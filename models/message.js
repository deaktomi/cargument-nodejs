var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Message = db.model('Message', {
    body: String,
    _senderUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _targetUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: Date,
    isRead: {
        type: Boolean,
        default: false
    }
});

module.exports = Message;