/// <reference path='statement.ts'/>

namespace Mist {

    /**
    * @class Timer
    */
    export class Timer {

        private id: number = 0;

        /**
        * @constructor
        * @param {} statement
        */
        constructor(private statement: Statement) {
        }

        /**
        * @param {} responsor
        * @param {} dur
        */
        set(responsor: () => void, dur: number) {

            // ser

            clearTimeout(this.id);

            // lazy response

            this.id = setTimeout(
                function() {
                    requestAnimationFrame(
                        responsor.bind(this.statement)
                    );
                }, dur);
        }
    }
}
