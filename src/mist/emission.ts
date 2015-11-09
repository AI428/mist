/// <reference path='emitter.ts'/>
/// <reference path='promise.ts'/>
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
module Mist {

  /**
  * @class Emission
  * @extends Promise
  */
  export class Emission extends Promise {

    /**
    * @constructor
    * @param {} emitter
    * @param {} name
    */
    constructor(

      private emitter: Emitter,
      private name: string) {

      super((

        resolver,
        rejector
        ) => {

        emitter.add(name, function(response) {

          try {
            // commit response.
            resolver(response);

          } catch (e) {

            // fail response.
            rejector(e)
          }
        });
      });
    }

    /**
    * @description for listener.
    */
    cancel() {

      this.then(
        null,
        null
        );
    }

    /**
    * @param {} resolver
    * @param {} rejector
    * @return {}
    */
    once(resolver: (response) => any,
      rejector?: (response) => any): Promise {

      // {} response.
      return this.then(

        (response) => {

          this.cancel();

          // commit response.
          return resolver(response);

        },

        (response) => {

          this.cancel();

          // fail response.
          return rejector(response);
        });
    }
  }
}
