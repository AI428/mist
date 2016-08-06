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
        value: any;
        private e;
        constructor(statement: Statement);
        clear(): void;
        clearAll(): void;
        set(...css: any[]): void;
        setAll(...css: any[]): void;
        private apply();
        private create();
    }
}
declare namespace Mist {
    class Story {
        private statement;
        pos: string;
        private conns;
        constructor(statement: Statement);
        connect(s: string, e: string): void;
        move(name: string): boolean;
        start(name: string): void;
    }
}
declare namespace Mist {
    namespace Wrapper {
        abstract class Voker {
            protected component$: any;
            constructor(component$: any);
            protected accessor$(name: string): any;
            protected composer$(name: string, ...o: any[]): any;
        }
    }
}
declare namespace Mist {
    namespace Wrapper {
        class Story extends Voker {
            name$: string;
            private story$;
            constructor(statement: Statement, name$: string);
            move(succeed: () => void): boolean;
            next(story: Story): Story;
            prev(story: Story): Story;
            start(): void;
        }
    }
}
declare namespace Mist {
    namespace Wrapper {
        class Timer extends Voker {
            private dur$;
            private id$;
            constructor(component: any, dur$?: number);
            protected composer$(name: string, ...o: any[]): Defer;
        }
    }
}
declare namespace Mist {
    class Statement {
        private statement;
        emitter: Emitter;
        style: Style;
        constructor(statement: Element);
        constructor(statement: string);
        any(selector: string): Statement;
        clear(): Statement;
        clearAll(): Statement;
        elements(): Element[];
        not(selector: string): Statement;
        on(name: string): Emission;
        selector(): string;
        set(...css: any[]): Statement;
        setAll(...css: any[]): Statement;
        story(name: string): any;
        time(dur: number): any;
    }
}
/*!
 * @copyright AI428
 * @description Motion Design in Modular CSS
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.8.2
 */
declare function mist(statement: Element): Mist.Statement;
declare function mist(statement: string): Mist.Statement;
declare namespace Mist {
    namespace Wrapper {
        class Defer extends Voker {
            commit$: Promise;
            constructor(component: any, commit$: Promise);
            catch(err: (response: any) => any): Defer;
            protected composer$(name: string, ...o: any[]): Defer;
        }
    }
}
