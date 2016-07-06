/// <reference path='../statement.ts'/>

/// <reference path='voker.ts'/>

namespace Mist {

    export namespace Wrapper {

        /**
        * @class Story
        */
        export class Story extends Voker {

            /**
            * @constructor
            * @param {} statement
            * @param {} name
            */
            constructor(statement: Statement, public name$: string) {

                super(statement);
            }

            /**
            * @param {} story
            */
            next(story: Story): Story {

                var n = this.name$;
                var s = this.component$.scene;

                s.connect(n, story.name$);

                // passthru
                return story;
            }

            /**
            * @param {} story
            */
            prev(story: Story): Story {

                return story.next(this);
            }

            /**
            * @param {} o
            */
            protected accessor$(o: any) {

                this.proceed();

                // passthru
                return o;
            }

            /**
            * @param {} composer
            * @param {} o
            */
            protected compose$(composer: any, o: any[]) {

                this.proceed();

                // next story

                return composer.apply(composer, o);
            }

            /**
            * @access private
            */
            private proceed() {

                var n = this.name$;
                var s = this.component$.scene;

                if (!s.pos) throw new Error(`Forbidden, story has not started yet`);
                if (!s.move(n)) throw new Error(`Forbidden, "${s.pos}" > "${n}" story`);
            }
        }
    }
}
