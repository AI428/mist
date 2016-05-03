declare namespace Mist {
    /**
    * @class Component
    * @summary factory
    */
    class Component {
        static responses: any;
        /**
        * @param {} modular
        * @param {} o
        */
        static create<T>(modular: any, ...o: any[]): T;
    }
}
/**
* @class Element
* @summary for vendor
*/
interface Element {
    /**
    * @param {} selector
    */
    closest: (selector: string) => Element;
    /**
    * @param {} selector
    */
    mozMatchesSelector: (selector: string) => boolean;
}
declare namespace Mist {
    /**
    * @class Emitter
    * @summary for event
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
        private ready(name);
        /**
        * @access private
        */
        private selector();
    }
}
declare namespace Mist {
    /**
    * @class Promise
    * @summary thenable
    */
    class Promise {
        private err;
        private success;
        private txg;
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
    * @summary emit listener
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
        * @class Detail
        * @summary reconized data transfer
        */
        class Detail {
            src: any;
            /**
            * @access public
            * @summary client point
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
            * @summary page point
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
            * @param {} src
            */
            constructor(src: MouseEvent);
            /**
            * @constructor
            * @param {} src
            */
            constructor(src: TouchEvent);
            /**
            * @param {} src
            */
            diff(src: any): Detail;
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
        * @summary pan recognizer
        */
        class Pan {
            private emitter;
            private txg;
            private txv;
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
        * @namespace swipe recognizer
        */
        class Swipe {
            private emitter;
            private txg;
            private txv;
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
        * @summary method invoker
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
        * @summary pulse voker
        */
        class Pulser extends Voker {
            dur: number;
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
        * @summary time voker
        */
        class Timer extends Voker {
            dur: number;
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
    * @summary queuer on frame
    */
    class Frame {
        private static txg;
        private static txs;
        /**
        * @param {} responsor
        * @param {} delay
        */
        static at(responsor: () => void, delay?: number): void;
        /**
        * @param {} responsor
        * @param {} delay
        */
        static on(responsor: () => any, delay?: number): Promise;
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
    * @summary composer
    */
    class Value extends Promise {
        composite: any;
        private xg;
        private xr;
        private xs;
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
    * @class Class
    * @summary css classer
    */
    class Class {
        private statement;
        private value;
        /**
        * @constructor
        * @param {} statement
        */
        constructor(statement: Statement);
        /**
        * @param {} names
        */
        add(...names: string[]): Promise;
        /**
        * @param {} names
        */
        next(...names: string[]): Promise;
        /**
        * @param {} names
        */
        prev(...names: string[]): Promise;
        /**
        * @param {} dur
        */
        pulse(dur: number): Wrapper.Pulser;
        /**
        * @param {} names
        */
        remove(...names: string[]): Promise;
        /**
        * @param {} dur
        */
        time(dur: number): Wrapper.Timer;
        /**
        * @param {} names
        */
        toggle(...names: string[]): Promise;
        /**
        * @param {} names
        * @param {} command
        */
        private compose(names, command, response?);
    }
}
declare namespace Mist {
    /**
    * @class Style
    * @summary css styler
    */
    class Style {
        private statement;
        private e;
        private value;
        /**
        * @constructor
        * @param {} statement
        */
        constructor(statement: Statement);
        /**
        * @summary conv
        */
        static rem(): number;
        /**
        * @param {} css
        */
        add(css: any): Promise;
        /**
        * @summary scoped
        */
        get(): any;
        /**
        * @param {} dur
        */
        pulse(dur: number): Wrapper.Pulser;
        /**
        * @param {} css
        */
        set(css: any): Promise;
        /**
        * @param {} dur
        */
        time(dur: number): Wrapper.Timer;
        /**
        * @access private
        */
        private compose(css, response?);
        /**
        * @access private
        */
        private create();
    }
}
declare namespace Mist {
    /**
    * @class Statement
    * @summary implement class
    */
    class Statement {
        private statement;
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
        * @param {} selector
        */
        concat(selector: string): Statement;
        /**
        * @param {} listener
        */
        each(listener: (element: Element) => void): void;
        /**
        * @summary mapped
        */
        elements(): Element[];
        /**
        * @summary mapped
        */
        first(): Element;
        /**
        * @summary mapped
        */
        last(): Element;
        /**
        * @param {} name
        */
        on(name: string): Emission;
        /**
        * @param {} name
        */
        once(name: string): Emission;
        /**
        * @summary mapped
        */
        selector(): string;
    }
}
/**
 * @copyright AI428
 * @description A JavaScript framework for the reactive CSS
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.5.3
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
