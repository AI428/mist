/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
module Mist {

  /**
  * @class Promise
  * @description responsor
  */
  export class Promise {

    private rejector;
    private resolver;

    /**
    * @constructor
    * @param {} process
    */
    constructor(process) {

      this.resolver = (o) => {

        if (this.resolver.statement) {
          this.resolver.statement(o);
        } else {

          // fixed response.
          this.resolver.completor = () => {
            this.resolver(o);
          }
        }
      };

      // prev response.
      this.rejector = process.rejector || ((o) => {

        if (this.rejector.statement) {
          this.rejector.statement(o);
        } else {

          // fixed response.
          this.rejector.completor = () => {
            this.rejector(o);
          }
        }
      });

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

        function(resolver, rejector) {

          // initialize.
          var response = [];
          var m;

          promises.map(

            function(promise, n) {

              m = n;
              promise.then(

                function(o) {

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
                }).catch(

                function(e) {

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

        function(resolver, rejector) {

          // initialize.
          var response = [];
          var m;

          promises.map(function(promise, n) {

            m = n;
            promise.then(

              function(o) {

                response[n] = o;

                // commit response.
                var l = keys(response).length;

                // a response.
                if (l < 2) resolver(o);
                if (l > m) response = [];

              }).catch(

              function(e) {

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

      // lazy response.
      var process: any = (resolver, rejector) => {

        process.resolver = resolver;
        process.rejector = resolver;

        // fixed response.

        if (this.rejector.completor) {
          this.rejector.completor();
        }
      };

      // initialize.
      this.rejector.statement = function(o) {

        try {
          var response = rejector(o);
          if (response != null) {
            process.resolver(
              response);
          }
        } catch (e) {
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
    then(resolver: (response) => any,
      rejector?: (response) => any): Promise {

      // lazy response.
      var process: any = (resolver) => {

        process.resolver = resolver;

        // fixed response.

        if (this.resolver.completor) {
          this.resolver.completor();
        }
      };

      // prev response.
      process.rejector = this.rejector;

      // initialize.
      this.resolver.statement = function(o) {

        try {
          var response = resolver(o);
          if (response != null) {
            process.resolver(
              response);
          }
        } catch (e) {
          if (rejector) {
            var response = rejector(e);
            if (response != null) {
              process.resolver(
                response);
            }
          } else {
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
  */
  function keys(response) {

    // [] response.
    return Object.keys(response);
  }
}
