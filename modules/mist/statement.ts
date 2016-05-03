/// <reference path='recognizer/pan.ts' />
/// <reference path='recognizer/swipe.ts' />

/// <reference path='class.ts' />
/// <reference path='component.ts' />
/// <reference path='emission.ts' />
/// <reference path='emitter.ts' />
/// <reference path='style.ts' />

namespace Mist {

    /**
    * @class Statement
    * @summary implement class
    */
    export class Statement {

        /**
        * @access public
        */
        class: Class;

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

            // initialize.
            this.class = new Class(this);
            this.emitter = new Emitter(this);
            this.style = new Style(this);

            // recognizer.
            new Recognizer.Pan(this.emitter);
            new Recognizer.Swipe(this.emitter);
        }

        /**
        * @param {} selector
        */
        concat(selector: string): Statement {

            var s = this.selector();

            // [] response.
            var response = s.split(',').map(

                function(p) {
                    return p.trim() + selector;
                });

            // lasting response.
            return Component.create<Statement>(Statement, response.join());
        }

        /**
        * @param {} listener
        */
        each(listener: (element: Element) => void) {

            this.elements().forEach(listener);
        }

        /**
        * @summary mapped
        */
        elements(): Element[] {

            var response: Element[];

            var s = this.statement;

            // mapped.
            if (s instanceof Element) {
                // [] response.
                response = [s];
            } else if (s instanceof Statement) {
                // [] response.
                response = s.elements();
            } else {
                // [] response.
                response = [].map.call(document.querySelectorAll(s), (element: Element) => element);
            }

            // mapped response.
            return response;
        }

        /**
        * @summary mapped
        */
        first(): Element {

            var response: Element;

            var s = this.statement;

            // mapped.
            if (s instanceof Element) {
                // a response.
                response = s;
            } else if (s instanceof Statement) {
                // a response.
                response = s.first();
            } else {
                // a response.
                response = document.querySelector(s);
            }

            // mapped response.
            return response;
        }

        /**
        * @summary mapped
        */
        last(): Element {

            var response: Element;

            var s = this.statement;

            // mapped.
            if (s instanceof Element) {
                // a response.
                response = s;
            } else if (s instanceof Statement) {
                // a response.
                response = s.last();
            } else {
                // a response.
                response = document.querySelector(s.match(/[^,]*$/).concat('last-child').join(':'));
            }

            // mapped response.
            return response;
        }

        /**
        * @param {} name
        */
        on(name: string): Emission {

            // {} response.
            return new Emission(this.emitter, name);
        }

        /**
        * @param {} name
        */
        once(name: string): Emission {

            // lasting response.
            return Component.create<Emission>(Emission, this.emitter, name);
        }

        /**
        * @summary mapped
        */
        selector(): string {

            var response: string;

            var s = this.statement;

            // mapped.
            if (s instanceof Element) {
                // [] response.
                response = ser(s);
            } else if (s instanceof Statement) {
                // a response.
                response = s.selector();
            } else {
                // a response.
                response = s;
            }

            // mapped response.
            return response;
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

                    // a response.
                    response = '[mid="'
                        + element.getAttribute('mid')
                        + '"]'
                        ;
                }

                // selector response.
                return response;
            })() ||

            (function() {

                var response = sessions++;

                element.setAttribute('mid', '' + response);

                // selector response.
                return '[mid="'
                    + response
                    + '"]'
                    ;
            })());
    }
}
