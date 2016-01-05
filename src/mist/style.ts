/// <reference path='frame.ts' />
/// <reference path='promise.ts' />
/// <reference path='statement.ts' />
/// <reference path='value.ts' />

/**
 * @copyright 2015 AI428
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

    /**
    * @access public
    */
    element: HTMLStyleElement;

    /**
    * @access private
    */
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

          var c = this.value.compose((o) => {

            // initialize.
            var response = dur > 0 ? {} : o[0];

            // composer.
            for (var name in css) {
              response[name] = css[name];
            }

            // dur response.
            if (dur > 0) {

              o.push(response);

              // lazy response.
              var c = Frame.on(() => {

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
              c.then(responsor);
            }

            // {} response.
            return o;
          });

          // passthru.
          dur > 0 || c.then(responsor);
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
        return [response];
      });
    }

    /**
    * @access private
    */
    private create() {

      if (!this.element) {

        var s = document.createElement('style');
        var t = document.createTextNode('');

        s.appendChild(t);

        document.head.appendChild(s);

        // initialize.
        this.element = s;
      }

      // lasting response.
      return this.element;
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
