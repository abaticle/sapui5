var gulp = require("gulp");
var minifycss = require("gulp-minify-css");
var minifyhtml = require("gulp-minify-html");
var jshint = require("gulp-jshint");
var uglify = require("gulp-uglify");
var clean = require("gulp-clean");
var notify = require("gulp-notify");
var yuidoc = require("gulp-yuidoc");
var NwBuilder = require("node-webkit-builder");
var path = require("path");
var fs = require("fs");

//Config data
var config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json')));

//Clean build destination
gulp.task("clean", function () {
    return gulp.src(config.build)
        .pipe(clean({
            force: true
        }));
});

//Minify CSS
gulp.task("css", function () {
    return gulp.src(config.sourceCSS)
        .pipe(minifycss())
        .pipe(gulp.dest(config.build));
});

//Minify HTML
gulp.task("html", function () {
    return gulp.src(config.sourceHTML)
        .pipe(minifyhtml())
        .pipe(gulp.dest(config.build));
});

//Minify JS
gulp.task("scripts", function () {
    return gulp.src(config.sourceJS)
        .pipe(uglify())
        .pipe(gulp.dest(config.build));
});

//Copy other files (images for instance)
gulp.task("copy", function () {
    return gulp.src(config.sourceCopy)
        .pipe(gulp.dest(config.build));
});

//Create JS documentation
gulp.task("doc", function () {
    return gulp.src(config.sourceJS)
        .pipe(yuidoc())
        .pipe(gulp.dest(config.doc))
});

//And watch files modifications
gulp.task('watch', function () {
    gulp.watch(config.sourceCopy, ["copy"]);
    gulp.watch(config.sourceCSS, ["css"]);
    gulp.watch(config.sourceJS, ["scripts", "doc"]);
    gulp.watch(config.sourceHTML, ["html"]);
});

//Default task : clean, create doc, and build everything !
gulp.task("default", ["clean", "doc"], function () {
    gulp.start("scripts", "html", "css", "copy", "watch");
})