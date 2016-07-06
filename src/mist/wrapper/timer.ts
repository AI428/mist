/// <reference path='../promise.ts'/>

/// <reference path='voker.ts'/>

namespace Mist {

    export namespace Wrapper {

        /**
        * @class Timer
        */
        export class Timer extends Voker {

            /**
            * @access private
            */
            private id$: number = 0;

            /**
            * @constructor
            * @param {} component
            * @param {} dur
            */
            constructor(component: any, private dur$: number = 0) {

                super(component);
            }

            /**
            * @summary for reuse
            */
            stop() {

                clearTimeout(this.id$);
            }


            /**
            * @param {} composer
            * @param {} o
            */
            protected compose$(composer: any, o: any[]) {

                var s = this;

                // ser

                s.stop();

                // {} response

                return new Promise(

                    function(

                        succeed,
                        erred
                    ) {

                        function responsor() {

                            try {
                                // commit response
                                succeed(composer.apply(composer, o));

                            } catch (e) {

                                // fail response
                                erred(e);
                            }
                        }

                        // lazy response
                        s.id$ = setTimeout(responsor, s.dur$);
                    });
            }
        }
    }
}
