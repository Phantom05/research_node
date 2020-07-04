// const gulp = require("gulp");
// const sass = require("gulp-sass");
// const babel = require("gulp-babel");
// const browserSync = require("browser-sync").create();
// const reload = browserSync.reload;
// const nodemon = require("gulp-nodemon");
// const { paths, assets, setting } = require("./gulpfile.config");

// function build_styles(){
//   return gulp.src(paths.styles.src)
//   .pipe(sourcemaps.init())
//   // .pipe(sassGlob())
//   .pipe(sass(setting.styles.scss_option).on('error', sass.logError))
//   // .pipe(sourcemaps.write())
//   // .pipe(autoprefixer('last 2 versions'))
//   // .pipe(rename({ extname: '.min.css' }))
//   .pipe(gulp.dest(paths.styles.dist))
//   .on('end', () => {
//     console.log('build styles');
//     reload();
//   })
// }

// function build_scrips(){
//   return gulp.src(
//     [
//       paths.js.src,
//       `!${paths.js.common_src}`,
//       `${assets.src}/js/common/main.js`,
//     ])
//     .pipe(_cache.filter())
//     .pipe(babel().on('error', handleError))
//     .pipe(rename({ extname: '.min.js' }))
//     .pipe(_cache.cache())
//     .pipe(gulp.dest(paths.js.dist))
//     .on("end", () => {
//       console.log('build scripts');
//       reload()
//     })
// }
