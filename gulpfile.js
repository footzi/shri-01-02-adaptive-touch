const gulp = require("gulp");
const sass = require("gulp-sass");
const webpack = require("webpack-stream");
const concat = require("gulp-concat");
const notify = require("gulp-notify");
const browserSync = require("browser-sync");
const autoprefixer = require("gulp-autoprefixer");
const twig = require("gulp-twig");

//html templates
gulp.task("html", function() {
    return gulp
        .src("./views/index.twig")
        .pipe(twig())
        .pipe(gulp.dest("./"));
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
        .src(["scripts/**/*.ts"])
        .pipe(
            webpack({
                entry: {
                    app: __dirname + "/scripts/app.ts"
                },
                output: {
                    filename: "build.js"
                },
                resolve: {
                    extensions: [".ts", ".tsx", ".js"]
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
                        },
                        {
                            test: /\.tsx?$/,
                            loader: "ts-loader"
                        },
                        {
                            test: /\.twig$/,
                            exclude: /(node_modules)/,
                            use: {
                                loader: "twig-loader"
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
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());
});

//browserSync
gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8080,
        open: false,
        notify: false
    });
});

//watch
gulp.task("watch", ["browser-sync"], function() {
    gulp.watch("views/**/*.twig", ["html"]);
    // gulp.watch("src/styles/**/*.scss", ["styles"]);
    gulp.watch("scripts/**/*", ["scripts"]);
    gulp.watch("vuex/**/*", ["scripts"]);
});

gulp.task("default", ["watch"]);
