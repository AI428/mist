/// <reference path='promise.ts'/>

namespace Mist {

  /**
  * @class Frame
  * @summary queuer
  */
  export class Frame {

    static txd: boolean;
    static txs: (() => boolean)[] = [];

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
    private static tx() {

      // begin response.

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

          // end response.

          if (s.txd =
            s.txs.push.apply(
              s.txs, o
              ) > 0
            ) {

            // re response.

            requestAnimationFrame(composer);
          }
        })();
      })();
    }
  }
}
