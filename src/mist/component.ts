/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
module Mist {

  /**
  * @class Component
  * @description factory
  */
  export class Component {

    /**
    * @access private
    * @static
    */
    private static coms = {};

    /**
    * @constructor
    * @return {}
    */
    static create<T>(module: Function,

      ...args): T {

      var o = this.serialize(args);
      var m = this.serialize(
        [
          module
        ]
        );

      // initialize.
      if (!this.coms[m]) {
        this.coms[m] = {};
      }

      // inher response.
      if (!this.coms[m][o]) {
        this.coms[m][o] = new (
          module.bind.apply(
            module, [module].concat(
              [].slice.apply(args))
            )
          );
      }

      // {} response.
      return this.coms[m][o];
    }

    /**
    * @access private
    * @static
    */
    private static serialize(args) {

      return JSON.stringify(

        // [] response.
        args.map(

          function(o) {
            return o instanceof Object ?
              o.session || (o.session = Date.now()) :
              o;
          })
        );
    }
  }
}
