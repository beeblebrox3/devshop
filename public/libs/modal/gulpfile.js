var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    minifyCss = require('gulp-minify-css');

gulp.task('default', function () {
    gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(minifyCss({
            removeEmpty: true
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('dev', function () {
    gulp.src('src/js/*.js')
        .pipe(watch(function (files) {
            return files.pipe(gulp.dest('dist/js'));
        }));

    gulp.src('src/css/*.scss')
        .pipe(watch(function (files) {
            return files.pipe(sass()).pipe(gulp.dest('dist/css'));
        }));
});