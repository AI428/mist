/// <reference path='promise.ts'/>

namespace Mist {

    /**
    * @class Frame
    */
    export class Frame {

        static success: (() => void)[] = [];
        static txd: boolean;

        /**
        * @param {} responsor
        */
        static at(responsor: () => void) {

            this.success.push(responsor);
            this.tx();
        }

        /**
        * @access private
        * @static
        */
        private static tx() {

            this.txd || (() => {
                this.txd = true;

                var s = this;

                // initialize.

                var txr: (() => void)[] = [];

                (function composer() {

                    var i = 0;
                    var responsor: () => void;

                    while (

                        responsor = txr.shift()) {
                        responsor();
                    }

                    while (

                        responsor = s.success.shift()) {

                        // loop response.

                        i = txr.push(responsor);
                    }

                    // lazy response.

                    s.txd = i > 0;
                    s.txd && requestAnimationFrame(composer);
                })();
            })();
        }
    }
}
