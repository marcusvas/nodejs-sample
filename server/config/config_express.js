'use strict';

var morgan = require('morgan'),
    errorHandler = require('errorhandler'),
    compression = require('compression'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path');

module.exports = {
    core : function(app, express) {
        app.set("port", process.env.PORT || 3000);
        var env = process.env.NODE_ENV || 'development';
        
        if('development' == env) {
        	app.use(morgan('dev'));
        	app.use(errorHandler());
        }
        
        app.use(compression());
        app.use(favicon(path.resolve('..','client','favicon.ico')));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(methodOverride());
        
        app.use("/static", express.static(path.resolve("./client/")));
    }
}