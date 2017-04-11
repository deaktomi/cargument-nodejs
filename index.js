var express = require('express');
var app = express();

var session = require('express-session');

app.set('view engine', 'ejs');

//Serve static before session
app.use(express.static('public'));

/**
 * Session above all
 */
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    },
    resave: true,
    saveUninitialized: false
}));

/**
 * Let's creat the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
    res.tpl = {};
    res.error = [];
    return next();
});

/**
 * Include all the routes
 */
require('./routes/outside')(app);
require('./routes/profile')(app);
require('./routes/conversations')(app);

//Use the public MW
//app.use(express.public('public'));

/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send('Houston, we have a problem!');

    //Flush out the stack to the console
    console.error(err.stack);
});

var server = app.listen(3000, function () {
    console.log('Hello :3000');
});
