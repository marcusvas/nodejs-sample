'use strict';

var express = require('express'),
    routes = require('./util/routes_util.js'),
    endpoint = require('./config/endpoints.js').endpoints;
    
var app = express();
 

// app.all('/', function(req, res, next){
//     console.log('all!!!!!');
//     console.log(next);
//     next();
// }); 

require('./config/express.js').core(app,express);

routes.create(__dirname + endpoint.root.directory, endpoint.root.route, app, express.Router());
routes.create(__dirname + endpoint.api.v1.directory, endpoint.api.v1.route, app, express.Router());


app.listen(app.get("port"), function() {
    return console.log("Express server listening on port " + app.get("port"));
});