/// <reference path='../component.ts'/>
/// <reference path='../promise.ts'/>
/// <reference path='../statement.ts'/>
/// <reference path='../timer.ts'/>

/// <reference path='defer.ts'/>
/// <reference path='voker.ts'/>

namespace Mist {

    export namespace Wrapper {

        /**
        * @class Timer
        */
        export class Timer extends Voker {

            private timer$: Mist.Timer;

            /**
            * @constructor
            * @param {} statement
            * @param {} dur
            */
            constructor(statement: Statement, private dur$: number) {

                super(statement);

                // lasting response

                this.timer$ = Component.create<Mist.Timer>(Mist.Timer, statement);
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

                            function responsor() {

                                try {
                                    succeed(
                                        s.component$[name].apply(
                                            s.component$, o));

                                } catch (e) {

                                    // fail response
                                    erred(e);
                                }
                            }

                            s.timer$.set(responsor, s.dur$);
                        }));
            }
        }
    }
}
