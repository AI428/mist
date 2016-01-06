/// <reference path='emitter.ts'/>
/// <reference path='promise.ts'/>

/**
 * @copyright AI428
 * @description statement for CSS in JS
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

        succeed,
        erred
        ) => {

        emitter.add(name, function(response) {

          try {
            // commit response.
            succeed(response);

          } catch (e) {

            // fail response.
            erred(e)
          }
        });
      });
    }
  }
}
