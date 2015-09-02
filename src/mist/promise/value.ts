/// <reference path='../promise.ts'/>

module Mist {

  /**
   * @class Value
   * @extends Promise
   * @since 0.1.0
   */
  export class Value extends Promise {

    private compute: any;
    private computed: boolean;

    /**
    * @access public
    */
    composite;

    /**
     * @constructor
     * @param {} composite
     */
    constructor(composite) {

      this.composite = composite;

      super((

        resolver,
        rejector) => {

        this.compute = () => {

          if (!this.computed) {

            // begin.
            this.computed = true;

            // lazy response.
            requestAnimationFrame(() => {

              try {
                resolver(this.composite);
              } catch (e) {
                rejector(e);
              } finally {
                // commit.
                this.computed = false;
              }
            });
          }
        }
      });
    }

    /**
     * @param {} composer
     */
    compose(composer: (composite?) => any) {

      this.composite = composer(this.composite);
      this.compute();
    }
  }
}
