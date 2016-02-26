var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');
var babelRegister = require('babel-register');
var concatCss = require('gulp-concat-css');

var paths = {
  appEntyPoint: "./src/app/index.jsx",
  indexHtml: ["src/app/index.html"],
  app: ['src/app/**/*'],
  tests: ['tests/**/*.js'],
  css: ['bower_components/**/*.css', "src/style/**/*.css", 'node_modules/react-datepicker/dist/react-datepicker.min.css'],
  fonts: ['bower_components/**/dist/**/*.{eot,svg,ttf,woff,woff2}']
};
 
gulp.task('babel', function() {
    return browserify(paths.appEntyPoint, { debug: !gulp.env.production, extensions: ['.js', '.json', '.jsx'] })
    .transform(babelify)
    .bundle()
    .on('error', gutil.log)
    .pipe(source('jsbundle'))
    .pipe(buffer())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('build'))
    .pipe(sourcemaps.init({ loadMaps: true }))
      //.pipe(uglify())
    .pipe(sourcemaps.write('.'));
});

gulp.task('html', function() {
  return gulp.src(paths.indexHtml)
    .pipe(gulp.dest('build'));
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest('build'));
});

gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  return gulp.watch(paths.app, ['build']);
});

gulp.task('mocha', function() {
    return gulp.src(paths.tests, { read: false })
        .pipe(mocha({
            compilers: {
                js: babelRegister
            }
        }));
});

gulp.task('build', ['babel', 'html', 'css', 'fonts']);

gulp.task('default', ['mocha', 'build', 'watch']);