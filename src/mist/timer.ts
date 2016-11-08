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
        * @summary dummy
        */
        pause() {
        }

        /**
        * @summary dummy
        */
        resume() {
        }

        /**
        * @param {} responsor
        * @param {} dur
        */
        set(responsor: () => void, dur: number) {

            // ser

            clearTimeout(this.id);

            // lazy response

            requestAnimationFrame(() => {

                this.id = setTimeout(() => {

                    this.pause = () => { };
                    this.resume = () => { };

                    responsor.bind(this.statement)();

                }, dur);
            });

            var s = Date.now();

            this.pause = () => {

                var e = Date.now();

                // ser

                clearTimeout(this.id);

                // lazy response

                this.resume = this.set.bind(
                    this, responsor, dur - (e - s));
            };
        }
    }
}
