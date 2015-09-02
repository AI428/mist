module Mist {

	/**
	 * @class Promise
   * @description responsive.
	 * @since 0.1.0
	 */
  export class Promise {

    private rejector: any;
    private resolver: any;

		/**
		 * @constructor
		 * @param {} process
		 */
    constructor(process) {

      this.resolver = (r) => {

        if (this.resolver.statement) {
          this.resolver.statement(r);
        } else {
          this.resolver.completor = () => {
            this.resolver(r);
          }
        }
      };

      // prev response.
      this.rejector = process.rejector || ((r) => {

        if (this.rejector.statement) {
          this.rejector.statement(r);
        } else {
          this.rejector.completor = () => {
            this.rejector(r);
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
		 * @param {} rejector
     * @return {Promise}
		 */
    catch(rejector: (response) => any): Promise {

      // lazy response.
      var process: any = (resolver, rejector) => {

        // next process.
        process.resolver = resolver;
        process.rejector = resolver;

        // invoke response.
        if (this.rejector.completor) {
          this.rejector.completor();
        }
      };

      // initialize.
      this.rejector.statement = function(r) {

        try {
          var response = rejector(r);
          if (response != null) {

            // next process.
            process.resolver(response);
          }
        } catch (e) {

          // next process.
          process.rejector(e);
        }
      }

      // {} response.
      return new Promise(process);
    }

		/**
		 * @param {} resolver
		 * @param {} rejector
     * @return {Promise}
		 */
    then(resolver: (response) => any,
      rejector?: (response) => any): Promise {

      // lazy response.
      var process: any = (resolver) => {

        // next process.
        process.resolver = resolver;

        // invoke response.
        if (this.resolver.completor) {
          this.resolver.completor();
        }
      };

      // prev response.
      process.rejector = this.rejector;

      // initialize.
      this.resolver.statement = function(r) {

        try {
          var response = resolver(r);
          if (response != null) {

            // next process.
            process.resolver(response);
          }
        } catch (e) {

          if (rejector) {

            var response = rejector(e);
            if (response != null) {

              // next process.
              process.resolver(response);
            }
          } else {

            // next process.
            process.rejector(e);
          }
        }
      }

      // {} response.
      return new Promise(process);
    }
  }
}
