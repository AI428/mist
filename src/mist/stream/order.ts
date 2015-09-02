/// <reference path='../promise.ts'/>
/// <reference path='../stream.ts'/>

module Mist {

  /**
   * @class Order
   * @extends Stream
   * @since 0.1.0
   */
  export class Order extends Stream {

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

        var s = new Stream();
        var t = [];

        for (var i = l; i-- > 0;) t[i] = s.listen();
        for (var i = l; i-- > 1;) {

          var resolver = function(i, r) {

            response.push(r);

            t[i - 1].pause();
            t[i].resume();

            return response;
          };

          t[i - 1].pause();
          t[i - 1].then(resolver.bind(resolver, i));
        }

        // end.
        t[l - 1].pause();
        t[l - 1].then((r) => {

          response.push(r);

          t[l - 1].pause();
          t[0].resume();

          // [] response.
          this.add(response);

          // initialize.
          response = [];
        });

        // lazy response.
        promises.map(function(promise, i) {
          promise.then(function(r) {

            // a response.
            s.add(r);
          });
        });

        // begin.
        t[0].resume();
      }
    }
  }
}
