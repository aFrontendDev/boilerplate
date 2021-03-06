"use strict";

var gulp = require('gulp');
var environments = require('gulp-environments');
var modernizr = require('gulp-modernizr');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var runSequence = require('run-sequence').use(gulp);
var gulpCopy = require('gulp-copy');
var livereload = require('gulp-livereload');

var config = require('./config');
var handleError = require('./handle-error');

gulp.task('scripts', function(callback) {
  runSequence(
    'scripts-lint',
    'scripts-modernizr',
    'scripts-compile',
    'scripts-min',
    callback
  );
});

gulp.task('scripts-modernizr', function() {
  return gulp.src([
      config.paths.scripts.src + '**/*.js',
      '!' + config.paths.scripts.src + 'modules/**',
      config.paths.styles.src + '**/*.scss'
    ])
    .pipe(modernizr({
      cache: true,
      options: [
        'setClasses',
        'addTest',
        'html5printshiv',
        'testProp',
        'fnBind',
        'prefixed',
        'prefixedCSS'
      ]
    }))
    .pipe(environments.production(uglify()))
    .pipe(gulp.dest(config.paths.scripts.dist));
});

gulp.task('scripts-lint', function() {
  return gulp.src(config.paths.scripts.src + 'modules/**/*.js')
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('scripts-compile', function() {
	return gulp.src([
		config.paths.scripts.src + 'plugins/combine/**/*.js',
    config.paths.scripts.src + 'plugins/modernizr.tests.js',
		config.paths.scripts.src + 'modules/**/*.js',
		config.paths.scripts.src + '_init.js'
	])
	.on('error', handleError)
	.pipe(concat(config.outputFiles.scripts.main))
	.pipe(gulp.dest(config.paths.scripts.dist))
  .pipe(livereload());
});

gulp.task('scripts-min', function() {
  return gulp.src([
    config.paths.scripts.src + 'plugins/combine/**/*.js',
    config.paths.scripts.src + 'modules/**/*.js',
    config.paths.scripts.src + '_init.js'
  ])
  .on('error', handleError)
  .pipe(concat(config.outputFiles.scripts.mainMin))
  .pipe(uglify({
    compress: {
         drop_console: true
    }
  }))
  .pipe(gulp.dest(config.paths.scripts.dist));
});

