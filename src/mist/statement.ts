/// <reference path='recognizer/pan.ts'/>
/// <reference path='recognizer/swipe.ts'/>

/// <reference path='wrapper/story.ts'/>

/// <reference path='component.ts'/>
/// <reference path='emission.ts'/>
/// <reference path='emitter.ts'/>
/// <reference path='scene.ts'/>
/// <reference path='style.ts'/>

namespace Mist {

    /**
    * @class Statement
    */
    export class Statement {

        /**
        * @access public
        * @summary th selector
        */
        static nth = ':nth-of-type';

        /**
        * @access public
        */
        emitter: Emitter;

        /**
        * @access public
        */
        scene: Scene;

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
            this.scene = new Scene(this);
            this.style = new Style(this);

            new Recognizer.Pan(this.emitter);
            new Recognizer.Swipe(this.emitter);
        }

        /**
        * @summary mapped
        */
        a(): Element {

            var response: Element;

            var s = this.statement;

            // mapped
            if (s instanceof Element) {
                // a response
                response = s;
            } else {
                // a response
                response = document.querySelector(s);
            }

            // {} response
            return response;
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

        /**
        * @summary mapped
        */
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
        * @summary mapped
        */
        last(): Element {

            var response: Element;

            var s = this.statement;

            // mapped
            if (s instanceof Element) {
                // a response
                response = s;
            } else {
                // a response
                response = document.querySelector(s.match(/[^,]*$/).concat('last-of-type').join(':'));
            }

            // {} response
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

        /**
        * @summary mapped
        */
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
        * @param {} name
        */
        story(name: string): any {

            return Component.create(Wrapper.Story, this, name);
        }

        /**
        * @param {} s
        * @param {} e
        */
        th(s: number, e: number): Statement[] {

            var response: Statement[] = [];

            for (let n = s; n <= e; n++) {

                response.push(

                    this.any(Statement.nth
                        + '('
                        + n
                        + ')'
                    ));
            }

            // [] response
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
