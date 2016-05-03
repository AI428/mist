/// <reference path='emitter.ts'/>
/// <reference path='promise.ts'/>

namespace Mist {

    /**
    * @class Emission
    * @summary emit listener
    */
    export class Emission extends Promise {

        /**
        * @constructor
        * @param {} emitter
        * @param {} name
        */
        constructor(

            private emitter: Emitter,
            private name: string) {

            super(function(

                succeed,
                erred
            ) {

                emitter.add(name, function(response) {

                    try {
                        // commit response.
                        succeed(response);

                    } catch (e) {

                        // fail response.
                        erred(e)
                    }
                });
            });
        }
    }
}
