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
    private static responses = {};

    /**
    * @constructor
    * @return {}
    */
    static create<T>(

      modular: Function, ...o): T {

      var m = ser([modular]);
      var n = ser(o);

      // initialize.
      this.responses[m] || (this.responses[m] = {});

      // inher response.
      if (!this.responses[m][n]) {
        this.responses[m][n] = new (
          modular.bind.apply(
            modular, [modular].concat(
              [].slice.apply(o))
            )
          );
      }

      // lasting response.
      return this.responses[m][n];
    }
  }

  /**
  * @access private
  * @static
  */
  var sessions = 0;

  /**
  * @access private
  * @static
  */
  function ser(response) {

    return JSON.stringify(

      // [] response.
      response.map(

        function(v) {
          return v instanceof Object ?
            v.sessions || (v.sessions = sessions++) :
            v;
        })
      );
  }
}
