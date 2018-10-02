const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const webpack = require("webpack-stream");
const concat = require("gulp-concat");
const notify = require("gulp-notify");
const browserSync = require("browser-sync");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");

//html templates
gulp.task("pug", function() {
    return gulp
        .src("src/views/*.pug")
        .pipe(pug({ pretty: true, basedir: __dirname + "/src/views" }))
        .on(
            "error",
            notify.onError({
                title: "PUG Compilation Failed",
                message: "<%= error.message %>"
            })
        )
        .pipe(gulp.dest("public"))
        .pipe(browserSync.stream());
});

//styles
gulp.task("styles", function() {
    return gulp
        .src("src/styles/**/*.scss")
        .pipe(concat("app.scss"))
        .pipe(autoprefixer({ browsers: ["last 5 versions"] }))
        .pipe(sass({ outputStyle: "compressed" }))
        .on(
            "error",
            notify.onError({
                title: "SASS Compilation Failed",
                message: "<%= error.message %>"
            })
        )
        .pipe(gulp.dest("public"))
        .pipe(browserSync.stream());
});

//scripts
gulp.task("scripts", function() {
    return gulp
        .src(["src/scripts/**/*.js"])
        .pipe(
            webpack({
                entry: {
                    app: __dirname + "/src/scripts/app.js"
                },
                output: {
                    filename: "[name].js"
                },
                module: {
                    rules: [
                        {
                            test: /\.js$/,
                            exclude: /(node_modules)/,
                            use: {
                                loader: "babel-loader",
                                options: {
                                    presets: ["env"],
                                    cacheDirectory: true
                                }
                            }
                        }
                    ]
                },
                mode: "development"
            })
        )
        .on(
            "error",
            notify.onError({
                title: "JS Compilation Failed",
                message: "<%= error.message %>"
            })
        )
        .pipe(gulp.dest("public"))
        .pipe(browserSync.stream());
});

//browserSync
gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "public"
        },
        port: 8080,
        open: false,
        notify: false
    });
});

//watch
gulp.task("watch", ["browser-sync"], function() {
    gulp.watch("src/views/**/*", ["pug"]);
    gulp.watch("src/styles/**/*.scss", ["styles"]);
    gulp.watch("src/scripts/**/*", ["scripts"]);
});

gulp.task("default", ["watch"]);
