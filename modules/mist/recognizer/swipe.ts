/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>

module Mist {

  export module Recognizer {

    /**
    * @class Swipe
    * @module recognizer
    */
    export class Swipe {

      /**
      * @access public
      * @static
      */
      static tpms: number = 0.65;

      /**
      * @constructor
      * @param {} emitter
      */
      constructor(private emitter: Emitter) {

        new Emission(emitter, 'panend').when(

          function(m) {

            var s = Swipe.tpms / Math.SQRT2;
            var v = Swipe.tpms;

            // filt response.

            if (v < m.tpms) {

              emitter.emit('swipe', m);

              // filt response.

              if (s < Math.sqrt((

                m.transX *
                m.transX

                )) / m.transTime) {

                // dir response.

                if (m.transX < 0) emitter.emit('swipeleft', m);
                if (m.transX > 0) emitter.emit('swiperight', m);
              }

              // filt response.

              if (s < Math.sqrt((

                m.transY *
                m.transY

                )) / m.transTime) {

                // dir response.

                if (m.transY < 0) emitter.emit('swipeup', m);
                if (m.transY > 0) emitter.emit('swipedown', m);
              }
            }
          });
      }
    }
  }
}
