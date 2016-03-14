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

        // mapped.
        if (e instanceof MouseEvent) {
          // no response.
          this.mouse(e);
        } else if (e instanceof TouchEvent) {
          // no response.
          this.touch(e);
        }

        session(this);
      }

      /**
      * @access private
      */
      private mouse(e: MouseEvent) {

        var o = e;

        // rec response.
        var p = session();

        // passed milliseconds.
        var s = p ? e.timeStamp - p.e.timeStamp : 0;

        // move response.
        var x = p ? o.pageX - p.page.x : 0;
        var y = p ? o.pageY - p.page.y : 0;

        // initialize.
        this.set(o, s, x, y);
      }

      /**
      * @param {} o
      * @param {} s
      * @param {} x
      * @param {} y
      */
      private set(

        o: any,
        s: number,
        x: number,
        y: number
        ) {

        this.client.x = o.clientX;
        this.client.y = o.clientY;

        this.move.x = x;
        this.move.y = y;

        // move per milliseconds.
        this.mpms = s ? (x * x + y * y) / s : 0;

        this.page.x = o.pageX;
        this.page.y = o.pageY;

        this.passed = s;
      }

      /**
      * @access private
      */
      private touch(e: TouchEvent) {

        var o = e.changedTouches[0];

        // rec response.
        var p = session();

        // passed milliseconds.
        var s = p ? e.timeStamp - p.e.timeStamp : 0;

        // move response.
        var x = p ? o.pageX - p.page.x : 0;
        var y = p ? o.pageY - p.page.y : 0;

        // initialize.
        this.set(o, s, x, y);
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
