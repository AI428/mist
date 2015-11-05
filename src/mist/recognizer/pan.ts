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
    * @class Pan
    * @description recognizer
    */
    export class Pan {

      /**
      * @constructor
      * @param {} emitter
      */
      constructor(private emitter: Emitter) {

        // initialize.
        var txd = false;

        Promise.race([

          new Emission(emitter, 'mousedown'),
          new Emission(emitter, 'touchstart')

        ]).then(

          function(e) {

            emitter.emit('panstart', e);

            // begin response.
            txd = true;
          });

        Promise.race([

          new Emission(emitter, 'mousemove'),
          new Emission(emitter, 'touchmove')

        ]).then(

          function(e) {

            if (txd) {

              emitter.emit('panmove', e);

              // dir response.
              if (e.movementX < 0) emitter.emit('panleft', e);
              if (e.movementX > 0) emitter.emit('panright', e);
              if (e.movementY < 0) emitter.emit('panup', e);
              if (e.movementY > 0) emitter.emit('pandown', e);
            }
          });

        Promise.race([

          new Emission(emitter, 'mouseup'),
          new Emission(emitter, 'touchcancel'),
          new Emission(emitter, 'touchend')

        ]).then(

          function(e) {

            emitter.emit('panend', e);

            // end reponse.
            txd = false;
          });
      }
    }
  }
}
