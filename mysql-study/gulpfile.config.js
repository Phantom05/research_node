const assets = {
  src: "./public/src",
  dist: "./public/dist",
  routes: "./routes/**/*.js",
  app: "./app.js",
  clean: "./public/dist/*",
};
const paths = {
  styles: {
    src: `${assets.src}/scss/**/*.{scss,css}`,
    dist: `${assets.dist}/styles`,
    common_src: `${assets.src}/scss/common/**/*.{scss,css}`,
    common_dist: `${assets.dist}/styles/common`,
  },
  js: {
    src: `${assets.src}/js/**/*.js`,
    dist: `${assets.dist}/js`,
    common_src: `${assets.src}/js/common/modules/**/*.js`,
    common_dist: `${assets.dist}/js/common`,
  },
  ejs: {
    src: `./views/**/*.{ejs,html,htm}`,
    // dist: `${assets.dist}/ejs`
    dist: `./views/dist`,
  },
  img: {
    src: `${assets.src}/img/**/*.{png,jpg,svg,jpeg,gif,ico}`,
    dist: `${assets.dist}/img`,
    sprite_src: `${assets.src}/img/img-sprites/**/*.{jpg,png,gif,svg}`,
  },
  lib: {
    testsrc: `./lib/src/**/*.*`,
    testdist: `./lib/dist`,
    src: `${__dirname}/src/**/*.js`,
    dist: `${__dirname}/dist`,
  },
};

/**
 * Setting here
 */
const setting = {
  styles: {
    scss_option: {
      outputStyle: "compressed",
      indentType: "tab",
      indentWidth: 1,
      precision: 3,
      sourceComments: false,
      errLogToConsole: true,
      // importer: moduleImporter({ basedir: path.join(__dirname, 'public/src/assets/scss/') })
      includePaths: [paths.styles.src],
    },
    rootFontSize: 16,
  },
  scripts: {
    gulp_babel_minify: {
      mangle: {
        keepClassName: false,
        booleans: false,
        deadcode: true,
        simplify: true,
        removeConsole: true,
        numericLiterals: true,
      },
    },
  },
};

module.exports = {
  paths,
  assets,
  setting,
};
