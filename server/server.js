'use strict';

var express = require('express'),
    fs = require('fs');

var app = express();


// app.all('/', function(req, res, next){
//     console.log('all!!!!!');
//     console.log(next);
//     next();
// }); 

require('./config/expressConfig.js')(app,express);


fs.readdirSync("./server/controllers").forEach(function(file) {
    require("./controllers/" + file)(app);
});

app.namespace('/api/v1', function(){
    fs.readdirSync("./server/api/v1").forEach(function(file) {
        require("./api/v1/" + file)(app);
    });
});


app.listen(app.get("port"), function() {
    return console.log("Express server listening on port " + app.get("port"));
});