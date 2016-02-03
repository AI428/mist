/// <reference path='frame.ts' />
/// <reference path='promise.ts' />
/// <reference path='statement.ts' />
/// <reference path='value.ts' />

namespace Mist {

  /**
  * @class Style
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

        (o: CSSStyleDeclaration[]) => {

          var response = o.map(

            function(p) {

              var response: string[] = [];

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
    add(css: any, dur: number = 0): Promise {

      return new Promise((responsor) => {

        var s = this;
        var r = s.value.compose(

          function(o) {

            // initialize.
            var response = dur > 0 ? {} : o[0];

            // composer.
            for (let name in css) {

              if (css[name] instanceof Promise) {

                function composer(

                  name: string,
                  v: string
                  ) {

                  // initialize.
                  var response: any = {};

                  response[name] = v;

                  // no response.
                  s.add(response, dur);
                }

                // lazy response.
                css[name].when(composer.bind(s, name));

              } else {
                // passthru.
                response[name] = css[name];
              }
            }

            // dur response.
            if (dur > 0) {

              o.push(response);

              // lazy response.
              var r = Frame.on(

                function() {

                  return s.value.compose(

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
    * @return {}
    * @summary scoped
    */
    get(): any {

      var response: any = {};

      this.value.composite.forEach(

        function(css: CSSStyleDeclaration) {

          // composer.
          for (let name in css) {

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
    set(css: CSSStyleDeclaration): Promise {

      return this.value.compose(

        function() {

          // initialize.
          var response: any = [{}];

          // composer.
          for (let name in css) {

            response[0][name] = css[name];
          }

          // [] response.
          return response;
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
  function hycase(name: string) {

    // hy response.
    return name.replace(/[A-Z]/g, function(m) {
      return '-' + m.toLowerCase();
    });
  }
}
