namespace Mist {

    export namespace Recognizer {

        /**
        * @class Detail
        * @summary reconized data transfer
        */
        export class Detail {

            /**
            * @access public
            * @summary client point
            */
            client: {
                x: number,
                y: number
            };

            /**
            * @access public
            * @summary moved from prev
            */
            move: {
                x: number,
                y: number
            } = {
                x: 0,
                y: 0
            };

            /**
            * @access public
            * @summary moved per milliseconds
            */
            mpms: number = 0;

            /**
            * @access public
            * @summary page point
            */
            page: {
                x: number,
                y: number
            };

            /**
            * @access public
            * @summary milliseconds from prev
            */
            passed: number = 0;

            /**
            * @constructor
            * @param {} src
            */
            constructor(src: MouseEvent);

            /**
            * @constructor
            * @param {} src
            */
            constructor(src: TouchEvent);

            /**
            * @constructor
            * @param {} src
            */
            constructor(public src: any) {

                var response: any;

                var s = this;

                // mapped.
                if (src instanceof MouseEvent) {
                    // {} response.
                    response = src;
                } else if (src instanceof TouchEvent) {
                    // {} response.
                    response = src.changedTouches[0];
                }

                // mapped response.
                s.set(response);
            }

            /**
            * @param {} src
            */
            diff(src: any): Detail {

                var s = this;

                var response = new Detail(src);

                // milliseconds from prev.

                var passed = src.timeStamp - s.src.timeStamp;

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

                clientX
                : number,
                clientY
                : number,
                pageX
                : number,
                pageY
                : number
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
