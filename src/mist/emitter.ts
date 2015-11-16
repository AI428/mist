/// <reference path='statement.ts'/>

/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
module Mist {

  /**
  * @class Emitter
  */
  export class Emitter {

    private emits = {};
    private obss = {};

    /**
    * @constructor
    * @param {} statement
    */
    constructor(private statement: Statement) {
    }

    /**
    * @access public
    * @static
    */
    static customize(name: string, options: any = {}): Event {

      var e = document.createEvent('CustomEvent');

      // initialize.
      e.initCustomEvent(name,
        options.bubbles || true,
        options.cancelable || true,
        options.detail);

      // {} response.
      return e;
    }

    /**
    * @param {} name
    * @param {} listener
    */
    add(name: string, listener: (response) => void) {

      this.obss[name] || (this.obss[name] = []);
      this.obss[name].push(listener);

      // lasting response.

      this.ready(name);
    }

    /**
    * @param {} name
    * @param {} response
    */
    emit(name: string, response?) {

      for (var i in

        this.obss[name]) {
        this.obss[name][i](response);
      }
    }

    /**
    * @param {} name
    * @param {} listener
    */
    remove(name: string, listener?: (response) => void) {

      var o = this.obss[name];

      function composer() {

        // composer.
        var i = o.indexOf(listener);
        i < 0 || o.splice(i, 1);
      }

      // composer.
      o && listener ? composer() : o = null;
    }

    /**
    * @access private
    */
    private ready(name) {

      var o = this.emits;

      // lasting response.
      o[name] || document.addEventListener(name,
        o[name] = (e) => {
          var element = e.target;
          if (element instanceof Element) {
            if (element.closest(this.statement.selector())) {
              this.emit(name, e instanceof CustomEvent ?
                e.detail :
                e);
            }
          }
        });
    }
  }
}
