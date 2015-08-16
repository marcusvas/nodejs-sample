'use strict';

var dir = require('node-dir');

module.exports.create = function (directory, endpoint, app, passport, router) {
  dir.files(directory, function(err, files) {
    if (err) throw err;
    files.forEach(function(file){
      require(file)(router, passport);
    });
    app.use(endpoint, router);
  });
};