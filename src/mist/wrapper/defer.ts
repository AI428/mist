/// <reference path='../promise.ts'/>

/// <reference path='voker.ts'/>

namespace Mist {

    export namespace Wrapper {

        /**
        * @class Defer
        */
        export class Defer extends Voker {

            /**
            * @constructor
            * @param {} component
            * @param {} commit
            */
            constructor(component: any, public commit$: Promise) {

                super(component);
            }

            /**
            * @param {} err
            */
            catch(err: (response: any) => any): Defer {

                return new Defer(this.component$, this.commit$.catch(err));
            }

            /**
            * @param {} name
            * @param {} o
            */
            protected composer$(name: string, ...o: any[]) {

                var s = this;

                // {} response

                return new Defer(

                    s.component$, s.commit$.when(

                        function(response) {

                            var r: any;

                            if (response instanceof Voker) {
                                r = response[name].apply(response, o);
                            } else {
                                r = s.component$[name].apply(s.component$, o);
                            }

                            if (r instanceof Defer) {
                                return r.commit$;
                            }

                            return r;
                        }));
            }
        }
    }
}
