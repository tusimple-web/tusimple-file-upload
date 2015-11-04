'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var _ = require('lodash');

gulp.task('styles', function () {
  var sassOptions = {
    style: 'expanded'
  };

  return gulp.src([
    path.join(conf.paths.app, '/**/*.scss')
  ])
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.app, '/')))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('buildStyles', function () {
  var sassOptions = {
    style: 'expanded'
  };
  return gulp.src([
    path.join(conf.paths.src, '/**/*.scss')
  ])
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('refreshStyles', function() {
    return gulp.src(path.join(conf.paths.dist, '/tusimple-file-upload.css'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe($.size());
});
