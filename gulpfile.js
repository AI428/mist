'use strict';

// globals modules.

var gulp = require('gulp');
var rename = require('gulp-rename');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');

// globals consts.

var DIST_DIR = '';
var DIST_MIN_EXT = '.min.js';
var DIST_NAME = 'mist.js';
var NAME = 'modules/mist.ts';

gulp.task('default',

  function() {

    gulp.src(NAME)
      .pipe(
        typescript({
          out: DIST_NAME,
          target: 'ES5'
        })
      )
      .pipe(
        gulp.dest(
          DIST_DIR
        )
      )
      .pipe(
        uglify({
          preserveComments: 'license'
        })
      )
      .pipe(
        rename({
          extname: DIST_MIN_EXT
        })
      )
      .pipe(
        gulp.dest(
          DIST_DIR
        )
      );
  });
