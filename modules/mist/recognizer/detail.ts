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

        // passed milliseconds.

        var passed = src.timeStamp - s.src.timeStamp;

        response.passed = passed;

        // move response.

        var x = response.page.x - s.page.x;
        var y = response.page.y - s.page.y;

        response.move = { x: x, y: y };

        // move per milliseconds.

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

        var x = this.client.x - r.left - r.width / 2;
        var y = this.client.y - r.top - r.height / 2;

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
