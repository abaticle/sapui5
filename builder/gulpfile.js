var gulp = require("gulp");
var minifycss = require("gulp-minify-css");
var minifyhtml = require("gulp-minify-html");
var jshint = require("gulp-jshint");
var uglify = require("gulp-uglify");
var clean = require("gulp-clean");
var notify = require("gulp-notify");
var docco = require("gulp-docco");

var config = {

    //Source folder
    source: "../source/",

    //Build folder
    build: "../build/",

    //Doc folder
    doc: "../doc",

    //JS files
    sourceJS: "../source/**/*.js",

    //HTML Files
    sourceHTML: [
        "../source/**/*.html",
        "../source/**/*.htm"
    ],

    //CSS Files
    sourceCSS: "../source/**/*.css",

    //Other files to be copied
    sourceCopy: [
        "../source/**/*.json",
        "../source/**/*.properties"
    ]
}

gulp.task('lint', function () {
    return gulp.src(config.sourceJS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task("css", function () {
    return gulp.src(config.sourceCSS)
        .pipe(minifycss())
        .pipe(gulp.dest(config.build));
});

gulp.task("html", function () {
    return gulp.src(config.sourceHTML)
        .pipe(minifyhtml())
        .pipe(gulp.dest(config.build));
});

gulp.task("scripts", function () {
    return gulp.src(config.sourceJS)
        .pipe(uglify())
        .pipe(gulp.dest(config.build));
});

gulp.task("clean", function () {
    return gulp.src(config.build)
        .pipe(clean({
            force: true
        }));
});

gulp.task("copy", function () {
    return gulp.src(config.sourceCopy)
        .pipe(gulp.dest(config.build));
})

gulp.task("doc", function () {
    return gulp.src(config.sourceJS)
        .pipe(docco())
        .pipe(gulp.dest(config.doc))
})


gulp.task("default", ["clean", "doc"], function () {
    gulp.start("scripts", "html", "css", "copy")
})