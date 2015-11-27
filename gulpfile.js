/**
 * @copyright 2015 AI428
 * @description statement for CSS in JS
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
var gulp = require('gulp');
var rename = require('gulp-rename');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');

// def response.

gulp.task('default',

  function() {

    gulp.src('src/mist.ts')
      .pipe(
        typescript({
          out: 'mist.js',
          target: 'ES5'
        })
      )
      .pipe(
        gulp.dest(
          'modules/'
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
          'modules/'
        )
      );
  });
