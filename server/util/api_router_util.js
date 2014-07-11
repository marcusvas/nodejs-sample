'use strict'

var walk = require('walk');

module.exports = function(app, dir){
console.log('executou');
var options = {
    listeners: {
      names: function (root, nodeNamesArray) {
        nodeNamesArray.sort(function (a, b) {
          if (a > b) return 1;
          if (a < b) return -1;
          return 0;
        });
      }
    , directories: function (root, dirStatsArray, next) {
        // dirStatsArray is an array of `stat` objects with the additional attributes
        // * type
        // * error
        // * name
        console.log(dirStatsArray);
        next();
      }
    , file: function (root, fileStats, next) {
          console.log(fileStats.name);
          next();
      }
    , errors: function (root, nodeStatsArray, next) {
        next();
      }
    }
};

walk.walkSync(dir+'/api', options);
    
}