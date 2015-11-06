/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
module Mist {

  /**
  * @class Promise
  * @description thenable
  */
  export class Promise {

    /**
    * @access private
    * @param {} response
    */
    private rejector: any = (response) => {

      var o = this.rejector;

      // fail response.
      if (o.statement) {
        o.statement(response);
      } else {

        // fixed response.
        o.completor = o.bind(o, response);
      }
    };

    /**
    * @access private
    * @param {} response
    */
    private resolver: any = (response) => {

      var o = this.resolver;

      // commit response.
      if (o.statement) {
        o.statement(response);
      } else {

        // fixed response.
        o.completor = o.bind(o, response);
      }
    };

    /**
    * @constructor
    * @param {} process
    */
    constructor(process) {

      // prev response.
      if (process.rejector) {
        this.rejector = process.rejector;
      }

      // lazy response.
      process(
        this.resolver,
        this.rejector
        );
    }

    /**
    * @access public
    * @static
    */
    static all(promises: Promise[]): Promise {

      return new Promise(

        function(

          resolver,
          rejector
          ) {

          // initialize.
          var response = [];
          var m;

          promises.map(function(promise, n) {

            m = n;
            promise.then(function(o) {

              // fast response?
              if (!(n in response)) {

                response[n] = o;

                // commit response.
                if (keys(response).length > m) {

                  resolver(
                    response);

                  // initialize.
                  response = [];
                }
              }
            }).catch(function(e) {

              // initialize.
              response = [];

              // fail response.
              rejector(e);
            });
          });
        });
    }

    /**
    * @access public
    * @static
    */
    static race(promises: Promise[]): Promise {

      return new Promise(

        function(

          resolver,
          rejector
          ) {

          // initialize.
          var response = [];
          var m;

          promises.map(function(promise, n) {

            m = n;
            promise.then(function(o) {

              response[n] = o;

              // commit response.
              var l = keys(response).length;

              // a response.
              if (l < 2) resolver(o);
              if (l > m) response = [];

            }).catch(function(e) {

              // initialize.
              response = [];

              // fail response.
              rejector(e);
            });
          });
        });
    }

    /**
    * @param {} rejector
    * @return {}
    */
    catch(rejector: (response) => any): Promise {

      var o = this.rejector;

      // lazy response.
      var process: any = function(resolver) {

        process.resolver = resolver;
        process.rejector = resolver;

        // fixed response.
        if (o.completor) o.completor();
      };

      // initialize.
      o.statement = function(response) {

        try {
          var response = rejector(response);
          if (response != null) {

            // commit response.
            process.resolver(response);
          }
        } catch (e) {

          // fail response.
          process.rejector(e);
        }
      }

      // {} response.
      return new Promise(process);
    }

    /**
    * @param {} resolver
    * @param {} rejector
    * @return {}
    */
    then(resolver: (response) => any, rejector?: (response) => any): Promise {

      var o = this.resolver;
      var e = this.rejector;

      // lazy response.
      var process: any = function(resolver) {

        process.resolver = resolver;
        process.rejector = e;

        // fixed response.
        if (o.completor) o.completor();
      };

      // initialize.
      o.statement = function(response) {

        try {
          var response = resolver(response);
          if (response != null) {

            // commit response.
            process.resolver(response);
          }
        } catch (e) {

          // catch response.
          if (rejector) {

            var response = rejector(e);
            if (response != null) {

              // commit response.
              process.resolver(response);
            }
          } else {

            // fail response.
            process.rejector(e);
          }
        }
      }

      // {} response.
      return new Promise(process);
    }
  }

  /**
  * @access private
  * @static
  */
  function keys(response) {

    // [] response.
    return Object.keys(response);
  }
}
