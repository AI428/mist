namespace Mist {

  export namespace Recognizer {

    /**
    * @class Detail
    * @namespace Recognizer
    */
    export class Detail {

      /**
      * @access public
      */
      client: {
        x: number,
        y: number
      };

      /**
      * @access public
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
      */
      mpms: number = 0;

      /**
      * @access public
      */
      page: {
        x: number,
        y: number
      };

      /**
      * @access public
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

        // mapped response.
        s.set(response);
      }

      /**
      * @param {} event
      */
      diff(event: any): Detail {

        var s = this;

        var response = new Detail(event);

        // passed milliseconds.

        var passed = event.timeStamp - s.event.timeStamp;

        response.passed = passed;

        // move response.

        var x = response.page.x - s.page.x;
        var y = response.page.y - s.page.y;

        response.move = { x: x, y: y };

        // move per milliseconds.

        response.mpms = passed ? (x * x + y * y) / passed : 0;

        // {} response.

        return response;
      }

      /**
      * @access private
      */
      private set(response: any) {

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
