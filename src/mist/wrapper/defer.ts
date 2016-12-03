/// <reference path='../promise.ts'/>

/// <reference path='voker.ts'/>

namespace Mist {

    export namespace Wrapper {

        /**
        * @class Defer
        * @summary for wrapper
        */
        export class Defer extends Voker {

            /**
            * @constructor
            * @param {} component
            * @param {} commit
            */
            constructor(component: any, public _commit: Promise) {

                super(component);
            }

            /**
            * @param {} err
            * @returns {}
            */
            catch(err: (response: any) => any): Defer {

                return new Defer(this._component, this._commit.catch(err));
            }

            /**
            * @param {} name
            * @param {} o
            */
            protected _composer(name: string, ...o: any[]) {

                var s = this;

                // {} response
                return new Defer(s._component, s._commit.when(

                    function(response) {

                        // over response
                        var c = response instanceof Voker ? response : s._component;
                        var r = c[name].apply(c, o);

                        // lazy response
                        return r instanceof Defer ? r._commit : r;
                    }));
            }
        }
    }
}
