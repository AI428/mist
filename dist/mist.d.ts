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
        * @return {}
        */
        static create<T>(modular: Function, ...o: any[]): T;
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
        * @return {}
        */
        static all(commits: Promise[]): Promise;
        /**
        * @param {} commits
        * @return {}
        */
        static race(commits: Promise[]): Promise;
        /**
        * @param {} err
        * @return {}
        */
        catch(err: (response: any) => any): Promise;
        /**
        * @summary for loop
        */
        resume(): void;
        /**
        * @param {} success
        * @param {} err
        * @return {}
        */
        then(success: (response: any) => any, err?: (response: any) => any): Promise;
        /**
        * @param {} success
        * @param {} err
        * @return {}
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
    * @class Frame
    * @summary queuer
    */
    class Frame {
        private static txg;
        private static txs;
        /**
        * @access public
        * @static
        * @summary milliseconds per frame
        */
        static mspf: number;
        /**
        * @access public
        * @static
        * @summary timestamp
        */
        static times: number;
        /**
        * @param {} responsor
        * @param {} delay
        */
        static at(responsor: () => void, delay?: number): void;
        /**
        * @param {} frames
        * @summary frames per second
        */
        static fps(frames: number): void;
        /**
        * @param {} responsor
        * @param {} delay
        * @return {}
        */
        static on(responsor: () => any, delay?: number): Promise;
        /**
        * @access private
        * @static
        */
        private static request(responsor);
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
    * @extends Promise
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
        * @return {}
        */
        compose(composer: (composite: any) => any): Promise;
    }
}
declare namespace Mist {
    /**
    * @class Class
    * @summary commands
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
        * @param {} dur
        * @return {}
        */
        add(names: string[], dur?: number): Promise;
        /**
        * @param {} names
        * @return {}
        */
        next(names: string[]): Promise;
        /**
        * @param {} names
        * @return {}
        */
        prev(names: string[]): Promise;
        /**
        * @param {} names
        * @param {} dur
        * @return {}
        */
        remove(names: string[], dur?: number): Promise;
        /**
        * @param {} names
        * @return {}
        */
        toggle(names: string[]): Promise;
    }
}
/**
* @class Element
* @summary for vendor
*/
interface Element {
    /**
    * @param {} selector
    * @return {}
    */
    closest: (selector: string) => Element;
    /**
    * @param {} selector
    * @return {}
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
    * @class Emission
    * @extends Promise
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
    /**
    * @class Style
    * @summary commands
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
        * @return {}
        * @summary conv
        */
        static rem(): number;
        /**
        * @param {} css
        * @param {} dur
        * @return {}
        */
        add(css: any, dur?: number): Promise;
        /**
        * @return {}
        * @summary scoped
        */
        get(): any;
        /**
        * @param {} css
        * @return {}
        */
        set(css: any): Promise;
        /**
        * @access private
        */
        private composer(css, dur?, response?);
        /**
        * @access private
        */
        private create();
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
            * @param {} o
            * @param {} s
            * @param {} x
            * @param {} y
            */
            private set(o, s, x, y);
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
        * @return {}
        */
        concat(selector: string): Statement;
        /**
        * @param {} listener
        */
        each(listener: (element: Element) => void): void;
        /**
        * @return {}
        * @summary mapped
        */
        elements(): Element[];
        /**
        * @return {}
        * @summary mapped
        */
        first(): Element;
        /**
        * @return {}
        * @summary mapped
        */
        last(): Element;
        /**
        * @param {} name
        * @return {}
        */
        on(name: string): Emission;
        /**
        * @param {} name
        * @return {}
        */
        once(name: string): Emission;
        /**
        * @return {}
        * @summary mapped
        */
        selector(): string;
    }
}
/**
 * @copyright AI428
 * @description Reactive CSS framework
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.4.3
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
