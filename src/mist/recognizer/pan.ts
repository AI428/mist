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

        (function() {

          var m = new Emission(emitter, 'mousedown');
          var t = new Emission(emitter, 'touchstart');

          var responsor = Promise.race([m, t]);

          responsor.when(

            function(e) {

              emitter.emit('panstart', e);

              // begin response.
              txd = true;

              // loop response.
              m.resume();
              t.resume();
            });
        })();

        (function() {

          var m = new Emission(emitter, 'mousemove');
          var t = new Emission(emitter, 'touchmove');

          var responsor = Promise.race([m, t]);

          responsor.when(

            function(e) {

              if (txd) {

                emitter.emit('panmove', e);

                // dir response.
                if (e.movementX < 0) emitter.emit('panleft', e);
                if (e.movementX > 0) emitter.emit('panright', e);
                if (e.movementY < 0) emitter.emit('panup', e);
                if (e.movementY > 0) emitter.emit('pandown', e);
              }

              // loop response.
              m.resume();
              t.resume();
            });
        })();

        (function() {

          var m = new Emission(emitter, 'mouseout');
          var t = new Emission(emitter, 'touchleave');

          var responsor = Promise.race([m, t]);

          responsor.when(

            function(e) {

              if (txd) emitter.emit('panleave', e);

              // end response.
              txd = false;

              // loop response.
              m.resume();
              t.resume();
            });
        })();

        (function() {

          var m = new Emission(emitter, 'mouseup');
          var c = new Emission(emitter, 'touchcancel');
          var t = new Emission(emitter, 'touchend');

          var responsor = Promise.race([m, c, t]);

          responsor.when(

            function(e) {

              emitter.emit('panend', e);

              // end response.
              txd = false;

              // loop response.
              m.resume();
              c.resume();
              t.resume();
            });
        })();
      }
    }
  }
}
