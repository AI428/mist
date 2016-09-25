/// <reference path='component.ts'/>
/// <reference path='emission.ts'/>
/// <reference path='emitter.ts'/>
/// <reference path='style.ts'/>

/// <reference path='wrapper/story.ts'/>
/// <reference path='wrapper/timer.ts'/>

namespace Mist {

    /**
    * @class Statement
    */
    export class Statement {

        /**
        * @access public
        */
        emitter: Emitter;

        /**
        * @access public
        */
        style: Style;

        /**
        * @constructor
        * @param {} statement
        */
        constructor(statement: Element);

        /**
        * @constructor
        * @param {} statement
        */
        constructor(statement: string);

        /**
        * @constructor
        * @param {} statement
        */
        constructor(private statement: any) {

            this.emitter = new Emitter(this);
            this.style = new Style(this);
        }

        /**
        * @param {} selector
        */
        any(selector: string): Statement {

            // lasting response

            return Component.create<Statement>(Statement,

                this.selector().split(',').map(

                    function(s) {

                        return selector.split(',').map(

                            function(term) {

                                return s.trim()
                                    + term.trim()
                                    ;

                            }).join();

                    }).join());
        }

        clear(): Statement {

            var s = this.style;
            var m = this.style.clear;

            m.apply(s);

            // passthru
            return this;
        }

        clearAll(): Statement {

            var s = this.style;
            var m = this.style.clearAll;

            m.apply(s);

            // passthru
            return this;
        }

        elements(): Element[] {

            var response: Element[];

            var s = this.statement;

            // mapped
            if (s instanceof Element) {
                // [] response
                response = [s];
            } else {
                // [] response
                response = [].map.call(document.querySelectorAll(s), (element: Element) => element);
            }

            // [] response
            return response;
        }

        /**
        * @param {} selector
        */
        not(selector: string): Statement {

            // lasting response

            return this.any(selector.split(',').map(

                function(s) {

                    return ':not('
                        + s.trim()
                        + ')'
                        ;

                }).join());
        }

        /**
        * @param {} name
        */
        on(name: string): Emission {

            return new Emission(this.emitter, name);
        }

        selector(): string {

            var response: string;

            var s = this.statement;

            // mapped
            if (s instanceof Element) {
                // [] response
                response = ser(s);
            } else {
                // a response
                response = s;
            }

            // a response
            return response;
        }

        /**
        * @param {} css
        */
        set(...css: any[]): Statement {

            var s = this.style;
            var m = this.style.set;

            m.apply(s, css);

            // passthru
            return this;
        }

        /**
        * @param {} css
        */
        setAll(...css: any[]): Statement {

            var s = this.style;
            var m = this.style.setAll;

            m.apply(s, css);

            // passthru
            return this;
        }

        /**
        * @param {} name
        * @summary lazy responsor
        */
        story(name: string): any {

            return Component.create(Wrapper.Story, this, name);
        }

        /**
        * @param {} dur
        * @summary lazy responsor
        */
        time(dur: number): any {

            return Component.create(Wrapper.Timer, this, dur);
        }
    }

    /**
    * @access private
    * @static
    */
    var sessions = 0;

    /**
    * @access private
    * @static
    */
    function ser(element: Element) {

        return element.id ? '#' + element.id : (

            (function() {

                var response: string;

                if (element.hasAttribute('mid')) {

                    // a response
                    response = '[mid="'
                        + element.getAttribute('mid')
                        + '"]'
                        ;
                }

                // selector response
                return response;
            })() ||

            (function() {

                var response = sessions++;

                element.setAttribute('mid', '' + response);

                // selector response
                return '[mid="'
                    + response
                    + '"]'
                    ;
            })());
    }
}
