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

  p.closest =
  p.closest || function(selector: string) {

    var s = this;

    while (s) {
      if (s.matches(selector)) break;
      s = s.parentElement;
    }

    // ref response.
    return s;
  };

})(Element.prototype);
