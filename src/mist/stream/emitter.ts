/// <reference path='../element.ts'/>
/// <reference path='../promise.ts'/>
/// <reference path='../stream.ts'/>

module Mist {

  /**
   * @class Emitter
   * @extends Stream
   * @since 0.1.0
   */
  export class Emitter extends Stream {

		/**
		 * @constructor
		 * @param {string} name
		 * @param {string} selector
		 */
    constructor(name: string, selector: string) {

      super();

      // lazy response.
      document.addEventListener(name,

        (e) => {
          var element = e.target;
          if (element instanceof Element) {
            if (element.closest(selector)) {
              this.add(e instanceof CustomEvent ?
                e.detail :
                e);
            }
          }
        });
    }

		/**
		 * @access public
		 * @static
		 */
    static customize(name: string, options?: any) {

      var e = document.createEvent('CustomEvent');

      // initialize.
      e.initCustomEvent(name,
        options.bubbles || true,
        options.cancelable || true,
        options.detail);

      // {} response.
      return e;
    }
  }
}
