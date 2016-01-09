'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');

gulp.task('default',

  function() {

    gulp.src('modules/mist.ts')
      .pipe(
        typescript({
          out: 'mist.js',
          target: 'ES5'
        })
      )
      .pipe(
        gulp.dest(
          ''
        )
      )
      .pipe(
        uglify({
          preserveComments: 'license'
        })
      )
      .pipe(
        rename({
          extname: '.min.js'
        })
      )
      .pipe(
        gulp.dest(
          ''
        )
      );
  });
