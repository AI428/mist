/** common statement */

var gulp = require('gulp');
var rename = require('gulp-rename');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');

/** scoped statement */

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
