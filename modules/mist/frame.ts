/// <reference path='promise.ts'/>

namespace Mist {

  /**
  * @class Frame
  * @summary queuer
  */
  export class Frame {

    private static txg: boolean;
    private static txs: (() => boolean)[] = [];

    /**
    * @access public
    * @static
    * @summary milliseconds per frame
    */
    static mspf: number = 1000 / 60;

    /**
    * @access public
    * @static
    * @summary timestamp
    */
    static times: number = 0;

    /**
    * @param {} responsor
    * @param {} delay
    */
    static at(responsor: () => void, delay: number = 0) {

      // queues.
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
    * @param {} responsor
    * @param {} delay
    * @return {}
    */
    static on(responsor: () => any, delay: number = 0): Promise {

      return new Promise((

        succeed,
        erred
        ) => {

        // queues.
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
    private static enter(responsor: FrameRequestCallback) {

      var s = this;
      var t = Date.now();

      // filt response.

      if (t - s.times > s.mspf) {

        s.times = t;

      } else {
        // no response.

        responsor = s.enter.bind(s, responsor);
      }

      requestAnimationFrame(responsor);
    }

    /**
    * @access private
    * @static
    */
    private static tx() {

      this.txg || (() => {
        this.txg = true;

        var s = this;

        (function composer() {

          // initialize.

          var o: (() => boolean)[] = [];

          var responsor: () => boolean;

          while (

            responsor = s.txs.shift()) {
            responsor() || o.push(responsor);
          }

          if (s.txg =
            s.txs.push.apply(
              s.txs, o) > 0) {

            s.enter(composer);
          }
        })();
      })();
    }
  }
}
