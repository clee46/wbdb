const gulp = require('gulp');
const mocha = require('gulp-mocha');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');

const webpack = require('webpack-stream');

const scripts = ['server.js', 'gulpfile.js', 'lib/*.js', 'models/*.js',
  'routes/*.js', 'test/**/*.js', 'app/**/*.js', '!test/client/test_bundle.js',
  '!app/js/vendor/*'];
const clientScripts = ['app/**/*.js'];
const staticFiles = ['app/**/*.html', 'app/images/*', 'app/fonts/*'];
const sassFiles = ['app/scss/*.scss'];

gulp.task('static:dev', () => {
  gulp.src(staticFiles, { 'base': 'app' })
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('test:server', () => {
  gulp.src('./test-server/*.js')
    .pipe(mocha());
});

gulp.task('sass:dev', () => {
  gulp.src(sassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(clean({ debug: true }, (details) => {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'));
});

gulp.task('webpack:dev', () => {
  gulp.src('app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', () => {
  gulp.src('test/test_entry.js')
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      },
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/'));
});

gulp.task('lint', () => {
  return gulp.src(scripts)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', () => {
  gulp.watch(scripts, ['lint', 'test:server']);
  gulp.watch(clientScripts, ['webpack:dev']);
  gulp.watch(staticFiles, ['static:dev']);
  gulp.watch(sassFiles, ['sass:dev']);
});

gulp.task('build:dev', ['lint', 'static:dev', 'sass:dev', 'webpack:dev', 'test:server']);
gulp.task('default', ['watch', 'build:dev']);
