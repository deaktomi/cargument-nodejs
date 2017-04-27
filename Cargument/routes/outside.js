var mainRedirectMW = require('../middleware/generic/mainRedirect');
var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserLoginMW = require('../middleware/generic/checkUserLogin');
var logoutMW = require('../middleware/generic/logout');
var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');
var getErrorMessageMW = require('../middleware/generic/getErrorMessage');

var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    /**
     * Main page
     */
    app.get('/',
        mainRedirectMW(objectRepository)
    );

    /**
     * Login page
     */
    app.get('/login',
        inverseAuthMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    /**
     * Login
     */
    app.post('/login',
        checkUserLoginMW(objectRepository)
    );

    /**
     * Logout
     */
    app.get('/logout',
        authMW(objectRepository),
        logoutMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/login');
        }
    );

    /**
     * Error
     */
    app.get('/error/:errorMessage',
        getErrorMessageMW(objectRepository),
        renderMW(objectRepository, 'error')
    )
};