require('es6-promise').polyfill();

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var onError = function(err) {
  console.log('An error occurred:', gutil.colors.magenta(err.message));
  gutil.beep();
  this.emit('end');
};

gulp.task('images', function() {
  return gulp
    .src('./images/src/*')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(imagemin({ optimizationLevel: 7, progressive: true }))
    .pipe(gulp.dest('./images/dist'));
});

gulp.task('sass', function() {
  return gulp
    .src('./sass/**/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./'));
});

gulp.task('js', function() {
  return gulp
    .src(['./js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

gulp.task('watch', function() {
  browserSync.init({
    files: ['./**/*.php'],
    proxy: 'http://localhost/andysmithis/',
  });
  gulp.watch('./sass/**/*.scss', ['sass', reload]);
  gulp.watch('./js/*.js', ['js', reload]);
  gulp.watch('images/src/*', ['images', reload]);
});

gulp.task('default', ['sass', 'js', 'images', 'watch']);
