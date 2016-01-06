/// <reference path='frame.ts' />
/// <reference path='promise.ts' />
/// <reference path='statement.ts' />
/// <reference path='value.ts' />

/**
 * @copyright AI428
 * @description statement for CSS in JS
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
module Mist {

  /**
  * @class Style
  * @description accessor
  */
  export class Style {

    private e: HTMLStyleElement;
    private value: Value;

    /**
    * @constructor
    * @param {} statement
    */
    constructor(private statement: Statement) {

      this.value = new Value([{}]);
      this.value.when(

        (o) => {

          var response = o.map(

            function(p) {

              var response = [];

              // format response.
              for (var name in p) {
                response.push(hycase(name) + ':' + p[name]);
              }

              // a response.
              return statement.selector()
                + '{'
                + response.join(';')
                + '}'
                ;
            });

          // inner response.
          this.create().innerHTML = response.join('');
        });
    }

    /**
    * @param {} css
    * @param {} dur
    * @return {}
    */
    add(css, dur: number = 0): Promise {

      return new Promise(

        (responsor) => {

          var r = this.value.compose((o) => {

            // initialize.
            var response = dur > 0 ? {} : o[0];

            // composer.
            for (var name in css) {

              if (css[name] instanceof Promise) {

                // lazy response.
                css[name].when(

                  (v) => {
                    // initialize.
                    var response = {};

                    response[name] = v;

                    // a response.
                    this.add(response, dur);
                  });

              } else {
                // passthru.
                response[name] = css[name];
              }
            }

            // dur response.
            if (dur > 0) {

              o.push(response);

              // lazy response.
              var r = Frame.on(() => {

                return this.value.compose(

                  function(o) {

                    // composer.
                    var i = o.indexOf(response);
                    i < 0 || o.splice(i, 1);

                    // [] response.
                    return o;
                  });

              }, dur);

              // [] response.
              r.then(responsor);
            }

            // {} response.
            return o;
          });

          // passthru.
          dur > 0 || r.then(responsor);
        });
    }

    /**
    * @description scoped style
    * @return {}
    */
    get(): any {

      var response = {};

      this.value.composite.forEach(

        function(css) {

          // composer.
          for (var name in css) {
            response[name] = css[name];
          }
        });

      // {} response.
      return response;
    }

    /**
    * @param {} css
    * @return {}
    */
    set(css): Promise {

      return this.value.compose(function() {

        var response = {};

        // composer.
        for (var name in css) {
          response[name] = css[name];
        }

        // [] response.
        return [
          response
        ];
      });
    }

    /**
    * @access private
    */
    private create() {

      if (!this.e) {

        var s = document.createElement('style');
        var t = document.createTextNode('');

        s.appendChild(t);

        document.head.appendChild(s);

        this.e = s;
      }

      // lasting response.
      return this.e;
    }
  }

  /**
  * @access private
  * @static
  */
  function hycase(name) {

    // hy response.
    return name.replace(/[A-Z]/g, function(m) {
      return '-' + m.toLowerCase();
    });
  }
}
