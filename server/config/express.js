'use strict';

var morgan = require('morgan'),
    errorHandler = require('errorhandler'),
    compression = require('compression'),
    multer = require('multer'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    path = require('path'),
    swig = require('swig'),
    helmet = require('helmet'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    routes = require('../util/routes_util.js'),
    endpoint = require('./endpoints.js').endpoints,
    logger = require('../util/logger'),
    async = require('async'),
    expressValidator = require('express-validator'); //Declare Express-Validator, https://github.com/ctavan/express-validator



module.exports = {
    init: function (app, express) {
        app.set("port", process.env.PORT || 3000);
        var env = process.env.NODE_ENV || 'development';

        app.engine('html', swig.renderFile);
        app.set('view engine', 'html');
        app.set('views', path.resolve(__dirname, '..', '..', 'client', 'views'));

        if ('development' == env) {
            app.use(morgan('dev'));
            app.use(errorHandler({
                dumpExceptions: true,
                showStack: true
            }));

            //mongoose.set('debug', logger.stream);

            // Should always cache templates in a production environment.
            // Don't leave both of these to `false` in production!

            // To disable express cache
            app.set('view cache', false);
            // To disable Swig's cache
            swig.setDefaults({
                cache: false
            });
        }
        // helmet default security
        app.use(helmet());

         

        app.use(cookieParser());
        app.use(session({
            secret: 'alter this',
            resave: true,
            saveUninitialized: true
        }));
        app.use(flash());

        app.use(saveReturnToAfterLogin);
        app.use(passport.initialize());
        app.use(passport.session());
        require('./passport')(passport);
        app.use(isAuthenticatedMiddleware);
        



        //        app.use(compression());
        app.use(favicon(path.resolve(__dirname, '..', '..', 'client', 'favicon.ico')));
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(expressValidator({
            /*
            customValidators: {
                isArray: function(value) {
                return Array.isArray(value);
                },
                gte: function(param, num) {
                    return param >= num;
                }
            }*/
        }));
        app.use(bodyParser.json());

        
        
        app.use(methodOverride());

        app.use(multer({inMemory: true}));

        app.use("/static", express.static(path.resolve(__dirname, '..', '..', 'client', 'public')));

        // TODO: move this to /config/mongodb.javascript
        mongoose.connect('mongodb://ecommerce-dev:20150816@ds033163.mongolab.com:33163/ecommerce');
        logger.info('MongoDB is running on mongolab!!');

        // Creating routes
        routes.create(path.resolve(__dirname, '..', endpoint.root.directory), endpoint.root.route, app, passport, express.Router());
        //routes.create(path.resolve(__dirname, '..', endpoint.api.v1.directory), endpoint.api.v1.route, app, express.Router());
    }
};

var mongooseConnect = function mongooseConnect() {
    mongoose.connect('mongodb://ecommerce-dev:20150816@ds033163.mongolab.com:33163/ecommerce');
};

var saveReturnToAfterLogin = function saveReturnToAfterLogin(req, res, next) {
    //return function() {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        logger.info('req'+req);
        if (req.session && req.query) {
            var url = req.query.backurl;
            logger.info('backurl' + url);
            if (url && url.indexOf('login') == -1)
                req.session.returnToAfterLogin = url; //para nao redirecionar para pagina de login.
            }
      
        }
    next();
  }


var isAuthenticatedMiddleware = function isAuthenticatedMiddleware(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
};