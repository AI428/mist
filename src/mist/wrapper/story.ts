/// <reference path='../component.ts'/>
/// <reference path='../statement.ts'/>
/// <reference path='../story.ts'/>

/// <reference path='voker.ts'/>

namespace Mist {

    export namespace Wrapper {

        /**
        * @class Story
        */
        export class Story extends Voker {

            private story$: Mist.Story;

            /**
            * @constructor
            * @param {} statement
            * @param {} name
            */
            constructor(statement: Statement, public name$: string) {

                super(statement);

                // lasting response

                this.story$ = Component.create<Mist.Story>(Mist.Story, statement);
            }

            /**
            * @param {} succeed
            */
            move(succeed: () => void): boolean {

                var s = this.story$;
                var n = this.name$;

                var response = s.move(n);
                if (response) succeed();

                return response;
            }

            /**
            * @param {} story
            */
            next(story: Story): Story {

                var s = this.story$;
                var n = this.name$;

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
            * @summary
            */
            start() {

                var s = this.story$;
                var n = this.name$;

                s.start(n);
            }
        }
    }
}
