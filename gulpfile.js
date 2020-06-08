var gulp = require("gulp"),
    browsersync = require("browser-sync").create(),
    autoprefixer = require("gulp-autoprefixer"),
    pug = require("gulp-pug"),
    sass = require("gulp-sass"),
    mincss = require("gulp-clean-css"),
    sourcemaps = require("gulp-sourcemaps"),
    rename = require("gulp-rename"),
    replace = require("gulp-replace"),
    newer = require("gulp-newer"),
    plumber = require("gulp-plumber"),
    debug = require("gulp-debug"),
    watch = require("gulp-watch"),
    clean = require("gulp-clean"),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream');

let $pug = ["./src/views/**/*.pug", "!./src/views/blocks/*.pug", "!./src/views/layout/*.pug"],
    $pug_all = "./src/views/**/*.pug",
    $scripts = "./src/js/new.js",
    $styles = "./src/styles/new.scss";
    
  

gulp.task("pug", function () {
  return gulp.src($pug)
    .pipe(pug({
      pretty: true
    }))
    .pipe(replace("../build/", "../"))
    .pipe(gulp.dest("./build/"))
    .pipe(debug({
      "title": "html"
    }))
    .on("end", browsersync.reload);
});

gulp.task("scripts", function () {
  return gulp.src($scripts)
    .pipe(webpackStream({
      mode: 'development',
      output: {
        filename: 'new.min.js',
      },
      performance: {
        hints: false,
        maxEntrypointSize: 1000,
        maxAssetSize: 1000
      },
      externals: {
        jquery: 'jQuery'
      },
      module: {
        rules: [{
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: {
            presets: [["@babel/preset-env"]]
          }
        }]
      }
    }))
    .pipe(gulp.dest("./build/js/"))
    .pipe(debug({"title": "scripts"}))
    .on("end", browsersync.reload);
});
gulp.task("styles", function () {
  return gulp.src($styles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest("./build/styles/"))
    .pipe(mincss())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(replace("../../build/", "../"))
    .pipe(plumber.stop())
    .pipe(sourcemaps.write("./maps/"))
    .pipe(gulp.dest("./build/styles/"))
    .on("end", browsersync.reload);
});

gulp.task("clean", function () {
  return gulp.src("./build/*", {
      read: false
    })
    .pipe(clean())
    .pipe(debug({
      "title": "clean"
    }));
});
gulp.task("serve", function () {
  return new Promise((res, rej) => {
    browsersync.init({
      server: "./build/",
      tunnel: false,
      port: 9000
    });
    res();
  });
});
gulp.task("watch", function () {
  return new Promise((res, rej) => {
    watch($pug_all, gulp.series("pug"));
    watch($styles, gulp.series("styles"));
    watch($scripts, gulp.series("scripts"));
    res();
  });
});
gulp.task("default", gulp.series("clean",
  gulp.parallel("pug", "styles", "scripts"),
  gulp.parallel("watch", "serve")
));


//custom временно


