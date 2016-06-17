declare namespace Mist {
    class Component {
        static responses: any;
        static create<T>(component: any, ...o: any[]): T;
    }
}
interface Element {
    closest: (selector: string) => Element;
    mozMatchesSelector: (selector: string) => boolean;
}
declare namespace Mist {
    namespace Recognizer {
        class Summary {
            event: any;
            client: {
                x: number;
                y: number;
            };
            move: {
                x: number;
                y: number;
            };
            mpms: number;
            page: {
                x: number;
                y: number;
            };
            passed: number;
            constructor(event: MouseEvent);
            constructor(event: TouchEvent);
            diff(event: any): Summary;
            measure(element: Element): {
                x: number;
                y: number;
            };
            private set(response);
        }
    }
}
declare namespace Mist {
    namespace Recognizer {
        class Swipe {
            private emitter;
            private prev;
            private txd;
            static mpms: number;
            static passed: number;
            constructor(emitter: Emitter);
            private end();
            private move();
        }
    }
}
declare namespace Mist {
    namespace Wrapper {
        class Voker {
            private component;
            constructor(component: any);
            compose$(composer: any, o: any[]): any;
        }
    }
}
declare namespace Mist {
    namespace Wrapper {
        class Pulser extends Voker {
            private dur;
            private id;
            constructor(component: any, dur?: number);
            compose$(composer: any, o: any[]): Promise;
        }
    }
}
declare namespace Mist {
    class Promise {
        private err;
        private success;
        private txd;
        private txr;
        constructor(process: (succeed: (response: any) => void, erred: (response: any) => void) => void);
        static all(commits: Promise[]): Promise;
        static race(commits: Promise[]): Promise;
        catch(err: (response: any) => any): Promise;
        resume(): void;
        then(success: (response: any) => any, err?: (response: any) => any): Promise;
        when(success: (response: any) => any, err?: (response: any) => any): Promise;
        private erred(response);
        private succeed(response);
        private tx();
    }
}
declare namespace Mist {
    namespace Wrapper {
        class Timer extends Voker {
            private dur;
            private id;
            constructor(component: any, dur?: number);
            compose$(composer: any, o: any[]): Promise;
        }
    }
}
declare namespace Mist {
    class Frame {
        static success: (() => void)[];
        static txd: boolean;
        static at(responsor: () => void): void;
        private static tx();
    }
}
declare namespace Mist {
    class Value extends Promise {
        composite: any;
        private xs;
        private xd;
        private xr;
        constructor(composite?: any);
        compose(composer: (composite: any) => any): Promise;
    }
}
declare namespace Mist {
    class Style {
        private statement;
        private e;
        private value;
        constructor(statement: Statement);
        add(...css: any[]): Promise;
        get(): any;
        pulse(dur: number): any;
        set(...css: any[]): Promise;
        time(dur: number): any;
        private compose(css, response?);
        private composer(name, v);
        private create();
    }
}
declare namespace Mist {
    class Statement {
        private statement;
        static nth: string;
        emitter: Emitter;
        style: Style;
        constructor(statement: Element);
        constructor(statement: string);
        a(): Element;
        any(selector: string): Statement;
        elements(): Element[];
        last(): Element;
        not(selector: string): Statement;
        on(name: string): Emission;
        selector(): string;
        th(s: number, e: number): Statement[];
    }
}
declare namespace Mist {
    class Emitter {
        private statement;
        private emits;
        private obss;
        constructor(statement: Statement);
        constructor(statement: string);
        static customize(name: string, options?: any): Event;
        add(name: string, listener: (response: any) => void): void;
        emit(name: string, response?: any): void;
        remove(name: string, listener?: (response: any) => void): void;
        private on(name);
        private selector();
    }
}
declare namespace Mist {
    class Emission extends Promise {
        private emitter;
        private name;
        constructor(emitter: Emitter, name: string);
    }
}
declare namespace Mist {
    namespace Recognizer {
        class Pan {
            private emitter;
            private prev;
            private txd;
            constructor(emitter: Emitter);
            private end();
            private move();
            private start();
        }
    }
}
/*!
 * @copyright AI428
 * @description Modular CSS in JS
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.6.4
 */
declare function mist(statement: Element): Mist.Statement;
declare function mist(statement: string): Mist.Statement;
