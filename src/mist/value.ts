/// <reference path='frame.ts'/>
/// <reference path='promise.ts'/>

/**
 * @copyright AI428
 * @description statement for CSS in JS
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
module Mist {

  /**
  * @class Value
  * @extends Promise
  */
  export class Value extends Promise {

    private xd;
    private xr;
    private xs;

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
      this.xs = [];

      super((

        succeed,
        erred
        ) => {

        // initialize.
        this.xr = (
          ) => {

          // begin response.
          this.xd || (() => {
            this.xd = true;

            // ser response.
            Frame.at(() => {

              var responsor;

              try {
                // commit response.
                succeed(this.composite);

              } catch (e) {

                // fail response.
                erred(e);
              }

              while (

                responsor = this.xs.pop()) {
                responsor(this.composite);
              }

              // end response.
              this.xd = false;
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

          // ser response.
          Frame.at(() => {

            // a response.
            this.composite = composer(this.composite);

            // patch response.
            this.xs.push(responsor);
            this.xr();
          });
        });
    }
  }
}
