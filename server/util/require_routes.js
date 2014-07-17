'use strict'
var dir = require('node-dir');

module.exports.createAll = function (directory, endpoint, express, app) {
  var api = express.Router();
  dir.files(directory, function(err, files) {
    if (err) throw err;
    files.forEach(function(file){
      api.all(require(file)(app));
    });
    api.use(endpoint, api);
  });
}