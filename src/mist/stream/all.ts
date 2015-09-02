/// <reference path='../promise.ts'/>
/// <reference path='../stream.ts'/>

module Mist {

  /**
   * @class All
   * @extends Stream
   * @since 0.1.0
   */
  export class All extends Stream {

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

            if (response.length == l) this.add(response);
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
