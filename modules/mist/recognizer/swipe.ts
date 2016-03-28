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

      private txg: boolean;
      private txv: Detail;

      /**
      * @access public
      * @static
      * @summary move per milliseconds
      */
      static mpms: number = 0.8;

      /**
      * @access public
      * @static
      * @summary passed times
      */
      static passed: number = 64;

      /**
      * @constructor
      * @param {} emitter
      */
      constructor(private emitter: Emitter) {

        this.end();
        this.move();
      }

      /**
      * @access private
      */
      private end() {

        var s = this

        new Emission(s.emitter, 'panend').when(

          function(response: Detail) {

            if (s.txg) {

              var r = s.txv.diff(response.src);

              // filt response.

              if (Swipe.passed > r.passed) {

                s.emitter.emit('swipe', r);

                // dir response.

                var x = r.move.x * r.move.x;
                var y = r.move.y * r.move.y;

                if (x < y) {

                  // dir response.

                  if (r.move.y < 0) s.emitter.emit('swipeup', r);
                  if (r.move.y > 0) s.emitter.emit('swipedown', r);

                } else {

                  // dir response.

                  if (r.move.x < 0) s.emitter.emit('swipeleft', r);
                  if (r.move.x > 0) s.emitter.emit('swiperight', r);
                }
              }

              s.txg = false;
            }
          });
      }

      /**
      * @access private
      */
      private move() {

        var s = this;

        new Emission(s.emitter, 'panmove').when(

          function(response: Detail) {

            if (!s.txg) {

              // filt response.

              if (Swipe.mpms < response.mpms) {

                s.txv = response;
                s.txg = true;
              }
            }
          });
      }
    }
  }
}
