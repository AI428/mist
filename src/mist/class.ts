/// <reference path='frame.ts'/>
/// <reference path='promise.ts'/>
/// <reference path='statement.ts'/>
/// <reference path='value.ts'/>
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
module Mist {

  /**
  * @access private
  * @static
  */
  enum Command { A, R, T };

  /**
  * @class Class
  * @description accessor
  */
  export class Class {

    private value: Value;

    /**
    * @constructor
    * @param {} statement
    */
    constructor(private statement: Statement) {

      this.value = new Value({});
      this.value.when(

        function(o) {

          var response = [];

          for (var name in o) {

            var k = o[name];

            // format response.

            response[k] || (response[k] = []);
            response[k].push(name);

            // initialize.

            delete o[name];
          }

          this.statement.each(

            function(e) {

              var m = e.classList;
              var n;

              // patch response.

              !(n = response[Command.A]) || m.add.apply(m, n);
              !(n = response[Command.R]) || m.remove.apply(m, n);
              !(n = response[Command.T]) || n.forEach(

                function(name) {

                  m.toggle(name);
                });
            });
        });
    }

    /**
    * @param {} names
    * @param {} dur
    * @return {}
    */
    add(names: string[], dur: number = 0): Promise {

      return new Promise(

        (responsor) => {

          var c = this.value.compose((o) => {

            // composer.
            names.forEach(function(name) {

              // tagged response.
              o[name] = Command.A;
            });

            // {} response.
            return o;
          });

          // dur response.
          dur > 0 ? Frame.on(

            this.remove.bind(

              this, names), dur).then(

            function(c) {

              c.then(responsor);

            }) : c.then(responsor);
        });
    }

    /**
    * @param {} names
    * @param {} dur
    * @return {}
    */
    remove(names: string[], dur: number = 0): Promise {

      return new Promise(

        (responsor) => {

          var c = this.value.compose((o) => {

            // composer.
            names.forEach(function(name) {

              // tagged response.
              o[name] = Command.R;
            });

            // {} response.
            return o;
          });

          // dur response.
          dur > 0 ? Frame.on(

            this.add.bind(

              this, names), dur).then(

            function(c) {

              c.then(responsor);

            }) : c.then(responsor);
        });
    }

    /**
    * @param {} names
    * @return {}
    */
    toggle(names: string[]): Promise {

      return this.value.compose(function(o) {

        // composer.
        names.forEach(function(name) {

          switch (o[name]) {

            case Command.A:

              // tagged response.
              o[name] = Command.R;

              break;
            case Command.R:

              // tagged response.
              o[name] = Command.A;

              break;
            case Command.T:

              // tagged response.
              delete o[name];

              break;
            default:

              // tagged response.
              o[name] = Command.T;
          }
        });

        // {} response.
        return o;
      });
    }
  }
}
