/// <reference path='statement.ts'/>

/**
 * @copyright 2015 AI428
 * @description statement for CSS in JS
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

/**
* @class Element
* @description for vendor
*/
interface Element {

  /**
  * @param {string} selector
  * @return {Element}
  */
  closest: (selector: string) => Element;

  /**
  * @param {string} selector
  * @return {boolean}
  */
  matches: (selector: string) => boolean;

  /**
  * @param {string} selector
  * @return {boolean}
  */
  mozMatchesSelector: (selector: string) => boolean;
}

/**
* @class Element
* @method Element.matches
*/
(function(p) {

  p.matches = p.matches
  || p.mozMatchesSelector
  || p.msMatchesSelector
  || p.webkitMatchesSelector;

})(Element.prototype);

/**
* @class Element
* @method Element.closest
*/
(function(p) {

  p.closest = p.closest || function(selector) {

    var s = this;

    // ref response.
    while (s) {
      if (s.matches(selector)) break;
      s = s.parentElement;
    }

    // {} response.
    return s;
  };

})(Element.prototype);
