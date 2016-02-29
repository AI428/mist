/// <reference path='frame.ts'/>
/// <reference path='promise.ts'/>
/// <reference path='statement.ts'/>
/// <reference path='value.ts'/>

namespace Mist {

  const ADD
    : number = 1;
  const REMOVE
    : number = 2;
  const TOGGLE
    : number = 4;

  /**
  * @class Class
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

          var response: string[][] = [];

          // mat response.

          for (let name in o) {

            let k = o[name];

            response[k] || (response[k] = []);
            response[k].push(name);

            delete o[name];
          }

          statement.each(

            function(e) {

              var m = e.classList;
              var n: string[];

              !(n = response[ADD]) || m.add.apply(m, n);
              !(n = response[REMOVE]) || m.remove.apply(m, n);
              !(n = response[TOGGLE]) || n.forEach(
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

      return new Promise((responsor) => {

        var r = this.value.compose(

          function(o) {

            names.forEach(

              function(name) {

                // composer.
                o[name] = ADD;
              });

            // {} response.
            return o;
          });

        // dur response.
        dur > 0 ? Frame.on(
          this.remove.bind(
            this, names), dur).then(responsor) :

          // passthru.
          r.then(responsor);
      });
    }

    /**
    * @param {} names
    * @param {} dur
    * @return {}
    */
    remove(names: string[], dur: number = 0): Promise {

      return new Promise((responsor) => {

        var r = this.value.compose(

          function(o) {

            names.forEach(

              function(name) {

                // composer.
                o[name] = REMOVE;
              });

            // {} response.
            return o;
          });

        // dur response.
        dur > 0 ? Frame.on(
          this.add.bind(
            this, names), dur).then(responsor) :

          // passthru.
          r.then(responsor);
      });
    }

    /**
    * @param {} names
    * @return {}
    */
    toggle(names: string[]): Promise {

      return this.value.compose(

        function(o) {

          // composer.
          names.forEach(

            function(name) {

              switch (o[name]) {

                case ADD:

                  // tagged response.
                  o[name] = REMOVE;

                  break;
                case REMOVE:

                  // tagged response.
                  o[name] = ADD;

                  break;
                case TOGGLE:

                  // tagged response.
                  delete o[name];

                  break;
                default:

                  // tagged response.
                  o[name] = TOGGLE;
              }
            });

          // {} response.
          return o;
        });
    }
  }
}
