var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport")
var flash = require("connect-flash")
var session = require("express-session")  
var mongoose = require("mongoose")

var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://sabrinakoumoin:abidjan54@cluster0-shard-00-00-z9s7w.mongodb.net:27017,cluster0-shard-00-01-z9s7w.mongodb.net:27017,cluster0-shard-00-02-z9s7w.mongodb.net:27017/authSource=Admin&ssl=true&replicaSet=Cluster0-shard-0"
var uri2 = "mongodb://sabrinakoumoin:abidjan54@ds051960.mlab.com:51960/bintoudb"
var uri3 = "mongodb://127.0.0.1/27017/newproject"
var uri4 = "mongodb://mgis.students1:bingerville225@ds151279.mlab.com:51279/mymgis1"
var urii = "mongodb://sabrinakoumoin:abidjan54@ds261247.mlab.com:61247/mpa2"
    //4 is real okk  
    //127.0.0.1/27017:3000/mymgisss
    //for mongo shell: mongo ds155405-a0.mlab.com:55405/afribelle -u sabrinakoumoin -p abidjan54
    // mongo ds151279.mlab.com:51279/mymgis1 -u <dbuser> -p <dbpassword>

mongoose.connect(urii, {
    replset: {
        connectWithNoPrimary: true,
        auto_reconnect: true,
        ssl: true,
        sslValidate: false

    }
}, function(err) {
    if (err) {
        console.log(err);
        process.exit();
    } else {
        console.log("Everything is ok :D");
    }
});




//what to do if callbacks take too long?

var app = express();

require("./config/passport.js")(passport)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Site icon
app.use(favicon(path.join(__dirname, 'public', "images", "icons", 'siteIcon.ico')));


// required for passport
app.use(session({
    secret: 'sabrinayes',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



//Routing
var users = require('./routes/users')(app, passport);
var routes = require('./routes/index')(app)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;