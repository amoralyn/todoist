(() => {
  'use strict';
  const gulp = require('gulp');
  const nodemon = require('gulp-nodemon');
  const uglify = require('gulp-uglify');
  const browserify = require('browserify');
  const gutil = require('gutil');
  const source = require('vinyl-source-stream');


  gulp.task('start', () => {
    nodemon({
      script: 'server.js',
      ext: 'js',
      env: { 'NODE_ENV': 'development' }
    });
  });

  gulp.task('css', ['img'], () => {
    return gulp.src(['./app/styles/*.css'])
      .pipe(gulp.dest('./public/styles'))
  });

  gulp.task('html', ['img'], () => {
    return gulp.src(['./app/**/*.html'])
      .pipe(gulp.dest('./public/'))
  });

  gulp.task('img', () => {
    return gulp.src(['./app/images/**'])
      .pipe(gulp.dest('./public/images'))
  });

  gulp.task('js', () => {
    return gulp.src(['./app/scripts/*.js'])
      .pipe(gulp.dest('./public/scripts'))
  });

  gulp.task('watch', () => {
    gulp.watch('./app/**/*.html', ['html'])
    gulp.watch('./app/styles/*.css', ['css'])
    gulp.watch('./app/scripts/*.js', ['js'])
  });

  gulp.task('browserify', () => {
    return browserify('app/scripts/app.js').bundle()
      .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
      .on('error', gutil.log.bind(gutil, 'Browserify' +
        'Error: in browserify gulp task'))
      .pipe(source('app.js'))
      .pipe(gulp.dest('./public/scripts'))
  });

  gulp.task('uglifyPlugins', () => {
    return gulp.src(['bower_components/bootstrap/dist/js/bootstrap.js'])
      .pipe(uglify())
      .pipe(gulpd.dest('./app/scripts'))
  });

  gulp.task('default', ['start', 'html', 'css', 'img', 'js', 'browserify', 'watch']);
})();
