/// <reference path='voker.ts'/>

namespace Mist {

  export namespace Wrapper {

    /**
    * @class Timer
    * @namespace Wrapper
    */
    export class Timer extends Voker {

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

            function responsor() {

              try {
                // commit response.
                succeed(composer.apply(composer, o));

              } catch (e) {

                // fail response.
                erred(e);
              }
            }

            // lazy response.
            !s.dur || setTimeout(responsor, s.dur);
          });
      }
    }
  }
}
