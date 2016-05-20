declare namespace Mist {
    /**
    * @class Component
    */
    class Component {
        static responses: any;
        /**
        * @param {} component
        * @param {} o
        */
        static create<T>(component: any, ...o: any[]): T;
    }
}
/**
* @class Element
*/
interface Element {
    /**
    * @param {} selector
    * @summary for polyfill
    */
    closest: (selector: string) => Element;
    /**
    * @param {} selector
    * @summary for polyfill
    */
    mozMatchesSelector: (selector: string) => boolean;
}
declare namespace Mist {
    /**
    * @class Emitter
    */
    class Emitter {
        private statement;
        private emits;
        private obss;
        /**
        * @constructor
        * @param {} statement
        */
        constructor(statement: Statement);
        /**
        * @constructor
        * @param {} statement
        */
        constructor(statement: string);
        /**
        * @param {} name
        * @param {} options
        * @return {}
        */
        static customize(name: string, options?: any): Event;
        /**
        * @param {} name
        * @param {} listener
        */
        add(name: string, listener: (response: any) => void): void;
        /**
        * @param {} name
        * @param {} response
        */
        emit(name: string, response?: any): void;
        /**
        * @param {} name
        * @param {} listener
        */
        remove(name: string, listener?: (response: any) => void): void;
        /**
        * @access private
        */
        private on(name);
        /**
        * @access private
        */
        private selector();
    }
}
declare namespace Mist {
    /**
    * @class Promise
    */
    class Promise {
        private err;
        private success;
        private txd;
        private txr;
        /**
        * @constructor
        * @param {} process
        */
        constructor(process: (succeed: (response: any) => void, erred: (response: any) => void) => void);
        /**
        * @param {} commits
        */
        static all(commits: Promise[]): Promise;
        /**
        * @param {} commits
        */
        static race(commits: Promise[]): Promise;
        /**
        * @param {} err
        */
        catch(err: (response: any) => any): Promise;
        /**
        * @summary for loop
        */
        resume(): void;
        /**
        * @param {} success
        * @param {} err
        */
        then(success: (response: any) => any, err?: (response: any) => any): Promise;
        /**
        * @param {} success
        * @param {} err
        */
        when(success: (response: any) => any, err?: (response: any) => any): Promise;
        /**
        * @access private
        */
        private erred(response);
        /**
        * @access private
        */
        private succeed(response);
        /**
        * @access private
        */
        private tx();
    }
}
declare namespace Mist {
    /**
    * @class Emission
    */
    class Emission extends Promise {
        private emitter;
        private name;
        /**
        * @constructor
        * @param {} emitter
        * @param {} name
        */
        constructor(emitter: Emitter, name: string);
    }
}
declare namespace Mist {
    namespace Recognizer {
        /**
        * @class Summary
        */
        class Summary {
            event: any;
            /**
            * @access public
            */
            client: {
                x: number;
                y: number;
            };
            /**
            * @access public
            * @summary moved from prev
            */
            move: {
                x: number;
                y: number;
            };
            /**
            * @access public
            * @summary moved per milliseconds
            */
            mpms: number;
            /**
            * @access public
            */
            page: {
                x: number;
                y: number;
            };
            /**
            * @access public
            * @summary milliseconds from prev
            */
            passed: number;
            /**
            * @constructor
            * @param {} event
            */
            constructor(event: MouseEvent);
            /**
            * @constructor
            * @param {} event
            */
            constructor(event: TouchEvent);
            /**
            * @param {} event
            */
            diff(event: any): Summary;
            /**
            * @param {} element
            */
            measure(element: Element): {
                x: number;
                y: number;
            };
            /**
            * @access private
            */
            private set(response);
        }
    }
}
declare namespace Mist {
    namespace Recognizer {
        /**
        * @class Pan
        */
        class Pan {
            private emitter;
            /**
            * @access private
            */
            private prev;
            /**
            * @access private
            * @summary is transact
            */
            private txd;
            /**
            * @constructor
            * @param {} emitter
            */
            constructor(emitter: Emitter);
            /**
            * @access private
            */
            private end();
            /**
            * @access private
            */
            private move();
            /**
            * @access private
            */
            private start();
        }
    }
}
declare namespace Mist {
    namespace Recognizer {
        /**
        * @class Swipe
        */
        class Swipe {
            private emitter;
            /**
            * @access private
            */
            private prev;
            /**
            * @access private
            * @summary is transact
            */
            private txd;
            /**
            * @access public
            * @static
            * @summary moved per milliseconds
            */
            static mpms: number;
            /**
            * @access public
            * @static
            * @summary milliseconds from prev
            */
            static passed: number;
            /**
            * @constructor
            * @param {} emitter
            */
            constructor(emitter: Emitter);
            /**
            * @access private
            */
            private end();
            /**
            * @access private
            */
            private move();
        }
    }
}
declare namespace Mist {
    namespace Wrapper {
        /**
        * @class Voker
        */
        class Voker {
            private component;
            /**
            * @constructor
            * @param {} component
            */
            constructor(component: any);
            /**
            * @param {} composer
            * @param {} o
            * @summary for override
            */
            compose$(composer: any, o: any[]): any;
        }
    }
}
declare namespace Mist {
    namespace Wrapper {
        /**
        * @class Pulser
        */
        class Pulser extends Voker {
            dur: number;
            /**
            * @access private
            */
            private id;
            /**
            * @constructor
            * @param {} component
            * @param {} dur
            */
            constructor(component: any, dur?: number);
            /**
            * @param {} composer
            * @param {} o
            */
            compose$(composer: any, o: any[]): Promise;
        }
    }
}
declare namespace Mist {
    namespace Wrapper {
        /**
        * @class Timer
        */
        class Timer extends Voker {
            dur: number;
            /**
            * @access private
            */
            private id;
            /**
            * @constructor
            * @param {} component
            * @param {} dur
            */
            constructor(component: any, dur?: number);
            /**
            * @param {} composer
            * @param {} o
            */
            compose$(composer: any, o: any[]): Promise;
        }
    }
}
declare namespace Mist {
    /**
    * @class Frame
    */
    class Frame {
        static success: (() => void)[];
        static txd: boolean;
        /**
        * @param {} responsor
        */
        static at(responsor: () => void): void;
        /**
        * @access private
        * @static
        */
        private static tx();
    }
}
declare namespace Mist {
    /**
    * @class Value
    */
    class Value extends Promise {
        composite: any;
        private xs;
        private xd;
        private xr;
        /**
        * @constructor
        * @param {} composite
        */
        constructor(composite?: any);
        /**
        * @param {} composer
        */
        compose(composer: (composite: any) => any): Promise;
    }
}
declare namespace Mist {
    /**
    * @class Style
    */
    class Style {
        private statement;
        /**
        * @access private
        * @summary for scoped
        */
        private e;
        /**
        * @access private
        */
        private value;
        /**
        * @constructor
        * @param {} statement
        */
        constructor(statement: Statement);
        /**
        * @param {} css
        */
        add(...css: any[]): Promise;
        /**
        * @summary scoped
        */
        get(): any;
        /**
        * @param {} dur
        * @summary lazy responsor
        */
        pulse(dur: number): Wrapper.Pulser;
        /**
        * @param {} css
        */
        set(...css: any[]): Promise;
        /**
        * @param {} dur
        * @summary lazy responsor
        */
        time(dur: number): Wrapper.Timer;
        /**
        * @access private
        */
        private compose(css, response?);
        /**
        * @access private
        */
        private composer(name, v);
        /**
        * @access private
        */
        private create();
    }
}
declare namespace Mist {
    /**
    * @class Statement
    */
    class Statement {
        private statement;
        /**
        * @access public
        * @summary th selector
        */
        static nth: string;
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
        * @summary mapped
        */
        a(): Element;
        /**
        * @param {} selector
        */
        any(selector: string): Statement;
        /**
        * @summary mapped
        */
        elements(): Element[];
        /**
        * @summary mapped
        */
        last(): Element;
        /**
        * @param {} selector
        */
        not(selector: string): Statement;
        /**
        * @param {} name
        */
        on(name: string): Emission;
        /**
        * @summary mapped
        */
        selector(): string;
        /**
        * @param {} s
        * @param {} e
        */
        th(s: number, e: number): Statement[];
    }
}
/**
 * @copyright AI428
 * @description Modular CSS in JS
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.6.0
 */
/**
 * @param {} statement
 * @return {Mist.Statement}
 */
declare function mist(statement: Element): Mist.Statement;
/**
 * @param {} statement
 * @return {Mist.Statement}
 */
declare function mist(statement: string): Mist.Statement;
