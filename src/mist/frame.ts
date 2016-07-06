/// <reference path='promise.ts'/>

namespace Mist {

    /**
    * @class Frame
    */
    export class Frame {

        /**
        * @access public
        * @static
        */
        static txs: (() => void)[] = [];

        /**
        * @access public
        * @static
        * @sumary is transact
        */
        static txd: boolean;

        /**
        * @param {} responsor
        */
        static at(responsor: () => void) {

            this.txs.push(responsor);
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

                var txr: (() => void)[] = [];

                // in transact

                (function composer() {

                    var i = 0;
                    var responsor: () => void;

                    while (

                        responsor = txr.shift()) {
                        responsor();
                    }

                    while (

                        responsor = s.txs.shift()) {

                        // loop response

                        i = txr.push(responsor);
                    }

                    // lazy response

                    s.txd = i > 0;
                    s.txd && requestAnimationFrame(composer);
                })();
            })();
        }
    }
}
