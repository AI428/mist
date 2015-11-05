/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
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

        Promise.race([

          new Emission(emitter, 'mouseup'),
          new Emission(emitter, 'touchend')

        ]).then(

          function(e) {

            emitter.emit('tap', e);
          });
      }
    }
  }
}
