/// <reference path='../statement.ts' />

module Mist {

  /**
   * @class CSSClass
   * @description classing.
   * @since 0.1.0
   */
  export class CSSClass {

    /**
     * @constructor
     * @param {Statement} statement
     */
    constructor(private statement: Statement) {
    }

    /**
     * @param {string[]} names
     */
    add(...names: string[]) {

      this.statement.each(
        function(element) {
          element.classList.add.apply(
            element.classList, names
            );
        });
    }

    /**
     * @param {string[]} names
     */
    remove(...names: string[]) {

      this.statement.each(
        function(element) {
          element.classList.remove.apply(
            element.classList, names
            );
        });
    }

    /**
     * @param {string[]} names
     */
    toggle(...names: string[]) {

      this.statement.each(
        function(element) {
          names.forEach(function(name) {
            element.classList.toggle(name);
          });
        });
    }
  }
}
