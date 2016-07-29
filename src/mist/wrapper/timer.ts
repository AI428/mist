/// <reference path='../promise.ts'/>

/// <reference path='voker.ts'/>

namespace Mist {

    export namespace Wrapper {

        /**
        * @class Timer
        */
        export class Timer extends Voker {

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
            * @param {} name
            * @param {} o
            */
            protected composer$(name: string, ...o: any[]) {

                var s = this;

                // {} response

                return new Defer(

                    s.component$, new Promise(

                        function(

                            succeed,
                            erred
                        ) {

                            var c = s.component$;
                            var m = s.component$[name];

                            function responsor() {

                                try {
                                    // commit response
                                    succeed(m.apply(c, o));

                                } catch (e) {

                                    // fail response
                                    erred(e);
                                }
                            }

                            // ser
                            clearTimeout(s.id$);

                            // lazy response
                            s.id$ = setTimeout(responsor, s.dur$);
                        }));
            }
        }
    }
}
