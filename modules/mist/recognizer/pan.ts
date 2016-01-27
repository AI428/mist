/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>

module Mist {

  export module Recognizer {

    /**
    * @class Pan
    * @module recognizer
    */
    export class Pan {

      /**
      * @access public
      * @static
      */
      static upper: number = 10;

      /**
      * @constructor
      * @param {} emitter
      */
      constructor(private emitter: Emitter) {

        var txd = false;
        var txv;

        (function() {

          function responsor(e) {

            emitter.emit('panstart', mat(e));

            // begin response.
            txd = true;
            txv = e;
          }

          new Emission(emitter, 'mousedown').when(responsor);
          new Emission(emitter, 'touchstart').when(

            function(e) {

              e.preventDefault();

              // passthru.
              return e;

            }).when(responsor);
        })();

        (function() {

          function responsor(e) {

            if (txd) {

              var m = mat(e, txv);

              // filt response.
              if (Pan.upper < m.transV) {

                emitter.emit('panmove', m);

                // dir response.
                if (m.transX < 0) emitter.emit('panleft', m);
                if (m.transX > 0) emitter.emit('panright', m);
                if (m.transY < 0) emitter.emit('panup', m);
                if (m.transY > 0) emitter.emit('pandown', m);

                txv = e;
              }
            }
          }

          new Emission(emitter, 'mousemove').when(responsor);
          new Emission(emitter, 'touchmove').when(

            function(e) {

              e.preventDefault();

              // passthru.
              return e;

            }).when(responsor);
        })();

        (function() {

          function responsor(e) {

            if (txd) {

              emitter.emit('panleave', mat(e, txv));

              // end response.
              txd = false;
              txv = e;
            }
          }

          new Emission(emitter, 'mouseout').when(responsor);
          new Emission(emitter, 'touchleave').when(

            function(e) {

              e.preventDefault();

              // passthru.
              return e;

            }).when(responsor);
        })();

        (function() {

          function responsor(e) {

            emitter.emit('panend', mat(e, txv));

            // end response.
            txd = false;
            txv = e;
          }

          new Emission(emitter, 'mouseup').when(responsor);
          new Emission(emitter, 'touchcancel').when(responsor);
          new Emission(emitter, 'touchend').when(

            function(e) {

              e.preventDefault();

              // passthru.
              return e;

            }).when(responsor);
        })();
      }
    }

    /**
    * @access private
    * @static
    */
    function mat(e, prev?) {

      var response;

      // trans mseconds.
      var s = prev ? e.timeStamp - prev.timeStamp : 0;

      var x = 0;
      var y = 0;

      switch (e.type) {

        case 'mousedown':
        case 'mousemove':
        case 'mouseout':
        case 'mouseup':

          // initialize.
          response = e;

          if (prev) {

            // trans response.
            x = response.pageX - prev.pageX;
            y = response.pageY - prev.pageY;
          }

          break;
        case 'touchcancel':
        case 'touchend':
        case 'touchleave':
        case 'touchmove':
        case 'touchstart':

          // initialize.
          response = e.changedTouches[0];

          if (prev) {

            var o = prev.changedTouches[0];

            // trans response.
            x = response.pageX - o.pageX;
            y = response.pageY - o.pageY;
          }

          break;
      }

      // trans response.
      var v = Math.sqrt(x * x + y * y);

      // {} response.
      return {

        // :number
        clientX: response.clientX,
        clientY: response.clientY,

        // :number
        pageX: response.pageX,
        pageY: response.pageY,

        // :number
        screenX: response.screenX,
        screenY: response.screenY,

        // :Event
        src: e,

        // :Element
        target: response.target,

        // :number
        tpms: s ? v / s : 0,

        // :number
        transTime: s,

        // :number
        transV: v,
        transX: x,
        transY: y
      };
    }
  }
}
