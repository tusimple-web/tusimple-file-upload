'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('app', function() {
    return gulp.src(path.join(conf.paths.app, '/**/*.js'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe($.size());
});

gulp.task('refreshScripts', function() {
    return gulp.src(path.join(conf.paths.dist, '/tusimple-file-upload.js'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe($.size());
});


gulp.task('concat', function() {
    return gulp.src(path.join(conf.paths.src, '/**/*.js'))
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.concat('tusimple-file-upload.js'))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        .pipe(browserSync.reload({
            stream: true
        }));
});