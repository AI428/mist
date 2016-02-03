/// <reference path='statement.ts'/>

namespace Mist {

  /**
  * @class Emitter
  * @summary for event
  */
  export class Emitter {

    private emits: any = {};
    private obss: any = {};

    /**
    * @constructor
    * @param {} statement
    */
    constructor(private statement: Statement) {
    }

    /**
    * @param {} name
    * @param {} options
    * @return {}
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
    add(name: string, listener: (response: any) => void) {

      this.obss[name] || (this.obss[name] = []);
      this.obss[name].push(listener);
      // lasting response.
      this.ready(name);
    }

    /**
    * @param {} name
    * @param {} response
    */
    emit(name: string, response?: any) {

      for (let i in
        this.obss[name]) {
        this.obss[name][i](response);
      }
    }

    /**
    * @param {} name
    * @param {} listener
    */
    remove(name: string, listener?: (response: any) => void) {

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
    private ready(name: string) {

      var o = this.emits;

      // lasting response.
      o[name] || document.addEventListener(name,
        o[name] = (e: Event) => {
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
* @summary for vendor
*/
interface Element {

  /**
  * @param {} selector
  * @return {}
  */
  closest: (selector: string) => Element;

  /**
  * @param {} selector
  * @return {}
  */
  matches: (selector: string) => boolean;

  /**
  * @param {} selector
  * @return {}
  */
  mozMatchesSelector: (selector: string) => boolean;
}

/**
* @class Element
* @method Element.matches
*/
(function(p: Element) {

  p.matches = p.matches
  || p.mozMatchesSelector
  || p.msMatchesSelector
  || p.webkitMatchesSelector;

})(Element.prototype);

/**
* @class Element
* @method Element.closest
*/
(function(p: Element) {

  p.closest = p.closest || function(selector: string) {

    var s = this;

    // ref response.

    while (s) {
      if (s.matches(selector)) break;
      s = s.parentElement;
    }

    return s;
  };

})(Element.prototype);
