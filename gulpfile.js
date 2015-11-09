/*!
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
var gulp = require('gulp');
var gulp_rename = require('gulp-rename');
var gulp_typescript = require('gulp-typescript');
var gulp_uglify = require('gulp-uglify');

// def response.

gulp.task('default',

  function() {

    gulp.src('src/mist.ts')
      .pipe(
        gulp_typescript({
          out: 'mist.js',
          target: 'ES5'
        })
      )
      .pipe(
        gulp.dest('modules/')
      )
      .pipe(
        gulp_uglify({
          preserveComments: 'license'
        })
      )
      .pipe(
        gulp_rename({
          extname: '.min.js'
        })
      )
      .pipe(
        gulp.dest('modules/')
      );
  });
