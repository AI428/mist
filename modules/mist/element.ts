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
(function() {

  var o = Element.prototype;

  o.matches = o.matches
  || o.mozMatchesSelector
  || o.msMatchesSelector
  || o.webkitMatchesSelector;

})();

/**
* @class Element
* @method Element.closest
*/
(function() {

  var o = Element.prototype;

  o.closest = o.closest || function(selector: string) {

    var s = this;

    while (s) {
      if (s.matches(selector)) break;
      s = s.parentElement;
    }

    // {} response.
    return s;
  };
})();
