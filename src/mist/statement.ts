/// <reference path='promise/listener.ts' />
/// <reference path='statement/cssclass.ts' />
/// <reference path='statement/cssstyle.ts' />
/// <reference path='stream/all.ts' />
/// <reference path='stream/emitter.ts' />
/// <reference path='stream/order.ts' />
/// <reference path='stream/race.ts' />
/// <reference path='component.ts' />
/// <reference path='matrix.ts' />

module Mist {

  /**
   * @class Statement
   * @description mist statement.
   * @since 0.1.0
   */
  export class Statement {

    /**
     * @access public
     */
    cssc: CSSClass;
    csss: CSSStyle;

    /**
     * @constructor
     * @param {string} selector
     */
    constructor(private selector: string) {

      this.cssc = new CSSClass(this);
      this.csss = new CSSStyle(this);
    }

    /**
     * @param {string[]} names
     * @return {Listener}
     */
    all(...names: string[]): Listener {

      return new All(this.listen(names)).listen();
    }

    /**
     * @param {} listener
     */
    each(listener: (element: HTMLElement) => void) {

      [].forEach.call(this.query(), listener);
    }

    /**
     * @param {string} name
     * @param {} detail
     */
    emit(name: string, detail?: any) {

      var e = Emitter.customize(name, { detail: detail || {} });

      this.each(
        function(element) {
          element.dispatchEvent(e);
        });
    }

    /**
     * @param {string} name
     * @return {Listener}
     */
    on(name: string): Listener {

      return Component.create<Emitter>(Emitter, name, this.selector).listen();
    }

    /**
     * @param {string[]} names
     * @return {Listener}
     */
    order(...names: string[]): Listener {

      return new Order(this.listen(names)).listen();
    }

    /**
     * @param {string[]} names
     * @return {Listener}
     */
    race(...names: string[]): Listener {

      return new Race(this.listen(names)).listen();
    }

    /**
    * @param {number} deg
    */
    rotate(deg: number) {

      var m = [
        Math.cos(deg),
        Math.sin(deg),
        Math.sin(deg) / -1,
        Math.cos(deg),
        null,
        null
      ];

      this.each(
        function(element) {
          Component.create<Matrix>(Matrix, element).add(m);
        });
    }

    /**
     * @param {} comparer
     * @return {boolean}
     */
    some(comparer: (element: HTMLElement) => boolean): boolean {

      return [].some.call(this.query(), comparer);
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    translate(x: number, y: number) {

      var m = [
        null,
        null,
        null,
        null,
        x,
        y
      ];

      this.each(
        function(element) {
          Component.create<Matrix>(Matrix, element).add(m);
        });
    }

    /**
     * @access private
     */
    private listen(names: string[]): Listener[] {

      return names.map((name) => this.on(name));
    }

    /**
     * @access private
     */
    private query(): NodeList {

      return document.querySelectorAll(this.selector);
    }
  }
}
