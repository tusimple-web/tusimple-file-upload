'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', function () {

  gulp.watch([path.join(conf.paths.app, '/*.html'), 'bower.json']);

  gulp.watch([
    path.join(conf.paths.app, '/**/*.css'),
    path.join(conf.paths.app, '/**/*.scss')
  ], function(event) {
      gulp.start('styles');
  });

  gulp.watch([
    path.join(conf.paths.src, '/**/*.scss')
  ], function(event) {
      gulp.start('buildStyles');
  });

  gulp.watch(path.join(conf.paths.dist,'/**/*.css'),function () {
    gulp.start('refreshStyles');
  });

  gulp.watch(path.join(conf.paths.app, '/**/*.js'), function(event) {
      gulp.start('app');
  });

  gulp.watch(path.join(conf.paths.dist, '/tusimple-file-upload.js'), function(event) {
      gulp.start('refreshScripts');
  });

  gulp.watch(path.join(conf.paths.src, '/**/*.js'), function(event) {
      gulp.start('concat');
  });

  gulp.watch(path.join(conf.paths.app, '/**/*.html'), function(event) {
    browserSync.reload(event.path);
  });
});
