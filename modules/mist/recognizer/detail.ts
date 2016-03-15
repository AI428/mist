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
      client: { x: number, y: number };

      /**
      * @access public
      */
      move: { x: number, y: number };

      /**
      * @access public
      */
      mpms: number;

      /**
      * @access public
      */
      page: { x: number, y: number };

      /**
      * @access public
      */
      passed: number;

      /**
      * @constructor
      * @param {} e
      */
      constructor(e: MouseEvent);

      /**
      * @constructor
      * @param {} e
      */
      constructor(e: TouchEvent);

      /**
      * @constructor
      * @param {} e
      */
      constructor(public e: any) {

        var s = this;

        // mapped.
        if (e instanceof MouseEvent) {
          // no response.
          s.mouse(e);
        } else if (e instanceof TouchEvent) {
          // no response.
          s.touch(e);
        }

        session(s);
      }

      /**
      * @access private
      */
      private mouse(e: MouseEvent) {

        var p = e;

        // rec response.

        var s = session();

        // passed milliseconds.

        var passed = s ? e.timeStamp - s.e.timeStamp : 0;

        // move response.

        var x = s ? p.pageX - s.page.x : 0;
        var y = s ? p.pageY - s.page.y : 0;

        // initialize.

        this.set(p, passed, x, y);
      }

      /**
      * @access private
      */
      private set(

        p: any,
        passed: number,
        x: number,
        y: number
        ) {

        this.client = { x: p.clientX, y: p.clientY };

        this.move = { x: x, y: y };

        this.mpms = passed ? (x * x + y * y) / passed : 0;

        this.page = { x: p.pageX, y: p.pageY };

        this.passed = passed;
      }

      /**
      * @access private
      */
      private touch(e: TouchEvent) {

        var p = e.changedTouches[0];

        // rec response.

        var s = session();

        // passed milliseconds.

        var passed = s ? e.timeStamp - s.e.timeStamp : 0;

        // move response.

        var x = s ? p.pageX - s.page.x : 0;
        var y = s ? p.pageY - s.page.y : 0;

        // initialize.

        this.set(p, passed, x, y);
      }
    }

    /**
    * @access private
    * @static
    */
    var sessions: any;

    /**
    * @access private
    * @static
    */
    function session(v?: any) {

      return v ? (sessions = v) : sessions;
    }
  }
}
