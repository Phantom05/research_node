const gulp = require("gulp");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const nodemon = require("gulp-nodemon");
const runSequence = require("run-sequence");
const autoprefixer = require("gulp-autoprefixer");
// const cache = require("gulp-cache");
const fileCache = require("gulp-file-cache");
var sassGlob = require("gulp-sass-glob");
const env = require("./config");
const _cache = new fileCache();
const reload = browserSync.reload;
const { paths, assets, setting } = require("./gulpfile.config");

gulp.task("default", () => runSequence("watch", "browser-sync", "log:watch"));
gulp.task(`watch`, () => runSequence("scss:watch", "js:watch", "html:watch"));

gulp.task(`styles`, _styles);
gulp.task(`scripts`, _scripts);
gulp.task("browser-sync", _browserSync);
// gulp.task(`build`, _styles);
// gulp.task("nodemon", _nodemon);
// gulp.task("browser-sync", ["nodemon"], _browserSync);

gulp.task(`scss:watch`, () => {
  return gulp.watch(paths.styles.src, [`styles`]);
});

gulp.task(`js:watch`, () => {
  return gulp.watch(paths.js.src, [`scripts`]);
});
gulp.task(`img:watch`, () => {
  return gulp.watch(paths.img.src, [`imgmin`]);
});
gulp.task(`html:watch`, () => {
  return gulp.watch(
    [`views/**/*.{ejs,pug,html}`, `routes/**/*.js`, `app.js`],
    reload
  );
});

gulp.task(`log:watch`, () => {
  infoConsole();
});

/**
 * Console Information
 */
function infoConsole() {
  console.log(`
  /*
  =================================================================+
    Mode         : ${env.mode}
    Node version : ${process.version}
    PPID         : ${process.ppid}
    pid          : ${process.pid}
    platform     : ${process.platform}
    PORT         : ${env.port}
  =================================================================+
  */
  `);
}
function _styles() {
  return (
    gulp
      .src(paths.styles.src)
      // .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(sass(setting.styles.scss_option).on("error", sass.logError))
      // .pipe(sourcemaps.write())
      .pipe(autoprefixer("last 2 versions"))
      // .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest(paths.styles.dist))
      .on("end", () => {
        console.log("build styles");
        reload();
      })
  );
}

function _scripts() {
  return (
    gulp
      .src([
        paths.js.src,
        // `!${paths.js.common_src}`,
        // `${assets.src}/js/common/main.js`,
      ])
      .pipe(_cache.filter())
      .pipe(babel().on("error", handleError))
      // .pipe(rename({ extname: ".min.js" }))
      .pipe(_cache.cache())
      .pipe(gulp.dest(paths.js.dist))
      .on("end", () => {
        console.log("build scripts");
        reload();
      })
  );
}

function _browserSync() {
  browserSync.init(null, {
    proxy: `http://localhost:${env.port}`,
    // files: ["public/**/*.*"],
    port: 8000,
    tify: true,
    ghostMode: {
      scroll: false,
      clicks: false,
      location: false,
      forms: false,
    },
  });
}
function handleError(err) {
  console.log(err);
  this.emit("end");
}
function getTimeStamp() {
  var now = new Date();
  return (
    "[" +
    (now.getHours() +
      ":" +
      (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
      ":" +
      (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds())) +
    "]"
  );
}
// function _nodemon(cb) {
//   var started = false;
//   return nodemon({
//     // script: "--exec babel-node ./bin/www",
//     exec: "babel-node  ./bin/www",
//     env: {
//       NODE_ENV: process.env.process,
//     },
//     watch: "--exec babel-node ./bin/www",
//     ignore: [
//       // 'gulpfile.js',
//       "node_modules/",
//     ],
//   })
//     .on("start", function () {
//       if (!started) {
//         cb();
//         started = true;
//       }
//     })
//     .on("crash", function () {
//       console.error("Application has crashed!\n");
//       stream.emit("restart", 10); // restart the server in 10 seconds
//     })
//     .on("exit", function () {
//       if (!started) {
//         console.log("KILLING NODEMON PROCESS ID:" + process.pid);
//         process.kill(process.pid);
//       }
//       started = true;
//     });
// }

// const process_default = [
//   // `imgmin`,
//   // `sprite-and-sass`,
//   // `pollyfill`,
//   `scripts`,
//   `styles`,
//   // `watch`,
//   // `browser-sync`,
// ];

/**
 * // FIXME: 수정핊요
 * developemnt용 개발, development mode build watch
 */
// gulp.task("dev", process_default, () => {
//   console.log("Gulp is running: Development!");
//   infoConsole();
// });

// gulp.task("default", ["styles", "scripts"], () => {
//   console.log("Gulp is running: Development!");
//   // infoConsole();
// });
