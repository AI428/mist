/// <reference path='promise.ts'/>
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
module Mist {

  /**
  * @class Frame
  * @description gear
  */
  export class Frame {

    /**
    * @access private
    * @static
    */
    private static txd;
    private static txs = [];

    /**
    * @access public
    * @static
    */
    static on(responsor: () => any, delay: number = 0): Promise {

      return new Promise((

        resolver,
        rejector
        ) => {

        // initialize.
        var response = [];

        response.push(delay);
        response.push(function() {

          try {
            // commit response.
            resolver(responsor());

          } catch (e) {

            // fail response.
            rejector(e);
          }
        });

        this.txs.push(response);
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

        var _;

        // lazy response.
        (_ = () => {

          var p = [];
          var responsor;

          while (

            responsor = this.txs.pop()) {
            responsor[0]-- < 0 ? responsor[1]() : p.push(responsor);
          }

          // end response.
          this.txs.push.apply(
            this.txs, p) ? requestAnimationFrame(_) : (
              this.txd = false);
        })();
      })();
    }
  }
}
