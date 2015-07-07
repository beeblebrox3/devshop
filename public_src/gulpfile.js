var gulp = require("gulp"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    transform = require("vinyl-transform"),
    reactify = require("reactify"),
    notify = require("gulp-notify"),
    sass = require("gulp-sass"),
    cssShrink = require("gulp-cssshrink"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    buffer = require("vinyl-buffer"),
    errorHandler = function (e) {
        notify("ops!");
        console.log(e);
        this.emit("end");
    };

gulp.task("browserify", function () {
    return browserify({
        standalone: "App",
        paths: ["./js"],
        debug: false
    })
        .transform(reactify)
        .on("error", errorHandler)
        .add("./js/bootstrap.js")
        .bundle()
        .on("error", errorHandler)
        .pipe(source("bundle.js"))
        .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest("../public/js"))
        .pipe(notify("bundle updated"));
});

gulp.task("css", function () {
    return gulp.src([
        "./css/main.scss"
    ])
        .pipe(sass())
        .on("error", errorHandler)
        .pipe(cssShrink())
        .pipe(rename("bundle.css"))
        .pipe(gulp.dest("../public/css"));
});

gulp.task("default", ["browserify", "css"], function () {
    gulp.watch("js/**/*.js", ["browserify"]);
    gulp.watch("css/**/*.scss", ["css"]);
});
