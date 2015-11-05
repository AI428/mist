/*!
 * @copyright 2015 AI428
 * @description for asynchronous multi-gesture.
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
      .pipe(gulp_typescript({
        out: 'mist.js',
        target: 'ES5'
      }))
      // modules/mist.js
      .pipe(gulp.dest('modules/'))
      .pipe(gulp_uglify({
        preserveComments: 'some'
      }))
      .pipe(gulp_rename({
        extname: '.min.js'
      }))
      // modules/mist.min.js
      .pipe(gulp.dest('modules/'));
  });
