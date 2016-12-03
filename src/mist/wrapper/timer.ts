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

            /**
            * @constructor
            * @param {} statement
            * @param {} dur
            */
            constructor(statement: Statement, private _dur: number) {

                super(statement);
            }

            /**
            * @param {} name
            * @param {} o
            * @summary override
            */
            protected _composer(name: string, ...o: any[]) {

                var s = this;

                // {} response
                return new Defer(s._component, new Promise(

                    function(

                        succeed,
                        erred
                    ) {

                        s._component.timer.set(

                            function() {

                                try {
                                    succeed(
                                        s._component[name].apply(
                                            s._component, o));

                                } catch (e) {

                                    // fail response
                                    erred(e);
                                }

                            }, s._dur);
                    }));
            }
        }
    }
}
