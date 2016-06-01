/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>

/// <reference path='summary.ts'/>

namespace Mist {

    export namespace Recognizer {

        /**
        * @class Swipe
        */
        export class Swipe {

            /**
            * @access private
            */
            private prev: Summary;

            /**
            * @access private
            * @summary is transact
            */
            private txd: boolean;

            /**
            * @access public
            * @static
            * @summary moved per milliseconds
            */
            static mpms: number = 0.8;

            /**
            * @access public
            * @static
            * @summary milliseconds from prev
            */
            static passed: number = 64;

            /**
            * @constructor
            * @param {} emitter
            */
            constructor(private emitter: Emitter) {

                this.end();
                this.move();
            }

            /**
            * @access private
            */
            private end() {

                var s = this

                new Emission(s.emitter, 'panend').when(

                    function(response: Summary) {

                        if (s.txd) {

                            var r = s.prev.diff(response.event);

                            // filt response

                            if (Swipe.passed > r.passed) {

                                // disp response

                                s.emitter.emit('swipe', r);

                                var x = r.move.x * r.move.x;
                                var y = r.move.y * r.move.y;

                                if (x < y) {

                                    // dir response

                                    if (r.move.y < 0) s.emitter.emit('swipeup', r);
                                    if (r.move.y > 0) s.emitter.emit('swipedown', r);

                                } else {

                                    // dir response

                                    if (r.move.x < 0) s.emitter.emit('swipeleft', r);
                                    if (r.move.x > 0) s.emitter.emit('swiperight', r);
                                }
                            }

                            s.txd = false;
                        }
                    });
            }

            /**
            * @access private
            */
            private move() {

                var s = this;

                new Emission(s.emitter, 'panmove').when(

                    function(response: Summary) {

                        if (!s.txd) {

                            // filt response

                            if (Swipe.mpms < response.mpms) {

                                s.prev = response;
                                s.txd = true;
                            }
                        }
                    });
            }
        }
    }
}
