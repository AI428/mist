namespace Mist {

    export namespace Recognizer {

        /**
        * @class Summary
        */
        export class Summary {

            /**
            * @access public
            */
            client: { x: number, y: number };

            /**
            * @access public
            * @summary moved from prev
            */
            move: { x: number, y: number } = { x: 0, y: 0 };

            /**
            * @access public
            * @summary moved per milliseconds
            */
            mpms: number = 0;

            /**
            * @access public
            */
            page: { x: number, y: number };

            /**
            * @access public
            * @summary milliseconds from prev
            */
            passed: number = 0;

            /**
            * @constructor
            * @param {} event
            */
            constructor(event: MouseEvent);

            /**
            * @constructor
            * @param {} event
            */
            constructor(event: TouchEvent);

            /**
            * @constructor
            * @param {} event
            */
            constructor(public event: any) {

                var response: any;

                var s = this;

                // mapped.
                if (event instanceof MouseEvent) {
                    // {} response.
                    response = event;
                } else if (event instanceof TouchEvent) {
                    // {} response.
                    response = event.changedTouches[0];
                }

                s.set(response);
            }

            /**
            * @param {} event
            */
            diff(event: any): Summary {

                var s = this;

                var response = new Summary(event);

                // milliseconds from prev.

                var passed = event.timeStamp - s.event.timeStamp;

                response.passed = passed;

                // moved response.

                var x = response.page.x - s.page.x;
                var y = response.page.y - s.page.y;

                response.move = { x: x, y: y };

                // moved per milliseconds.

                response.mpms = passed ? Math.sqrt(x * x + y * y) / passed : 0;

                // {} response.

                return response;
            }

            /**
            * @param {} element
            */
            measure(element: Element): {

                x: number,
                y: number
            } {

                var r = element.getBoundingClientRect();

                // dist response.

                var x = this.client.x - r.left - r.width / 2;
                var y = this.client.y - r.top - r.height / 2;

                // {} response.

                return { x: x, y: y };
            }

            /**
            * @access private
            */
            private set(response: {

                clientX: number,
                clientY: number,

                pageX: number,
                pageY: number
            }) {

                this.client = {

                    x: response.clientX,
                    y: response.clientY
                };

                this.page = {

                    x: response.pageX,
                    y: response.pageY
                };
            }
        }
    }
}
