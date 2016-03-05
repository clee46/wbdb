const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

const webpack = require('webpack-stream');
const babel = require('babel-loader');
const html = require('html-loader');

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('sass:dev', () => {
  gulp.src(__dirname + '/app/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(clean({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(__dirname + '/build/css'));
});

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/client.js')
    .pipe(webpack({
      output: {
          filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/js/'));
});

gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/test_entry.js')
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      },
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/'));
});

gulp.task('build:dev', ['webpack:dev', 'webpack:test', 'html:dev', 'sass:dev']);
gulp.task('default', ['build:dev']);
