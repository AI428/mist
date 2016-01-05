/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>

/**
 * @copyright 2015 AI428
 * @description statement for CSS in JS
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
module Mist {

  export module Recognizer {

    /**
    * @class Tap
    * @description recognizer
    */
    export class Tap {

      /**
      * @constructor
      * @param {} emitter
      */
      constructor(private emitter: Emitter) {

        new Emission(emitter, 'panend').when(

          function(e) {

            // as response.
            emitter.emit('tap', e);
          });
      }
    }
  }
}
