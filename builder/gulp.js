var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');


var config = {
    source: "../source/",
    build: "../build/"
}

gulp.task('scripts', function () {
    return gulp.src('../source/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../build/'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

gulp.task('clean', function (cb) {
    del([config.build], cb)
});

gulp.task('default', ['clean'], function () {
    gulp.start('scripts');
});