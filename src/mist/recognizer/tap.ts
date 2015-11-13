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

        var m = new Emission(emitter, 'mouseup');
        var t = new Emission(emitter, 'touchend');

        var responsor = Promise.race([m, t]);

        responsor.when(

          function(e) {

            emitter.emit('tap', e);

            // loop response.
            m.resume();
            t.resume();
          });
      }
    }
  }
}
