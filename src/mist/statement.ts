/// <reference path='class.ts' />
/// <reference path='emission.ts' />
/// <reference path='emitter.ts' />
/// <reference path='style.ts' />

/// <reference path='recognizer/pan.ts' />
/// <reference path='recognizer/tap.ts' />
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
module Mist {

  /**
  * @class Statement
  */
  export class Statement {

    /**
    * @access public
    */
    class: Class;

    /**
    * @access public
    */
    emitter: Emitter;

    /**
    * @access public
    */
    style: Style;

    /**
    * @constructor
    * @param {} statement
    */
    constructor(private statement) {

      this.class = new Class(this);
      this.emitter = new Emitter(this);
      this.style = new Style(this);

      // recognizer.
      new Recognizer.Pan(this.emitter);
      new Recognizer.Tap(this.emitter);
    }

    /**
    * @param {} selector
    * @return {}
    */
    concat(selector: string): Statement {

      var s = this.selector();

      // [] response.
      var response = s.split(',').map(

        function(p) {
          return p.trim() + selector;
        });

      // lasting response.
      return Component.create<Statement>(
        Statement, response.join());
    }

    /**
    * @description each elements
    * @param {} listener
    */
    each(listener: (element: HTMLElement) => void) {

      this.elements().forEach(listener);
    }

    /**
    * @description mapped elements
    * @return {}
    */
    elements(): HTMLElement[] {

      var s = this.statement;

      // mapped.
      var response;

      if (s instanceof HTMLElement) {
        // [] response.
        response = [s];
      } else if (s instanceof Statement) {
        // [] response.
        response = s.elements();
      } else {
        // [] response.
        response = [].map.call(document.querySelectorAll(s), (element) => element);
      }

      // mapped response.
      return response;
    }

    /**
    * @param {} name
    * @return {}
    */
    on(name: string): Emission {

      // {} response.
      return new Emission(this.emitter, name);
    }

    /**
    * @description mapped selector
    * @return {}
    */
    selector(): string {

      var s = this.statement;

      // mapped.
      var response;

      if (s instanceof HTMLElement) {
        // [] response.
        response = ser(s);
      } else if (s instanceof Statement) {
        // a response.
        response = s.selector();
      } else {
        // a response.
        response = s;
      }

      // mapped response.
      return response;
    }
  }

  /**
  * @access private
  * @static
  */
  var sessions = 0;

  /**
  * @access private
  * @static
  */
  function ser(element) {

    return element.id ? '#' + element.id : (

      (function() {

        var response;

        if (element.hasAttribute('mid')) {

          // a response.
          response = '[mid='
          + element.getAttribute('mid')
          + ']';
        }

        // selector response.
        return response;
      })() ||

      (function() {

        var response = sessions++;

        element.setAttribute('mid', response);

        // selector response.
        return '[mid='
          + response
          + ']';
      })());
  }
}
