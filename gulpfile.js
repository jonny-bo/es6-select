var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var Notifier = require('node-notifier');
var less = require('gulp-less');

var bundle = function() {
  browserify('./src/js/main.js', {
      debug: true
    })
    .bundle()
    .on('error', (err) => {
      console.log(err.message);
      console.log(err.codeFrame);
      console.log(err.loc);
      Notifier.notify({
        title: 'Bundle Error',
        message: err.message,
        sound: 'Frunk'
      });
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist'));
}

var compileLess = function() {
  gulp.src('./src/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('./dist'));
}

gulp.task('dev', function() {
  bundle();
  compileLess();
  gulp.watch('./src/js/**/*.js', function(file) {
    console.log(file.path);
    bundle();
  });
  gulp.watch('./src/less/**/*.less', function(file) {
    console.log(file.path);
    compileLess();
  })
});