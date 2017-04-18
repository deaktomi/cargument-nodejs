var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');
var getProfileDataMW = require('../middleware/profile/getProfileData');
var updateProfileMW = require('../middleware/profile/updateProfile');

var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    /**
     * Profile page
     */
    app.get('/profile',
        authMW(objectRepository),
        getProfileDataMW(objectRepository),
        renderMW(objectRepository, 'profile')
    );

    /**
     * Update profile
     */
    app.post('/profile',
        authMW(objectRepository),
        getProfileDataMW(objectRepository),
        updateProfileMW(objectRepository, 'login'),
        function (req, res, next) {
            return res.redirect('/conversations');
        }
    );
};