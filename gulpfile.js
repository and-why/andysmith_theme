require('es6-promise').polyfill();

let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let plumber = require('gulp-plumber');
let concat = require('gulp-concat');
let eslint = require('gulp-eslint');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let imagemin = require('gulp-imagemin');
let cleanCSS = require('gulp-clean-css');
let browserSync = require('browser-sync').create();
let reload = browserSync.reload;

function onError (error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('images', () => {
  return gulp
    .src('./images/src/*')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(imagemin({ optimizationLevel: 7, progressive: true }))
    .pipe(gulp.dest('./images/dist'));
});

gulp.task('sass', () => {
  return gulp
    .src('./sass/**/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./'));
});

gulp.task('js', () => {
  return gulp
    .src(['./js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(concat('app.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

gulp.task('minify-css', () => {
  return gulp.src('*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('/'));
});

gulp.task('watch', () => {
  browserSync.init({
    files: ['./**/*.php'],
    proxy: 'http://localhost/wordpress_dummy/wordpress',
  });
  gulp.watch('./sass/**/*.scss', ['sass', reload]);
  gulp.watch('./js/*.js', ['js', reload]);
  gulp.watch('images/src/*', ['images', reload]);

});

gulp.task('default', ['sass', 'js', 'images', 'watch']);

gulp.task('prod', ['sass', 'js', 'minify-css', 'images']);