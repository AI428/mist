/// <reference path='frame.ts'/>
/// <reference path='promise.ts'/>

namespace Mist {

  /**
  * @class Value
  * @extends Promise
  */
  export class Value extends Promise {

    private xg: boolean;
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

        this.xs = [];
        this.xr = (
          ) => {

          this.xg || (() => {
            this.xg = true;

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

              // end.
              this.xg = false;
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

            // queues.
            this.xs.push(responsor);
            this.xr();
          });
        });
    }
  }
}
