'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('clean', function() {
    return $.del(path.join(conf.paths.dist, '/'));
});

var jsFilter = $.filter('**/*.js', { restore: false });
var cssFilter = $.filter('**/*.css', { restore: false });

gulp.task('build', function() {
    return gulp.src([path.join(conf.paths.dist, '/tusimple-file-upload.js'),path.join(conf.paths.dist,'/tusimple-file-upload.css')])
        .pipe($.ngAnnotate())
        .pipe($.uglify({
            preserveComments: $.uglifySaveLicense
        })).on('error', conf.errorHandler('Uglify'))
        .pipe(jsFilter)
        .pipe($.rename('tusimple-file-upload.min.js'))
        .pipe(cssFilter)
        .pipe($.rename('tusimple-file-upload.min.css'))
        .pipe(gulp.dest(path.join(conf.paths.dist,'/')));
});