'use strict';

var morgan = require('morgan'),
    errorHandler = require('errorhandler'),
    compression = require('compression'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    path = require('path'),
    swig = require('swig'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    

module.exports = {
    core : function(app, express) {
        app.set("port", process.env.PORT || 3000);
        var env = process.env.NODE_ENV || 'development';
        
        app.engine('html', swig.renderFile);
        app.set('view engine', 'html');
        app.set('views', path.resolve('..','client','views'));
        
        if('development' == env) {
        	app.use(morgan('dev'));
        	app.use(errorHandler());
        	
        	// Should always cache templates in a production environment.
            // Don't leave both of these to `false` in production!
            
        	// To disable express cache
        	app.set('view cache', false);
        	// To disable Swig's cache
            swig.setDefaults({ cache: false });
        }
        app.use(cookieParser());
        app.use(session());
        
        app.use(passport.initialize());
        app.use(passport.session());
        
        app.use(compression());
        app.use(favicon(path.resolve('..','client','favicon.ico')));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(methodOverride());
        
        app.use("/static", express.static(path.resolve('..','client','public')));
        
        // passport config
        // TODO: move this to /coonfig/passport.js
        var Account = require(path.resolve('..','models','user.js'));
        passport.use(new LocalStrategy(Account.authenticate()));
        passport.serializeUser(Account.serializeUser());
        passport.deserializeUser(Account.deserializeUser());
        
        // mongoose
        mongoose.connect('mongodb://localhost/passport_local_mongoose');
    }
};