/// <reference path='promise.ts'/>

namespace Mist {

  /**
  * @class Frame
  * @summary queuer
  */
  export class Frame {

    /**
    * @access public
    * @static
    * @summary milliseconds per frame
    */
    static mspf: number = 1000 / 120;

    /**
    * @access public
    * @static
    * @summary timestamp
    */
    static times: number = 0;

    /**
    * @access private
    * @static
    */
    private static txd: boolean;
    private static txs: (() => boolean)[] = [];

    /**
    * @param {} responsor
    * @param {} delay
    */
    static at(responsor: () => void, delay: number = 0) {

      // patch response.
      this.txs.push(

        function() {

          var r = 0 > delay--;

          if (r) {

            // commit response.
            responsor();
          }

          return r;
        });

      this.tx();
    }

    /**
    * @param {} frames
    * @summary frames per second
    */
    static fps(frames: number) {

      this.mspf = 1000 / frames;
    }

    /**
    * @param {} responsor
    * @param {} delay
    * @return {}
    */
    static on(responsor: () => any, delay: number = 0): Promise {

      return new Promise((

        succeed,
        erred
        ) => {

        // patch response.
        this.txs.push(

          function() {

            var r = 0 > delay--;

            if (r) {

              try {
                // commit response.
                succeed(responsor());

              } catch (e) {

                // fail response.
                erred(e);
              }
            }

            return r;
          });

        this.tx();
      });
    }

    /**
    * @access private
    * @static
    */
    private static request(responsor: FrameRequestCallback) {

      var s = this;
      var t = Date.now();

      // filt response.
      if (t - s.times > s.mspf) {

        s.times = t;

      } else {
        // skip response.
        responsor = s.request.bind(s, responsor);
      }

      requestAnimationFrame(responsor);
    }

    /**
    * @access private
    * @static
    */
    private static tx() {

      this.txd || (() => {
        this.txd = true;

        var s = this;

        (function composer() {

          // initialize.

          var o: (() => boolean)[] = [];

          var responsor: () => boolean;

          while (

            responsor = s.txs.pop()) {
            responsor() || o.push(responsor);
          }

          if (s.txd
            = s.txs.push.apply(
              s.txs,
              o
              ) > 0
            ) {

            s.request(composer);
          }
        })();
      })();
    }
  }
}
