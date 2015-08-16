'use strict';

var winston = require('winston'),
    path = require('path');
    
winston.emitErrs = true;

var logger;

var LOGGER_LEVEL = process.env.npm_package_LOGGER_LEVEL || 'default';
if('default' == LOGGER_LEVEL) {
    logger = new winston.Logger({
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: path.resolve(__dirname, '..', 'logs') + '/all-logs.log',
                handleExceptions: true,
                json: true,
                maxsize: 2097152, //2MB
                maxFiles: 2,
                colorize: false
            }),
            new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true
            })
        ],
        exitOnError: false
    });
} else if('tests' == LOGGER_LEVEL) {
    logger = new winston.Logger({
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: path.resolve(__dirname, '..', 'logs') + '/all-tests-logs.log',
                handleExceptions: true,
                json: true,
                maxsize: 2097152, //5MB
                maxFiles: 2,
                colorize: false
            })
        ],
        exitOnError: false
    });
} else if('debug' == LOGGER_LEVEL) {
        logger = new winston.Logger({
        transports: [
            new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true
            })
        ],
        exitOnError: false
    });
}

    
module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};