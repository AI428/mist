/// <reference path='component.ts'/>
/// <reference path='statement.ts'/>

namespace Mist {

    /**
    * @class Style
    */
    export class Style {

        main: any = {};
        mask: any = {};

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

        clear() {

            this.main = {};
            this.mask = {};

            // clear
            this.modify();
        }

        clearAll() {

            this.statement.elements().map(

                function(element) {

                    // lasting response
                    Component.create<Statement>(Statement, element).style.clear();
                });
        }

        modify() {

            this.node().innerHTML = [

                this.inner(this.main),
                this.inner(this.mask)

            ].join('');
        }

        pause() {

            this.statement.elements().map(

                function(e) {

                    // lasting response
                    var s = Component.create<Statement>(Statement, e).style;

                    var o = getComputedStyle(e);

                    s.mask = {};
                    s.mask.background = o.background;
                    s.mask.borderBottom = o.borderBottom;
                    s.mask.borderLeft = o.borderLeft;
                    s.mask.borderRadius = o.borderRadius;
                    s.mask.borderRight = o.borderRight;
                    s.mask.borderSpacing = o.borderSpacing;
                    s.mask.borderTop = o.borderTop;
                    s.mask.bottom = o.bottom;
                    s.mask.boxShadow = o.boxShadow;
                    s.mask.color = o.color;
                    s.mask.fill = o.fill;
                    s.mask.font = o.font;
                    s.mask.left = o.left;
                    s.mask.margin = o.margin;
                    s.mask.opacity = o.opacity;
                    s.mask.outline = o.outline;
                    s.mask.padding = o.padding;
                    s.mask.right = o.right;
                    s.mask.stroke = o.stroke;
                    s.mask.top = o.top;
                    s.mask.transform = o.transform;
                    s.mask.transition = 'none';
                    s.modify();
                });
        }

        resume() {

            this.statement.elements().map(

                function(e) {

                    // lasting response
                    var s = Component.create<Statement>(Statement, e).style;

                    s.mask = {};
                    s.modify();
                });
        }

        /**
        * @param {} css
        */
        set(...css: any[]) {

            var response = assign(css);

            var o = this.main;

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

            this.modify();
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
        private inner(css: any) {

            var response: string[] = [];

            // format response
            for (let name in css) {
                response.push(hycase(name) + ':' + css[name]);
            }

            // inner response
            return this.statement.selector()
                + '{'
                + response.join(';')
                + '}'
                ;
        }

        /**
        * @access private
        */
        private node() {

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
