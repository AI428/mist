'use strict';

var g = require('gulp');
var r = require('gulp-rename');
var t = require('gulp-typescript');
var u = require('gulp-uglify');

var dist_dir = '';
var dist_min_ext = '.min.js';
var dist_name = 'mist.js';
var name = 'modules/mist.ts';

g.task('default',

  function() {

    // initialize.

    var m = g.dest(dist_dir);
    var n = g.dest(dist_dir);

    // main.

    g.src(name).pipe(t({

      // ts response.
      noImplicitAny: true,
      out: dist_name,
      target: 'ES5'

    })).pipe(n).pipe(u({

      // uglify response.
      preserveComments: 'license'

    })).pipe(r({

      // rename response.
      extname: dist_min_ext

    })).pipe(m);
  });
