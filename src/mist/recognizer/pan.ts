/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>

module Mist {

  export module Recognizer {

    /**
    * @class Pan
    * @description recognizer
    */
    export class Pan {

      /**
      * @access public
      * @static
      */
      static err: number = 2;

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
              if (Pan.err < Math.sqrt((

                m.transX *
                m.transX
                ) + (
                  m.transY *
                  m.transY
                  ))) {

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

              emitter.emit('panleave', mat(e));

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

            emitter.emit('panend', mat(e));

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

            x = response.pageX - o.pageX;
            y = response.pageY - o.pageY;
          }

          break;
      }

      // {} response.
      return {

        clientX: response.clientX,
        clientY: response.clientY,

        pageX: response.pageX,
        pageY: response.pageY,

        screenX: response.screenX,
        screenY: response.screenY,

        src: e,

        target: response.target,

        transX: x,
        transY: y
      };
    }
  }
}
