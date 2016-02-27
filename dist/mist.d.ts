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
        static create<T>(modular: any, ...o: any[]): T;
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
        private txd;
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
        static txd: boolean;
        static txs: (() => boolean)[];
        /**
        * @param {} responsor
        * @param {} delay
        */
        static at(responsor: () => void, delay?: number): void;
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
        private static tx();
    }
}
declare namespace Mist {
    /**
    * @class Value
    * @extends Promise
    */
    class Value extends Promise {
        private xd;
        private xr;
        private xs;
        /**
        * @access public
        */
        composite: any;
        /**
        * @constructor
        * @param {} composite
        */
        constructor(composite: any);
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
            private src;
            private prev;
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
            page: {
                x: number;
                y: number;
            };
            /**
            * @access public
            */
            passed: number;
            /**
            * @access public
            */
            screen: {
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
            vector: number;
            /**
            * @constructor
            * @param {} src
            * @param {} prev?
            */
            constructor(src: MouseEvent, prev?: MouseEvent);
            /**
            * @constructor
            * @param {} src
            * @param {} prev?
            */
            constructor(src: TouchEvent, prev?: TouchEvent);
            /**
            * @constructor
            * @param {} src
            * @param {} prev?
            */
            constructor(src: Event, prev?: Event);
            /**
            * @param {} src
            * @param {} prev
            */
            private mouse(src, prev?);
            /**
            * @param {} t
            * @param {} s
            * @param {} x
            * @param {} y
            * @param {} v
            */
            private set(t, s, x, y, v);
            /**
            * @param {} src
            * @param {} prev
            */
            private touch(src, prev?);
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
            private txd;
            private txv;
            /**
            * @access public
            * @static
            * @summary for error
            */
            static upper: number;
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
            private enter();
            /**
            * @access private
            */
            private leave();
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
 * @description for scoped style in JS
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
