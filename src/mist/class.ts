/// <reference path='frame.ts'/>
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
  enum List { ADD, REMOVE, TOGGLE };

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
      this.value.then(

        function(o) {

          var response = [];

          // format response.
          for (var name in o) {

            response[o[name]] || (response[o[name]] = []);
            response[o[name]].push(name);

            // initialize.
            delete o[name];
          }

          // () response.
          if (response[List.ADD]) {

            function a(e) {
              e.classList.add.apply(
                e.classList, response[List.ADD]);
            }
          }

          // () response.
          if (response[List.REMOVE]) {

            function r(e) {
              e.classList.remove.apply(
                e.classList, response[List.REMOVE]);
            }
          }

          // () response.
          if (response[List.TOGGLE]) {

            function t(e) {
              response[List.TOGGLE].forEach(function(name) {
                e.classList.toggle(name);
              });
            }
          }

          this.statement.each(function(e) {

            a && a(e);
            r && r(e);
            t && t(e);
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

          var f = dur > 0;
          var g = this.value.compose((o) => {

            // composer.
            [].forEach.call(names, function(name) {

              // tagged response.
              o[name] = List.ADD;
            });

            // {} response.
            return o;
          });

          // dur response.
          f ? Frame.on(
            this.remove.bind(
              this, names), dur).then(function(g) {

            // gear response.
            g.then(responsor);
          }) : g.then(responsor);
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

          var f = dur > 0;
          var g = this.value.compose((o) => {

            // composer.
            [].forEach.call(names, function(name) {

              // tagged response.
              o[name] = List.REMOVE;
            });

            // {} response.
            return o;
          });

          // dur response.
          f ? Frame.on(
            this.add.bind(
              this, names), dur).then(function(g) {

            // gear response.
            g.then(responsor);
          }) : g.then(responsor);
        });
    }

    /**
    * @param {} names
    * @return {}
    */
    toggle(names: string[]): Promise {

      return this.value.compose(function(o) {

        // composer.
        [].forEach.call(names, function(name) {

          switch (o[name]) {

            case List.ADD:

              // tagged response.
              o[name] = List.REMOVE;

              break;
            case List.REMOVE:

              // tagged response.
              o[name] = List.ADD;

              break;
            case List.TOGGLE:

              // tagged response.
              delete o[name];

              break;
            default:

              // tagged response.
              o[name] = List.TOGGLE;
          }
        });

        // {} response.
        return o;
      });
    }
  }
}
