/// <reference path='component.ts'/>
/// <reference path='statement.ts'/>

namespace Mist {

    /**
    * @class Style
    */
    export class Style {

        /**
        * @access public
        */
        value: any = {};

        /**
        * @access private
        * @summary for scoped
        */
        private e: HTMLStyleElement;

        /**
        * @constructor
        * @param {} statement
        */
        constructor(private statement: Statement) {
        }

        /**
        * @summary
        */
        clear() {

            this.value = {};
            this.apply();
        }

        /**
        * @summary
        */
        clearAll() {

            this.statement.elements().map(

                function(element) {

                    // lasting response
                    Component.create<Statement>(Statement, element).style.clear();
                });
        }

        /**
        * @param {} css
        */
        set(...css: any[]) {

            var o = this.value;

            var response = assign(css);

            for (let name in response) {

                var p = response[name];

                // mapped
                if (p instanceof Function) {
                    // a response
                    o[name] = p(o);
                } else {
                    // passthru
                    o[name] = p;
                }
            }

            this.apply();
        }

        /**
        * @param {} css
        */
        setAll(...css: any[]) {

            var response = assign(css);

            this.statement.elements().map(

                function(element, i, all) {

                    var o = {};

                    for (let name in response) {

                        var p = response[name];

                        // mapped
                        if (p instanceof Function) {
                            // a response
                            o[name] = p(element, i, all);
                        } else {
                            // passthru
                            o[name] = p;
                        }
                    }

                    // lasting response
                    Component.create<Statement>(Statement, element).style.set(o);
                });
        }

        /**
        * @access private
        */
        private apply() {

            var o = this.value;

            var response: string[] = [];

            // format response
            for (let name in o) {
                response.push(hycase(name) + ':' + o[name]);
            }

            // inner response
            this.create().innerHTML = this.statement.selector()
                + '{'
                + response.join(';')
                + '}'
                ;
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

            // lasting response
            return this.e;
        }
    }

    /**
    * @access private
    * @static
    */
    function assign(o: any[]) {

        var response: any = {};

        for (let s of o) {
            for (let name in s) {
                response[name] = s[name];
            }
        }

        // {} response
        return response;
    }

    /**
    * @access private
    * @static
    */
    function hycase(name: string) {

        return name.replace(/[A-Z]/g,

            function(m) {

                // hy response
                return '-' + m.toLowerCase();
            });
    }
}
