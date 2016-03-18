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
        * @namespace Recognizer
        */
        class Detail {
            e: any;
            /**
            * @access public
            */
            client: {
                x: number;
                y: number;
            };
            /**
            * @access public
            */
            move: {
                x: number;
                y: number;
            };
            /**
            * @access public
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
            */
            passed: number;
            /**
            * @constructor
            * @param {} e
            */
            constructor(e: MouseEvent);
            /**
            * @constructor
            * @param {} e
            */
            constructor(e: TouchEvent);
            /**
            * @access private
            */
            private mouse(e);
            /**
            * @access private
            */
            private set(p, passed, x, y);
            /**
            * @access private
            */
            private touch(e);
        }
    }
}
declare namespace Mist {
    namespace Recognizer {
        /**
        * @class Pan
        * @namespace Recognizer
        */
        class Pan {
            private emitter;
            private txg;
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
        * @namespace Recognizer
        */
        class Swipe {
            private emitter;
            /**
            * @access public
            * @static
            * @summary move per milliseconds
            */
            static mpms: number;
            /**
            * @constructor
            * @param {} emitter
            */
            constructor(emitter: Emitter);
        }
    }
}
declare namespace Mist {
    namespace Wrapper {
        /**
        * @class Voker
        * @namespace Wrapper
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
        * @namespace Wrapper
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
        * @namespace Wrapper
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
    * @summary queuer
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
 * @description A JavaScript framework for the reactive style
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.5.0
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
