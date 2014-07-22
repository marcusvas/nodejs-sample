'use strict';

var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyHtml = require("gulp-minify-html");
var minifyCss = require("gulp-minify-css");
var nodemon = require('gulp-nodemon');
var path = require('path');
var util = require('gulp-util');

// Lint Task
gulp.task('hint', function() {
    return gulp.src('./server/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('./client/public/javascript/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/client/public/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/client/public/js'));
});

gulp.task('minify-html', function () {
    gulp.src('./client/public/static_pages/*.html') // path to your files
    .pipe(minifyHtml())
    .pipe(gulp.dest('./dist/client/public/static_pages'));
});

gulp.task('minify-css', function () {
    gulp.src('./client/public/css/*.css') // path to your file
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/client/public/css'));
});

// MONITOR SERVER FOR CHANGES & RESTART
gulp.task('nodemon', function() {

  util.log('Running gulp task "NODEMON"');

  nodemon({
    script: path.resolve('server', 'server.js'),
    ext: 'js, html',
    ignore: ['README.md', 'node_modules/**', '.DS_Store', 'dist']
  })
  .on('change');

});


gulp.task('watch', function() {
  gulp.watch(['./server/**', './client/**'], function() {
    gulp.start('nodemon');
  });
});


// gulp.task('default', ['hint', 'watch']);
gulp.task('default', ['nodemon']);