/// <reference path='frame.ts'/>
/// <reference path='promise.ts'/>

namespace Mist {

  /**
  * @class Value
  * @extends Promise
  */
  export class Value extends Promise {

    private xd: boolean;
    private xr: () => void;
    private xs: ((response: any) => void)[];

    /**
    * @access public
    */
    composite: any;

    /**
    * @constructor
    * @param {} composite
    */
    constructor(composite: any) {

      super((

        succeed,
        erred
        ) => {

        this.composite = composite;

        // initialize.
        this.xs = [];
        this.xr = (
          ) => {

          // begin response.
          this.xd || (() => {
            this.xd = true;

            // ser response.
            Frame.at(() => {

              var responsor: (response: any) => void;

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
    compose(composer: (composite: any) => any): Promise {

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
