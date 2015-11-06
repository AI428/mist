/// <reference path='mist/component.ts' />
/// <reference path='mist/statement.ts' />
/*!
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.2.1
 */
/**
 * @param {} statement
 * @return {Mist.Statement}
 */
function mist(statement): Mist.Statement {
  return Mist.Component.create<Mist.Statement>(
    Mist.Statement, statement);
}

/**
* @class CSSStyleDeclaration
* @description for vendor
*/
interface CSSStyleDeclaration {

  /**
  * @access public
  */
  mozTransform: string;
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
(function(Element) {

  Element.matches = Element.matches
  || Element.mozMatchesSelector
  || Element.msMatchesSelector
  || Element.webkitMatchesSelector;

})(Element.prototype);

/**
* @class Element
* @method Element.closest
*/
(function(Element) {

  Element.closest = Element.closest || function(selector) {

    var element = this;

    // closest.
    while (element) {
      if (element.matches(selector)) break;
      element = element.parentElement;
    }

    // {} response.
    return element;
  };

})(Element.prototype);
