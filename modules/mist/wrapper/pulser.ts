/// <reference path='voker.ts'/>

namespace Mist {

  export namespace Wrapper {

    /**
    * @class Pulser
    * @namespace Wrapper
    */
    export class Pulser extends Voker {

      /**
      * @constructor
      * @param {} component
      * @param {} dur
      */
      constructor(component: any, public dur: number = 0) {

        super(component);
      }

      /**
      * @param {} composer
      * @param {} o
      */
      compose$(composer: any, o: any[]) {

        var s = this;

        return new Promise(

          function(

            succeed,
            erred
            ) {

            (function responsor() {

              try {
                // commit response.
                succeed(composer.apply(composer, o));

                // lazy response.
                !s.dur || setTimeout(responsor, s.dur);

              } catch (e) {

                // fail response.
                erred(e);
              }
            })();
          });
      }
    }
  }
}
