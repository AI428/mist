/// <reference path='../component.ts'/>
/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>

/// <reference path='summary.ts'/>

namespace Mist {

    export namespace Recognizer {

        /**
        * @class Pan
        */
        export class Pan {

            /**
            * @access private
            */
            private prev: Summary;

            /**
            * @access private
            * @summary is session
            */
            private sess: boolean;

            /**
            * @constructor
            * @param {} emitter
            */
            constructor(private emitter: Emitter) {

                this.end();
                this.move();
                this.start();
            }

            /**
            * @access private
            */
            private end() {

                var s = this;

                function responsor(e: any) {

                    if (s.sess) {

                        var r = s.prev.diff(e);

                        // disp response

                        s.emitter.emit('pan', r);
                        s.emitter.emit('panend', r);

                        s.sess = false;
                    }
                }

                new Emission(Component.create<Emitter>(Emitter, '*'), 'mouseup').when(responsor);
                new Emission(s.emitter, 'touchend').when(prevent).when(responsor);
            }

            /**
            * @access private
            */
            private move() {

                var s = this;

                function responsor(e: any) {

                    if (s.sess) {

                        var r = s.prev.diff(e);

                        // disp response

                        s.emitter.emit('panmove', r);

                        // dir response

                        if (r.move.x < 0) s.emitter.emit('panleft', r);
                        if (r.move.x > 0) s.emitter.emit('panright', r);
                        if (r.move.y < 0) s.emitter.emit('panup', r);
                        if (r.move.y > 0) s.emitter.emit('pandown', r);

                        s.prev = r;
                    }
                }

                new Emission(s.emitter, 'mousemove').when(responsor);
                new Emission(s.emitter, 'touchmove').when(prevent).when(responsor);
            }

            /**
            * @access private
            */
            private start() {

                var s = this;

                function responsor(e: any) {

                    var r = new Summary(e);

                    // disp response

                    s.emitter.emit('panstart', r);

                    s.prev = r;
                    s.sess = true;
                }

                new Emission(s.emitter, 'mousedown').when(responsor);
                new Emission(s.emitter, 'touchstart').when(prevent).when(responsor);
            }
        }

        /**
        * @access private
        * @static
        */
        function prevent(e: Event) {

            e.preventDefault();

            // passthru
            return e;
        }
    }
}
