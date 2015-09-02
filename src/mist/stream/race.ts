/// <reference path='../promise.ts'/>
/// <reference path='../stream.ts'/>

module Mist {

  /**
   * @class Race
   * @extends Stream
   * @since 0.1.0
   */
  export class Race extends Stream {

		/**
		 * @constructor
		 * @param {Promise[]} promises
		 */
    constructor(promises: Promise[]) {

      super();

      // initialize.
      var response = [];

      this.initialize = () => {

        var l = promises.length;

        // lazy response.
        promises.map((promise, i) => {
          promise.then((r) => {
            response[i] = r;

            if (response.length == 1) this.add(r);
            if (response.length == l) {

              // initialize.
              response = [];
            }
          });
        });
      }
    }
  }
}
