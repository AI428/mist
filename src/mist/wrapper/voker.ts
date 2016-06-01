namespace Mist {

    export namespace Wrapper {

        /**
        * @class Voker
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

                        // lazy response
                        s[name] = function(...o: any[]) {
                            return s.compose$(
                                component[name].bind(
                                    component), o);
                        }
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
