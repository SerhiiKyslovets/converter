'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const rimraf = require('rimraf');
const sass = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');

const config = {
  server: {
      baseDir: "./dist",
      routes: {
        "/bower_components": "bower_components"
      }
  },
  online: true,
  tunel: true,
  host: 'localhost',
  port: 9000,
  open: 'local'
};

const path = {
  src: {
    html: "./src/*.html",
    styles: "./src/styles/main.sass",
    js: "./src/js/**/*.js",
    img: "./src/img/**/*.*"
  },
  dist: {
    html: "./dist/",
    styles: "./dist/styles/",
    js: "./dist/js/",
    img: "./dist/img/"
  },
  watch: {
    html: "./src/**/*.html",
    styles: "./src/styles/**/*.sass",
    js: "./src/js/**/*.js",
    img: "./src/img/"
  },

  clear: "./dist"
};

gulp.task('clear', function (cb) {
  rimraf(path.clear, cb);
});

gulp.task('html', function () {
  return gulp.src(path.src.html)
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('styles', function () {
  return gulp.src(path.src.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer('last 2 versions'))
    .pipe(gulp.dest(path.dist.styles))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
  gulp.src(path.src.js)
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('img', function () {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.dist.img));
})

gulp.task('server', ['compile'], function () {
  browserSync.init(config);

  gulp.watch([path.watch.html], ['html']).on('change', browserSync.reload);
  gulp.watch([path.watch.styles], ['styles']);
  gulp.watch([path.watch.js], ['js']).on('change', browserSync.reload);
  gulp.watch([path.watch.img], ['img']);
});

gulp.task('compile', ['html', 'styles', 'js', 'img']);
gulp.task('default', ['server']);
