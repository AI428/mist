namespace Mist {

    export namespace Wrapper {

        /**
        * @class Voker
        * @summary method invoker
        */
        export class Voker {

            /**
            * @constructor
            * @param {} component
            */
            constructor(private component: any) {

                var s: any = this;

                for (let name in component) {

                    if (component[name] instanceof Function) {

                        // lazy response.
                        function composer(...o: any[]) {
                            return s.compose$(
                                component[name].bind(
                                    component), o);
                        }

                        // {} response.
                        s[name] = composer;
                    }
                }
            }

            /**
            * @param {} composer
            * @param {} o
            * @summary for override
            */
            compose$(composer: any, o: any[]) {

                return composer.apply(composer, o);
            }
        }
    }
}
