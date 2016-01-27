'use strict';

var g = require('gulp');
var rename = require('gulp-rename');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');

var DIST_DIR = '';
var DIST_MIN_EXT = '.min.js';
var DIST_NAME = 'mist.js';
var NAME = 'modules/mist.ts';

g.task('default',

  function() {

    g.src(NAME)
      .pipe(
        typescript({
          out: DIST_NAME,
          target: 'ES5'
        })
      )
      .pipe(
        g.dest(
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
        g.dest(
          DIST_DIR
        )
      );
  });
