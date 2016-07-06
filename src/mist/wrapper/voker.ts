namespace Mist {

    export namespace Wrapper {

        /**
        * @class Voker
        */
        export abstract class Voker {

            /**
            * @constructor
            * @param {} component
            */
            constructor(protected component$: any) {

                var s: any = this;

                for (let name in component$) {

                    if (component$[name] instanceof Function) {

                        // composer
                        s[name] = function(...o: any[]) {

                            return s.compose$(
                                component$[name].bind(
                                    component$), o);
                        };
                    } else {

                        Object.defineProperty(
                            s, name, {
                                get: s.accessor$.bind(
                                    s, component$[name])
                            });
                    }
                }
            }

            /**
            * @param {} o
            * @summary for override
            */
            protected accessor$(o: any) {

                return o; // passthru
            }

            /**
            * @param {} composer
            * @param {} o
            * @summary for override
            */
            protected compose$(composer: any, o: any[]) {

                return composer.apply(composer, o);
            }
        }
    }
}
