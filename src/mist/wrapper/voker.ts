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
            constructor(protected _component: any) {

                var s: any = this;

                for (let name in _component) {

                    if (_component[name] instanceof Function) {

                        // composer
                        s[name] = s._composer.bind(
                            s, name);

                    } else {

                        Object.defineProperty(
                            s, name, {
                                get: s._accessor.bind(
                                    s, name)
                            });
                    }
                }
            }

            /**
            * @param {} name
            * @summary for override
            */
            protected _accessor(name: string) {

                return this._component[name];
            }

            /**
            * @param {} name
            * @param {} o
            * @summary for override
            */
            protected _composer(name: string, ...o: any[]) {

                return this._component[name].apply(this._component, o);
            }
        }
    }
}
