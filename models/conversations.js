/**
 * Conversation model (mock)
 * @constructor
 */
var Conversation = function () {

};

var ConversationInstanceMock = {
    user: {
        id: 2,
        name: 'Panni',
        regNumber: 'ABC - 069'
    },
    id: 1,
    newMessages: 2,
    lastMessageDate: '2017-03-30 18:16',
    messages: [
        {
            senderId: 1,
            body: 'Test üzenet'
        },
        {
            senderId: 2,
            body: 'Test üzenet 2'
        }
    ]
};

/**
 * Find one element with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Conversation.findOne = function (criteria, cb) {

    //returns 1 mocked item
    return cb(null, ConversationInstanceMock);
};

/**
 * Find all elements with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Conversation.find = function (criteria, cb) {

    //returns 3 mocked item
    return cb(null, [ConversationInstanceMock, ConversationInstanceMock, ConversationInstanceMock]);
};

module.exports = Conversation;