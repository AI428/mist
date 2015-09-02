/// <reference path='../promise.ts'/>

module Mist {

	/**
	 * @class Listener
	 * @extends Promise
	 * @since 0.1.0
	 */
  export class Listener extends Promise {

    private paused: boolean;

    /**
     * @access public
     */
    compute: (response: any) => void;

		/**
		 * @constructor
		 */
    constructor() {

      super((

        resolver,
        rejector) => {

        this.compute = (r) => {

          if (!this.paused) {

            try {
              resolver(r);
            } catch (e) {
              rejector(e);
            }
          }
        }
      });
    }

    /**
     */
    pause() {

      // pause listener.
      this.paused = true;
    }

    /**
     */
    resume() {

      // resume listener.
      this.paused = false;
    }
  }
}
