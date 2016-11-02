/**
* @class Element
*/
interface Element {

    /**
    * @param {} selector
    * @returns {}
    */
    mozMatchesSelector: (selector: string) => boolean;
}

/**
* @class Element
* @summary for matches
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
* @summary for closest
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
