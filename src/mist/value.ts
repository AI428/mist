/// <reference path='promise.ts'/>
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
module Mist {

  /**
  * @class Value
  * @extends Promise
  */
  export class Value extends Promise {

    private txd;
    private txr;
    private txs;

    /**
    * @access public
    */
    composite;

    /**
    * @constructor
    * @param {} composite
    */
    constructor(composite) {

      this.composite = composite;
      this.txs = [];

      super((

        resolver,
        rejector
        ) => {

        // initialize.
        this.txr = (
          ) => {

          // begin response.
          this.txd || (() => {
            this.txd = true;

            // lazy response.
            Frame.on(() => {

              var responsor;

              try {
                // commit response.
                resolver(this.composite);

              } catch (e) {

                // fail response.
                rejector(e);
              }

              while (

                responsor = this.txs.pop()) {
                responsor(this.composite);
              }

              // end response.
              this.txd = false;
            });
          })();
        }
      });
    }

    /**
    * @param {} composer
    * @return {}
    */
    compose(composer: (composite) => any): Promise {

      return new Promise(

        (responsor) => {

          // lazy response.
          Frame.on(() => {

            // a response.
            this.composite = composer(this.composite);

            // patch response.
            this.txs.push(responsor);
            this.txr();
          });
        });
    }
  }
}
