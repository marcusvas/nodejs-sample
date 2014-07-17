'use strict'
var dir = require('node-dir');

module.exports.createAll = function (directory, endpoint, app, router) {
  dir.files(directory, function(err, files) {
    if (err) throw err;
    files.forEach(function(file){
      require(file)(router);
    });
    app.use(endpoint, router);
  });
}