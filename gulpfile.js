'use strict';

var g = require('gulp');
var r = require('gulp-rename');
var t = require('gulp-typescript');
var u = require('gulp-uglify');

var dist_dir = 'dist';
var dist_min_ext = '.min.js';
var dist_name = 'mist.js';
var name = 'modules/mist.ts';

g.task('declare',

  function() {

    // initialize.

    var m = g.dest(dist_dir);

    g.src(name).pipe(t({

      // tsc response.
      declaration: true,
      out: dist_name

    })).dts.pipe(m);
  });

g.task('default',

  function() {

    // initialize.

    var m = g.dest(dist_dir);
    var n = g.dest(dist_dir);

    g.src(name).pipe(t({

      // tcs response.
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
