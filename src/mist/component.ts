module Mist {

	/**
	 * @class Component
   * @description component factory.
	 * @since 0.1.0
	 */
  export class Component {

		/**
		 * @access private
		 * @static
		 */
    private static components: any = {};
    private static identities: number[] = [];

		/**
		 * @constructor
		 * @return {Function}
		 */
    static create<T>(module: Function, ...options): T {

      var o = this.hash(options);
      var m = this.hash([
        module
      ]);

      // initialize.
      if (!this.components[m]) {
        this.components[m] = {};
      }

      // inher response.
      if (!this.components[m][o]) {
        this.components[m][o] = new (
          module.bind.apply(
            module, [module].concat(
              [].slice.apply(options))
            )
          );
      }

      // {} response.
      return this.components[m][o];
    }

		/**
		 * @access private
		 * @static
		 */
    private static hash(options) {

      return JSON.stringify(

        options.map((o) => {
          if (o instanceof Element) if (o.id) return o.id;
          if (o instanceof Object) return o._ID || (o._ID = this.identities.push(0));

          // passthru.
          return o;
        }));
    }
  }
}
