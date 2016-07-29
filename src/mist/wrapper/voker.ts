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
                        s[name] = s.composer$.bind(
                            s, name);

                    } else {

                        Object.defineProperty(
                            s, name, {
                                get: s.accessor$.bind(
                                    s, name)
                            });
                    }
                }
            }

            /**
            * @param {} name
            * @summary for override
            */
            protected accessor$(name: string) {

                return this.component$[name];
            }

            /**
            * @param {} name
            * @param {} o
            * @summary for override
            */
            protected composer$(name: string, ...o: any[]) {

                var c = this.component$;
                var m = this.component$[name];

                return m.apply(c, o);
            }
        }
    }
}
