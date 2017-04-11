/**
 * User model (mock)
 * @constructor
 */
var User = function () {
};

/**
 * An instance
 */
var UserInstanceMock = {
    id: 1,
    name: 'Sándor',
    regNumber: 'SQL - 666'
};

/**
 * Find one element with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
User.findOne = function (criteria, cb) {

    //returns 1 mocked item
    return cb(null, UserInstanceMock);
};

module.exports = User;