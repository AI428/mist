/// <reference path='wrapper/pulser.ts' />
/// <reference path='wrapper/timer.ts' />

/// <reference path='frame.ts' />
/// <reference path='promise.ts' />
/// <reference path='statement.ts' />
/// <reference path='value.ts' />

namespace Mist {

    /**
    * @class Style
    * @summary css styler
    */
    export class Style {

        private e: HTMLStyleElement;
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
        * @summary conv
        */
        static rem(): number {

            var e = document.body;
            var s = getComputedStyle(e);

            // conv response.
            return parseInt(s.fontSize, 10);
        }

        /**
        * @param {} css
        */
        add(css: any): Promise {

            return this.value.compose((o) => {

                // {} response.

                return this.compose(css, o);
            });
        }

        /**
        * @summary scoped
        */
        get(): any {

            var response: any = {};

            var s = this;

            // composer.
            for (let name in s.value.composite) {
                response[name] = s.value.composite[name];
            }

            // {} response.
            return response;
        }

        /**
        * @param {} dur
        */
        pulse(dur: number): Wrapper.Pulser {

            // wrapper response.

            return new Wrapper.Pulser(this, dur);
        }

        /**
        * @param {} css
        */
        set(css: any): Promise {

            return this.value.compose(() => {

                // {} response.

                return this.compose(css);
            });
        }

        /**
        * @param {} dur
        */
        time(dur: number): Wrapper.Timer {

            // wrapper response.

            return new Wrapper.Timer(this, dur);
        }

        /**
        * @access private
        */
        private compose(css: any, response: any = {}) {

            var s = this;

            // composer.
            for (let name in css) {

                var p = css[name];

                if (p instanceof Promise) {

                    function composer(

                        name: string,
                        v: string
                    ) {

                        var response: any = {};

                        response[name] = v;

                        // reposit.
                        s.add(response);
                    }

                    // lazy response.
                    p.when(composer.bind(s, name));

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
    function hycase(name: string) {

        // hy response.
        return name.replace(/[A-Z]/g, function(m) {
            return '-' + m.toLowerCase();
        });
    }
}
