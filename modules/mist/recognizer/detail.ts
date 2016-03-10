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
      client: { x: number, y: number } = { x: 0, y: 0 };

      /**
      * @access public
      */
      move: { x: number, y: number } = { x: 0, y: 0 };

      /**
      * @access public
      */
      mpms: number;

      /**
      * @access public
      */
      page: { x: number, y: number } = { x: 0, y: 0 };

      /**
      * @access public
      */
      passed: number;

      /**
      * @access public
      */
      screen: { x: number, y: number } = { x: 0, y: 0 };

      /**
      * @access public
      */
      vector: number;

      /**
      * @constructor
      * @param {} src
      * @param {} prev?
      */
      constructor(
        src
        : MouseEvent,
        prev?
        : MouseEvent
        );

      /**
      * @constructor
      * @param {} src
      * @param {} prev?
      */
      constructor(
        src
        : TouchEvent,
        prev?
        : TouchEvent
        );

      /**
      * @constructor
      * @param {} src
      * @param {} prev?
      */
      constructor(
        src
        : Event,
        prev?
        : Event
        );

      /**
      * @constructor
      * @param {} src
      * @param {} prev?
      */
      constructor(

        public src
        : any,
        public prev?
        : any
        ) {

        // mapped.
        if (src instanceof MouseEvent) {
          // no response.
          this.mouse(src, prev);
        } else if (src instanceof TouchEvent) {
          // no response.
          this.touch(src, prev);
        }
      }

      /**
      * @param {} src
      * @param {} prev
      */
      private mouse(

        src
        : MouseEvent,
        prev?
        : MouseEvent
        ) {

        var f = prev;
        var t = src;

        // passed milliseconds.

        var s = prev ? src.timeStamp - prev.timeStamp : 0;

        var x = prev ? t.pageX - f.pageX : 0;
        var y = prev ? t.pageY - f.pageY : 0;

        var v = Math.sqrt(x * x + y * y);

        // initialize.

        this.set(t, s, x, y, v);
      }

      /**
      * @param {} t
      * @param {} s
      * @param {} x
      * @param {} y
      * @param {} v
      */
      private set(

        t: any,
        s: number,
        x: number,
        y: number,
        v: number
        ) {

        this.client.x = t.clientX;
        this.client.y = t.clientY;

        this.move.x = x;
        this.move.y = y;

        this.mpms = s ? v / s : 0;

        this.page.x = t.pageX;
        this.page.y = t.pageY;

        this.passed = s;

        this.screen.x = t.screenX;
        this.screen.y = t.screenY;

        this.vector = v;
      }

      /**
      * @param {} src
      * @param {} prev
      */
      private touch(

        src
        : TouchEvent,
        prev?
        : TouchEvent
        ) {

        var f = prev ? prev.changedTouches[0] : null;
        var t = src.changedTouches[0];

        // passed milliseconds.

        var s = prev ? src.timeStamp - prev.timeStamp : 0;

        var x = prev ? t.pageX - f.pageX : 0;
        var y = prev ? t.pageY - f.pageY : 0;

        var v = Math.sqrt(x * x + y * y);

        // initialize.

        this.set(t, s, x, y, v);
      }
    }
  }
}
