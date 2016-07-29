/**
* @class Element
*/
interface Element {

    /**
    * @param {} selector
    */
    mozMatchesSelector: (selector: string) => boolean;
}

/**
* @class Element
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
*/
(function() {

    var o = Element.prototype;

    o.closest = o.closest

        || function(selector: string) {

            var s = this;

            while (s) {
                if (s.matches(selector)) break;
                s = s.parentElement;
            }

            return s;
        };
})();
