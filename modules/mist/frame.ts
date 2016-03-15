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
    * @param {} responsor
    * @param {} delay
    */
    static at(responsor: () => void, delay: number = 0) {

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
    */
    static on(responsor: () => any, delay: number = 0): Promise {

      return new Promise((

        succeed,
        erred
        ) => {

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
            !!s.txs.push.apply(
              s.txs, o)) {

            requestAnimationFrame(composer);
          }
        })();
      })();
    }
  }
}
