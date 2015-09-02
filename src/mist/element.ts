/**
 * @class CSSStyleDeclaration
 * @description initialize vendor.
 * @since 0.1.0
 */
interface CSSStyleDeclaration {

	/**
	 * @access public
	 */
  mozTransform: string;

	/**
	 * @access public
	 */
  // webkitTransform: string;
}

/**
 * @class Element
 * @description initialize vendor.
 * @since 0.1.0
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

	/**
	 * @param {string} selector
	 * @return {boolean}
	 */
  // webkitMatchesSelector: (selector: string) => boolean;
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

      // match response.
      if (element.matches(selector)) break;

      // no response.
      element = element.parentElement;
    }

    return element;
  };

})(Element.prototype);
