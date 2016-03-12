/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>

/// <reference path='detail.ts'/>

namespace Mist {

  export namespace Recognizer {

    /**
    * @class Swipe
    * @namespace Recognizer
    */
    export class Swipe {

      /**
      * @access public
      * @static
      * @summary move per milliseconds
      */
      static mpms: number = 24;

      /**
      * @constructor
      * @param {} emitter
      */
      constructor(private emitter: Emitter) {

        new Emission(emitter, 'panend').when(

          function(response: Detail) {

            var s = Swipe.mpms / 2;
            var v = Swipe.mpms;

            // filt response.

            if (v < response.mpms) {

              emitter.emit('swipe', response);

              // filt response.

              if (s < (

                response.move.x *
                response.move.x

                ) / response.passed) {

                // dir response.

                if (response.move.x < 0) emitter.emit('swipeleft', response);
                if (response.move.x > 0) emitter.emit('swiperight', response);
              }

              // filt response.

              if (s < (

                response.move.y *
                response.move.y

                ) / response.passed) {

                // dir response.

                if (response.move.y < 0) emitter.emit('swipeup', response);
                if (response.move.y > 0) emitter.emit('swipedown', response);
              }
            }
          });
      }
    }
  }
}
