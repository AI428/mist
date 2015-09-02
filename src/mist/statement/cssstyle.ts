/// <reference path='../promise/value.ts' />
/// <reference path='../statement.ts' />

module Mist {

  /**
   * @class CSSStyle
   * @description styling.
   * @since 0.1.0
   */
  export class CSSStyle {

    private value: Value;

    /**
     * @constructor
     * @param {Statement} statement
     */
    constructor(statement: Statement) {

      this.value = new Value({});
      this.value.then(

        function(style) {

          statement.each(

            function(element) {
              for (var name in style) {
                if (element.style.hasOwnProperty(name)) {
                  element.style[name] = style[name];
                }
              }
            });

          // initialize.
          style = {};
        });
    }

    /**
     * @param {string[]} names
     */
    remove(...names: string[]) {

      this.value.compose(function(style) {
        names.forEach(function(name) {
          style[name] = '';
        });

        // {} response.
        return style;
      });
    }

    /**
     * @param {} options
     */
    set(options) {

      this.value.compose(function(style) {
        for (var name in options) {
          style[name] = options[name];
        }

        // {} response.
        return style;
      });
    }
  }
}
