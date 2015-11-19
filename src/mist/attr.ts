/// <reference path='promise.ts' />
/// <reference path='statement.ts' />
/// <reference path='value.ts' />

/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
module Mist {

  /**
  * @class Attr
  * @description accessor
  */
  export class Attr {

    private value: Value;

    /**
    * @constructor
    * @param {} statement
    */
    constructor(private statement: Statement) {

      this.value = new Value({});
      this.value.when(

        function(o) {

          for (var name in o) {

            switch (o[name]) {

              case undefined:

                statement.each(

                  function(e) {

                    // bind response.
                    e.removeAttribute(name);
                  });

                // initialize.
                delete o[name];

                break;
              default:

                statement.each(

                  function(e) {

                    // bind response.
                    e.setAttribute(name, o[name]);
                  });
            }
          }
        });
    }

    /**
    * @param {} attr
    * @return {}
    */
    add(attr): Promise {

      return this.value.compose(function(o) {

        // composer.
        for (var name in attr) {

          // mapped response.
          o[name] = attr[name];
        }

        // {} response.
        return o;
      });
    }

    /**
    * @description mapped attr
    * @return {}
    */
    get(): any {

      // {} response.
      return this.value.composite;
    }

    /**
    * @param {} names
    * @return {}
    */
    remove(names): Promise {

      return this.value.compose(function(o) {

        // composer.
        names.forEach(function(name) {

          // tagged response.
          o[name] = undefined;
        });

        // {} response.
        return o;
      });
    }
  }
}
