'use strict'

var walk = require('walk');

module.exports = function(app, dir){
  console.log('executou - ' + dir);
  // var options = {
  //   directories: function (root, dirStatsArray, next) {
  //       console.log(dirStatsArray.name);
  //       next();
  //   }, 
  //   file: function (root, fileStats, next) {
  //         console.log(fileStats.name);
  //         next();
  //   }, 
  //   errors: function (root, nodeStatsArray, next) {
  //       next();
  //   }
  // }
  var options = {
    followLinks: false
    // directories with these keys will be skipped
  , filters: ["Temp", "_Temp"]
  };
  
  var walker = walk.walk(dir+'/api', options);
  
  walker.on("directory", function (root, dirStatsArray, next) {
    console.log(dirStatsArray.name);
    next();
  });

  walker.on("file", function (root, fileStats, next) {
    console.log(fileStats);
    //console.log(root);
    next();
  });
  
  walker.on("names", function (root, nodeNamesArray) {
    nodeNamesArray.sort(function (a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
  });
  
};


    
