/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>

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
        this.enter();
        this.leave();
        this.move();
        this.start();
      }

      /**
      * @access private
      */
      private end() {

        var s = this;

        function responsor(e: any) {

          s.emitter.emit('panend', new Detail(e, s.txv));

          // end response.

          s.txd = false;
          s.txv = e;
        }

        new Emission(s.emitter, 'mouseup').when(responsor);
        new Emission(s.emitter, 'touchcancel').when(responsor);
        new Emission(s.emitter, 'touchend').when(prevent).when(responsor);
      }

      /**
      * @access private
      */
      private enter() {

        var s = this;

        function responsor(e: any) {

          s.emitter.emit('panenter', new Detail(e));

          // begin response.

          s.txd = true;
          s.txv = e;
        }

        new Emission(s.emitter, 'mouseenter').when(responsor);
        new Emission(s.emitter, 'touchenter').when(prevent).when(responsor);
      }

      /**
      * @access private
      */
      private leave() {

        var s = this;

        function responsor(e: any) {

          if (s.txd) {

            s.emitter.emit('panleave', new Detail(e, s.txv));

            // end response.

            s.txd = false;
            s.txv = e;
          }
        }

        new Emission(s.emitter, 'mouseout').when(responsor);
        new Emission(s.emitter, 'touchleave').when(prevent).when(responsor);
      }

      /**
      * @access private
      */
      private move() {

        var s = this;

        function responsor(e: any) {

          if (s.txd) {

            var r = new Detail(e, s.txv);

            // filt response.

            if (Pan.upper < r.vector) {

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

        new Emission(s.emitter, 'mousemove').when(responsor);
        new Emission(s.emitter, 'touchmove').when(prevent).when(responsor);
      }

      /**
      * @access private
      */
      private start() {

        var s = this;

        function responsor(e: any) {

          s.emitter.emit('panstart', new Detail(e));

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
