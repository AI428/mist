declare namespace Mist {
    class Component {
        static responses: any;
        static create<T>(component: any, ...o: any[]): T;
    }
}
interface Element {
    mozMatchesSelector: (selector: string) => boolean;
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
    class Emission extends Promise {
        private emitter;
        private name;
        constructor(emitter: Emitter, name: string);
    }
}
declare namespace Mist {
    class Style {
        private statement;
        main: any;
        mask: any;
        private e;
        constructor(statement: Statement);
        clear(): void;
        clearAll(): void;
        modify(): void;
        pause(): void;
        resume(): void;
        set(...css: any[]): void;
        setAll(...css: any[]): void;
        private inner(css);
        private node();
    }
}
declare namespace Mist {
    class Timer {
        private statement;
        private id;
        constructor(statement: Statement);
        pause(): void;
        resume(): void;
        set(responsor: () => void, dur: number): void;
    }
}
declare namespace Mist {
    namespace Wrapper {
        abstract class Voker {
            protected _component: any;
            constructor(_component: any);
            protected _accessor(name: string): any;
            protected _composer(name: string, ...o: any[]): any;
        }
    }
}
declare namespace Mist {
    namespace Wrapper {
        class Defer extends Voker {
            _commit: Promise;
            constructor(component: any, _commit: Promise);
            catch(err: (response: any) => any): Defer;
            protected _composer(name: string, ...o: any[]): Defer;
        }
    }
}
declare namespace Mist {
    namespace Wrapper {
        class Timer extends Voker {
            private _dur;
            constructor(statement: Statement, _dur: number);
            protected _composer(name: string, ...o: any[]): Defer;
        }
    }
}
declare namespace Mist {
    class Statement {
        private statement;
        emitter: Emitter;
        style: Style;
        timer: Timer;
        constructor(statement: Element);
        constructor(statement: string);
        any(selector: string): Statement;
        call(responsor: () => void): Statement;
        clear(): Statement;
        clearAll(): Statement;
        elements(): Element[];
        not(selector: string): Statement;
        on(name: string): Emission;
        pause(): Statement;
        resume(): Statement;
        selector(): string;
        set(...css: any[]): Statement;
        setAll(...css: any[]): Statement;
        time(dur: number): any;
    }
}
/*!
 * @copyright AI428
 * @description Motion Design in Modular CSS
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.8.9
 */
declare function mist(statement: Element): Mist.Statement;
declare function mist(statement: string): Mist.Statement;
