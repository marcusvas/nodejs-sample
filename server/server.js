'use strict';

var express = require('express'),
    logger = require('./util/logger');


var server = express();

var decorait = require('./config/express.js');
decorait.init(server,express);

server.listen(server.get("port"), function() {
    logger.info("Express Server Listening on Port %s", server.get("port"));
    return;
});

module.exports = server;
