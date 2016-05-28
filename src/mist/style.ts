/// <reference path='wrapper/pulser.ts' />
/// <reference path='wrapper/timer.ts' />

/// <reference path='component.ts' />
/// <reference path='promise.ts' />
/// <reference path='statement.ts' />
/// <reference path='value.ts' />

namespace Mist {

    /**
    * @class Style
    */
    export class Style {

        /**
        * @access private
        * @summary for scoped
        */
        private e: HTMLStyleElement;

        /**
        * @access private
        */
        private value: Value;

        /**
        * @constructor
        * @param {} statement
        */
        constructor(private statement: Statement) {

            this.value = new Value({});
            this.value.when(

                (o) => {

                    var response: string[] = [];

                    // format response.
                    for (let name in o) {
                        response.push(hycase(name) + ':' + o[name]);
                    }

                    // inner response.
                    this.create().innerHTML = statement.selector()
                        + '{'
                        + response.join(';')
                        + '}'
                        ;
                });
        }

        /**
        * @param {} css
        */
        add(...css: any[]): Promise {

            return this.value.compose(

                // composer.
                (o) => this.compose(assign(css), o)

            ).then(

                // for composition.
                () => this
                );
        }

        /**
        * @summary scoped
        */
        get(): any {

            var response: any = {};

            var s = this;

            // format response.
            for (let name in s.value.composite) {
                response[name] = s.value.composite[name];
            }

            // {} response.
            return response;
        }

        /**
        * @param {} dur
        * @summary lazy responsor
        */
        pulse(dur: number): Wrapper.Pulser {

            return new Wrapper.Pulser(this, dur);
        }

        /**
        * @param {} css
        */
        set(...css: any[]): Promise {

            return this.value.compose(

                // composer.
                () => this.compose(assign(css))

            ).then(

                // for composition.
                () => this
                );
        }

        /**
        * @param {} dur
        * @summary lazy responsor
        */
        time(dur: number): Wrapper.Timer {

            return new Wrapper.Timer(this, dur);
        }

        /**
        * @access private
        */
        private compose(css: any, response: any = {}) {

            for (let name in css) {

                var p = css[name];

                // mapped.
                if (p instanceof Promise) {
                    // lazy response.
                    p.when(this.composer.bind(this, name));
                } else if (p instanceof Function) {
                    // a response.
                    response[name] = p();
                } else {
                    // passthru.
                    response[name] = p;
                }
            }

            // {} response.
            return response;
        }

        /**
        * @access private
        */
        private composer(name: string, v: any) {

            var response: any = {};

            response[name] = v;

            // {} response.
            this.add(response);
        }

        /**
        * @access private
        */
        private create() {

            if (!this.e) {

                var s = document.createElement('style');
                var t = document.createTextNode('');

                s.appendChild(t);

                document.head.appendChild(s);

                this.e = s;
            }

            // lasting response.
            return this.e;
        }
    }

    /**
    * @access private
    * @static
    */
    function assign(o: any[]) {

        var response: any = {};

        o.map(function(a) {

            // format response.
            for (let name in a) {
                response[name] = a[name];
            }
        });

        // {} response.
        return response;
    }

    /**
    * @access private
    * @static
    */
    function hycase(name: string) {

        // hy response.
        return name.replace(/[A-Z]/g, function(m) {
            return '-' + m.toLowerCase();
        });
    }
}
