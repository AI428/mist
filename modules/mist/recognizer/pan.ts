/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>
/// <reference path='../statement.ts'/>

/// <reference path='detail.ts'/>

namespace Mist {

  export namespace Recognizer {

    /**
    * @class Pan
    * @namespace Recognizer
    */
    export class Pan {

      private txd: boolean;
      private txv: any;

      /**
      * @access public
      * @static
      * @summary for error
      */
      static upper: number = 10;

      /**
      * @constructor
      * @param {} emitter
      */
      constructor(private emitter: Emitter) {

        this.end();
        this.move();
        this.start();
      }

      /**
      * @access private
      */
      private end() {

        var s = this;

        function responsor(e: any) {

          var r = new Detail(e, s.txv);

          s.emitter.emit('pan', r);
          s.emitter.emit('panend', r);

          // end response.

          s.txd = false;
          s.txv = e;
        }

        new Emission(Component.create<Emitter>(Emitter, '*'), 'mouseup').when(responsor);
        new Emission(s.emitter, 'touchend').when(prevent).when(responsor);
      }

      /**
      * @access private
      */
      private move() {

        var s = this;

        function responsor(e: any) {

          if (s.txd) {

            var r = new Detail(e, s.txv);

            // left mouseover.

            var x = r.client.x;
            var y = r.client.y;

            if (document.elementFromPoint(x, y) == r.src.target) {

              // filt response.

              if (Pan.upper < r.vector) {

                s.emitter.emit('pan', r);
                s.emitter.emit('panmove', r);

                // dir response.

                if (r.move.x < 0) s.emitter.emit('panleft', r);
                if (r.move.x > 0) s.emitter.emit('panright', r);
                if (r.move.y < 0) s.emitter.emit('panup', r);
                if (r.move.y > 0) s.emitter.emit('pandown', r);

                s.txv = e;
              }
            }
          }
        }

        new Emission(s.emitter, 'mousemove').when(responsor);
        new Emission(s.emitter, 'touchmove').when(prevent).when(responsor);
      }

      /**
      * @access private
      */
      private start() {

        var s = this;

        function responsor(e: any) {

          var r = new Detail(e);

          s.emitter.emit('pan', r);
          s.emitter.emit('panstart', r);

          // begin response.

          s.txd = true;
          s.txv = e;
        }

        new Emission(s.emitter, 'mousedown').when(responsor);
        new Emission(s.emitter, 'touchstart').when(prevent).when(responsor);
      }
    }

    /**
    * @access private
    * @static
    */
    function prevent(e: Event) {

      e.preventDefault();

      // passthru.
      return e;
    }
  }
}
